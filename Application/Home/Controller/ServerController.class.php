<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class ServerController extends BaseController {
    
    public function __construct(){
        
        parent::__construct();
        
        $this->_STR['_SUBNAV_TITLE'] = '服务器管理';
        $this->_STR['_MODAL_TITLE'] = '服务器修改';
        
    }
    
    /* index */
    public function index() {
        
        $this->isLogin();
        $this->assign('TplStr', $this->_STR);
     
        //列表数据
        $lists = parent::s_getServers();
        foreach($lists as $vo=>&$key){
            $key['password'] = '';
            $key['jsontxt'] = json_encode($key);
        }
        $this->assign('lists', $lists);
        $this->display();
    }
    
    /* ajax 返回服务器信息 */
    public function getServerDetail() {
        $obj['result'] = IS_GET ? 1 : 0;
        
        if($obj['result'] == 1)
        {
            if(isset($_GET['id'])){
                $detail = D('Server')->lists('id asc', "id=".$_GET['id']);
                $obj['name'] = $detail[0]['name'];
                $obj['host'] = $detail[0]['host'];
                $obj['port'] = $detail[0]['port'];
                $obj['info'] = $detail[0]['text'];
                $obj['status'] = $detail[0]['status'];
            }
            else {
                $obj['result'] = 0;
            }
        }
        $this->ajaxReturn($obj);
    }
    
    /* 添加服务器 */
    public function add(){
        // var_dump($_POST);
        if(IS_POST && isset($_POST['servername']) && isset($_POST['serverhost']) && isset($_POST['serverport']) && isset($_POST['serverinfo']))
        {
            $addobj['name'] = $_POST['servername'];
            $addobj['host'] = $_POST['serverhost'];
            $addobj['port'] = $_POST['serverport'];
            $addobj['text'] = $_POST['serverinfo'];
            $addobj['status'] = $_POST['serverstatus'];
            $Board = M('Server');
            if($Board->add($addobj)) {
                $this->success("添加成功！");
            }else{
                $this->error("添加失败！");
            }
        }else{
            $this->error('参数错误！');
        }
    }
    
    /* 修改公告 */
    public function modify(){
        if(IS_POST && isset($_POST['servername']) && isset($_POST['serverhost']) && isset($_POST['serverport']) && isset($_POST['serverinfo']))
        {
            $addobj['name'] = $_POST['servername'];
            $addobj['host'] = $_POST['serverhost'];
            $addobj['port'] = $_POST['serverport'];
            $addobj['text'] = $_POST['serverinfo'];
            $addobj['status'] = $_POST['serverstatus'];
            $Board = M('Server');
            if($Board->where("id=".$_POST['serverid'])->save($addobj)) {
                $this->success("修改成功！");
            }else{
                $this->error("修改失败！");
            }
        }else{
            $this->error('参数错误！');
        }    
    }
    
    /* 公告排序 */
    public function sort(){
        if(IS_GET && isset($_GET['id']) && isset($_GET['sortid']) && isset($_GET['op']))
        {
            $Board = M('Board');
            if($_GET['op'] == 0) 
            {
                $Board->startTrans();
                $sortid = intval($_GET['sortid']);
                //下移
                $nextobj = $Board->where("sortid>".$sortid)->order("sortid asc")->select();
                if(count($nextobj) >= 1)
                {
                    $Board->where('id='.$nextobj[0]['id'])->setField('sortid', $sortid);
                    $Board->where('id='.$_GET['id'])->setField('sortid', $sortid + 1);
                    $Board->commit();
                    $this->success('下移成功！',null,10000);
                }else{
                    // 事务回滚
                    $Board->rollback(); 
                    $this->error('不可下移！', null,10000);
                }
                
            }else if($_GET['op'] == 1)
            {
                $Board->startTrans();
                $sortid = intval($_GET['sortid']);
                //上移
                $nextobj = $Board->where("sortid<".$sortid)->order("sortid desc")->select();
                if(count($nextobj) >= 1)
                {
                    $Board->where('id='.$nextobj[0]['id'])->setField('sortid', $sortid);
                    $Board->where('id='.$_GET['id'])->setField('sortid', $sortid - 1);
                    $Board->commit();
                    $this->success('上移成功！', null, 0);     
                }else{
                    // 事务回滚
                    $Board->rollback(); 
                    $this->error('不可上移！', null,10000);
                }
                
            }else{
                $this->error('操作参数错误！');
            }
            
            $Board->commit();
            // $detail = M('Board')->where("id=".$_GET['id'])->select();
            
        }else{
            $this->error('参数错误！');
        } 
        
    }

    /* ajax sort */
    public function ajaxsort(){
        $content = array();
        if(IS_GET && isset($_GET['id']) && isset($_GET['sortid']) && isset($_GET['op']))
        {
            $Board = M('Board');
            if($_GET['op'] == 0) 
            {
                $Board->startTrans();
                $sortid = intval($_GET['sortid']);
                //下移
                $nextobj = $Board->where("sortid>".$sortid)->order("sortid asc")->select();
                if(count($nextobj) >= 1)
                {
                    $Board->where('id='.$nextobj[0]['id'])->setField('sortid', $sortid);
                    $Board->where('id='.$_GET['id'])->setField('sortid', $sortid + 1);
                    $Board->commit();
                    $content['result'] = 1;
                }else{
                    // 事务回滚
                    $Board->rollback();
                    $content['result'] = 0;
                }
            }else if($_GET['op'] == 1)
            {
                $Board->startTrans();
                $sortid = intval($_GET['sortid']);
                //上移
                $nextobj = $Board->where("sortid<".$sortid)->order("sortid desc")->select();
                if(count($nextobj) >= 1)
                {
                    $Board->where('id='.$nextobj[0]['id'])->setField('sortid', $sortid);
                    $Board->where('id='.$_GET['id'])->setField('sortid', $sortid - 1);
                    $Board->commit();
                    $content['result'] = 1;
                }else{
                    // 事务回滚
                    $Board->rollback(); 
                    $content['result'] = 0;
                }
            }else{
                $content['result'] = 0;
            }
            
            $Board->commit();
            // $detail = M('Board')->where("id=".$_GET['id'])->select();
        }else{
            $content['result'] = 0;
        } 
        
        $this->ajaxReturn($content);
    }

    public function lists(){
        var_dump(1);
        var_dump($_GET);
    }
}
