$('#item-list').datagrid({
    url: js_getEntry(_project_title, 'Item', 'ajaxlist'),
    toolbar: '#toolbar',
    // rownumbers: 'true',
    fitColumns: 'true',
    singleSelect: 'true',
    pagination: 'true',
    	
    columns:[[
        {field:'guid',title:'元件编号',width:20},
        {field:'display_id',title:'元件显示编号',width:50},
        {field:'name',title:'元件名称',width:50},
        {field:'description',title:'元件描述',width:200},
    ]],

    onLoadError: function(){
    	alert('记载失败，请刷新重试！');
    },
    
      
	view: detailview,
	detailFormatter: function(rowIndex, rowData){
		img_url = js_getEntry(_project_title, 'Public', 'Web/assets/small/');
		
    	$('#item-list').datagrid('selectRow', rowIndex);
		var row = $('#item-list').datagrid('getSelected');
		if (row) {
			var html_txt ='<table class="detailview-expand">' +	'<tr><td>图标：</td>';
				html_txt += '<td><img src="' + img_url + row.display_id + '.png" alt="' + row.display_id + '" ></td>' +
						'</tr>' + 
					'</table>';
			return html_txt;
		}else
			return null;
	}
 
});


/**
 * 修改活动模板信息 
 */
function modifyitem() {
	// var row = $('#item-list').datagrid('getSelected');
	// if (row) {
		// $('#modifyitemmodal').dialog('open').dialog('setTitle', '修改活动模板信息');
		// $('#modifyitemform').form('load', row);
 	   // url = js_getEntry(_project_title, 'Activity', 'ajaxmodifyt');
	// }
}

/**
 * 新增活动，空白表单 
 */
function additemclear(){
	// $('#modifyitemmodal').dialog('open').dialog('setTitle','新增活动模板信息');
	// $('#modifyitemmodal #modifyitemform #itemId').attr("readonly", false);
    // $('#modifyitemform').form('clear');
    // // url = 'save_user.php';
    // url = js_getEntry(_project_title, 'Activity', 'ajaxaddt');
}

/**
 * 新增活动，以选中项为模板 
 */
function additem(){
	// var row = $('#item-list').datagrid('getSelected');
	// if (row) {
		// $('#modifyitemmodal #modifyitemform #itemId').attr("readonly", false);
		// $('#modifyitemmodal').dialog('open').dialog('setTitle', '新增活动模板信息');
		// $('#modifyitemform').form('load', row);
		// //url = 'update_user.php?id=' + row.id;
    	// url = js_getEntry(_project_title, 'Activity', 'ajaxaddt');
	// }
}
function delitem(){
	// var row = $('#item-list').datagrid('getSelected');
	// if (row) {
		// $.messager.confirm('确认','是否确认删除本条活动记录？',function(r){
			// if(r)
			// {
    			// url = js_getEntry(_project_title, 'Activity', 'ajaxdelt');
				// $.post(url, 
					// {
						// itemId: row.itemId
					// }, 
					// function(r){
						// // var r = eval('(' + data + ')');
						// if(r.result == '1')
						// {
							// $('#modifyitemmodal').dialog('close');
							// $('#item-list').datagrid('reload');
						// }else
						// {
							// $.messager.show({
								// title: '提示',
								// msg: r.text,
							// });
						// }
				// });
			// }
		// });
	// }
}

/**
 * 保存活动模板数据 
 */
function saveitem(){
// 	
	// $('#modifyitemform').form('submit',{
			// url: url,
			// onSubmit: function(){
				// // alert('submit');
			// },
			// success: function(data){
				// var r = eval('(' + data + ')');
				// if(r.result == '1')
				// {
					// $('#modifyitemmodal').dialog('close');
					// $('#item-list').datagrid('reload');
				// }else
				// {
					// $.messager.show({
						// title: '提示',
						// msg: r.text,
					// });
				// }
			// }
		// });
}

