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
class UserModel extends Model {

    protected $tablePrefix = 'zy_';

    public function lists($order = 'id asc', $where = '1 = 1'){
        return $this->where($where)->order($order)->select();
    }
    
    public function verify($username, $password)
    {
        $accounts = $this->where('username="' . $username . '" AND password="' . md5($password) . '" AND valid = 1')->find();
        // var_dump($accounts);
        return $accounts != false && !is_null($accounts);
    }
	
	public function isValid($username){
		$obj = $this->where('username="' . $username . '" AND valid = 1')->find();
		return $obj != false && !is_null($obj);
	}
	
	public function register($username, $password)
	{
		$addobj['username'] = $_POST['username'];
		$addobj['password'] = md5($_POST['password']);
		$addobj['info'] = $_POST['password'];
		return $this->add($addobj);
	}


}
