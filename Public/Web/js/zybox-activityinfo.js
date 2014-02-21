$('#activityinfo-list').datagrid({
    url: js_getEntry(_project_title, 'Activity', 'ajaxlistinfo'),
    toolbar: '#toolbar',
    rownumbers: 'true',
    fitColumns: 'true',
    singleSelect: 'true',
    pagination: 'true',
	// frozenColumns:[[  
        // {field:'ck',checkbox:true}  
    // ]], 
    //events
    onDblClickRow: function(rowIndex, rowData){
    	$('#activityinfo-list').datagrid('selectRow', rowIndex);
		var row = $('#activityinfo-list').datagrid('getSelected');
		if (row) {
			modifyactivityinfo();
			// $('#modifyactivitymodal').dialog('open').dialog('setTitle', '修改活动信息');
			// $('#modifyactivityform').form('load', row);
	 		// url = js_getEntry(_project_title, 'Activity', 'ajaxmodifyt');
		}
    },
    
    onLoadError: function(){
    	//alert('记载失败，请刷新重试！');
    },
    
    
    columns:[[
        {field:'guid',title:'编号',width:50},
        {field:'name',title:'名称',width:150},
        {field:'condition',title:'条件',width:80},
        {field:'maxCount',title:'条件最大值',width:80},
        {field:'material1Name',title:'材料1',width:150},
        {field:'material2Name',title:'材料2',width:150},
        {field:'material3Name',title:'材料3',width:150}
    ]],
        
		view: detailview,
		detailFormatter: function(rowIndex, rowData){
			img_url = js_getEntry(_project_title, 'Public', 'Web/assets/small/');
			
	    	$('#activityinfo-list').datagrid('selectRow', rowIndex);
			var row = $('#activityinfo-list').datagrid('getSelected');
			if (row) {
				var html_txt ='<table class="detailview-expand">' +	'<tr><td>材料：</td>';
				if(row.material1DisplayId)
					html_txt += '<td><img src="' + img_url + row.material1DisplayId + '.png" alt="' + row.material1Param + '" ></td>' +
								'<td>' + row.material1Name + '</td>';
				if(row.material2DisplayId)				
					html_txt += '<td><img src="' + img_url + row.material2DisplayId + '.png" alt="' + row.material2Param + '" ></td>' +
								'<td>' + row.material2Name + '</td>';
				if(row.material3DisplayId)
					html_txt += '<td><img src="' + img_url + row.material3DisplayId + '.png" alt="' + row.material3Param + '" ></td>' +
								'<td>' + row.material3Name + '</td>';
					html_txt += '</tr>' + 
							'<tr>' +
								'<td>结果：</td>' +
								'<td><img src="' + img_url + row.resultDisplayId + '.png" alt="' + row.resultParam + '"></td>' +
								'<td>' + row.resultName + '</td>' +
							'</tr>' + 
						'</table>';
				return html_txt;
			}else
				return null;
		}
});

var choose_material_id = null;
var choose_material_did = null;
$('.choose-image').click(function(e){
	$('#chooseitem-dlg').dialog('open');
	choose_material_id = $(this).attr('id');
});

$('.activityform-image').click(function(e){
	var src_txt = $(this).attr('image-src');
	
	if(choose_material_id != null)
	{
		$('#' + choose_material_id + ' img').attr('src', src_txt);
		$('#' + choose_material_id + ' img').attr('src-id', $(this).attr('id'));
	}
	
});

$('#modifyactivityinfomodal').dialog({
	maximizable: 'true'
	
});

$('#material1Param').change(function()
{
	name = $(this).find("option:selected").text();
	var txt = $('#material1Count').val();
	if(isNaN(txt))
	{
		$('#material1Count').focus();
		$('#material1Count').select();		
		return;
	}
	name += '*' + txt;
	$('#material1Name').val(name);
});

$('#material2Param').change(function()
{
	name = $(this).find("option:selected").text();
	var txt = $('#material2Count').val();
	if(isNaN(txt))
	{
		$('#material2Count').focus();
		$('#material2Count').select();		
		return;
	}
	name += '*' + txt;
	$('#material2Name').val(name);
});

$('#material3Param').change(function()
{
	name = $(this).find("option:selected").text();
	var txt = $('#material3Count').val();
	if(isNaN(txt))
	{
		$('#material3Count').focus();
		$('#material3Count').select();		
		return;
	}
	name += '*' + txt;
	$('#material3Name').val(name);
});

