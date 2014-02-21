$('#activity-list').datagrid({
    url: js_getEntry(_project_title, 'Activity', 'ajaxlist'),
    toolbar: '#toolbar',
    // rownumbers: 'true',
    fitColumns: 'true',
    singleSelect: 'true',
    pagination: 'true',
    	
    //events
    onDblClickRow: function(rowIndex, rowData){
    	$('#activity-list').datagrid('selectRow', rowIndex);
		var row = $('#activity-list').datagrid('getSelected');
		if (row) {
			$('#modifyactivitymodal').dialog('open').dialog('setTitle', '修改活动模板信息');
			$('#modifyactivityform').form('load', row);
	 		url = js_getEntry(_project_title, 'Activity', 'ajaxmodifyt');
		}
    },
    
    onLoadError: function(){
    	alert('记载失败，请刷新重试！');
    },
    
    columns:[[
        {field:'activityId',title:'活动编号',width:20},
        {field:'titleName',title:'活动标题',width:50},
        {field:'activityName',title:'活动名称',width:50},
        {field:'startTime',title:'开始时间',width:40},
        {field:'endTime',title:'结束时间',width:40},
        {field:'type',title:'类型',width:10},
        {field:'description',title:'描述',width:80},
        {field:'list',title:'对应列表',width:50},
        {field:'orderId',title:'排序',width:50}
    ]]
});
$('#activityinfolist-dlg').dialog({
	title: '互动列表选择',
	width: 480,
	height: 800,
	closed: true,
	cache: false,
	modal: false
});
$('#activityinfolist-listsimple').datagrid({
    url: js_getEntry(_project_title, 'Activity', 'ajaxlistinfosimple'),
    fitColumns: 'true',
    // pagination: 'true',
	selectOnCheck: 'true',
	checkOnSelect: 'true',
    columns:[[
    	{field:'ck',checkbox:true }, 
        {field:'guid',title:'编号',width:20},
        {field:'name',title:'活动名称',width:50},
        {field:'material1Name',title:'材料1',width:50},
        {field:'material2Name',title:'材料2',width:50},
        {field:'material3Name',title:'材料3',width:50},
    ]],
    onCheck: function(rowIndex,rowData){
    	
    	arr = $('#activityinfolist-listsimple').datagrid('getChecked');
    	txt_list = $('#modifyactivityform input#list').val();
    	txt_new = '';
    	for(i = 0; i < arr.length - 1; i++)
    		txt_new += arr[i].guid + ',';
    	txt_new += arr[i].guid;
    	txt_list = $('#modifyactivityform input#list').val(txt_new);
    },
    onUncheck: function(rowIndex,rowData){
    	
    	arr = $('#activityinfolist-listsimple').datagrid('getChecked');
    	txt_list = $('#modifyactivityform input#list').val();
    	txt_new = '';
    	for(i = 0; i < arr.length - 1; i++)
    		txt_new += arr[i].guid + ',';
    	txt_new += arr[i].guid;
    	txt_list = $('#modifyactivityform input#list').val(txt_new);
    }
});
function chooseactivity()
{
	$('#activityinfolist-dlg').dialog('open');
	
	txt_list = $('#modifyactivityform input#list').val();
	arr_list = txt_list.split(',');
	for(i = 0; i < arr_list.length; i++)
		$('#activityinfolist-listsimple').datagrid('selectRow', parseInt(arr_list[i]) - 1);
}

/**
 * 修改活动模板信息 
 */
function modifyactivity() {
	var row = $('#activity-list').datagrid('getSelected');
	if (row) {
		$('#modifyactivitymodal').dialog('open').dialog('setTitle', '修改活动模板信息');
		$('#modifyactivityform').form('load', row);
 	   url = js_getEntry(_project_title, 'Activity', 'ajaxmodifyt');
	}
}

/**
 * 新增活动，空白表单 
 */
function addactivityclear(){
	$('#modifyactivitymodal').dialog('open').dialog('setTitle','新增活动模板信息');
	$('#modifyactivitymodal #modifyactivityform #activityId').attr("readonly", false);
    $('#modifyactivitymodal').form('clear');
    // url = 'save_user.php';
    url = js_getEntry(_project_title, 'Activity', 'ajaxaddt');
}

/**
 * 新增活动，以选中项为模板 
 */
function addactivity(){
	var row = $('#activity-list').datagrid('getSelected');
	if (row) {
		$('#modifyactivitymodal #modifyactivityform #activityId').attr("readonly", false);
		$('#modifyactivitymodal').dialog('open').dialog('setTitle', '新增活动模板信息');
		$('#modifyactivityform').form('load', row);
		//url = 'update_user.php?id=' + row.id;
    	url = js_getEntry(_project_title, 'Activity', 'ajaxaddt');
	}
}
function delactivity(){
	var row = $('#activity-list').datagrid('getSelected');
	if (row) {
		$.messager.confirm('确认','是否确认删除本条活动记录？',function(r){
			if(r)
			{
    			url = js_getEntry(_project_title, 'Activity', 'ajaxdelt');
				$.post(url, 
					{
						activityId: row.activityId
					}, 
					function(r){
						// var r = eval('(' + data + ')');
						if(r.result == '1')
						{
							$('#modifyactivitymodal').dialog('close');
							$('#activity-list').datagrid('reload');
						}else
						{
							$.messager.show({
								title: '提示',
								msg: r.text,
							});
						}
				});
			}
		});
	}
}

/**
 * 保存活动模板数据 
 */
function saveactivity(){
	
	$('#modifyactivityform').form('submit',{
			url: url,
			onSubmit: function(){
				// alert('submit');
			},
			success: function(data){
				var r = eval('(' + data + ')');
				if(r.result == '1')
				{
					$('#modifyactivitymodal').dialog('close');
					$('#activity-list').datagrid('reload');
				}else
				{
					$.messager.show({
						title: '提示',
						msg: r.text,
					});
				}
			}
		});
}

