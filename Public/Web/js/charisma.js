$(document).ready(function(){
	//themes, change CSS with JS
	//default theme(CSS) is cerulean, change it if needed
	
	$.cookie('project_title', _project_title, {expires:365});
	
	
	var current_theme = $.cookie('current_theme')==null ? 'cerulean' :$.cookie('current_theme');
	switch_theme(current_theme);
	
	//ajax menu checkbox
	$.cookie('is-ajax',$(this).prop('checked'),{expires:365});
	$('#is-ajax').prop('checked',$.cookie('is-ajax')==='true' ? true : false);
	

/*****************************************************************************
 * javascript 加载个人消息数据失败 
 *
	function set_loadframe(bOpen){
		if(bOpen)
			$('#loadframe').modal('show');
		else
			$('#loadframe').modal('hide');
	}
	$('#character-msg').live('click', function(e){
		e.preventDefault();
		g_list_Message.m_bloading = true;
		set_loadframe(true);
		//g_list_Message.LoadList();
		url = js_getEntry(_project_title, 'Message', 'ajaxlist');
		$.get(url,  
		function(data){
			i = 0;
			g_list_Message.Clear();
			
			bret = g_list_Message.LoadList(data);
			if(!bret)
				alert('个人消息加载失败! ');
			else
			{
				g_list_Message.m_bloading = false;
				set_loadframe(false);
				//alert('已加载' + g_list_Message.GetListNum() + '条个人消息！');
				url = js_getEntry(_project_title, 'Message', 'blank?t=提示：&cc=已记载' + g_list_Message.GetListNum() + '条个人消息！');
				location.href = url;
				
			}
		});
	});
	
	// g_list_Message.ExportToDOM();
	for(i = 0; i < 5; i++)
		$('#fieldset-msg').append($(''<tr></tr>''));
			
	$('#loadframe').on('hidden', function(){
		if(g_list_Message.m_bloading)
			alert('数据未加载完成...');
	});
*/
	//服务器列表刷新
	g_list_Server.Refresh(false);
	
	//修改信息
	$('.btn-modifycharacter').live('click', function(e){
		
		var txt = $(this).attr('data-value');
		var obj = eval("[" + txt + "]")[0];
		
		$('#modifycharacter').modal('show');
		$('form#modifycharform #guid').val(obj.guid);
		$('form#modifycharform #name').val(obj.name);
		$('form#modifycharform #vip').val(obj.vipLevel);
		$('form#modifycharform #money').val(obj.vm);
		$('form#modifycharform #rmb').val(obj.rm);
		$('form#modifycharform #level').val(obj.level);
		$('form#modifycharform #exp').val(obj.xp);
		$('form#modifycharform #ep').val(obj.ep);
		$('form#modifycharform #ep-max').text(obj.maxEp);
		$('form#modifycharform #sp').val(obj.sp);
		$('form#modifycharform #sp-max').text(obj.maxSp);
	});

	//获取角色信息
	$('.btn-character').click(function(e){
		var txt = $(this).attr('data-value');
		var obj = eval("[" + txt + "]")[0];
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
	});
	
	/************************************************************************************
	 * 消息相关
	 */
	//获取消息信息
	$('.btn-modifymsg').live('click', function(e){
		e.preventDefault();
		//show
		var txt = $(this).attr('data');
		var obj = eval('[' + unescape(txt) + ']')[0];
        $('#msgdiv #htxt').text("消息信息");
        $('#btn-modifymessage').attr('data-id', $(this).attr('data-id'));
		$('#msgdiv #info').html(
			obj.description.replace(/\+/g, " ")
		);
		
		//modify
		$('#modifymessagemodal').modal('show');
		var msg_id = $('.btn-modifymsg').attr('data-id');
		$('form#modifymessageform #msgid').attr("value", obj.guid);
		$('form#modifymessageform #ptype').attr("value", obj.mainType);
		$('form#modifymessageform #stype').attr("value", obj.subType);
	
		// if(obj.isRead == "1")
			// $('form#modifymessageform #msgselect').get(0).selectedIndex = 0;
		// else
			// $('form#modifymessageform #msgselect').get(0).selectedIndex = 1;
		
		var o = $('form#modifymessageform #msgcontent').cleditor()[0];
		$('form#modifymessageform #msgcontent').val(obj.description.replace(/\+/g, " "));
		o.updateFrame();
	});

	//获取消息信息
	$('.btn-modifytmsg').live('click', function(e){
		e.preventDefault();
		//show
		var txt = $(this).attr('data');
		var obj = eval('[' + unescape(txt) + ']')[0];
        $('#msgdiv #htxt').text("消息信息");
        $('#btn-modifytmessage').attr('data-id', $(this).attr('data-id'));
		$('#msgdiv #info').html(
			obj.description.replace(/\+/g, " ")
		);
		
		//modify
		$('#modifytmessagemodal').modal('show');
		var msg_id = $('.btn-modifytmsg').attr('data-id');
		$('form#modifytmessageform #msgid').attr("value", obj.guid);
		$('form#modifytmessageform #ptype').attr("value", obj.mainType);
		$('form#modifytmessageform #stype').attr("value", obj.subType);
	
		// if(obj.isRead == "1")
			// $('form#modifymessageform #msgselect').get(0).selectedIndex = 0;
		// else
			// $('form#modifymessageform #msgselect').get(0).selectedIndex = 1;
		
		var o = $('form#modifytmessageform #msgcontent').cleditor()[0];
		$('form#modifytmessageform #msgcontent').val(obj.description.replace(/\+/g, " "));
		o.updateFrame();
	});

	//获取消息信息
	$('.btn-showmsg').click(function(e){
		var txt = $(this).attr('data');
		var obj = eval('[' + unescape(txt) + ']')[0];
        $('#msgdiv #htxt').text("消息信息");
        $('#btn-modifymessage').attr('data-id', $(this).attr('data-id'));
		$('#msgdiv #info').html(
			obj.description.replace(/\+/g, " ")
		);
	});	

	//添加消息
	$('#btn-addmsg').click(function(e){
		
		e.preventDefault();
		
		id = $(this).attr('data-id');
		name = $(this).attr('name');
		g_list_Message.Clear();
		url = js_getEntry(_project_title, 'Message', 'ajaxlist');
		$.get(url, function(data){
			
			if(data == null)
				alert("获取消息模板失败！");
			else
			{
				if(Object.prototype.toString.call( data ) === '[object Array]')
				{
					// alert("获取" + data.length + "条模板消息！");
					g_list_Message.LoadList(data);
					// alert(g_list_Message.GetListNum());
					$('#addmessagemodal').modal('show');
					for(i = 0; i < g_list_Message.GetListNum(); i++)
					{
						var obj = g_list_Message.m_list[i];
						$('#selecttmsg').append("<option value='" + obj.guid + "' data-json='" + escape(obj.description) + "'>" + obj.description + "</option>");				
					}
					$('form#addmessageform #charid').val(id);
					$('form#addmessageform #charname').val(name);
					var o = $('form#addmessageform #msgcontent').cleditor()[0];
					$('form#addmessageform #msgcontent').val(g_list_Message.m_list[0].description.replace(/\+/g, " "));
					o.updateFrame();
					
					
				}else
					alert("获取消息模板失败！");
			}
		});
	});
	//消息模板
	$('#selecttmsg').live('change', function(e){
		
		val = $('#selecttmsg option:selected').attr('value');
		txt = $('#selecttmsg option:selected').attr('data-json');
		
		var o = $('form#addmessageform #msgcontent').cleditor()[0];
		$('form#addmessageform #msgcontent').val(unescape(txt));
		o.updateFrame();
	});
	//删除消息
	$('.btn-delmsg').live('click', function(e){
		$('#confirm').modal('show');
		
		$('#confirm #h3title').text('是否删除消息？');
		var id = $(this).attr('data-id');
		var txt = $(this).attr('data');
		var obj = eval('[' + unescape(txt) + ']')[0];
		var content = obj.description.replace(/\+/g, ' ');
		content = '<p><b>角色编号：</b>' + obj.charGuid + '</p>'
		        + '<p><b>消息编号：</b>' + obj.guid + '</p>'
		        + '<p><b>消息内容：</b>' + obj.guid + '</p>'
		        + content;
		$('#confirm #txt').html(content);
		url = js_getEntry(_project_title, 'Message', 'ajaxdel?guid=' + id);
		$('#confirm #btn-submit').attr('data-url', url);
	});
	
	$('#confirm #btn-submit').live('click', function(e){
		e.preventDefault();
		url = $(this).attr('data-url');
		$.get(url, function(data){
			alert(data.text);
			location.reload();
		});
	});
	
	
	var servers_txt = $.cookie('current_servers_txt');
	//$('#servers a[text="'+servers_txt+'"]').find('i').addClass('icon-ok');
	// $('#servers a[data-id="'+servers_txt+'"]').find('i').addClass('icon-ok');
	// var o2 = $('#servers a[data-id="'+servers_txt+'ssdsd"]');
	// var o3 = $('#servers');
	if(servers_txt != null)
		$('#current-server').text($.cookie('current_servers_txt'));
		
	$('.li-server').live('click', function(e){
		e.preventDefault();
		current_server_txt=$(this).attr('data-id');
		current_server=$(this).attr('data-value');
		$.cookie('current_servers',current_server,{expires:365});
		$.cookie('current_servers_txt',current_server_txt,{expires:365});
		// switch_theme(current_theme);
		$('#current-server').text(current_server_txt);
		$('#servers i').removeClass('icon-ok');
		$(this).find('i').addClass('icon-ok');
				
		
		$('#connectpopup').modal('show');
		$.get(js_getEntry(_project_title, 'Server', 'ajaxconnect'),
			{
				name: current_server,
			},
			function(data){
				if(data.result == 1)
					//alert(data.str);
					$('#connectpopup #txt').text("连接成功：" + data.str);
				else
					alert("无法连接...");
			});
	});
	
	$('#connectpopup').on('hidden', function(){
		location.reload();
		// alert($.cookie("current_server"));
		// $('#servers #' + $.cookie("current_server")).removeClass('icon-ok');
	});
	
	
	function switch_theme(theme_name)
	{
		$('#bs-css').attr('href','css/bootstrap-'+theme_name+'.css');
	}
	
	
	//disbaling some functions for Internet Explorer
	if($.browser.msie)
	{
		$('#is-ajax').prop('checked',false);
		$('#for-is-ajax').hide();
		$('#toggle-fullscreen').hide();
		$('.login-box').find('.input-large').removeClass('span10');
		
	}
	
	
	//highlight current / active link
	$('ul.main-menu li a').each(function(){
		if($($(this))[0].href==String(window.location))
			$(this).parent().addClass('active');
	});
	
	//establish history variables
	var
		History = window.History, // Note: We are using a capital H instead of a lower h
		State = History.getState(),
		$log = $('#log');

	//bind to State Change
	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
		$.ajax({
			url:State.url,
			success:function(msg){
				$('#content').html($(msg).find('#content').html());
				$('#loading').remove();
				$('#content').fadeIn();
				var newTitle = $(msg).filter('title').text();
				$('title').text(newTitle);
				docReady();
			}
		});
	});
	
	//ajaxify menus
	$('a.ajax-link').click(function(e){
		if($.browser.msie) e.which=1;
		if(e.which!=1 || !$('#is-ajax').prop('checked') || $(this).parent().hasClass('active')) return;
		e.preventDefault();
		if($('.btn-navbar').is(':visible'))
		{
			$('.btn-navbar').click();
		}
		$('#loading').remove();
		$('#content').fadeOut().parent().append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
		var $clink=$(this);
		History.pushState(null, null, $clink.attr('href'));
		$('ul.main-menu li.active').removeClass('active');
		$clink.parent('li').addClass('active');	
	});
	
	//animating menus on hover
	$('ul.main-menu li:not(.nav-header)').hover(function(){
		$(this).animate({'margin-left':'+=5'},300);
	},
	function(){
		$(this).animate({'margin-left':'-=5'},300);
	});
	
	//other things to do on document ready, seperated for ajax calls
	docReady();
});
		
		
function docReady(){
	//prevent # links from moving to top
	$('a[href="#"][data-top!=true]').click(function(e){
		e.preventDefault();
	});
	
	//rich text editor
	$('.cleditor').cleditor({
		height: 180,
	});
	
	//datepicker
	$('.datepicker').datepicker();
	// $('.datetimepicker').datetimepicker();
	
	//notifications
	$('.noty').click(function(e){
		e.preventDefault();
		var options = $.parseJSON($(this).attr('data-noty-options'));
		noty(options);
	});
	

	//uniform - styler for checkbox, radio and file input
	$("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();

	//chosen - improves select
	$('[data-rel="chosen"],[rel="chosen"]').chosen();

	//tabs
	$('#myTab a:first').tab('show');
	$('#myTab a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	});

	//makes elements soratble, elements that sort need to have id attribute to save the result
	$('.sortable').sortable({
		revert:true,
		cancel:'.btn,.box-content,.nav-header',
		update:function(event,ui){
			//line below gives the ids of elements, you can make ajax call here to save it to the database
			//console.log($(this).sortable('toArray'));
		}
	});

	//slider
	$('.slider').slider({range:true,values:[10,65]});

	//tooltip
	$('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});

	//auto grow textarea
	$('textarea.autogrow').autogrow();

	//file manager
	var elf = $('.file-manager').elfinder({
		url : 'misc/elfinder-connector/connector.php'  // connector URL (REQUIRED)
	}).elfinder('instance');

	//iOS / iPhone style toggle switch
	$('.iphone-toggle').iphoneStyle();

	//star rating
	$('.raty').raty({
		score : 4 //default stars
	});

	//uploadify - multiple uploads
	$('#file_upload').uploadify({
		'swf'      : 'misc/uploadify.swf',
		'uploader' : 'misc/uploadify.php'
		// Put your options here
	});

	//gallery controlls container animation
	// $('ul.gallery li').hover(function(){
		// $('img',this).fadeToggle(1000);
		// $(this).find('.gallery-controls').remove();
		// $(this).append('<div class="well gallery-controls">'+
							// '<p><a href="#" class="gallery-edit btn"><i class="icon-edit"></i></a> <a href="#" class="gallery-delete btn"><i class="icon-remove"></i></a></p>'+
						// '</div>');
		// $(this).find('.gallery-controls').stop().animate({'margin-top':'-1'},400,'easeInQuint');
	// },function(){
		// $('img',this).fadeToggle(1000);
		// $(this).find('.gallery-controls').stop().animate({'margin-top':'-30'},200,'easeInQuint',function(){
				// $(this).remove();
		// });
	// });


	//gallery image controls example
	//gallery delete
	$('.thumbnails').on('click','.gallery-delete',function(e){
		e.preventDefault();
		//get image id
		//alert($(this).parents('.thumbnail').attr('id'));
		$(this).parents('.thumbnail').fadeOut();
	});
	//gallery edit
	$('.thumbnails').on('click','.gallery-edit',function(e){
		e.preventDefault();
		//get image id
		//alert($(this).parents('.thumbnail').attr('id'));
	});

	//gallery colorbox
	// $('.thumbnail a').colorbox({rel:'thumbnail a', transition:"elastic", maxWidth:"95%", maxHeight:"95%"});


	//datatable
	$('.datatable').dataTable({
			"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
			"sPaginationType": "bootstrap",
			"aaSorting": [ [5,'desc'], [6,'asc'] ],
			"oLanguage": {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sZeroRecords": "抱歉， 没有找到",
				"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
				"sInfoEmpty": "没有数据",
				"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "尾页"
				}
			}
		} );
	$('.btn-close').click(function(e){
		e.preventDefault();
		$(this).parent().parent().parent().fadeOut();
	});
	$('.btn-minimize').click(function(e){
		e.preventDefault();
		var $target = $(this).parent().parent().next('.box-content');
		if($target.is(':visible')) $('i',$(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
		else 					   $('i',$(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
		$target.slideToggle();
	});
	
	//@@@
	/* account login */
	$('#accountlogin').click(function(e){
		e.preventDefault();
		var username = $('#loginform #username').val();
		var password = $('#loginform #password').val();
		var url = js_getEntry(_project_title, 'Login', 'ajaxverify');
		$.post(url, 
		{
			op: 'verify',
			username: username,
			password: password
		},
		function(data){
			if(data.result == 0)
			{
				$('#loginerror #bold-text').text("登录错误：");
				$('#loginerror #simple-text').text(data.text);
				$('#popuploginframe').modal('show');
			}else if(data.result == 1){
				alert(data.text);
				location.href = js_getEntry(_project_title, 'Index', '');
			}
			else{
				alert(data.text);
			}
		});
	});
	
	$('#accountregister').click(function(e){
		e.preventDefault();
		var username = $('#registerform #username').val();
		var password = $('#registerform #n_password').val();
		if(username == ""){
			$('#alert-text').removeClass("alert-info");
			$('#alert-text').addClass("alert-error");
			$('#alert-text').html("用户名不能为空！");	
		}else if(password != $('#registerform #na_password').val()){
			$('#alert-text').removeClass("alert-info");
			$('#alert-text').addClass("alert-error");
			$('#alert-text').html("两次输入密码不一致");	
		}else{
			var url = js_getEntry(_project_title, 'Login', 'ajaxregister');
			$.post(url, 
			{
				op: "register",
				username: username,
				password: password
			},
			function(data){
				if(typeof data.result === 'undefined' || data.result != 1)
				{
					alert(url);
					$('#loginerror #bold-text').text("注册错误：");
					$('#loginerror #simple-text').text(data.text);
					$('#popuploginframe').modal('show');
				}else{
					alert("注册成功！");
					location.href = js_getEntry(_project_title, 'Login', '');
				}
			});
		}

	});
	
	$('.input-large').keypress(function(e){
		$('#alert-text').removeClass("alert-error");
		$('#alert-text').addClass("alert-info");
		$('#alert-text').html("请输入用户名、密码。");
	});
	
	
	
	
	$('#addBoard').click(function(e){
		e.preventDefault();
		$('#myModal1').modal('show');
	});
	$('#addServer').click(function(e){
		e.preventDefault();
		$('#myModal2').modal('show');
	});
	$('.modifyBoard').click(function(e){
		e.preventDefault();
		var srctxt = $(this).attr('data-json');
		var txt = '[' + unescape(srctxt) + ']';
		var obj = eval(txt)[0];
		$('#myModal').modal('show');
		$('form#modifyboardform #boardid').attr("value", obj.guid);
		$('form#modifyboardform #boardpriority').attr("value", obj.priority);
		$('form#modifyboardform #boardtitle').attr("value", obj.title);
		
		var s1 = $('form#modifyboardform #boardselect').attr("value");
		if(obj.isValid == "1")
			$('form#modifyboardform #boardselect').get(0).selectedIndex = 0;
		else
			$('form#modifyboardform #boardselect').get(0).selectedIndex = 1;
			
		$('form#modifyboardform #jmpselect').get(0).selectedIndex = parseInt(obj.type) - 1;
		
		var o = $('form#modifyboardform #boardcontent').cleditor()[0];
		$('form#modifyboardform #boardcontent').val(obj.content.replace(/\+/g, " "));
		o.updateFrame();
	});
	
	
	
	$('.modifyServer').click(function(e){
		e.preventDefault();
		var txt = $(this).attr('data-json');
		var obj = eval("[" + txt + "]")[0];
			$('#myModal3').modal('show');
			$('form#modifyserverform #serverid').attr("value", obj.id);
			$('form#modifyserverform #servername').attr("value", obj.name);
			$('form#modifyserverform #serverhost').attr("value", obj.host);
			$('form#modifyserverform #serverport').attr("value", obj.port);
			$('form#modifyserverform #serverinfo').attr("value", obj.text);
			$('form#modifyserverform #serveruser').attr("value", obj.username);
			$('form#modifyserverform #serverpassword').attr("value", obj.password);
			$('form #modifyserverform #serverstatus1').attr("checked", "checked");
			$('form #modifyserverform #serverstatus2').attr("checked", "");
		//$('#myModal').modal('show');
	});
	
	$('.btn-moveup').live("click", function(e){
		e.preventDefault();
		var tr_obj = $(this).parents("tr");
		var index = tr_obj.index();		
		
		if(index <= 0)
		{
			alert("Can not move up！");
		}else
		{
			var tr_pre = tr_obj.prev();
			var sortid = tr_obj.attr("priority");
			var gid0 = tr_obj.attr("guid");
			var gid1 = tr_pre.attr("guid");
			
			$('#connectpopup').modal('show');
			var url = js_getEntry(_project_title, "Board", "ajaxsort");
			$.get(url, 
			{
				guid0: gid0,
				guid1: gid1
			}, 
			function(data){
				//location.reload();
			$('#connectpopup').modal('hide');
				var text0 = tr_obj.html();
				var text1 = tr_pre.html();
				tr_obj.html(text1);
				tr_pre.html(text0);
			});
		}
	});
	$('.btn-movedown').live("click", function(e){
		e.preventDefault();
		var tr_obj = $(this).parents("tr");
		var index = tr_obj.index();
		if(index >= tr_obj.parent().children().size() - 1)
		{
			alert("Can not move down！");
		}else
		{
			var tr_next = tr_obj.next();
			var sortid = tr_obj.attr("priority");
			var gid0 = tr_obj.attr("guid");
			var gid1 = tr_next.attr("guid");
			
			var url = js_getEntry(_project_title, "Board", "ajaxsort");
			$('#connectpopup').modal('show');
			$.get(url, 
			{
				guid0: gid0,
				guid1: gid1
			},
			function(data){
				// alert(data.result);
				// location.reload();
			$('#connectpopup').modal('hide');
				var text0 = tr_obj.html();
				var text1 = tr_next.html();
				tr_obj.html(text1);
				tr_next.html(text0);
			});
			//location.reload();
		}
	});
	
	$('.btn-exchange').live("click", function(e){
		e.preventDefault();
		
		var tr_obj = $(this).parents("tr");
		var tr_nxt = tr_obj.next();
			var text0 = tr_obj.html();
			var text1 = tr_nxt.html();
			tr_obj.html(text1);
			tr_nxt.html(text0);
		var tds = tr_obj.children('td').toArray();
	});

		
	//initialize the external events for calender

	$('#external-events div.external-event').each(function() {

		// it doesn't need to have a start or end
		var eventObject = {
			title: $.trim($(this).text()) // use the element's text as the event title
		};
		
		// store the Event Object in the DOM element so we can get to it later
		$(this).data('eventObject', eventObject);
		
		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
		
	});


	//stack chart
	if($("#stackchart").length)
	{
		var d1 = [];
		for (var i = 0; i <= 10; i += 1)
		d1.push([i, parseInt(Math.random() * 30)]);

		var d2 = [];
		for (var i = 0; i <= 10; i += 1)
			d2.push([i, parseInt(Math.random() * 30)]);

		var d3 = [];
		for (var i = 0; i <= 10; i += 1)
			d3.push([i, parseInt(Math.random() * 30)]);

		var stack = 0, bars = true, lines = false, steps = false;

		function plotWithOptions() {
			$.plot($("#stackchart"), [ d1, d2, d3 ], {
				series: {
					stack: stack,
					lines: { show: lines, fill: true, steps: steps },
					bars: { show: bars, barWidth: 0.6 }
				}
			});
		}

		plotWithOptions();

		$(".stackControls input").click(function (e) {
			e.preventDefault();
			stack = $(this).val() == "With stacking" ? true : null;
			plotWithOptions();
		});
		$(".graphControls input").click(function (e) {
			e.preventDefault();
			bars = $(this).val().indexOf("Bars") != -1;
			lines = $(this).val().indexOf("Lines") != -1;
			steps = $(this).val().indexOf("steps") != -1;
			plotWithOptions();
		});
	}

	//pie chart
	var data = [
	{ label: "Internet Explorer",  data: 12},
	{ label: "Mobile",  data: 27},
	{ label: "Safari",  data: 85},
	{ label: "Opera",  data: 64},
	{ label: "Firefox",  data: 90},
	{ label: "Chrome",  data: 112}
	];
	
	if($("#piechart").length)
	{
		$.plot($("#piechart"), data,
		{
			series: {
					pie: {
							show: true
					}
			},
			grid: {
					hoverable: true,
					clickable: true
			},
			legend: {
				show: false
			}
		});
		
		function pieHover(event, pos, obj)
		{
			if (!obj)
					return;
			percent = parseFloat(obj.series.percent).toFixed(2);
			$("#hover").html('<span style="font-weight: bold; color: '+obj.series.color+'">'+obj.series.label+' ('+percent+'%)</span>');
		}
		$("#piechart").bind("plothover", pieHover);
	}
	
	//donut chart
	if($("#donutchart").length)
	{
		$.plot($("#donutchart"), data,
		{
				series: {
						pie: {
								innerRadius: 0.5,
								show: true
						}
				},
				legend: {
					show: false
				}
		});
	}




	 // we use an inline data source in the example, usually data would
	// be fetched from a server
	var data = [], totalPoints = 300;
	function getRandomData() {
		if (data.length > 0)
			data = data.slice(1);

		// do a random walk
		while (data.length < totalPoints) {
			var prev = data.length > 0 ? data[data.length - 1] : 50;
			var y = prev + Math.random() * 10 - 5;
			if (y < 0)
				y = 0;
			if (y > 100)
				y = 100;
			data.push(y);
		}

		// zip the generated y values with the x values
		var res = [];
		for (var i = 0; i < data.length; ++i)
			res.push([i, data[i]])
		return res;
	}

	// setup control widget
	var updateInterval = 30;
	$("#updateInterval").val(updateInterval).change(function () {
		var v = $(this).val();
		if (v && !isNaN(+v)) {
			updateInterval = +v;
			if (updateInterval < 1)
				updateInterval = 1;
			if (updateInterval > 2000)
				updateInterval = 2000;
			$(this).val("" + updateInterval);
		}
	});

	//realtime chart
	if($("#realtimechart").length)
	{
		var options = {
			series: { shadowSize: 1 }, // drawing is faster without shadows
			yaxis: { min: 0, max: 100 },
			xaxis: { show: false }
		};
		var plot = $.plot($("#realtimechart"), [ getRandomData() ], options);
		function update() {
			plot.setData([ getRandomData() ]);
			// since the axes don't change, we don't need to call plot.setupGrid()
			plot.draw();
			
			setTimeout(update, updateInterval);
		}

		update();
	}
}


//additional functions for data table
$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
{
	return {
		"iStart":         oSettings._iDisplayStart,
		"iEnd":           oSettings.fnDisplayEnd(),
		"iLength":        oSettings._iDisplayLength,
		"iTotal":         oSettings.fnRecordsTotal(),
		"iFilteredTotal": oSettings.fnRecordsDisplay(),
		"iPage":          Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
		"iTotalPages":    Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
	};
}
$.extend( $.fn.dataTableExt.oPagination, {
	"bootstrap": {
		"fnInit": function( oSettings, nPaging, fnDraw ) {
			var oLang = oSettings.oLanguage.oPaginate;
			var fnClickHandler = function ( e ) {
				e.preventDefault();
				if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
					fnDraw( oSettings );
				}
			};

			$(nPaging).addClass('pagination').append(
				'<ul>'+
					'<li class="prev disabled"><a href="#">&larr; '+oLang.sPrevious+'</a></li>'+
					'<li class="next disabled"><a href="#">'+oLang.sNext+' &rarr; </a></li>'+
				'</ul>'
			);
			var els = $('a', nPaging);
			$(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
			$(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
		},

		"fnUpdate": function ( oSettings, fnDraw ) {
			var iListLength = 5;
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			var i, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

			if ( oPaging.iTotalPages < iListLength) {
				iStart = 1;
				iEnd = oPaging.iTotalPages;
			}
			else if ( oPaging.iPage <= iHalf ) {
				iStart = 1;
				iEnd = iListLength;
			} else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
				iStart = oPaging.iTotalPages - iListLength + 1;
				iEnd = oPaging.iTotalPages;
			} else {
				iStart = oPaging.iPage - iHalf + 1;
				iEnd = iStart + iListLength - 1;
			}

			for ( i=0, iLen=an.length ; i<iLen ; i++ ) {
				// remove the middle elements
				$('li:gt(0)', an[i]).filter(':not(:last)').remove();

				// add the new list items and their event handlers
				for ( j=iStart ; j<=iEnd ; j++ ) {
					sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
					$('<li '+sClass+'><a href="#">'+j+'</a></li>')
						.insertBefore( $('li:last', an[i])[0] )
						.bind('click', function (e) {
							e.preventDefault();
							oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
							fnDraw( oSettings );
						} );
				}

				// add / remove disabled classes from the static elements
				if ( oPaging.iPage === 0 ) {
					$('li:first', an[i]).addClass('disabled');
				} else {
					$('li:first', an[i]).removeClass('disabled');
				}

				if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
					$('li:last', an[i]).addClass('disabled');
				} else {
					$('li:last', an[i]).removeClass('disabled');
				}
			}
		}
	}
});
