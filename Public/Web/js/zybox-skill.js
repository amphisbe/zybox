$('#skill-list').datagrid({
    url: js_getEntry(_project_title, 'Skill', 'ajaxlist'),
    toolbar: '#toolbar',
    // rownumbers: 'true',
    fitColumns: 'true',
    singleSelect: 'true',
    pagination: 'true',
    	
    //events
    onDblClickRow: function(rowIndex, rowData){
    	$('#skill-list').datagrid('selectRow', rowIndex);
		var row = $('#skill-list').datagrid('getSelected');
		if (row) {
			$('#modifyskillmodal').dialog('open').dialog('setTitle', '修改技能信息');
			$('#modifyskillform').form('load', row);
			$('#modifyskillform #guid').attr('readonly', true);
	 	   // url = js_getEntry(_project_title, 'Activity', 'ajaxmodifyt');
		}
    },
    
    onLoadError: function(){
    	//alert('记载失败，请刷新重试！');
    },
    
    columns:[[
        {field:'guid',title:'技能编号',width:20},
        {field:'name',title:'技能名称',width:50},
        {field:'type',title:'技能类型',width:20},
        {field:'param',title:'技能参数',width:50},
        {field:'percent',title:'百分比参数[percent]',width:40},
        {field:'value',title:'技能数值[value]',width:40},
        {field:'description',title:'描述',width:80},
        {field:'orderId',title:'排序',width:30}
    ]]
});


$('#skilllist-dlg').dialog({
	title: '技能列表选择',
	width: 800,
	height: 800,
	closed: true,
	cache: false,
	modal: false
});
$('#skilllist-simple').datagrid({
    url: js_getEntry(_project_title, 'Skill', 'ajaxlist'),
    fitColumns: 'true',
    // pagination: 'true',
    singleSelect: 'true',
	selectOnCheck: 'true',
	checkOnSelect: 'true',
    columns:[[
    	{field:'ck',checkbox:true }, 
        {field:'guid',title:'编号',width:30},
        {field:'name',title:'名称',width:40},
        {field:'param',title:'参数',width:80},
        {field:'description',title:'描述',width:200},
    ]],
    onCheck: function(rowIndex,rowData){
    	
    	arr = $('#skilllist-simple').datagrid('getChecked');
    	id = choosen_skill.id;
    	$('#skill_' + id + '_id').val(arr[0].guid);
    	$('#skill_' + id + '_descripation').val(arr[0].name + "：" + arr[0].description);
    	//skill_2_descripation
    	
    }
});

$('#group_id').change(function(){
	val = $(this).find("option:selected").val(); 
	txt = $(this).find("option:selected").attr('data-text'); 
	$('#group_name').val(txt);
	guid_txt = $('input#guid').val();
	$('input#guid').val(guid_txt.substr(0, 1) + val + guid_txt.substr(2, 4));
});
$('#item_class').change(function(){
	val = $(this).find("option:selected").attr('data-id');
	guid_txt = $('input#guid').val()
	$('input#guid').val(val + guid_txt.substr(1, 5));
});
$('#star').change(function(){
	star = 6 - parseInt($(this).find("option:selected").val()); 
	guid_txt = $('input#guid').val();
	$('input#guid').val(guid_txt.substr(0, 2) + val + guid_txt.substr(3, 2));
});

/**
 * 修改技能信息 
 */
function modifyskill() {
	var row = $('#skill-list').datagrid('getSelected');
	if (row) {
		$('#modifyskillmodal').dialog('open').dialog('setTitle', '修改技能信息');
		$('#modifyskillform').form('load', row);
		$('#modifyskillform #guid').attr('readonly', true);
 	   // url = js_getEntry(_project_title, 'Activity', 'ajaxmodifyt');
	}
}

/**
 * 新增技能信息 
 */
function addskill() {
	var row = $('#skill-list').datagrid('getSelected');
	if (row) {
		$('#modifyskillmodal').dialog('open').dialog('setTitle', '新增技能信息');
		$('#modifyskillform').form('load', row);
		$('#modifyskillform #guid').attr('readonly', true);
 	   // url = js_getEntry(_project_title, 'Activity', 'ajaxmodifyt');
	}
}

function addskillclear()
{
	$('#modifyskillmodal').dialog('open').dialog('setTitle', '新增技能信息');
	$('#modifyskillform #guid').attr('readonly', false);
}

function chooseskilllist(iptid)
{
	$('#skilllist-dlg').dialog('open');
	choosen_skill.id = iptid;
}

var choosen_skill = {
	'id': null,
};