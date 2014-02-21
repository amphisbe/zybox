
function chooseitem()
{
	$('#chooseitem-dlg').dialog('open');
	
	// txt_list = $('#modifyactivityform input#list').val();
	// arr_list = txt_list.split(',');
	// for(i = 0; i < arr_list.length; i++)
		// $('#activityinfolist-listsimple').datagrid('selectRow', parseInt(arr_list[i]) - 1);
}

$('#chooseitem-dlg').dialog({
	title: '元件选择',
	width: 700,
	height: 420,
	closed: true,
	cache: false,
	modal: false
});

$('.thumbnail').live('click', function(e){
	e.preventDefault();
	
	if($(this).hasClass("redborder"))
		$(this).removeClass("redborder");
	else
	{
		if(choosen_obj.obj_id != null)
			$('#'+choosen_obj.obj_id).removeClass("redborder");
		$(this).addClass("redborder");
		choosen_obj.obj_id = $(this).attr('id');
		choosen_obj.guid = $(this).attr('data-guid');
	}
		
	$("input#diplay_id").val(choosen_obj.guid);
});

var choosen_obj = {
	'obj_id': null,
	'guid': null,
};
