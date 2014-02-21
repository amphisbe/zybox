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
