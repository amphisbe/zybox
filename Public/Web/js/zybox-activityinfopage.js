$('#activityinfo-list').datagrid({
    url: js_getEntry(_project_title, 'Activity', 'ajaxlistinfo'),
    toolbar: '#toolbar',
    rownumbers: 'true',
    fitColumns: 'true',
    singleSelect: 'true',
    pagination: 'true',
    pageSize: 5,
    pageList: [10,20,25],
    
    // $(p).pagination({  
	// showPageList: false,
    // pageSize: 10,//每页显示的记录条数，默认为10  
    // pageList: [10,20,30,50],//可以设置每页记录条数的列表  
    // beforePageText: '第 ',//页数文本框前显示的汉字  
    // afterPageText: '页    总共 {total} 页',  
    // displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
    // onBeforeRefresh:function(){ 
        // $(this).pagination('loading'); 
        // alert('before refresh'); 
        // $(this).pagination('loaded'); 
    // } 
// });  

	// frozenColumns:[[  
        // {field:'ck',checkbox:true}  
    // ]], 
    
    onLoadError: function(){
    	alert('记载失败，请刷新重试！');
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

//设置分页控件  
var p = $('#activityinfo-list').datagrid('getPager');  
$(p).pagination({  
    pageSize: 5,//每页显示的记录条数，默认为10  
    pageList: [10,20,25],//可以设置每页记录条数的列表  

});  

