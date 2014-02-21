<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class SkillController extends BaseController {
    
    public function __construct(){
        
        parent::__construct();
        
        $this->_STR['_SUBNAV_TITLE'] = '技能管理';
        $this->_STR['_MODAL_TITLE'] = '技能修改';
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
    
	/**
	 * ajax 获取活动数据
	 */
	public function ajaxlist() {
		$this -> isLogin();
		$msgmodel = $this -> switchmodel('world', 'skill_', 'Template');
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
	

}
