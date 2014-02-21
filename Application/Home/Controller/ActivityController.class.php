<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class ActivityController extends BaseController {

	public function __construct() {

		parent::__construct();

		$this -> _STR['_SUBNAV_TITLE'] = '活动管理';
		$this -> _STR['_MODAL_TITLE'] = '活动修改';
	}

	public function index() {
		$this -> isLogin();
		$this -> _STR['_DISPATCH'] = 'INDEX';
		$this -> assign('TplStr', $this -> _STR);
		$this -> display();
	}
	
	public function info() {
		$this -> isLogin();
		$this -> _STR['_DISPATCH'] = 'INFO';
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
	
	/**
	 * ajax 获取活动数据
	 */
	public function ajaxlist() {
		$this -> isLogin();
		$msgmodel = $this -> switchmodel('platform', 'activity_collect_exchange_', 'Template');
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
	

	/**
	 * ajax 获取活动信息
	 */
	public function ajaxlistinfosimple() {
		$this -> isLogin();
		$msgmodel = $this -> switchmodel('platform', 'collect_exchange_info_', 'Template');
		$lists = array();
		if ($msgmodel != false)
		{
			$lists = $msgmodel -> select();
		}
		echo json_encode($lists);
	}
	
	/**
	 * ajax 获取活动信息
	 */
	public function ajaxlistinfo() {
		$this -> isLogin();
		$msgmodel = $this -> switchmodel('platform', 'collect_exchange_info_', 'Template');
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

	public function ajaxadd() {
		$this -> isLogin();
		$result['result'] = IS_POST ? 1 : 0;
		if(!IS_POST) return;

		//参数判断
		if(I('post.material1Param') == '0' || I('post.material1Param') <= 0)
		{
			$result['result'] = 0;
			$result['text'] = '未知的错误！';
			$this->ajaxReturn($result);
			return;
		}
		
		$addobj['name'] = I('post.name', '');
		$addobj['condition'] = I('post.condition');
		$addobj['maxCount'] = I('post.maxCount');
		
		$itemmodal = $this->switchmodel('world', 'item_', 'Template');
		if($itemmodal == false)
		{
			$result['result'] = 0;
			$result['text'] = '未知的错误！';
			$this->ajaxReturn($result);
			return;
		}else
		{
			$itemlist = $itemmodal -> where('guid='.I('post.material1Param').' OR guid='.I('post.material2Param').' OR guid='.I('post.material3Param').' OR guid='.I('post.resultParam')) -> select();
			$i = 1;
			$tmplist = array();
			foreach($itemlist as $vo=>&$key)
			{
				$tmplist[$key['guid']]['guid'] = $key['guid'];
				$tmplist[$key['guid']]['name'] = $key['name'];
				$tmplist[$key['guid']]['display_id'] = $key['display_id'];
			}
			while($i < 4)
			{
				$guid = I('post.material'.$i.'Param', '0');
				if(I('post.material'.$i.'Param', '0') != '0' && I('post.material'.$i.'Count', 0) > 0)
				{
					$addobj['material'.$i.'Name'] = $tmplist[$guid]['name'].'*'.I('post.material'.$i.'Count');
					$addobj['material'.$i.'DisplayId'] = $tmplist[$guid]['display_id'];
					$addobj['material'.$i.'Param'] = $tmplist[$guid]['guid'];
					$addobj['material'.$i.'Type'] = I('post.material'.$i.'Type');
				}
				$i++;
			}
			$resut_guid = I('post.resultParam', 0);
			$addobj['resultName'] = $tmplist[$resut_guid]['name'].'*'.I('post.resultCount', 0);
			$addobj['resultDisplayId'] = $tmplist[$resut_guid]['display_id'];
			$addobj['resultType'] = I('post.resultType', 0);
			$addobj['resultParam'] = $resut_guid;
			$addobj['resultCount'] = I('post.resultCount', 0);
		}
		
		if (IS_POST ) {
				
			$activity = $this -> switchmodel('platform', 'collect_exchange_info_', 'Template');
			if ($activity == false) {
				$result['result'] = 0;
				$result['text'] = '未知的错误！';
			} else {
				// 获取last id
				$obj = $activity -> order('guid desc') -> find();
				if ($obj != false && !is_null($obj)) {
					$addobj['guid'] = $obj['guid'] + 1;
					if ($activity -> add($addobj)) {
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

	public function ajaxmodify() {
		$this -> isLogin();
		$result['result'] = IS_POST ? 1 : 0;
		if(!IS_POST) return;

		
		//参数判断
		if(I('post.material1Param') == '0' || I('post.material1Param') <= 0)
		{
			$result['result'] = 0;
			$result['text'] = '未知的错误！';
			$this->ajaxReturn($result);
			return;
		}
		
		$addobj['name'] = I('post.name', '');
		$addobj['condition'] = I('post.condition');
		$addobj['maxCount'] = I('post.maxCount');
		
		$addobj['material1DisplayId'] = I('post.material1DisplayId');
		$addobj['material2DisplayId'] = I('post.material2DisplayId');
		$addobj['material3DisplayId'] = I('post.material3DisplayId');
		$addobj['resultDisplayId'] = I('post.resultDisplayId');
		
		$itemmodal = $this->switchmodel('world', 'item_', 'Template');
		if($itemmodal == false)
		{
			$result['result'] = 0;
			$result['text'] = '未知的错误！';
			$this->ajaxReturn($result);
			return;
		}else
		{
			$itemlist = $itemmodal -> where('guid='.I('post.material1Param').' OR guid='.I('post.material2Param').' OR guid='.I('post.material3Param').' OR guid='.I('post.resultParam')) -> select();
			$i = 1;
			$tmplist = array();
			foreach($itemlist as $vo=>&$key)
			{
				$tmplist[$key['guid']]['guid'] = $key['guid'];
				$tmplist[$key['guid']]['name'] = $key['name'];
				$tmplist[$key['guid']]['display_id'] = $key['display_id'];
			}
			while($i < 4)
			{
				$guid = I('post.material'.$i.'Param', '0');
				if(I('post.material'.$i.'Param', '0') != '0' && I('post.material'.$i.'Count', 0) > 0)
				{
					$addobj['material'.$i.'Name'] = $tmplist[$guid]['name'].'*'.I('post.material'.$i.'Count');
					// $addobj['material'.$i.'DisplayId'] = $tmplist[$guid]['display_id'];
					$addobj['material'.$i.'Param'] = $tmplist[$guid]['guid'];
					$addobj['material'.$i.'Type'] = I('post.material'.$i.'Type');
				}
				$i++;
			}
			$resut_guid = I('post.resultParam', 0);
			$addobj['resultName'] = $tmplist[$resut_guid]['name'].'*'.I('post.resultCount', 0);
			// $addobj['resultDisplayId'] = $tmplist[$resut_guid]['display_id'];
			$addobj['resultType'] = I('post.resultType', 0);
			$addobj['resultParam'] = $resut_guid;
			$addobj['resultCount'] = I('post.resultCount', 0);
		}
		
		if (IS_POST ) {
			$activity = $this -> switchmodel('platform', 'collect_exchange_info_', 'Template');
			if ($activity == false) {
				$result['result'] = 0;
				$result['text'] = '未知的错误！';
			} else {
				$addobj['guid'] = I('post.guid');
				if ($activity -> save($addobj)) {
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


	public function ajaxdel() {
		$this -> isLogin();
		$result['result'] = IS_POST ? 1 : 0;

		if (IS_POST) {
			$activity = $this -> switchmodel('platform', 'collect_exchange_info_', 'Template');
			if ($activity == false) {
				$result['result'] = 0;
				$result['text'] = '未知的错误！';
			} else {

				if ($activity ->where('guid='.I('post.guid')) -> delete()) {
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
