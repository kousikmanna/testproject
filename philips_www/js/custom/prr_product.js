document.addEventListener("deviceready", onDeviceReady, true);
function onDeviceReady() {
	DBHandler.initDatabase();
	$.ajax({
       url:"ajaxproduct.html",
       success: function(data) {
        // alert(data);
        $('.m_p').empty();
        // $("#cssfile").attr('href', 'css/product.css');
        $('.m_p').append(data);
        get_func();
       }
     });

    $('[data-toggle="tooltip"]').tooltip();

     $('#search').on('keyup', function(){
            console.log($(this).val());
                $('div.staff-container').unhighlight();
                $('div.staff-container').highlight($(this).val());
                var query = $('.search-query').val().toLowerCase();

         $('div.staff-container').each(function(){      
               var $this = $(this);
               if($this.text().toLowerCase().indexOf(query) === -1){
                console.log(query);
               $('div.staff-container').highlight(query);
                   $this.closest('div.staff-container').fadeOut();
                 }
              else { 
                $this.closest('div.staff-container').fadeIn();
                 }
          });

        });  
}	

function get_func(){
	console.log('get_func calling');
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