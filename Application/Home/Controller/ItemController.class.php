<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class ItemController extends BaseController {

	public function __construct() {

		parent::__construct();

		$this -> _STR['_SUBNAV_TITLE'] = '元件管理';
		$this -> _STR['_MODAL_TITLE'] = '元件管理';
	}

	public function index() {
		$this -> isLogin();
		$this -> _STR['_DISPATCH'] = 'INDEX';
		$this -> assign('TplStr', $this -> _STR);
		$this -> display();
	}
	
	public function add() {
		$this -> isLogin();
		$this -> setSTR('_MODAL_TITLE', '卡牌添加');
		$this -> _STR['_DISPATCH'] = 'ADD';
		$this -> assign('TplStr', $this -> _STR);
		
		$itemmodal = $this -> switchmodel('world', 'item_', 'Template');
		if ($itemmodal != false)
		{
			$lists = $itemmodal -> distinct(true)->getField('LEFT(display_id, 1)');
		}
		foreach($lists as $vo=>&$key)
		{
			$key['rows'] = array();
		}
		$list_all = $itemmodal -> query("select display_id, guid, name title from item_template group by display_id");
		
		foreach($list_all as $vo=>&$key)
		{
			$c = substr($key['display_id'], 0, 1);
			array_push($lists[$c]['rows'], $key);
		}
		$this -> assign('lists', $lists);


		$this -> display('index');
	}
	
	public function additem()
	{
		$this->isLogin();
		$guid = I('get.guid');
		// if(isset($guid))
			// echo substr($guid, 0, 3);
		
		$item_tpl = $this -> switchmodel('world', 'item_', 'Template');
		$obj = $item_tpl -> where('guid like "' . substr($guid, 0, 3) . '%"') -> order('guid desc') -> limit(1) -> find();
		$guid = is_null($obj) ? substr($guid, 0, 3).'01' : intval($obj['guid']) + 1;
		
		$addobj['guid'] = $guid;
		$addobj['display_id'] = I('get.display_id');
		$addobj['name'] = I('get.name');
		if($addobj['name'] == '')
			$addobj['name'] =  '未命名的卡牌';
		$addobj['level'] = I('get.level');
		$addobj['description'] = I('get.description');
		$addobj['price'] = I('get.price');
		$addobj['group_id'] = I('get.group_id');
		$addobj['group_name'] = I('get.group_name');
		$addobj['item_class'] = I('get.item_class');
		
		$addobj['damage_min'] = I('get.damage_min');
		$addobj['damage_max'] = I('get.damage_max');
		$addobj['armor_min'] = I('get.armor_min');
		$addobj['armor_max'] = I('get.armor_max');
		$addobj['xp_value'] = I('get.xp_value');
		$addobj['xp_percent'] = I('get.xp_percent');
		$addobj['rm_value'] = I('get.rm_value');
		$addobj['rm_percent'] = I('get.rm_percent');
		$addobj['vm_value'] = I('get.vm_value');
		$addobj['vm_percent'] = I('get.vm_percent');
		
		$addobj['ep_percent'] = I('get.ep_percent');
		$addobj['sp_percent'] = I('get.sp_percent');
		
		$addobj['max_attack_percent'] = I('get.max_attack_percent');
		$addobj['max_defence_percent'] = I('get.max_defence_percent');
		$addobj['attack_min_percent'] = I('get.attack_max_percent');
		$addobj['defence_min_percent'] = I('get.defence_max_percent');
		
		$addobj['star'] = I('get.star');
		$addobj['correct'] = I('get.correct');
		$addobj['next_rebirth_id'] = I('get.next_rebirth_id');
		$addobj['next_rebirth_text'] = I('get.next_rebirth_text');
		$addobj['skill_1_id'] = I('get.skill_1_id');
		$addobj['skill_1_descripation'] = I('get.skill_1_descripation');
		$addobj['skill_2_id'] = I('get.skill_2_id');
		$addobj['skill_2_descripation'] = I('get.skill_2_descripation');
		$addobj['skill_3_id'] = I('get.skill_3_id');
		$addobj['skill_3_descripation'] = I('get.skill_3_descripation');
		$addobj['skill_4_id'] = I('get.skill_4_id');
		$addobj['skill_4_descripation'] = I('get.skill_4_descripation');
		$addobj['skill_5_id'] = I('get.skill_5_id');
		$addobj['skill_5_descripation'] = I('get.skill_5_descripation');
		$addobj['skill_6_id'] = 0;
		$addobj['skill_6_descripation'] = 0;
		$addobj['is_max_level'] = 0;
		$addobj['useType'] = 0;
		$addobj['useParam1'] = 0;
		$addobj['useParam2'] = 0;
		

		if ($item_tpl -> add($addobj)) {
			// $result['result'] = 1;
			// $result['text'] = '卡牌【' . $addobj['name'] . '】添加成功！';
			$this->success('卡牌【' . $addobj['name'] . '】添加成功！', null, 9999);
		} else {
			// $result['result'] = 0;
			// $result['text'] = '卡牌【' . $addobj['name'] . '】添加失败！';
			$this->error('卡牌【' . $addobj['name'] . '】添加失败！');
		}
				
	}
	
	public function ajaxstartlist()
	{
		$this->isLogin();
		$this -> _STR['_DISPATCH'] = 'GALLERYTAB';
		$itemmodal = $this -> switchmodel('world', 'item_', 'Template');
		if ($itemmodal != false)
		{
			// $lists = $itemmodal -> query("select distinct LEFT(display_id, 1) as title from item_template");
			$lists = $itemmodal -> distinct(true)->getField('LEFT(display_id, 1)');
		}
		foreach($lists as $vo=>&$key)
		{
			// print_r($key['display_id']);
			$key['rows'] = array();
		}
		// $list_all = $itemmodal -> distinct(true) -> getField('guid, display_id, name');
		$list_all = $itemmodal -> query("select display_id, guid, name title from item_template group by display_id");
		
		foreach($list_all as $vo=>&$key)
		{
			// print_r($key['display_id']);
			$c = substr($key['display_id'], 0, 1);
			// print_r($c);
			array_push($lists[$c]['rows'], $key);
		}
		// dump($lists);
		// $this -> assign('lists', $lists);
		// $this -> assign('TplStr', $this -> _STR);
		// $this -> display('index');
		echo json_encode($lists);
	}
	
	public function gallery() {
		$this->isLogin();
		$this -> _STR['_DISPATCH'] = 'GALLERY';
		$itemmodal = $this -> switchmodel('world', 'item_', 'Template');
		$lists = array();
		if ($itemmodal != false)
		{
			$lists = $itemmodal -> getField('guid, display_id, name');
		}
		// var_dump($lists);
		$this -> assign('lists', $lists);
		$this -> assign('TplStr', $this -> _STR);
		$this -> display('index');
	}

	/**
	 * ajax 获取活动数据
	 */
	public function ajaxlist() {
		$this -> isLogin();
		$itemmodal = $this -> switchmodel('world', 'item_', 'Template');
		$lists = array();
		$obj = array();
		if ($itemmodal != false)
		{
			$lists = $itemmodal -> select();
			$obj['total'] = count($lists);
			if(isset($_POST['page']))
				$lists = $itemmodal -> page(I('post.page'), I('post.rows')) -> select();
		}
		$obj['rows'] = $lists;
		echo json_encode($obj);
	}
	/**
	 * ajax 获取活动数据
	 */
	public function ajaxlistsimple() {
		$this -> isLogin();
		$itemmodal = $this -> switchmodel('world', 'item_', 'Template');
		$lists = array();
		if ($itemmodal != false)
		{
			$lists = $itemmodal -> select();
		}
		echo json_encode($lists);
	}
	
	public function ajaxaddt() {
		$this -> isLogin();
		$result['result'] = IS_POST ? 1 : 0;

		if (IS_POST) {
			$activity_tpl = $this -> switchmodel('platform', 'activity_collect_exchange_', 'Template');
			if ($activity_tpl == false) {
				$result['result'] = 0;
				$result['text'] = '未知的错误！';
			} else {
				// 获取last id
				$obj = $activity_tpl -> order('guid desc') -> find();
				if ($obj != false && !is_null($obj)) {
					$addobj['guid'] = $obj['guid'] + 1;
					$addobj['activityId'] = $obj['activityId'] + 1;
					$addobj['titleName'] = I('post.titleName', '');
					$addobj['activityName'] = I('post.activityName', '');
					$addobj['startTime'] = I('post.startTime', '');
					$addobj['endTime'] = I('post.endTime');
					$addobj['type'] = I('post.type');
					$addobj['description'] = I('post.description', '');
					$addobj['list'] = I('post.list', '');
					$addobj['orderId'] = I('post.orderId', '0');

					if ($activity_tpl -> add($addobj)) {
						$result['result'] = 1;
						$result['text'] = '活动【' . $addobj['titleName'] . '】添加成功！';
					} else {
						$result['result'] = 0;
						$result['text'] = '活动【' . $addobj['titleName'] . '】添加失败！';
					}
				} else {
					$result['result'] = -1;
					$result['text'] = '未知的错误！';
				}
			}
		}
		$this->ajaxReturn($result);
	}

	public function ajaxmodifyt() {
		$this -> isLogin();
		$result['result'] = IS_POST ? 1 : 0;

		if (IS_POST) {
			$activity_tpl = $this -> switchmodel('platform', 'activity_collect_exchange_', 'Template');
			if ($activity_tpl == false) {
				$result['result'] = 0;
				$result['text'] = '未知的错误！';
			} else {
				$addobj['titleName'] = I('post.titleName', '');
				$addobj['activityName'] = I('post.activityName', '');
				$addobj['startTime'] = I('post.startTime', '');
				$addobj['endTime'] = I('post.endTime');
				$addobj['type'] = I('post.type');
				$addobj['description'] = I('post.description', '');
				$addobj['list'] = I('post.list', '');
				$addobj['orderId'] = I('post.orderId', '0');

				if ($activity_tpl ->where('activityId='.I('post.activityId')) -> save($addobj)) {
					$result['result'] = 1;
					$result['text'] = '活动【' . $addobj['titleName'] . '】修改成功！';
				} else {
					$result['result'] = 0;
					$result['text'] = '活动【' . $addobj['titleName'] . '】修改失败！';
				}
			}
		}
		$this->ajaxReturn($result);
	}


	public function ajaxdelt() {
		$this -> isLogin();
		$result['result'] = IS_POST ? 1 : 0;

		if (IS_POST) {
			$activity_tpl = $this -> switchmodel('platform', 'activity_collect_exchange_', 'Template');
			if ($activity_tpl == false) {
				$result['result'] = 0;
				$result['text'] = '未知的错误！';
			} else {

				if ($activity_tpl ->where('activityId='.I('post.activityId')) -> delete()) {
					$result['result'] = 1;
					$result['text'] = '活动【' . $addobj['titleName'] . '】删除成功！';
				} else {
					$result['result'] = 0;
					$result['text'] = '活动【' . $addobj['titleName'] . '】删除失败！';
				}
			}
		}
		$this->ajaxReturn($result);
	}
}
