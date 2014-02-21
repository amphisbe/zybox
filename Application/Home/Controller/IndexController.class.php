<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class IndexController extends BaseController {


	public function __construct() {

		parent::__construct();

		$this -> _STR['_SUBNAV_TITLE'] = '';
		$this -> _STR['_MODAL_TITLE'] = '';

		$this -> _STR['_PAGE_TITLE'] = '子娱游戏 管理工具';
		$this -> _STR['_PAGE_ALERT'] = '请输入用户名、密码登入系统。';
		$this -> _STR['_MODIFY_ALERT'] = '请输入用户名、密码修改。';
		$this -> _STR['_REGISTER_ALERT'] = '请输入用户名、密码。';
	}

    public function index() {
 
        if(session('loginstatus') != 1)
        {
            // $this -> setSTR('_DISPATCH', 'INDEX');
            // $this -> setSTR('_PAGE_TITLE', '子娱游戏');
            // $this -> setSTR('_HEAD_SUBTITLE', '首页');
            // $this -> setSTR('_HEAD_SUBTITLE', '首页');
            // $this->display(T('default/Login/index'));
            
            redirect('Login');
        }else{
            $this -> setSTR('_DISPATCH', 'INDEX');
            $this -> setSTR('_PAGE_TITLE', '用户登录');
            $this -> setSTR('_HEAD_SUBTITLE', '用户登录');
            $this -> display();
        }
        
    }

    private function checkSession() {
        $user_name = session('username');
        $user_level = session('userlevel');
        
        if(is_null($user_name))
            $this->redirect('Public/login', null, 2, '用户未登录，跳转到登录界面......');
        else if($user_level > 0){
            $this->error('非GM用户，无法使用游戏盒子！');
        }else
            $this->redirect('login', null, 5, '111......');
    }

}
