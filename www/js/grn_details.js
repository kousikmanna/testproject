
$(function() {
    document.addEventListener("deviceready", onDeviceReady, true);
});
function onDeviceReady() {
    $(".searchChassis").val("")
    $(function() {
        $("#datepicker3").datepicker({showButtonPanel: true, changeMonth: true, maxDate: new Date(), changeYear: true, dateFormat: 'dd/mm/yy' }).val;
        $("#datepicker4").datepicker({showButtonPanel: true, changeMonth: true, maxDate: '0', changeYear: true, dateFormat: 'dd/mm/yy' }).val;
        $('#reportingTime').timepicker({ timeFormat: 'h:mm:ss p', interval: 15});
        $('#uploadingTime').timepicker({ timeFormat: 'h:mm:ss p', interval: 15 });
    });
   	$(".grnDetailsNext").click(function(){
		$(".details_1").removeClass('active');
		$(".details_3").removeClass('active');
		$(".details_2").addClass('active');
	})
	$(".grnDetailsreport").click(function(){
		$(".details_1").removeClass('active');
		$(".details_3").addClass('active');
		$(".details_2").removeClass('active');
	})

     /**---------- Start of datepicker js----------**/
    // $('.sandbox-container').datepicker({
    //     format: "dd-mm-yyyy",
    //     autoclose: true,
    //     todayHighlight: true
    // });
    /**---------- End of date picker js----------**/

    DBHandler.initDatabase();
    
    $('#grndetail').on("click",function(){
        var grnObject={
            grn_number: generateGrnNumber(),
            reporting_date : $('#datepicker3').val(),
            reporting_time : $('#reportingTime').val(),
            uploading_date : $('#datepicker4').val(),
            uploading_time : $('#uploadingTime').val(),
            delay_type : $('#reason').val(),
            reason_of_delay : $('#reasonForDelay').val()
        };
         console.log('grnObject::',grnObject);   
         DBHandler.saveGrn_detail(grnObject, grnObjectCallback);

   })


   $('#reportDetail').on("click",function(){
        
        console.log('reportDetail');   
        DBHandler.getAllRecords('grn_detail', grnDetailCallback);
        var grnNumber;
        var reportDetail1='<div class="col-md-12 col-sm-12 col-xs-12 padding-zero clearfix"><div class="col-md-6 col-sm-6 col-xs-6 padding-zero"><img src="img/Bajaj_Logo.png" class="img-responsive bajaj_logo_grn"></div><div class="col-md-6 col-sm-6 col-xs-6 padding-zero gtnTitleBlock"><p class="grnTitle">Goods Receipt Note</p></div></div><div class="col-md-12 col-sm-12 col-xs-12 padding-zero clearfix dearlerInfoBlock"></div>';
        var reportDetail2;
        var reportDetail3;
        var reportDetail4;
        var dealer_name;
        var dealer_code;
        var pdi_manager;
        function grnDetailCallback(result){
             $("#dealerDetail").empty();
            console.log('result.rows.length', result.rows.length);
            grnNumber=result.rows.item(0).grn_number;
            reportDetail2='<label class="dealerInfo">GRN #: </label><span class="dearlerValues">'+grnNumber+'</span><br>';
            DBHandler.getAllRecords('dealer', dealerDetailCallback);

            function dealerDetailCallback(result){
                console.log('result.rows.length', result.rows.length);
                console.log('items', result.rows.item(0));
                dealer_name=result.rows.item(0).dealer_name;
                dealer_code=result.rows.item(0).dealer_code;
                pdi_manager=result.rows.item(0).pdi_manager;

                reportDetail3='<label class="dealerInfo">Dealer Name: </label><span class="dearlerValues">'+dealer_name+'</span><br><label class="dealerInfo">Dealer Code: </label><span class="dearlerValues">'+dealer_code+'</span><br><label class="dealerInfo">PDI Manager: </label><span class="dearlerValues">'+pdi_manager+'</span>';
                reportDetail4=reportDetail1+reportDetail2+reportDetail3;
                $("#dealerDetail").append(reportDetail4);
                DBHandler.getAllRecords('grn_trip', tripCallback);


                function tripCallback(result){
                     $("#invoiceDetail").empty();
                    var resLen = result.rows.length;
                    console.log('resLen',resLen);
                    DBHandler.getAllRecords('grn_invoice', invoiceCallback);
                        function invoiceCallback(result2){
                            var resLen2 = result2.rows.length;
                            console.log('resLen2',resLen2);
                            var invoiceDetail1='<h4>Invoice Details</h4><table class="invoiceTableTemp table table-striped table-bordered table-hover"><thead class="invoiceTable"><th>S.N</th><th>Invice No.</th><th>Date</th><th>Part</th><th>Trip No</th><th>Billed Qty</th></thead><tbody>';
                            var invoiceDetail2='';
                            var invoiceDetail3;
                            var invoiceDetail4;
                            var h=1;
                            for(var i=0; i<resLen; i++){
                                var tripno1=result.rows.item(i).tripno;
                                console.log('result.rows.item(i)',result.rows.item(i));
                                for(var j=0; j<resLen2; j++){
                                    var tripno2=result2.rows.item(j).tripno;
                                    console.log('result2.rows.item(j)',result2.rows.item(j));
                                    if(tripno1===tripno2){
                                        console.log('tripno1==tripno2',tripno1);
                                        invoiceDetail2=invoiceDetail2 + '<tr><td>'+h+'</td><td>'+result2.rows.item(j).invoiceno+'</td><td>'+result.rows.item(i).created_date+'</td><td>CH003</td><td>'+result.rows.item(i).tripno+'</td><td>'+result2.rows.item(j).billqty+'</td></tr>';
                                        h=h+1
                                        console.log('invoiceDetail2',invoiceDetail2);
                                    }
                                }
                                console.log('i :: resLen', i, resLen);
                                if(i===(resLen-1)){
                                    console.log('i==resLen-1');
                                    invoiceDetail3='</tbody></table>';
                                    invoiceDetail4=invoiceDetail1+invoiceDetail2+invoiceDetail3;
                                    $("#invoiceDetail").append(invoiceDetail4);
                                } 
                               
                            }

                        }

                }
            
            }
        }

   })
    
}