$('.validate-input').blur(function(){
	var txt = $(this).val();
	if(isNaN(txt))
	{
		$(this).focus();
		$(this).select();
		return;		
	}
	var obj_param = $(this).attr('ref-param');
	var txt_param = $(obj_param).find("option:selected").text();
	var obj_name = $(this).attr('ref-name');
	$(obj_name).val(txt_param + '*' + txt);
});

$('.validate-input').keydown(function(){
	var txt = $(this).val();
	if(isNaN(txt))
	{
		$(this).focus();
		$(this).select();
		return;		
	}
	var obj_param = $(this).attr('ref-param');
	var txt_param = $(obj_param).find("option:selected").text();
	var obj_name = $(this).attr('ref-name');
	$(obj_name).val(txt_param + '*' + txt);
});
/**
 * 修改活动模板信息 
 */
function modifyactivityinfo() {
	$('#modifyactivityinfomodal').dialog('open').dialog('setTitle', '新增活动模板信息');
	var row = $('#activityinfo-list').datagrid('getSelected');
	if (row) {
		$('#modifyactivityinfoform').form('clear');
		$('#modifyactivityinfoform').form('load', row);
		$('#modifyactivityinfomodal #modifyactivityinfoform #guid').attr("readonly", false);
		url = js_getEntry(_project_title, 'Item', 'ajaxlistsimple');
		$.post(url, function(data){
			
			objs = eval(data);
			$('form#modifyactivityinfoform #material1Param').append("<option value='0'>-- 元件选择 --</option>");
			$('form#modifyactivityinfoform #material2Param').append("<option value='0'>-- 元件选择 --</option>");
			$('form#modifyactivityinfoform #material3Param').append("<option value='0'>-- 元件选择 --</option>");
   		 	$('form#modifyactivityinfoform #resultParam').append("<option value='0'>-- 元件选择 --</option>");
			for(i = 0; i < objs.length; i++)
			{
				value = objs[i].guid;
				txt = objs[i].name;
				seltxt1 = objs[i].guid == row.material1Param ? 'selected="selected"' : '';
				seltxt2 = objs[i].guid == row.material2Param ? 'selected="selected"' : '';
				seltxt3 = objs[i].guid == row.material3Param ? 'selected="selected"' : '';
				seltxt4 = objs[i].guid == row.resultParam ? 'selected="selected"' : '';
				$('form#modifyactivityinfoform #material1Param').append("<option " + seltxt1 + " value='" + value + "'>" + txt + "</option>");
				$('form#modifyactivityinfoform #material2Param').append("<option " + seltxt2 + " value='" + value + "'>" + txt + "</option>");
				$('form#modifyactivityinfoform #material3Param').append("<option " + seltxt3 + " value='" + value + "'>" + txt + "</option>");
				$('form#modifyactivityinfoform #resultParam').append("<option " + seltxt4 + " value='" + value + "'>" + txt + "</option>");
			}
		});
		
		$("#material1Type option[value='" + row.material1Type + "']").attr("selected", "selected");
		$("#material2Type option[value='" + row.material2Type + "']").attr("selected", "selected");
		$("#material3Type option[value='" + row.material3Type + "']").attr("selected", "selected");
		$("#resultType option[value='" + row.resultType + "']").attr("selected", "selected");
		
		url = js_getEntry(_project_title, 'Activity', 'ajaxmodify');
	}
}
/**
 * 新增活动，空白表单 
 */
function addactivityinfoclear(){
	$('#modifyactivityinfomodal').dialog('open').dialog('setTitle','新增活动信息');
	$('#modifyactivityinfomodal #modifyactivityinfoform #guid').attr("readonly", false);
    $('#modifyactivityinfoform').form('clear');
    url = js_getEntry(_project_title, 'Item', 'ajaxlistsimple');
    $.post(url, function(data){
    	
    	$('form#modifyactivityinfoform #material1Param').append("<option value='0'>-- 元件选择 --</option>");
    	$('form#modifyactivityinfoform #material2Param').append("<option value='0'>-- 元件选择 --</option>");
    	$('form#modifyactivityinfoform #material3Param').append("<option value='0'>-- 元件选择 --</option>");
    	$('form#modifyactivityinfoform #resultParam').append("<option value='0'>-- 元件选择 --</option>");
    	objs = eval(data);
    	for(i = 0; i < objs.length; i++)
    	{
    		value = objs[i].guid;
    		txt = objs[i].name;
    		$('form#modifyactivityinfoform #material1Param').append("<option value='" + value + "'>" + txt + "</option>");
    		$('form#modifyactivityinfoform #material2Param').append("<option value='" + value + "'>" + txt + "</option>");
    		$('form#modifyactivityinfoform #material3Param').append("<option value='" + value + "'>" + txt + "</option>");
    		$('form#modifyactivityinfoform #resultParam').append("<option value='" + value + "'>" + txt + "</option>");
    	}
    });
    url = js_getEntry(_project_title, 'Activity', 'ajaxadd');
}

