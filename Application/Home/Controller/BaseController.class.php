<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
use Home\Model\ServerModel;
use Home\Model\UserModel;
class BaseController extends Controller {

    public $_STR = array();

    public $_TPLSTR_NAME = 'TplStr';

    public static $_SERVERS = array();
    
    public static $_USERS = array();
    
    public static $_SERVER_INST = null;
    
    public static $_USER_INST = null;

    public function __construct() {

        parent::__construct();
        $this -> _STR = array("_HEAD_TITLE" => '子娱盒子 v1.0', "_HEAD_SUBTITLE" => '子娱盒子 v1.0', "_SUBNAV_ROOT" => 'Home', "_SUBNAV_TITLE" => 'Title', "_DISPATCH" => 'INDEX', );
        //$this->assign('NAV_SERVERS', self::s_getServers());
    }
    
    public function ajaxservers()
    {
        if(count(self::$_SERVERS) <= 0)
        {
            $s = new ServerModel('server', 'zy_', 'DB_CONFIG1');
            $this->ajaxReturn( self::$_SERVERS = $s->lists());
        }else{
            $this->ajaxReturn( self::$_SERVERS);
        }    
    }
    
    public static function s_getServers(){
        
        if(count(self::$_SERVERS) <= 0)
        {
            $s = new ServerModel('server', 'zy_', 'DB_CONFIG1');
            return self::$_SERVERS = $s->lists();
        }else{
            return self::$_SERVERS;
        }
    }
    
    public static function s_getUsers(){
        
        if(count(self::$_USERS) <= 0)
        {
            $s = new UserModel('user', 'zy_', 'DB_CONFIG1');
            return self::$_USERS = $s->lists();
        }else{
            return self::$_USERS;
        }
    }
    
    public static function s_getServerInst(){
        if(is_null(self::$_SERVER_INST))
            self::$_SERVER_INST = new ServerModel('server', 'zy_', 'DB_CONFIG1');
        return self::$_SERVER_INST;
    }

    public static function s_getUserInst(){
        if(is_null(self::$_USER_INST))
            self::$_USER_INST = new UserModel('user', 'zy_', 'DB_CONFIG1');
        return self::$_USER_INST;
    }
    
    protected function setSTR($key, $value, $b_assign = true) {
        $this -> _STR[$key] = $value;
        if ($b_assign) {
            $this -> assign($this -> _TPLSTR_NAME, $this -> _STR);

        }
    }

    /**
     * 跳转方法
     */
    public function jmp($path = '') {
        if (IS_GET && isset($_GET['p']))
            redirect('../' . $_GET['p']);
        else {
            redirect($_SERVER['HTTP_HOST'] . '/' . $path);
        }
    }

    public function verifylogin() {
        if (session('loginstatus') != 0)
            $this -> jmp("zybox/Index");
        else {
            $this -> jmp("zybox");
        }
    }

    public function ajaxconnect() {
        $obj['result'] = IS_GET && isset($_GET['name']) ? 1 : 0;
        $obj['str'] = self::s_getServerInst() -> getConnectionString($_GET['name']);
        session('connstr', $obj['str']);
        session('connname', $_GET['name']);
        $this -> ajaxReturn($obj);
    }

	/**
	 * 切换模块
	 */
    public function switchmodel($database, $tbl_prefix, $tbl) {
        // echo session('connname');
        // echo session('connstr');
        if (! self::s_getServerInst() -> isConnected(session('connname'))) {
            return false;
        }
        $model = M($tbl, $tbl_prefix, session('connstr') . $database);
        // var_dump($model);
        return $model;
    }

    /**
     * 列出模块
     */
    public function listmodel($database, $tbl_prefix, $tbl, $order, $bjson = false, $buriencode = false) {

        $Model = $this->switchmodel($database, $tbl_prefix, $tbl);
        $lists = array();
        if($Model != false){
            $lists = $Model->order($order)->select();
            // var_dump($Model);
            // var_dump($lists);
        }
        else {
            $this->setSTR('_INFO_TYPE', 'ERROR');
            $this->setSTR('_INFO_TITLE', '数据库错误!');
            $this->setSTR('_INFO_TEXT', '数据库连接错误，无法查询结果，请重新选择数据库连接。');
        }
        if($bjson)
            foreach($lists as $vo=>&$key)
            {
                if($buriencode)
                    $key['jsontxt'] = urlencode(json_encode($key));
                else
                    $key['jsontxt'] = json_encode($key);
                // var_dump(json_encode($key['jsontxt']));
            }
        $this->assign('lists', $lists);
    }
    
	/**
	 * 验证登陆，未登录跳转
	 */
    public function isLogin($jmpurl = '/Login'){
        if(session('loginstatus') != 1)
            $this->error('请先登录！', __ROOT__.$jmpurl, 2);
    }

}
