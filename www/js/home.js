$(function() {
    
    document.addEventListener("deviceready", onDeviceReady, true);
    // showLoading();
});
function onDeviceReady() {
    localStorage.setItem('tripSelected', false);
    // localStorage.setItem('totalDistance',600);
    localStorage.setItem('travelPerDay',300);
    console.log("inside home.js");
    // alert('inside home.js');
    // $(function() {
    //     $( "#datepicker1").datepicker({showButtonPanel: true, changeMonth: true, changeYear: true, dateFormat: 'dd/mm/yy' }).val;
    //     $( "#datepicker2").datepicker({showButtonPanel: true, changeMonth: true, changeYear: true, dateFormat: 'dd/mm/yy' }).val;
    // });

    // var isConnected = isNetworkAvailable();
    // if (isConnected) {
      
    //alert('A network connection is available.');    
    // } else {
    // }
    DBHandler.initDatabase();
    // alert('initDatabase in home.js');
    setTimeout(function() {
         DBHandler.getAllRecords('trip', details);
    }, 1000);

    $("#searchInvoice").bind('click', function(e){
        e.preventDefault();
        showLoading();
        var input_invoiceno = $("#invoiceno").val();
        var invoiceno = input_invoiceno.trim();

        var input_datepicker1 = $("#datepicker1").val();
        var datepicker1 = input_datepicker1.trim();

        var input_datepicker2 = $("#datepicker2").val();
        var datepicker2 = input_datepicker2s.trim();
        var searchObj={
            invoiceno  : invoiceno, 
            fromDate : datepicker1,
            toDate   : datepicker2
        };
        DBHandler.searchInvoice(searchObj, searchInvoiceCallback);
        // if((email == 'ticl_dealer@bajajauto.co.in') && (password == "dealer123")) {
        //     window.location.href = "create_grn.html";
        // } else {
        //     $("#error-msg-login-window").css("display", "block");
        //     hideLoading();
        // }

    });

}

arrColor = [{
    'color': '#597DA1'
}, {
    'color': '#16A085'
}, {
    'color': '#E74C3C'
}]

