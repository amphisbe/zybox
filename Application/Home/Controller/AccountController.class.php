<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Home\Controller;
// use User\Api\UserApi;
use Think\Controller;

/**
 * 用户控制器
 * 包括用户中心，用户登录及注册
 */
class AccountController extends BaseController {

    
    public function __construct(){
        
        parent::__construct();
        
        $this->_STR['_SUBNAV_TITLE'] = '用户管理';
        $this-> _STR['_MODAL_TITLE'] = '用户管理';
        $this->_STR['_HEAD_SUBTITLE'] = '用户管理';
        $this -> _STR['_PAGE_TITLE'] = '子娱游戏 管理工具';
        $this -> _STR['_PAGE_ALERT'] = '请输入用户名、密码登入系统。';
        $this -> _STR['_MODIFY_ALERT'] = '请输入用户名、密码修改。';
        $this -> _STR['_REGISTER_ALERT'] = '请输入用户名、密码。';
    }
    
	/* 用户中心首页 */
	public function index(){
	    
        $this->isLogin();
        $this->_STR['_DISPATCH'] = 'INDEX';
        $this->assign('TplStr', $this->_STR);
        $this->listmodel('auth', '', 'Account', 'id');
		$this->display();
	}
    
    /* 用户中心首页 */
    public function character(){
        
        $this->isLogin();
        $this->_STR['_DISPATCH'] = 'CHARACTER';
        $this->assign('TplStr', $this->_STR);
        $this->display('index');
    }
	
	public function ajaxaccountlist(){
		$this -> isLogin();
		$msgmodel = $this -> switchmodel('auth', '', 'Account');
		$lists = array();
		$obj = array();
		if ($msgmodel != false)
		{
			$lists = $msgmodel -> select();
			$obj['total'] = count($lists);
			if(isset($_POST['page']))
				$lists = $msgmodel -> page(I('post.page'), I('post.rows')) -> select();
		}
		$obj['rows'] = $lists;
		echo json_encode($obj);
	}
	
	public function ajaxcharacterlist(){
		$this -> isLogin();
		$msgmodel = $this -> switchmodel('characters', '', 'Characters');
		$lists = array();
		$obj = array();
		if ($msgmodel != false)
		{
			$lists = $msgmodel -> select();
			$obj['total'] = count($lists);
			if(isset($_POST['page']))
				$lists = $msgmodel -> page(I('post.page'), I('post.rows')) -> select();
			
			foreach($lists as $vo=>&$key)
            {
                 $key['jsontxt'] = json_encode($key);
            }
		}
		$obj['rows'] = $lists;
		echo json_encode($obj);
	}
    
    public function modifyc()
    {
        //var_dump($_GET);
        if(IS_GET &&  isset($_GET['guid'])){
            
            if(isset($_GET['name']))
                $addobj['name'] = $_GET['name'];
            if(isset($_GET['vip']))
                $addobj['vipLevel'] = $_GET['vip'];
            if(isset($_GET['money']))
                $addobj['vm'] = $_GET['money'];

            if(isset($_GET['rmb']))
                $addobj['rm'] = $_GET['rmb'];
            if(isset($_GET['vip']))
                $addobj['vipLevel'] = $_GET['vip'];     

            if(isset($_GET['level']))
                $addobj['level'] = $_GET['level'];
            if(isset($_GET['exp']))
                $addobj['xp'] = $_GET['exp'];                 
            
            
            $Character = $this -> switchmodel('characters', '', 'Characters');

            if ($Character != false && $Character -> where("guid=" . $_GET['guid']) -> save($addobj)) {
                $this -> success("修改成功！");
            } else {
                // var_dump($Board);
                $this -> error("修改失败！");
            }
        } else {
            $this -> error('参数错误！');
        }
    }




}
