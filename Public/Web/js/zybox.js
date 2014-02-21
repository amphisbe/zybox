var _project_title = 'zybox';
function js_getEntry(Project, Model, Entry) {
	Entry = arguments[2] ? "/" + arguments[2] : "/index";
	var url = "http://" + location.host + "/" + Project + "/" + Model + Entry;
	return url;
}

var g_list_Server = {
	'm_list' : new Array(),
	'm_brefresh' : true,
	'GetListNum' : function() {
		if (Object.prototype.toString.call(this.m_list) == '[object Array]')
			return this.m_list.length;
		else
			return -1;
	},

	'AppendObject' : function(obj) {
		len = this.m_list.length;
		this.m_list.push(obj);
	},

	'Refresh' : function(bForce) {
		//服务器列表刷新
		var servers_txt = $.cookie('current_servers_txt');
		if (bForce || this.m_brefresh) {
			url = js_getEntry(_project_title, 'Index', 'ajaxservers');
			$.get(url, function(data) {

				if (Object.prototype.toString.call(data) == '[object Array]') {
					for ( i = 0; i < data.length; i++) {
						g_list_Server.AppendObject(data[i]);
						class_txt = "icon-blank";
						if (servers_txt == data[i].text)
							class_txt = "icon-ok";
						obj_a = $('<a class="li-server" data-value="' + data[i].name + '" data-id="' + data[i].text + '" href="#"><i class="' + class_txt + '"></i> ' + data[i].text + '</a>');
						obj_li = $('<li></li>');
						obj_li.append(obj_a);
						$('#servers').append(obj_li);
					}
				}
			});
			this.m_brefresh = false;
		}

	},
};

var g_list_Message = {
	'm_list' : new Array(),

	'GetListNum' : function() {
		if (Object.prototype.toString.call(this.m_list) == '[object Array]')
			return this.m_list.length;
		else
			return -1;
	},

	'AppendObject' : function(obj) {
		len = this.m_list.length;
		this.m_list.push(obj);
		//alert(this.m_list.length);
	},

	'LoadList' : function(arr) {
		if (Object.prototype.toString.call(arr) === '[object Array]') {
			for ( i = 0; i < arr.length; i++) {
				this.AppendObject(arr[i]);
			}
			return true;
		} else
			return false;
	},

	'Refresh' : function() {
		// clear list
		if (this.bforce) {
			this.Clear();
			url = js_getEntry(_project_title, 'Message', 'ajaxlist');
			$.get(url, function(data) {

				if (data == null)
					alert("获取消息模板失败！");
				else {
					if (Object.prototype.toString.call(data) === '[object Array]') {
						alert("获取" + data.length + "条模板消息！");
						g_list_Message.LoadList(data);
					} else
						alert("获取消息模板失败！");
				}
			});
		} else {
			if (this.GetListNum() <= 0) {
				alert("重新加载消息模板...");
				this.Clear();
				url = js_getEntry(_project_title, 'Message', 'ajaxlist');
				$.get(url, function(data) {
					if (data == null)
						alert("获取消息模板失败！");
					else {
						if (Object.prototype.toString.call(data) === '[object Array]') {
							g_list_Message.LoadList(data);
						} else
							alert("获取消息模板失败！");
					}
				});
			}
		}
	},

	'ExportToDOM' : function(obj) {
		//tbody
		row = $('<tr></tr>');
		for ( i = 0; i < 5; i++)
			obj.append(row);

	},

	'Clear' : function() {
		this.m_list = [];
	}
};

var i = 0;

function zybox_init() {
	//alert('zybox init function...');
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
    $('#modifyactivityform').form('clear');
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

