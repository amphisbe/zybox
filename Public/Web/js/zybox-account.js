$('#account-list').datagrid({
    url: js_getEntry(_project_title, 'Account', 'ajaxaccountlist'),
    toolbar: '#toolbar',
    // rownumbers: 'true',
    fitColumns: 'true',
    singleSelect: 'true',
    pagination: 'true',
    	
    //events
    // onDblClickRow: function(rowIndex, rowData){
    	// $('#activity-list').datagrid('selectRow', rowIndex);
		// var row = $('#activity-list').datagrid('getSelected');
		// if (row) {
			// $('#modifyactivitymodal').dialog('open').dialog('setTitle', '修改活动模板信息');
			// $('#modifyactivityform').form('load', row);
	 		// url = js_getEntry(_project_title, 'Activity', 'ajaxmodifyt');
		// }
    // },
    
    onLoadError: function(){
    	alert('记载失败，请刷新重试！');
    },
    
    columns:[[
        {field:'id',title:'用户编号',width:20},
        {field:'userName',title:'账号名称',width:40},
        {field:'joinDate',title:'注册日期',width:40},
        {field:'lastIP',title:'最后登录 IP',width:40},
        {field:'lastLoginDate',title:'最后登录时间',width:80},
        {field:'platform',title:'所在平台',width:80},
        {field:'phoneNumber',title:'手机号码',width:50}
    ]]
});
$('#character-list').datagrid({
    url: js_getEntry(_project_title, 'Account', 'ajaxcharacterlist'),
    toolbar: '#toolbar',
    // rownumbers: 'true',
    fitColumns: 'true',
    singleSelect: 'true',
    pagination: 'true',
    	
    //events
        
    onClickRow: function(rowIndex, rowData){
    	$('#character-list').datagrid('selectRow', rowIndex);
    	var row = $('#character-list').datagrid('selectRow', rowIndex);
    	if(row)
    	{
    		
    	}
    	
    },
    onDblClickRow: function(rowIndex, rowData){
    	$('#character-list').datagrid('selectRow', rowIndex);
    	// var row = $('#account-list').datagrid('selectRow', rowIndex);
    	var obj = $('#character-list').datagrid('getSelected');
		// var txt = $(this).attr('data-value');
		// var obj = eval("[" + txt + "]")[0];
		var txt = ""
		        + "<p>" + "<b>账号：</b>"   + obj.account_id + "</p>"
		        + "<p>" + "<b>头像：</b>"   + obj.displayId + "</p>"
		        + "<p>" + "<b>攻击力：</b>" + obj.armor + "</p>"
		        + "<p>" + "<b>伤害：</b>"   + obj.damage + "</p>"
		        + "<p>" + "<b>联盟：</b>"   + "[" + obj.legionId + "] " + obj.legionName + "</p>"
		        + "<p>" + "<b>体力值：</b>" + obj.sp + "/" + obj.maxSp + "[+" + obj.epPercent + "]" 
		        + "<p>" + "<b>下次回复：</b>" + new Date(parseInt(obj.epSecond)).toLocaleString() + "]</p>"
		        + "<p>" + "<b>精力值：</b>" + obj.ep + "/" + obj.maxEp + "[+" + obj.spPercent + "]"
		        + "<p>" + "<b>下次回复：</b>" + new Date(parseInt(obj.spSecond)).toLocaleString() + "]</p>"
		        + "<p>" + "<b>经验值：</b>"   + obj.xp + "/" + obj.nextxp + "</p>"
		        + "<p>" + "<b>英雄攻击：</b>" + obj.heroArmorMin + "~" + obj.heroArmorMax + "</p>"
		        + "<p>" + "<b>英雄伤害：</b>" + obj.heroDamageMin + "~" + obj.heroDamageMax + "</p>"
		        + "<p>" + "<b>EP/SP回复间隔：</b>" + obj.epRestorePP + "/" + obj.spRestorePP + "</p>"
		        + "<p>" + "<b>卡牌数量：</b>" + obj.cardCount + "/" + obj.maxCardCount + "</p>"
		        + "<p>" + "<b>免战：</b>"    + obj.avoidTotalTime + "      T[" + obj.avoidWarTime + "]" + "</p>"
		        + "<p>" + "<b>进攻记录：</b>" + obj.attackWinCount + "/" + obj.attackTotalCount + "，进攻收入：$" + obj.attackWinMoney + "##" + obj.attackWinItem + "</p>"
		        + "<p>" + "<b>防守记录：</b>" + obj.defenceWinCount + "/" + obj.defenceTotalCount + "，防守收入：" + obj.defenceWinMoney + "</p>"
		        + "<p>" + "<b>引导标记：</b>" + obj.guideFlag + "</p>";
        $('#characterdiv #htxt').text(obj.name);
		$('#characterdiv #info').html(
			txt
		);
		var attr = $('#characterdiv #grayscale').attr('path');
		attr += obj.displayId + ".png";
		$('#characterdiv #grayscale').attr('src', attr);

    },
    // onDblClickRow: function(rowIndex, rowData){
    	// $('#activity-list').datagrid('selectRow', rowIndex);
		// var row = $('#activity-list').datagrid('getSelected');
		// if (row) {
			// $('#modifyactivitymodal').dialog('open').dialog('setTitle', '修改活动模板信息');
			// $('#modifyactivityform').form('load', row);
	 		// url = js_getEntry(_project_title, 'Activity', 'ajaxmodifyt');
		// }
    // },
    
    onLoadError: function(){
    	alert('记载失败，请刷新重试！');
    },
    
    columns:[[
        {field:'account_id',title:'账号',width:40},
        {field:'name',title:'角色名称',width:60},
        {field:'vipLevel',title:'VIP等级',width:40},
        {field:'vm',title:'金币',width:40},
        {field:'rm',title:'元宝',width:80},
        {field:'level',title:'玩家等级',width:80},
        {field:'xp',title:'经验值',width:50},
        {field:'jsontxt',title:'数据',width:50}
    ]]
});

//修改信息
$('.btn-modifycharacter').live('click', function(e){
	
	// var txt = $(this).attr('data-value');
	// var obj = eval("[" + txt + "]")[0];
// 	
	// $('#modifycharacter').modal('show');
	// $('form#modifycharform #guid').val(obj.guid);
	// $('form#modifycharform #name').val(obj.name);
	// $('form#modifycharform #vip').val(obj.vipLevel);
	// $('form#modifycharform #money').val(obj.vm);
	// $('form#modifycharform #rmb').val(obj.rm);
	// $('form#modifycharform #level').val(obj.level);
	// $('form#modifycharform #exp').val(obj.xp);
	// $('form#modifycharform #ep').val(obj.ep);
	// $('form#modifycharform #ep-max').text(obj.maxEp);
	// $('form#modifycharform #sp').val(obj.sp);
	// $('form#modifycharform #sp-max').text(obj.maxSp);
	$('#modifycharacter').modal('show');
	var row = $('#character-list').datagrid('getSelected');
	$('#modifycharform').form('load', row);
});
