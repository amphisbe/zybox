<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class MessageController extends BaseController {

    public function __construct() {

        parent::__construct();

        $this -> _STR['_SUBNAV_TITLE'] = '消息管理';
        $this -> _STR['_MODAL_TITLE'] = '消息修改';
    }

    /* index */
    public function tpllist() {

        $this -> isLogin();
        $this -> _STR['_DISPATCH'] = 'INDEX';

        $Message = $this -> switchmodel('platform', 'system_msg_', 'Template');

        $lists = array();
        if ($Message != false)
            $lists = $Message -> select();
        else {
            $this -> setSTR('_INFO_TYPE', 'ERROR');
            $this -> setSTR('_INFO_TITLE', '数据库错误!');
            $this -> setSTR('_INFO_TEXT', '数据库连接错误，无法查询结果，请重新选择数据库连接。');
        }

        foreach ($lists as $vo => &$key) {
            // $key['time'] = date("m-d-Y h:i:s", $key['time'] / 1000);
            $key['jsontxt'] = urlencode(json_encode($key));
        }
        $this -> assign('lists', $lists);

        $this -> assign('TplStr', $this -> _STR);
        $this -> display('index');
    }

    public function character() {
        $this -> isLogin();

        $this -> _STR['_DISPATCH'] = 'CHARACTER';
        $Message = $this -> switchmodel('characters', 'msg_', 'Instance');
        $lists = array();
        if ($Message == false) {
            $this -> setSTR('_INFO_TYPE', 'ERROR');
            $this -> setSTR('_INFO_TITLE', '数据库错误!');
            $this -> setSTR('_INFO_TEXT', '数据库连接错误，无法查询结果，请重新选择数据库连接。');
        } else {
            if (IS_GET && isset($_GET['guid'])) {
                //筛选
                // $lists = $Message -> where('charGuid = ' . $_GET['guid']) -> select();
                $sqlstr = 'select A.*, B.name from msg_instance as A, characters as B where A.charGuid = '
                        . $_GET['guid'] . ' AND '
                        .' A.charGuid = B.guid order by A.charGuid';
                $lists = $Message -> query($sqlstr);
                
                $this -> assign('CharId', $_GET['guid']);
                $this -> assign('CharName', $lists[0]['name']);
            } else {
                // 全部
                //$lists = $Message -> select();
                // $lists = $Message -> where('charGuid = ' . $_GET['guid']) -> select();
                $sqlstr = 'select A.*, B.name from msg_instance as A, characters as B where A.charGuid = B.guid order by A.charGuid';
                $lists = $Message -> query($sqlstr);
                // var_dump($lists);
            }
        }

        foreach ($lists as $vo => &$key) {
            $key['time'] = date("m-d-Y h:i:s", $key['time'] / 1000);
            $key['jsontxt'] = urlencode(json_encode($key));
        }
        $this -> assign('lists', $lists);

        $this -> assign('TplStr', $this -> _STR);
        $this -> display('index');
    }

    public function modify() {
        // var_dump($_POST);
        if (IS_POST && isset($_POST['ptype']) && isset($_POST['stype']) && isset($_POST['msgid'])) {

            $addobj['time'] = mktime() * 1000;
            $addobj['mainType'] = $_POST['ptype'];
            $addobj['subType'] = $_POST['stype'];
            $addobj['description'] = $_POST['msgcontent'];
            $Message = $this -> switchmodel('characters', 'msg_', 'Instance');

            if ($Message != false && $Message -> where("guid=" . $_POST['msgid']) -> save($addobj)) {
                $this -> success("修改成功！");
            } else {
                // var_dump($Board);
                $this -> error("修改失败！");
            }
        } else {
            $this -> error('参数错误！');
        }
    }

    public function add() {
        // var_dump($_POST);
        if (IS_POST && isset($_POST['ptype']) && isset($_POST['stype']) && isset($_POST['charid'])) {

            $addobj['charGuid'] = $_POST['charid'];
            $addobj['time'] = mktime() * 1000;
            $addobj['mainType'] = $_POST['ptype'];
            $addobj['subType'] = $_POST['stype'];
            $addobj['description'] = $_POST['msgcontent'];
            $Message = $this -> switchmodel('characters', 'msg_', 'Instance');

            if ($Message != false && $Message -> add($addobj)) {
                $this -> success("添加成功！");
            } else {
                // var_dump($Board);
                
                $this -> error("添加失败！");
            }
        } else {
            $this -> error('参数错误！');
        }
    }
    
    public function ajaxdel(){
        // var_dump('del function');
        // var_dump($_GET);
        $obj['result'] = IS_GET ? 1 : 0;
        if (IS_GET && isset($_GET['guid'])) {
            $Message = $this -> switchmodel('characters', 'msg_', 'Instance');

            if ($Message != false && $Message -> where('guid='.$_GET['guid']) -> delete()) {
                $obj['result'] = 1;
                $obj['text'] = '删除成功！';
            } else {
                $obj['result'] = 0;
                $obj['text'] = '删除失败！';
            }
        } else {
            $obj['result'] = 0;
            $obj['text'] = '参数错误！';
        }
        $this->ajaxReturn($obj);
    }

    public function modifyt() {
        // var_dump($_POST);
        if (IS_POST && isset($_POST['msgid'])) {

            $addobj['time'] = date('Y-m-d H:i:s', mktime());
            $addobj['description'] = $_POST['msgcontent'];
            $Message = $this -> switchmodel('platform', 'system_msg_', 'Template');

            if ($Message != false && $Message -> where("guid=" . $_POST['msgid']) -> save($addobj)) {
                $this -> success("修改成功！");
            } else {
                // var_dump($Board);
                $this -> error("修改失败！");
            }
        } else {
            $this -> error('参数错误！');
        }
    }

    /**
     * ajax 获取消息数据
     */
    public function ajaxlist() {
        $this -> isLogin();

        if (IS_GET) {
            // $msgmodel = $this -> switchmodel('characters', 'msg_', 'Instance');
            $msgmodel = $this -> switchmodel('platform', 'system_msg_', 'Template');
            // var_dump($msgmodel);
            $lists = array();
            if ($msgmodel != false)
                $lists = $msgmodel -> select();

            foreach ($lists as $vo => &$key) {
                $key['time'] = date("m-d-Y h:i:s", $key['time'] / 1000);
            }

            $this -> ajaxReturn($lists);

        } else {
            $this -> ajaxReturn(null);
        }
    }

    /**
     * 空白页面，用于Javascript数据加载
     */
    public function blank() {
        $this -> isLogin();
        $this -> _STR['_DISPATCH'] = 'INDEX';
        if (IS_GET && isset($_GET['t']) && isset($_GET['cc'])) {
            $this -> setSTR('_INFO_TYPE', 'SUCCESS');
            $this -> setSTR('_INFO_TITLE', $_GET['t']);
            $this -> setSTR('_INFO_TEXT', $_GET['cc']);
        }

        $this -> assign('TplStr', $this -> _STR);
        $this -> display('index');
    }

}
