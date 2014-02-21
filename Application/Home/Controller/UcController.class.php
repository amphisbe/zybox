<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Home\Controller;
use Think\Controller;

/**
 * 用户控制器
 * 包括用户中心，用户登录及注册
 */
class UcController extends Controller {

    
	public function index(){
	    echo 'uc';
	}
    
    public function error(){
        if(IS_GET && isset($_GET['n']) ){
            $UcError = M('Ucerror');
            $error = $UcError->where('errorno='.$_GET['n'])->find();
            if($error == false || is_null($error)){
                echo 'invalid error number.';
            }else
                echo $error['errortxt'];
        }
    }


}
