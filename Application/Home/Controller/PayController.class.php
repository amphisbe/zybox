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
class PayController extends BaseController {

    
    public function __construct(){
        
        parent::__construct();
        
        $this->_STR['_SUBNAV_TITLE'] = '支付订单管理';
        // $this->_STR['_MODAL_TITLE'] = '修改';
    }
    
	/* 用户中心首页 */
	public function index(){
	    
        $this->isLogin();
        $this->_STR['_DISPATCH'] = 'INDEX';
        
		$Pay = $this->switchmodel('pay', 'pay_', 'Instance');
        
        $lists = array();
        if($Pay != false)
            $lists = $Pay->select();
        else{
            $this->setSTR('_INFO_TYPE', 'ERROR');
            $this->setSTR('_INFO_TITLE', '数据库错误!');
            $this->setSTR('_INFO_TEXT', '数据库连接错误，无法查询结果，请重新选择数据库连接。');
        }
        
        $this->assign('lists', $lists);
        
        $this->assign('TplStr', $this->_STR);
        $this->display();
	}
    
    public function consume(){
        
        $this->isLogin();
        $this->_STR['_DISPATCH'] = 'CONSUME';
        
        $Consume = $this->switchmodel('pay', 'pay_', 'Template');
        $lists = array();
        if($Consume != false)
            $lists = $Consume->order('priority')->select();
        $this->assign('lists', $lists);
        
        $this->assign('TplStr', $this->_STR);
        $this->display('index');
    }
    
    public function lists()
    {
        echo session('dbstr');
    }
    
    public function shown()
    {
        echo IS_GET." <br/>function<br/>".$_GET['cc'];
        var_dump($_GET);
        switch($_GET['cc'])
        {
            case 1:
                // var_dump(D('Connect')->switchserver(1, "mysql://root:123456@192.168.1.120:3307/", "pay_instance"));
                var_dump(M('instance', 'pay_', "mysql://ziyugame_icd:123456@192.168.1.120:3307/pay"));
                break;
            case 2:
                // var_dump(D('Connect')->switchserver(2, "mysql://root:123456@192.168.1.120:3308/pay", "pay_instance"));
                var_dump(M('instance', 'pay_', "mysql://root:123456@192.168.1.120:3308/pay"));
                break;
        }
    }


}
