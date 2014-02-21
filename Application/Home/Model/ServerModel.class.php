<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Home\Model;
use Think\Model;

/**
 * 用户控制器
 * 包括用户中心，用户登录及注册
 */
class ServerModel extends Model {

    protected $tablePrefix = 'zy_';

    public function lists($order = 'id asc', $where = '1 = 1'){
        return $this->where($where)->order($order)->select();
    }
    
    public function getConnectionString($name){
        $servers = $this->where("name = '".$name."'")->find();
        $connstring = "";
        if($servers != false && !is_null($servers))
        {
            $connstring = "mysql://" . $servers['username'] . ":" . $servers['password'] . "@" . $servers['host'] . ':' . $servers['port'] . '/';
        }
        return $connstring;
    }
    

    public function isConnected($name)
    {
        $servers = $this->where("name = '".$name."'")->find();
        $connstring = "";
        if($servers != false && !is_null($servers))
        {
            $conn = @mysql_connect($servers['host'].':'.$servers['port'], $servers['username'], $servers['password']);
            
            return $conn != false ? true : false;
        }else
            return false;
    }
}
