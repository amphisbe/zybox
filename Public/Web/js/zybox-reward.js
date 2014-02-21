$('#reward-list').datagrid({
    url: js_getEntry(_project_title, 'Reward', 'ajaxlist'),
    toolbar: '#toolbar',
    // rownumbers: 'true',
    fitColumns: 'true',
    singleSelect: 'true',
    pagination: 'true',
    	
    //events
    onDblClickRow: function(rowIndex, rowData){
    	$('#reward-list').datagrid('selectRow', rowIndex);
		var row = $('#reward-list').datagrid('getSelected');
		if (row) {
			$('#modifyrewardmodal').dialog('open').dialog('setTitle', '修改奖励信息');
			$('#modifyrewardform').form('load', row);
			// $('#modifyrewardform #guid').attr('readonly', true);
		}
    },
    
    onLoadError: function(){
    	//alert('记载失败，请刷新重试！');
    },
    
    columns:[[
        {field:'id',title:'奖励编号',width:20},
        {field:'content',title:'奖励内容',width:200},
        {field:'type',title:'奖励类型',width:30}
    ]]
});

function chooseitemlist_reward()
{
	item_content = $('#modifyrewardform #content').val();
	item_content_arr = item_content.split(',');
	guid_arr = new Array();
	for(var i = 0; i < item_content_arr.length; i++)
	{
		idx_0 = item_content_arr[i].indexOf('-');
		idx_1 = item_content_arr[i].indexOf(':');
		if(idx_0 == -1)
		{
			guid_arr.push(parseInt(item_content_arr[i].substr(0, idx_1)));
		}else
		{
			num_b = item_content_arr[i].substr(0, idx_0);
			num_e = item_content_arr[i].substr(idx_0 + 1, idx_1 - idx_0 - 1);
			for(var j = num_b; j <= num_e; j++)
				guid_arr.push(parseInt(j));
		}
	}
	
	//
	$('#itemlist-dlg').dialog('open');
	arr = $('#itemlist-simple').datagrid('getRows');
	var idx_e = 0;
	for(var i = idx_e; i < guid_arr.length; i++)
	{
		//$('#itemlist-simple').datagrid('selectRow', id_arr[i]);
		var guid = guid_arr[i];
		for(var j = 0; j < arr.length; j++)
		{
			if(parseInt(arr[j]) == guid)
			{
				idx_e += 1;
				alert(guid);
			}
		}
	}		
}
