// $(function() {
    document.addEventListener("deviceready", onDeviceReady, true);
// });

function onDeviceReady() {
	DBHandler.initDatabase();
	 $.ajax({
	 	type: 'GET',
        url: 'js/api/prr_model.json',
        dataType: 'json',
        success: function(log_data, status) {
            console.log('GET log_data',log_data);
            console.log('GET status',status);
            console.log('log_data.objects',status);
            DBHandler.saveRecordofPrr_model(log_data.prr_model, saveRecordofPrr_modelCallback);
        },
        error: function(e) {
            return false;
        }
	});

}

function saveRecordofPrr_modelCallback(result){
	console.log('saveRecordofPrr_modelCallback');
	// setTimeout(function() {
	// 	get_func();
	// }, 4000);
	//  $.ajax({
	//  	type: 'GET',
 //        url: 'js/api/prr_category.json',
 //        dataType: 'json',
 //        success: function(log_data, status) {
 //            console.log('GET log_data',log_data);
 //            console.log('GET status',status);
 //            console.log('log_data.objects',status);
 //            DBHandler.saveRecordofPrr_category(log_data.prr_category, saveRecordofPrr_categoryCallback);
 //        },
 //        error: function(e) {
 //            return false;
 //        }
	// });
}	

function saveRecordofPrr_categoryCallback(result){
	$.ajax({
	 	type: 'GET',
        url: 'js/api/prr_subcategory.json',
        dataType: 'json',
        success: function(log_data, status) {
            console.log('GET log_data',log_data);
            console.log('GET status',status);
            console.log('log_data.objects',status);
            DBHandler.saveRecordofPrr_subcategory(log_data.prr_subcategory, saveRecordofPrr_subcategoryCallback);
        },
        error: function(e) {
            return false;
        }
	});
}

function saveRecordofPrr_subcategoryCallback(result){
	$.ajax({
	 	type: 'GET',
        url: 'js/api/prr_products.json',
        dataType: 'json',
        success: function(log_data, status) {
            console.log('GET log_data',log_data);
            console.log('GET status',status);
            console.log('log_data.objects',status);
            DBHandler.saveRecordofPrr_products(log_data.prr_products, saveRecordofPrr_productsCallback);
        },
        error: function(e) {
            return false;
        }
	});
}

function saveRecordofPrr_productsCallback(result){
	DBHandler.getRecordsOfPrr_Model('prr_model', getRecordsOfPrr_ModelCallback);
}

function getRecordsOfPrr_ModelCallback(result){
	var resLen = result.rows.length;
	var data = { resultData:result.rows, length: resLen}; 
	var tpl = _.template($('#prr_modelTemplate').html());
    $('#prr_model').append(tpl(data));

}

// $(document).on('click','#id',function(){
// 	DBHandler.getRecordsOfPrr_category();
// 	function getRecordsOfPrr_category(result){

// 	}
// });





function get_func(){
	console.log('get_func calling');
	// debugger;
	DBHandler.getRecordsFromTable('prr_model', getRecordsOfPrr_ModelCallback);
}

function getRecordsOfPrr_ModelCallback(result){
	console.log('getRecordsOfPrr_ModelCallback');
	console.log('result',result);
	console.log('result.rows',result.rows);
	console.log('result.rows.item(0)',result.rows.item(0));
	console.log('result.rows.item(1)',result.rows.item(1));
	console.log('result.rows.item(2)',result.rows.item(2));
	console.log('result.rows.item(3)',result.rows.item(3));
	console.log('result.rows.item(3)',result.rows.item(3));
	console.log('result.rows.length',result.rows.length);
	var resLen = result.rows.length;
	console.log('resLen', resLen);
	var data = { resultData:result.rows, length: resLen}; 
	var tpl = _.template($('#prr_modelTemplate').html());
    $('#prr_model').append(tpl(data));

}