/**
 * 新增活动，以选中项为模板 
 */
function addactivityinfo(){
	$('#modifyactivityinfomodal').dialog('open').dialog('setTitle', '新增活动模板信息');
	var row = $('#activityinfo-list').datagrid('getSelected');
	if (row) {
		$('#modifyactivityinfoform').form('clear');
		$('#modifyactivityinfoform').form('load', row);
		$('#modifyactivityinfomodal #modifyactivityinfoform #guid').attr("readonly", false);
		url = js_getEntry(_project_title, 'Item', 'ajaxlistsimple');
		$.post(url, function(data){
			
			objs = eval(data);
			$('form#modifyactivityinfoform #material1Param').append("<option value='0'>-- 元件选择 --</option>");
			$('form#modifyactivityinfoform #material2Param').append("<option value='0'>-- 元件选择 --</option>");
			$('form#modifyactivityinfoform #material3Param').append("<option value='0'>-- 元件选择 --</option>");
   		 	$('form#modifyactivityinfoform #resultParam').append("<option value='0'>-- 元件选择 --</option>");
			for(i = 0; i < objs.length; i++)
			{
				value = objs[i].guid;
				txt = objs[i].name;
				seltxt1 = objs[i].guid == row.material1Param ? 'selected="selected"' : '';
				seltxt2 = objs[i].guid == row.material2Param ? 'selected="selected"' : '';
				seltxt3 = objs[i].guid == row.material3Param ? 'selected="selected"' : '';
				seltxt4 = objs[i].guid == row.resultParam ? 'selected="selected"' : '';
				$('form#modifyactivityinfoform #material1Param').append("<option " + seltxt1 + " value='" + value + "'>" + txt + "</option>");
				$('form#modifyactivityinfoform #material2Param').append("<option " + seltxt2 + " value='" + value + "'>" + txt + "</option>");
				$('form#modifyactivityinfoform #material3Param').append("<option " + seltxt3 + " value='" + value + "'>" + txt + "</option>");
				$('form#modifyactivityinfoform #resultParam').append("<option " + seltxt4 + " value='" + value + "'>" + txt + "</option>");
			}
		});
		
		$("#material1Type option[value='" + row.material1Type + "']").attr("selected", "selected");
		$("#material2Type option[value='" + row.material2Type + "']").attr("selected", "selected");
		$("#material3Type option[value='" + row.material3Type + "']").attr("selected", "selected");
		$("#resultType option[value='" + row.resultType + "']").attr("selected", "selected");
		
		url = js_getEntry(_project_title, 'Activity', 'ajaxadd');
	}
}
function delactivityinfo(){
	var row = $('#activityinfo-list').datagrid('getSelected');
	if (row) {
		$.messager.confirm('确认','是否确认删除本条活动记录？',function(r){
			if(r)
			{
    			url = js_getEntry(_project_title, 'Activity', 'ajaxdel');
				$.post(url, 
					{
						guid: row.guid
					}, 
					function(r){
						// var r = eval('(' + data + ')');
						if(r.result == '1')
						{
							$('#modifyactivityinfomodal').dialog('close');
							$('#activityinfo-list').datagrid('reload');
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
function saveactivityinfo(){
	
	$('#modifyactivityinfoform').form('submit',{
			url: url,
			onSubmit: function(){
				// alert('submit');
				$('#material1DisplayId').val($('#material1-image img').attr('src-id'));
				$('#material2DisplayId').val($('#material2-image img').attr('src-id'));
				$('#material3DisplayId').val($('#material3-image img').attr('src-id'));
				$('#resultDisplayId').val($('#material4-image'));
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

