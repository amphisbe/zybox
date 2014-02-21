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
class ConnectModel extends Model {


    // public function __construct(){
        // parent::__construct();
    // }
    
    

    public function lists($order = 'guid desc', $where = '1 = 1'){
        return $this->where($where)->order($order)->select();
    }
    
    public function switchserver($id, $str, $tbl){
        return M('instance', 'pay_', $str);
    }
 

}