function details(result) {
    // alert('inside details');
    $("#tabledetail").empty();
    var trip_invoice;
    var trip_invoice5 = '';
    var trip_invoice2='';
    var trip_invoice6='';
    var trip_invoiceItem='';
    var resLen = result.rows.length;
    var trip_invoice4;
    console.log("resLen",  result.rows.length);
    console.log("details", result);
    DBHandler.getAllRecords2('invoice', invoiceDetails);
    function invoiceDetails(result2) {
        // alert('inside invoiceDetails');
        var resLen2 = result2.rows.length;
        // trip_invoice='<table class="table table-condensed table_trip_data" style="border-collapse:collapse;"><thead class="thead_trip"><tr><th>Trip No</th><th>Date</th><th>Truck No</th><th>&nbsp;</th></tr></thead><tbody>';
        // console.log("invoiceDetails", result2);
        // for (var i = 0; i < resLen; i++) {
        //     console.log("result.rows.item(i)",  result.rows.item(i));
        //     trip_invoice2='<tr data-toggle="collapse" id="100'+i+'" data-target="#demo'+i+'" class="accordion-toggle" id = "tripdetail"><td>'+result.rows.item(i).tripno+'</td><td>'+result.rows.item(i).created_date+'</td><td>'+result.rows.item(i).truckno+'</td><td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td></tr>';
        //     var trip_invoice_i='';
        //     var trip_invoice3;
        
        //     for(var j = 0; j < resLen2; j++){
        //         console.log("result2.rows.item(j)",  result2.rows.item(j));
        //         console.log("result2.rows.item(j).invoiceno",  result2.rows.item(j).invoiceno);
        //         trip_invoice3='<tr><td colspan="12" class="hiddenRow"><div class="accordian-body collapse" id="demo'+i+'"><table class="table table-striped"><thead><th>Invoice No</th><th>Plant</th><th>Qty</th><th>Select</th></thead><tbody>';
        //         trip_invoice4='</tbody></table><div class="col-md-12 col-sm-12 col-xs-12 text-center"><button data-rel="1" class="createGrnButton" id="grnButton'+i+1+j+1+'">Create GRN</button></div></div></td></tr>';
        //         if(result.rows.item(i).tripno === result2.rows.item(j).tripno){
        //            console.log("i..",i);
        //         trip_invoice_i=trip_invoice_i + '<tr><td>'+result2.rows.item(j).invoiceno+'</td><td>'+result2.rows.item(j).plant+'</td><td>'+result2.rows.item(j).billqty+'</td><td><input type="checkbox" id="'+i+'" name="select_for_grn[]" class="select_for_grn"/></td></tr>';
        //          console.log('trip_invoice_i',trip_invoice_i);
        //         }
        //         if(j === resLen2-1){
        //            trip_invoice5 = trip_invoice5 + trip_invoice3+trip_invoice_i+trip_invoice4;
        //            trip_invoice2=trip_invoice2+trip_invoice5;
        //            trip_invoice6=trip_invoice6+trip_invoice2;
        //            // console.log('trip_invoice6',trip_invoice6);
        //         }
                   
        trip_invoice='<table class="table table-condensed table_trip_data" style="border-collapse:collapse;"><thead class="thead_trip"><tr><th>Trip No</th><th>Date</th><th>Truck No</th><th>Select</th><th>&nbsp;</th></tr></thead><tbody>';
        console.log("invoiceDetails", result2);
        for (var i = 0; i < resLen; i++) {
            console.log("result.rows.item(i)",  result.rows.item(i));
            var tripNumber=result.rows.item(i).tripno;
            tripNumber=tripNumber.replace(/^0+/, '');
            trip_invoice2='<tr data-toggle="collapse" id="100'+i+'" data-target="#demo'+i+'" class="accordion-toggle" id = "tripdetail"><td>'+tripNumber+'</td><td>'+result.rows.item(i).created_date+'</td><td>'+result.rows.item(i).truckno+'</td><td style="display:none;">'+result.rows.item(i).total_distance+'</td><td><input type="checkbox" id="1000'+i+'" name="select_for_trip1000'+i+'[]" class="select_for_trip"/></td><td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td></tr>';
            var trip_invoice_i='';
            var trip_invoice3;
        
            for(var j = 0; j < resLen2; j++){
                console.log("result2.rows.item(j)",  result2.rows.item(j));
                console.log("result2.rows.item(j).invoiceno",  result2.rows.item(j).invoiceno);
                trip_invoice3='<tr><td colspan="12" class="hiddenRow"><div class="accordian-body collapse" id="demo'+i+'"><table class="table table-striped"><thead><th>Invoice No</th><th>Plant</th><th>Qty</th></thead><tbody>';
                trip_invoice4='</tbody></table><div class="col-md-12 col-sm-12 col-xs-12 text-center"></div></div></td></tr>';
                if(result.rows.item(i).tripno === result2.rows.item(j).tripno){
                   console.log("i..",i);
                trip_invoice_i=trip_invoice_i + '<tr><td>'+result2.rows.item(j).invoiceno+'</td><td>'+result2.rows.item(j).plant+'</td><td>'+result2.rows.item(j).billqty+'</td><td><input type="checkbox" id="'+i+'" name="select_for_grn1000'+i+'[]" class="select_for_grn1000'+i+'" style="display:none;"/></td></tr>';
                 console.log('trip_invoice_i',trip_invoice_i);
                }
                if(j === resLen2-1){
                   trip_invoice5 = trip_invoice5 + trip_invoice3+trip_invoice_i+trip_invoice4;
                   trip_invoice2=trip_invoice2+trip_invoice5;
                   trip_invoice6=trip_invoice6+trip_invoice2;
                   // console.log('trip_invoice6',trip_invoice6);
                }
                             

                // if(i==resLen-1){
                //     trip_invoice=trip_invoice + '</tbody></table>'
                // }
            }

            // trip_invoice2=trip_invoice2+trip_invoice5;
           
            //trip_invoice4='</tbody></table><div class="col-md-12 col-sm-12 col-xs-12 text-center"><button class="createGrnButton">Craete GRN</button></div></div></td></tr>';
            if(i===resLen-1){
                    trip_invoice=trip_invoice + trip_invoice6+'</tbody></table><div class="text-center"><button data-rel="1" class="createGrnButton" id="grnButton">Create GRN</button></div>';
            }
            // trip_invoiceItem=trip_invoice2+trip_invoice4

        }
        $("#tabledetail").append(trip_invoice);
        // $("#tabledetail").append(tripdata);
        hideLoading();

        console.log('datatime', $.now());
    }
    

}

function searchInvoiceCallback(result){
    var resLen = result.rows.length;
    console.log('resLen', resLen);
    for (var i = 0; i < resLen; i++) {
         var invoiceno = result.rows.item(i).invoiceno;
         console.log('searchInvoiceCallback invoiceno', invoiceno);
    }
    console.log('searchInvoiceCallback result', result);
}