$(".go_back_arrow").click(function(){
    window.history.back();
})

function logout_user() {
    window.location = "index.html";
}

function grnObjectCallback(){
    console.log('grnObjectCallback');
}

// $(document).on('change', '.searchChassis', function(){
//     if($(".searchChassis").val().length >= 3) {
//         $(".openChassisTable").click();
//     }  
// })

// $(".groupChassis").click(function(){
//     console.log('clicking groupChassis');
//     showLoading();
//     setTimeout(function(){
//         $(".accordian_parent").show();
//         hideLoading();
//     },1000)
// })

$(".sendGRNbutton").click(function(){
    showLoading();
    setTimeout(function(){
        hideLoading();
    },1000);
    
    alert("Your GRN has been sent successfully");
    window.location = "create_grn.html";
})

$(document).on('change', '.complaintType', function(){
    if(document.getElementById("shortage11").checked) {
        $(".damageClauses").hide();
        $(".shortageClauses").show();
    } else {
        $(".damageClauses").show();
        $(".shortageClauses").hide();
    }
    // alert(checkedStatus)
})

function generateGrnNumber(){
    return ('00000000'+Math.ceil(Math.random()*100000000));
}
$(document).on('click', '#chassisId', function(){ 
    // grnfunc();
    var chassisNumber = $('#chassisNumber').val();
    console.log('chassisNumber', chassisNumber);
    var condition="chassisno LIKE '"+chassisNumber+"%'";
    console.log('condition',condition);
    DBHandler.getChassisRecords('grn_chassis', condition, getChassisRecordsCallback);
    // console.log('getChassisRecordsCallback');
    // alert('getChassisRecordsCallback');
   
});

function getChassisRecordsCallback(result){
     $("#selectChassis").empty();
    alert('getChassisRecordsCallback');
    var resLen = result.rows.length;
    console.log('resLen',resLen);
    var data = { resultData:result.rows, length: resLen};
    // console.log('result.rows',result.rows);
    var tpl = _.template($('#chassisSearchTemplate').html());
    $('#selectChassis').append(tpl(data));
    
    $(".openChassisTable").click();
    // for(var i=0; i<resLen; i++){
    //     console.log('inside loop');
    //     var resResult = result.rows.item(i);
    //     console.log('result.rows',result.rows);
    //     var chassisno = result.rows.item(i).chassisno;
    //     console.log('resResult',resResult);
    //     console.log('chassisno',chassisno);
    //     if(i===resLen-1){
    //         var tpl = _.template($('#chassisSearchTemplate').html());
    //         $('#selectChassis').append(tpl(resResult));
    //         console.log('selectChassis');
    //         console.log('inside resResult',resResult);
    //         console.log('inside chassisno',chassisno);
    //         $(".openChassisTable").click();
          
    //     }
    // }
}

$(document).on('click', '.select_for_chessisno', function(){ 
    chessisfunc();
});

function chessisfunc() {
    var chassisNumber;

    $.each($("input[name='select_for_chessisno[]']:checked").closest("td").siblings("td"),
        function () {
    chassisNumber=$(this).text();
    });

    //var chassisNumber=$("input[name='select_for_chessisno[]']:checked").closest("td").siblings("td").text();
    var chassisObj={
        chassisno: chassisNumber
    };
    console.log('chassisObj',chassisObj);
    var tpl = _.template($('#chassisTemplate').html());
    $('#chassisDetail').append(tpl(chassisObj));

}

$(document).on('click', '.groupChassis', function(){ 
    console.log('clicking groupChassis');
    showLoading();
    setTimeout(function(){
        $(".accordian_parent").show();
        hideLoading();
    },1000)
});

$(document).on('click', '#chassisProfileDetail', function(){ 
    var chassisCount=$('#chassisDetail').children().size();
     console.log('chassisCount',chassisCount);
    // var chassisArray=[];
    var chassisArray = new Array();
    var chassisObj={};
    for(var i=0; i<chassisCount; i++){
        chassisObj.chassisno=$('#chassisDetail').find('.acc_parent_block').eq(i).text();
        console.log('chassisCount',$('#chassisDetail').find('.acc_parent_block option:selected').eq(i).text());
        chassisObj.damage_location="";
        chassisObj.damage_detail=$('#chassisDetail').find('.damageClauses .damageDesc_1 option:selected').eq(i).text();
        console.log('damage_detail',$('#chassisDetail').find('.damageClauses .damageDesc_1 option:selected').eq(i).text());
        chassisObj.damage_type=$('#chassisDetail').find('.damageClauses .damageDesc_2 option:selected').eq(i).text();
        chassisObj.damage_cause=$('#chassisDetail').find('.damageClauses .damageDesc_3 option:selected').eq(i).text();
        chassisObj.attachment="";
        chassisObj.shortage_brand_variant=$('#chassisDetail').find('.shortageClauses .damageDesc_1 option:selected').eq(i).text();
        chassisObj.shortage_part=$('#chassisDetail').find('.shortageClauses .damageDesc_3 option:selected').eq(i).text();
        chassisArray.push(chassisObj);
    }

    console.log('chassisArray',chassisArray);

});

   
