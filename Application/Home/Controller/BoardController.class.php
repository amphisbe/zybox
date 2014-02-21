<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class BoardController extends BaseController {
    
    public function __construct(){
        
        parent::__construct();
        
        $this->_STR['_SUBNAV_TITLE'] = '公告板管理';
        $this->_STR['_MODAL_TITLE'] = '公告修改';
    }
    
    /* index */
    public function index() {

        $this->isLogin();
        
        $this->_STR['_DISPATCH'] = 'INDEX';
        $this->assign('TplStr', $this->_STR);
        
        $Model = $this->switchmodel('platform', 'bulletin_', 'Board_template');
        $lists = array();
        if($Model != false){
            $lists = $Model->order('isValid desc, priority asc')->select();
            // var_dump($Model);
            // var_dump($lists);
        }
        else {
            $this->setSTR('_INFO_TYPE', 'ERROR');
            $this->setSTR('_INFO_TITLE', '数据库错误!');
            $this->setSTR('_INFO_TEXT', '数据库连接错误，无法查询结果，请重新选择数据库连接。');
        }
        foreach($lists as $vo=>&$key)
        {
            $key['jsontxt'] = urlencode(json_encode($key));
            
            switch($key['type'])
            {
                case 1: $key['jmp'] = '征讨'; break;
                case 2: $key['jmp'] = '任务'; break;
                case 3: $key['jmp'] = '首页'; break;
                case 4: $key['jmp'] = '我的卡牌'; break;
                case 5: $key['jmp'] = '我的阵容'; break;
                case 6: $key['jmp'] = '强化'; break;
                case 7: $key['jmp'] = '商城-礼包'; break;
                case 8: $key['jmp'] = '商城-宝箱'; break;
                case 9: $key['jmp'] = '商城-道具'; break;
                case 10: $key['jmp'] = '夺宝'; break;
                case 11: $key['jmp'] = '消息'; break;
                case 12: $key['jmp'] = '活动'; break;
                case 13: $key['jmp'] = '充值'; break;
            }
        }
        $this->assign('lists', $lists);
        
        $this->display();
    }
    
    private function getBoardlist() {
        
        // var_dump($list);date('Y-m-d')
        $list = M('Board')->order('sortid asc')->select();
        foreach($list as $vo=>&$key)
        {
            $key['addtime'] = date('Y-m-d H:i:s', $key['addtime']);
        }
        return $list;
    }
    
    /* ajax 返回公告信息 */
    public function getBoardDetail() {
        $obj['result'] = IS_GET ? 1 : 0;
        
        if($obj['result'] == 1)
        {
            if(isset($_GET['id'])){
                $detail = M('Board')->where("id=".$_GET['id'])->select();
                $obj['title'] = $detail[0]['title'];
                $obj['content'] = $detail[0]['content'];
            }
            else {
                $obj['result'] = 0;
            }
        }
        $this->ajaxReturn($obj);
    }
    
    /* 添加公告 */
    public function add(){
        // var_dump($_POST);
        if(IS_POST && isset($_POST['boardtitle']) && isset($_POST['boardcontent']))
        {
            $addobj['title'] = $_POST['boardtitle'];
            $addobj['addtime'] = date('Y-m-d H:i:s', mktime());
            $addobj['content'] = $_POST['boardcontent'];
            $addobj['isValid'] = $_POST['boardselect'];
            $Board = $this->switchmodel('platform', 'bulletin_', 'Board_template');
            //$this->listmodel('platform', 'bulletin_', 'Board_template', 'isValid desc, priority asc', true, true);
            if($Board != false && $Board->add($addobj)) {
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
        if(IS_POST && isset($_POST['boardtitle']) && isset($_POST['boardcontent']) && isset($_POST['boardid']))
        {
           
            $addobj['title'] = $_POST['boardtitle'];
            $addobj['addtime'] = date('Y-m-d H:i:s', mktime());
            $addobj['content'] = $_POST['boardcontent'];
            $addobj['isValid'] = $_POST['boardselect'];
            $addobj['type'] = $_POST['jmpselect'];
            $Board = $this->switchmodel('platform', 'bulletin_', 'Board_template');
            //$this->listmodel('platform', 'bulletin_', 'Board_template', 'isValid desc, priority asc', true, true);
            
            if($Board != false && $Board->where("guid=".$_POST['boardid'])->save($addobj)) {
                $this->success("修改成功！");
            }else{
                // var_dump($Board);
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
        if(IS_GET && isset($_GET['guid0']) && isset($_GET['guid1']))
        {
            //$Board = M('Board');
            $Board = $this->switchmodel('platform', 'bulletin_', 'Board_template');
            if($Board != false) 
            {
                $Board->startTrans();
                $obj0 = $Board->where("guid=".$_GET['guid0'])->find();
                $obj1 = $Board->where("guid=".$_GET['guid1'])->find();
                
                if($obj0 != false && $obj1 != false && !is_null($obj0) && !is_null($obj1))
                {
                    $priority0 = $obj0['priority'];
                    $Board->where('guid='.$_GET['guid0'])->setField('priority', $obj1['priority']);
                    $Board->where('guid='.$_GET['guid1'])->setField('priority', $priority0);
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


}