// $(document).on('click', '#grnButton0131', function(){ 

//     showLoading();
//     window.location="grn_details.html";
// });

// $(document).on('click', '#grnButton1131', function(){ 
//     showLoading();
//     window.location="grn_details.html";
// });
$(document).on('click', '.createGrnButton', function(){ 
    showLoading();
    if(localStorage.getItem('tripSelected')==false|| localStorage.getItem('tripSelected')=='false'){
        console.log('tripSelected1');
        alert("Please select the trip number");
         hideLoading();
    }else{
        console.log('tripSelected2');
        window.location="grn_details.html";
        localStorage.setItem('tripSelected', false);
    }
});

// function grnfunc() {
//     var values = new Array();
//     var checkboxId= $("input[name='select_for_grn[]']:checked").attr('id');
//     var trId="100"+checkboxId;
//     for(var i=0; i<3; i++){
//         $.each($('#'+trId),
//         function () {
          
//             values.push($(this).find('td').eq(i).text());
            
//        });
//     }
    
//     $.each($("input[name='select_for_grn[]']:checked").closest("td").siblings("td"),
//         function () {
//             values.push($(this).text());
//         });

//     console.log('values1',values.join (", "));
 
//     DBHandler.saveRecordsofGrn_trip_invoice(values, grn_trip_invoiceCallback);

// }
 function grn_trip_invoiceCallback(){
    console.log('grn_trip_invoiceCallback');
    localStorage.setItem('tripSelected', true);


}    
$(document).on('click', '.select_for_grn', function(){ 
    grnfunc();
});


// $(document).on('click', '.select_for_trip', function(){ 
//     var values = new Array();
//      $.each($("input[name='select_for_trip[]']:checked").closest("td").siblings("td"),
//         function () {
//             values.push($(this).text());
//     });

//     console.log('trip values',values); 
//     DBHandler.saveRecordsofGrn_trip(values, grn_trip_Callback);
// });
$(document).on('click', '.select_for_trip', function(){
    var test = $(this).attr('id'); 
     // var tripCheckboxId= $("input[name='select_for_trip[]']:checked").attr('id');
     console.log('tripCheckboxId',test);
     var invoicenoClass='select_for_grn'+test;
     var values = new Array();
     var values2 = new Array();
     var i=0;
     // $.each($("input[name='select_for_trip[]']:checked").closest("td").siblings("td"),
    $.each($("input[name='select_for_trip"+test+"[]']:checked").closest("td").siblings("td"),
        function () {
            if(i<3){
                values.push($(this).text());
            }
            if(i===3){
                values2.push($(this).text());
                console.log('values2',values2);
                localStorage.setItem('totalDistance',values2);
                values.push($.now());
            }
             i=i+1;
     });

     localStorage.setItem('trip_date',values[1]);
     console.log('trip values',values);
     $('.select_for_grn'+test).each(function(i, box){
        $(box).prop('checked', true);
        // if($(box).prop('checked', true)){

                // var values = new Array();
               
                // for(var i=0; i<3; i++){
                //     $.each($('#'+test),
                //     function () {
                      
                //         values.push($(this).find('td').eq(i).text());
                        
                //    });


                // }
                // $.each($("input[name='select_for_trip[]']:checked").closest("td").siblings("td"),
                //     function () {
                //         values.push($(this).text());
                //     });
                // console.log('trip values',values);

                // $.each($("input[name='"+invoicenoClass+"[]']:checked").closest("td").siblings("td"),
                //     function () {
                //         values.push($(this).text());
                //     });

                // console.log('values1',values1);
             
                // DBHandler.saveRecordsofGrn_trip_invoice(values, grn_trip_invoiceCallback);
                
           
        // }
     });
    
     
        $.each($("input[name='"+invoicenoClass+"[]']:checked").closest("td").siblings("td"),
            function () {
            values.push($(this).text());
            console.log('values',values);
        });
       
    

    console.log('values1',values);
    DBHandler.saveRecordsofGrn_trip_invoice(values, grn_trip_invoiceCallback);
     // $.each($("input[name='select_for_trip[]']:checked").closest("td").siblings("td"),
//         function () {
//             values.push($(this).text());
//     });
});
function grn_trip_Callback(){
    console.log('grn_trip_Callback');
}
function logout_user() {
    window.location = "index.html";
}

// (document).on('change' , '.checkbox' , function(){

//     if(this.checked) {
//         //Do stuff
//     }

// });