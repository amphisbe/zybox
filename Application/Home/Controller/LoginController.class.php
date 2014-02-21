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
 * 后台首页控制器
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
class LoginController extends BaseController {

	public function __construct() {

		parent::__construct();

		$this -> _STR['_SUBNAV_TITLE'] = '';
		$this -> _STR['_MODAL_TITLE'] = '';

		$this -> _STR['_PAGE_TITLE'] = '子娱游戏 管理工具';
		$this -> _STR['_PAGE_ALERT'] = '请输入用户名、密码登入系统。';
		$this -> _STR['_MODIFY_ALERT'] = '请输入用户名、密码修改。';
		$this -> _STR['_REGISTER_ALERT'] = '请输入用户名、密码。';
	}

	/* index */
	public function index() {
		
            $this -> setSTR('_DISPATCH', 'INDEX');
            $this -> setSTR('_PAGE_TITLE', '用户登录');
            $this -> setSTR('_HEAD_SUBTITLE', '用户登录');
            //列表数据
            $this -> display();

	}

	/**
	 * 后台用户登录
	 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
	 */
	public function login() {

	}

	/* 注册用户 */
	public function register() {

		// $this -> verifylogin();

		if (IS_POST && isset($_POST['op'])) {
			switch($_POST['op']) {
				case 'register' :
					$this->ajaxReturn($this -> ajaxregister($_POST));
					return;
					break;
			}
		} else {
			$this -> setSTR('_DISPATCH', 'REG');
			$this -> setSTR('_PAGE_TITLE', '用户注册');
			$this -> setSTR('_HEAD_SUBTITLE', '用户注册');
			$this -> display('index');
		}
	}

	/* 修改密码 */
	public function modify() {
		$this -> setSTR('_DISPATCH', 'MODIFY');
		$this -> setSTR('_PAGE_TITLE', '修改密码');
		$this -> setSTR('_HEAD_SUBTITLE', '修改密码');
		$this -> display('index');
	}

	/* 退出登录 */
	public function logout() {
		// D('Member') -> logout();
		session('username', null);
		session('loginstatus', null);
		//
		redirect('.');
	}

	/* ajax verify */
	public function ajaxverify() {
	    
        $obj = array();
        
        if(!IS_POST || $_POST['op'] != 'verify')
        {
            $obj['result'] = -1;
            $obj['text'] = '用户名密码参数不完整！';
            $this->ajaxReturn($obj);
        }
		if (isset($_POST['username']) && isset($_POST['password'])) {

			if(!self::s_getUserInst()->isValid($_POST['username'])){
				$obj['result'] = -1;
				$obj['text'] = '用户为无效用户，无法登录';		
			}elseif (!self::s_getUserInst()->verify($_POST['username'], $_POST['password'])) {
				$obj['result'] = 0;
				$obj['text'] = '用户名、密码验证错误！';
			}else{
				$obj['result'] = 1;
			    $obj['text'] = '登录成功';
                $obj['url'] = 'http://'.$_SERVER['HTTP_HOST'].'/zybox/Index';
                session('username', $_POST['username']);
                session('loginstatus', 1);
			}
		} else {
			$obj['result'] = -1;
			$obj['text'] = '用户名密码参数不完整！';
		}
        $this->ajaxReturn($obj);
	}

	/* ajax verify */
	public function ajaxregister() {
			
		$obj['result'] = 1;
        //$this->ajaxReturn($obj);
		if(!IS_POST || $_POST['op'] != 'register')
        {
            $obj['result'] = -1;
            $obj['text'] = '用户名密码参数不完整！';
            $this->ajaxReturn($obj);
        }
		if (isset($_POST['username']) && isset($_POST['password'])) {

			if (!self::s_getUserInst()->register($_POST['username'], $_POST['password'])) {
				$obj['result'] = 0;
				$obj['text'] = $Account -> getError();
			} else {
				$obj['result'] = 1;
				$obj['text'] = '注册成功！';
				// session('username', $addobj['username']);
				// session('loginstatus', 1);
			}
		} else {
			$obj['result'] = -1;
			$obj['text'] = '参数传递错误！';
		}
		$this -> ajaxReturn($obj);
	}

	public function verify() {
		$verify = new \Think\Verify();
		$verify -> entry(1);
	}
    
    public function test(){
        //$this->ajaxverify($_GET);
        // var_dump($_POST);
        self::s_getUserInst()->verify($_GET['username'], $_GET['password']);
    }

}
