
$(function() {
    document.addEventListener("deviceready", onDeviceReady, true);
});
function onDeviceReady() {
    localStorage.setItem('imageNumber',1);
    $(".AttachmentofVehical").siblings().remove();
    $('.sigPad').signaturePad({drawOnly:true});
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    $(".searchChassis").val("");



    var c2 = document.getElementById("canvasId2");
    var ctx2 = c2.getContext("2d");
    ctx2.clearRect(0, 0, c2.width, c2.height);
    $(function() {
        // $("#datepicker3").datepicker({showButtonPanel: true, changeMonth: true, maxDate: new Date(), changeYear: true, dateFormat: 'dd-mm-yy' }).val;
        // $("#datepicker4").datepicker({showButtonPanel: true, changeMonth: true, maxDate: '0', changeYear: true, dateFormat: 'dd-mm-yy' }).val;
        $("#datepicker3").datepicker({dateFormat: 'dd-mm-yy', showButtonPanel: true, changeMonth: true, changeYear: true}).val;
        $("#datepicker4").datepicker({dateFormat: 'dd-mm-yy', showButtonPanel: true, changeMonth: true, changeYear: true}).val;
        //$('#reportingTime').timepicker({ timeFormat: 'h:mm:ss p', interval: 15});
        //$('#uploadingTime').timepicker({ timeFormat: 'h:mm:ss p', interval: 15 });
    });
 //   	$(".grnDetailsNext").click(function(){
	// 	$(".details_1").removeClass('active');
	// 	$(".details_3").removeClass('active');
	// 	$(".details_2").addClass('active');
	// })

    // $(document).on('click','.damageDesc_1', function(){
       // $(function(){
       //      $.ajax({
       //          type: "GET",
       //          url:"js/api/damage.json",
       //          dataType: "json",
       //          success: function (data) {
       //              var dropdown_data="";
       //              $.each(data.legend,function(i,obj)
       //              {
       //               console.log('legend',obj.material+":"+obj.damage_type);
       //               dropdown_data=dropdown_data+"<option value="+obj.damage_type+">"+obj.material+"</option>";
                    
       //              });  
       //               $('.damageDesc_1').append(dropdown_data); 
       //          },
       //          error: function(e) {
       //          console.log(e);
       //          return false;
       //         }
             
       //      });
       // }); 
        
   // });
	// $(".grnDetailsreport").click(function(){
	// 	$(".details_1").removeClass('active');
	// 	$(".details_3").addClass('active');
	// 	$(".details_2").removeClass('active');
	// })

     /**---------- Start of datepicker js----------**/
    // $('.sandbox-container').datepicker({
    //     format: "dd-mm-yyyy",
    //     autoclose: true,
    //     todayHighlight: true
    // });
    /**---------- End of date picker js----------**/

    DBHandler.initDatabase();
    var c1 = document.getElementById("canvasId1");
    var ctx1 = c1.getContext("2d");
    ctx1.clearRect(0, 0, c1.width, c1.height);
    $('#grndetail').on("click",function(){
        // var grnObject={
        //     grn_number: generateGrnNumber(),
        //     reporting_date : $('#datepicker3').val(),
        //     reporting_time : $('#reportingTime').val(),
        //     uploading_date : $('#datepicker4').val(),
        //     uploading_time : $('#uploadingTime').val(),
        //     delay_type : $('#reason').val(),
        //     reason_of_delay : $('#reasonForDelay').val()
        // };
        var reporting_date = $('#datepicker3').val();
        var uploading_date = $('#datepicker4').val();
        
        if(reporting_date=="" || uploading_date==""){
            $('#reportVerify').removeAttr("href"); 
            $(".details_1").addClass('active'); 
            $(".details_2").removeClass('active');
            $(".details_3").removeClass('active');
            alert('Please fill the grn detail');
        }else{
           $('#grndetail').fadeTo("fast", .5).attr("href", "#profile"); 
           $(".details_1").removeClass('active');
           $(".details_2").addClass('active');
           $(".details_3").removeClass('active');
        }
        var grnObject={
            grn_number: generateGrnNumber(),
            reporting_date : $('#datepicker3').val(),
            reporting_time : $('#reportingHour').val()+':'+$('#reportingMinute').val()+$('#reportingFormat').val(),
            uploading_date : $('#datepicker4').val(),
            uploading_time : $('#uploadingHour').val()+':'+$('#uploadingMinute').val()+$('#uploadingFormat').val(),
            delay_type : $('#reason').val(),
            reason_of_delay : $('#reasonForDelay').val(),
            flag: $.now()
        };
         console.log('grnObject::',grnObject);   
         DBHandler.saveGrn_detail(grnObject, grnObjectCallback);

   })

   //  $(document).on('click', '#datepicker3', function(){
   //      if($("#datepicker3").val().length >= 8 && $("#datepicker4").val().length >= 8) {
   //         var difference= ($("#datepicker4").datepicker("getDate") - $("#datepicker3").datepicker("getDate"))/(1000 * 60 * 60 * 24);
   //      console.log('difference',difference);
           
   //      }  
   // })
    //
    // $("#datepicker3").datepicker({
    // minDate: 0,
    // maxDate: '+1Y+6M',
    // onSelect: function (dateStr) {
    //     var min = $(this).datepicker('getDate'); // Get selected date
    //     $("#datepicker4").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
    // }
    // });

// $("#datepicker4").datepicker({
//     minDate: '0',
//     maxDate: '+1Y+6M',
//     onSelect: function (dateStr) {
//         var max = $(this).datepicker('getDate'); // Get selected date
//         $('#datepicker').datepicker('option', 'maxDate', max || '+1Y+6M'); // Set other max, default to +18 months
        // var start = $("#datepicker3").datepicker("getDate");
        // var end = $("#datepicker4").datepicker("getDate");
        // var days = (end - start) / (1000 * 60 * 60 * 24);
//         console.log('days',days);
//         // $("#TextBox3").val(days);
//     }
// });

   $('.grnDetailsreport').on("click",function(){
        // $('#report').prop( "disabled", false );
        var chassisCount = $('#chassisDetail').children().size();
        if(chassisCount===0){
            $(".details_2").addClass('active'); 
            $('.grnDetailsreport').removeAttr("href");

            $(".details_1").removeClass('active');
            $(".details_2").addClass('active');
            $(".details_3").removeClass('active');
            alert("Please fill the chassis details");
        }else{

            //
            $('.grnDetailsreport').fadeTo("fast", .5).attr("href", "#report"); 
            $(".details_1").removeClass('active');
            $(".details_2").removeClass('active');
            $(".details_3").addClass('active');
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
                    DBHandler.getAllRecordsofTrip('grn_trip', tripCallback);


                    function tripCallback(result){
                         $("#invoiceDetail").empty();
                        var resLen = result.rows.length;
                        console.log('resLen',resLen);
                        var tripno=result.rows.item(0).tripno;
                        console.log('tripno',tripno);
                        var truckno=result.rows.item(0).truckno
                        DBHandler.getAllRecordsofInvoice('grn_invoice', tripno, invoiceCallback);
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

                                console.log('flag:',flag);
                                DBHandler.getAllRecordsofChassis('grn_chassisDetails', flag, chassisCallback);   
                                console.log('After chassisCallback');
                                function chassisCallback(result){
                                    $("#damageDetail").empty();
                                    $("#shortageDetail").empty();
                                    console.log('Inside chassisCallback');
                                    var resLen = result.rows.length;
                                    var damageCause=result.rows.item(0).damage_cause;
                                    var data = { resultData:result.rows, length: resLen};
                                    console.log('data',data);
                                    var tpl = _.template($('#damageDetailTemplate').html());
                                    $('#damageDetail').append(tpl(data));

                                    var tpl = _.template($('#shortageDetailTemplate').html());
                                    $('#shortageDetail').append(tpl(data));

                                    var imageDetail='';
                                    $("#showAttachment").empty();
                                        for(var i=0; i<resLen; i++){
                                            console.log('inside imageDetail');
                                            var imgData=result.rows.item(i).attachment;
                                            console.log('imgData',imgData);
                                            var imgData=result.rows.item(i).attachment;
                                            console.log('imgDatalength',imgData.length);
                                            if(imgData.length>200){
                                                var imageDetail=imageDetail+'<img style="width:60px;height:60px;" src="'+imgData+'" class="carImage">';
                                            }
                                            if(i===(resLen-1)){

                                                $("#showAttachment").append(imageDetail);
                                            } 
                                        }
                                    DBHandler.getAllRecordsodDriver('grn_detail', grndetailCallBack);      
                                    var driverDetail='';
                                    function grndetailCallBack(result){
                                        console.log("result grndetailCallBack",result.rows.item(0));
                                        $("#driverDetail").empty();
                                        var resLen=result.rows.length;
                                        driverDetail='<table class="table-bordered" style="height:286px;"><tr><td>Drivers Name</td><td>Raw Denim</td></tr><tr><td>Transporter code</td><td>2468</td></tr><tr><td>Truck Number</td><td>'+truckno+'</td></tr><tr><td>Reporting Time</td><td>'+result.rows.item(0).reporting_date+' '+result.rows.item(0).reporting_time+'</td></tr><tr><td>Unloading Time</td><td>'+result.rows.item(0).uploading_date+' '+result.rows.item(0).uploading_time+'</td></tr><tr><td>Delivery</td><td>'+result.rows.item(0).delay_type+'</td></tr><tr><td>Reason-delay</td><td>'+result.rows.item(0).reason_of_delay+'</td></tr><tr><td>Approximate delay</td><td>8 days</td></tr><tr><td>Pro-cause of damage</td><td>'+damageCause+'</td></tr></table>';
                                         $("#driverDetail").append(driverDetail);
                                         // chassisArray.length=0;
                                    }

                                }
                                //

                            }

                    }

                    //
                    // function tripCallback(result){
                    //      $("#invoiceDetail").empty();
                    //     var resLen = result.rows.length;
                    //     console.log('resLen',resLen);
                        // DBHandler.getAllRecords('grn_invoice', invoiceCallback);
                            // function invoiceCallback(result2){
                                // var resLen2 = result2.rows.length;
                                // console.log('resLen2',resLen2);
                                // var invoiceDetail1='<h4>Invoice Details</h4><table class="invoiceTableTemp table table-striped table-bordered table-hover"><thead class="invoiceTable"><th>S.N</th><th>Invice No.</th><th>Date</th><th>Part</th><th>Trip No</th><th>Billed Qty</th></thead><tbody>';
                                // var invoiceDetail2='';
                                // var invoiceDetail3;
                                // var invoiceDetail4;
                                // var h=1;
                                // for(var i=0; i<resLen; i++){
                                    // var tripno1=result.rows.item(i).tripno;
                                    // console.log('result.rows.item(i)',result.rows.item(i));
                                    // for(var j=0; j<resLen2; j++){
                                        // var tripno2=result2.rows.item(j).tripno;
                                        // console.log('result2.rows.item(j)',result2.rows.item(j));
                                        // if(tripno1===tripno2){
                                            // console.log('tripno1==tripno2',tripno1);
                                            // invoiceDetail2=invoiceDetail2 + '<tr><td>'+h+'</td><td>1041</td><td>'+result.rows.item(i).created_date+'</td><td>CH003</td><td>'+result.rows.item(i).tripno+'</td><td>100000</td></tr>';
                                            // h=h+1
                                            // console.log('invoiceDetail2',invoiceDetail2);
                                        // }
                                    // }
                                    // console.log('i :: resLen', i, resLen);
                                //     if(i===(resLen-1)){
                                //         console.log('i==resLen-1');
                                //         invoiceDetail3='</tbody></table>';
                                //         invoiceDetail4=invoiceDetail1+invoiceDetail2+invoiceDetail3;
                                //         $("#invoiceDetail").append(invoiceDetail4);
                                //     } 
                                   
                                // }

                            // }

                        // DBHandler.getAllRecords('grn_chassisDetails', chassisCallback);   
                        // console.log('After chassisCallback');
                        //     function chassisCallback(result){
                        //         $("#damageDetail").empty();
                        //         $("#shortageDetail").empty();
                        //         console.log('Inside chassisCallback');
                        //         var resLen = result.rows.length;
                        //         var data = { resultData:result.rows, length: resLen};
                        //         console.log('data',data);
                        //         var tpl = _.template($('#damageDetailTemplate').html());
                        //         $('#damageDetail').append(tpl(data));

                        //         var tpl = _.template($('#shortageDetailTemplate').html());
                        //         $('#shortageDetail').append(tpl(data));

                        //         var imageDetail='';
                        //         $("#showAttachment").empty();
                        //         for(var i=0; i<resLen; i++){
                        //             console.log('inside imageDetail');
                        //             var imgData=result.rows.item(i).attachment;
                        //             console.log('imgData',imgData);
                        //             var imgData=result.rows.item(i).attachment;
                        //             console.log('imgDatalength',imgData.length);
                        //             if(imgData.length>200){
                        //                 var imageDetail=imageDetail+'<img style="width:60px;height:60px;" src="'+imgData+'" class="carImage">';
                        //             }
                        //             if(i===(resLen-1)){

                        //                 $("#showAttachment").append(imageDetail);
                        //             } 
                        //         }
                        //     }

                    // }  

                    //
                
                }
            }

           
        }
        
   })
    
}

$(document).on('change', '#datepicker3', function(){
    $("#NumberofDelay").empty();
    if($("#datepicker3").val().length >= 8) {
    $("#reasonForDelay").empty();  
    var d = new Date(localStorage.getItem('trip_date'));
    var difference= ($("#datepicker3").datepicker("getDate") - d)/(1000 * 60 * 60 * 24);
    if(difference < 0 || difference ==0 ){
        alert('Reporting date should be greather than trip date');
        $("#datepicker3").attr("placeholder", "Reporting Date").val('');
    }else{
        var numberOfdayTravel=Math.ceil(localStorage.getItem('totalDistance')/localStorage.getItem('travelPerDay'));
        console.log('numberOfdayTravel',numberOfdayTravel);
        // var shouldReachDate = new Date(d + numberOfdayTravel*1000*60*60*24);
        var shouldReachDate = new Date(d.getFullYear(),d.getMonth(),d.getDate()+parseInt(numberOfdayTravel));
        console.log('shouldReachDate',shouldReachDate);
        var difference2 = ($("#datepicker3").datepicker("getDate") - shouldReachDate)/(1000 * 60 * 60 * 24);
        console.log('difference2',difference2);
        if(difference2 ==0){
            var option='<option selected="selected">No Delay</option>';
            $("#reasonForDelay").append(option);

        }else if (difference2 > 0){
             var optionList='<option>Problem on road/jam/accident</option><option>Fault in Truck</option><option>Accident with Truck</option><option>Late release of truck due to accessories</option><option>Late release of truck due to late invoice generation</option><option>Late release of truck due to late loading/manpower issue</option><option>Truck detained by RTO/Police</option><option>Negligence by driver</option>';
             $("#reasonForDelay").append(optionList);
             var delay='Approximate Delay : <span>'+difference2+'</span> Days';
             $("#NumberofDelay").append(delay);

             
        }

    }
    // console.log('datepicker3',$("#datepicker3").datepicker("getDate"));
    // console.log('d',d);
    // console.log('difference',difference);
        // if(difference==0){
        //    var option='<option selected="selected">No Delay</option>';
        //    $("#reasonForDelay").append(option);

        // }else if (difference > 0){
        //     var optionList='<option>Problem on road/jam/accident</option><option>Fault in Truck</option><option>Accident with Truck</option><option>Late release of truck due to accessories</option><option>Late release of truck due to late invoice generation</option><option>Late release of truck due to late loading/manpower issue</option><option>Truck detained by RTO/Police</option><option>Negligence by driver</option>';
        //      $("#reasonForDelay").append(optionList);
        // }
   
    }  
})
                    

$(document).on('change', '#datepicker4', function(){
    // $("#NumberofDelay").empty();
    if($("#datepicker3").val().length >= 8 && $("#datepicker4").val().length >= 8) {
    var difference= ($("#datepicker4").datepicker("getDate") - $("#datepicker3").datepicker("getDate"))/(1000 * 60 * 60 * 24);
    console.log('difference',difference);
        if(difference < 0){
            alert('Unloading date should be greater than reporting date');
            $("#datepicker4").attr("placeholder", "Unloading Date").val('');
            console.log('placeholder');
            // document.getElementById('datepicker4').innerHTML="Unloading Date";

        }
   
    }  
})
 
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
    // var invoiceArr=[];
    var invoiceArr=localStorage.getItem("invoiceArr");
   
    console.log('invoiceArr',invoiceArr);
    var invoiceArray = invoiceArr.split(',');
    var arrayLen = invoiceArray.length;
    console.log('invoiceArray',invoiceArray);
    console.log('arrayLen',arrayLen);
    var condition1='';
    var condition2;
    for(var i=0; i<arrayLen; i++){ 
        
        if(i<arrayLen-1){
            condition1=condition1+" invoiceno='"+invoiceArray[i]+"'"+" OR "; 
        }
        
        if(i===arrayLen-1){
            condition2=condition1+" invoiceno='"+invoiceArray[i]+"'";
        }

    }

    console.log('condition2',condition2);
    // console.log('invoiceArr1',invoiceArr[0],invoiceArr[1],invoiceArr[2],invoiceArr[3]);
    var condition=condition2 + " AND chassisno LIKE '"+chassisNumber+"%'";
    console.log('condition',condition);
    DBHandler.getChassisRecords('grn_chassis', condition, getChassisRecordsCallback);
    // console.log('getChassisRecordsCallback');
    // alert('getChassisRecordsCallback');
   
});

function getChassisRecordsCallback(result){
     $("#selectChassis").empty();
    // alert('getChassisRecordsCallback');
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
     // $("#chassisDetail").empty();
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

    $(function(){
        $.ajax({
            type: "GET",
            url:"js/api/damage.json",
            dataType: "json",
            success: function (data) {
                var dropdown_data="";
                $.each(data.legend,function(i,obj)
                {
                 console.log('legend',obj.material+":"+obj.damage_type);
                 dropdown_data=dropdown_data+"<option value="+obj.damage_type+">"+obj.material+"</option>";
                
                });  
                 $('.damageDesc_1').append(dropdown_data); 

                setTimeout(function() {
                    console.log('chosen-select');
                     var config = {
                      '.chosen-select'           : {},
                      '.chosen-select-deselect'  : {allow_single_deselect:true},
                      '.chosen-select-no-single' : {disable_search_threshold:10},
                      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
                      '.chosen-select-width'     : {width:"95%"}
                    }
                    for (var selector in config) {
                      $(selector).chosen(config[selector]);
                    }
                }, 2000);

                // $('.chosen-container, .chosen-container-single, .chosen-container-active').removeAttr('style');
                // $('.chosen-container, .chosen-container-single, .chosen-container-active').attr('style','width:100% !important');
                $('.chosen-container').removeAttr('style');
                $('.chosen-container').attr('style','width:100% !important');


                 
            },
            error: function(e) {
            console.log(e);
            return false;
           }
         
        });
    }); 

    $(function(){
        $.ajax({
            type: "GET",
            url:"js/api/shortage.json",
            dataType: "json",
            success: function (data) {
                var dropdown_data2="";
                $.each(data.legend,function(i,obj)
                {
                 console.log('legend2',obj.description+":"+obj.brand_varient);
                 dropdown_data2=dropdown_data2+"<option value="+obj.description+">"+obj.brand_varient+"</option>";
                
                });  
                 $('.damageDesc_4').append(dropdown_data2); 
            },
            error: function(e) {
            console.log(e);
            return false;
           }
         
        });
    }); 



}

$(document).on('click', '.groupChassis', function(){ 
    console.log('clicking groupChassis');
    showLoading();
    setTimeout(function(){
        $(".accordian_parent").show();
        hideLoading();
    },1000)
});
var flag;
// var chassisArray = new Array();
$(document).on('click', '#chassisProfileDetail', function(){ 

    var chassisCount=$('#chassisDetail').children().size();
     console.log('chassisCount',chassisCount);
    // var chassisArray=[];
    var chassisArray = new Array();
    flag=generateFlagNumber();
    console.log('flag create',flag);
    for(var i=0; i<chassisCount; i++){
        var chassisObj={};
        chassisObj.chassisno=$('#chassisDetail').find('.acc_parent_block').eq(i).text();
        console.log('chassisno',chassisObj.chassisno);
        chassisObj.damage_location="";
        chassisObj.damage_detail=$('#chassisDetail').find('.damageClauses .damageDesc_1 option:selected').eq(i).text();
        console.log('damage_detail',$('#chassisDetail').find('.damageClauses .damageDesc_1 option:selected').eq(i).text());
        chassisObj.damage_type=$('#chassisDetail').find('.damageClauses .damageDesc_2').eq(i).val();
        chassisObj.damage_cause=$('#chassisDetail').find('.damageClauses .damageDesc_3 option:selected').eq(i).text();
        var imageID=$('#chassisDetail').find('.attchmentBlock img').eq(i).attr('id');
        var smallImage = document.getElementById(imageID);
        chassisObj.attachment=smallImage.src;
        console.log('attachment',chassisObj.attachment);
        chassisObj.shortage_brand_variant=$('#chassisDetail').find('.shortageClauses .damageDesc_4 option:selected').eq(i).text();
        chassisObj.shortage_part=$('#chassisDetail').find('.shortageClauses .damageDesc_5').eq(i).val();
        chassisObj.quantity=$('#chassisDetail').find('.shortageClauses .shortageDesc').eq(i).val();
        chassisObj.flag=flag;
        console.log('chassisObj',chassisObj);
        chassisArray.push(chassisObj);
    }

    console.log('chassisArray Detail:',chassisArray);
    DBHandler.saveRecordsofgrn_chassisDetails(chassisArray, saveRecordsofgrn_chassisCallback);

});

function saveRecordsofgrn_chassisCallback(result){
console.log('saveRecordsofgrn_chassisCallback');
}


$(document).on('click', '.select_for_damage_location', function(){ 
    locationFunc();
});
function locationFunc(){ 
    var values = new Array();
    // var locationArray=new Array();
    
    $.each($("input[name='select_for_damage_location[]']:checked"),
        function () {
             values.push($(this).attr('id'));

    });
    localStorage.setItem('location', values)
    console.log('location',localStorage.getItem(location));
    // console.log('location2',localStorage.getItem(location2));
    // console.log('values2',values);
    // localStorage.getItem(locationArray);
    // localStorage.setItem('access_token', log_data.access_token)
    //$("input[name='select_for_damage_location[]']:checked").parents('.modal-content').css({"color": "red", "border": "2px solid red"});
    // $('.modal-content').attr("id", values.toString());
    return values.toString();
    // var checkboxId= $("input[name='select_for_damage_location[]']:checked").attr('id');
    // console.log('checkboxId',checkboxId);
}


$(document).on('click', '.getAttachment', function(){ 

    console.log('getAttachment');
    var imageId=$(this).siblings('img').attr('id');
    console.log('imageId', imageId);

    //var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);

    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, encodingType: Camera.EncodingType.JPEG,
       popoverOptions  : new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
       destinationType: destinationType.DATA_URL });


        function onPhotoDataSuccess(imageData) {
              console.log('onPhotoDataSuccess');
              // Uncomment to view the base64-encoded image data
              // console.log(imageData);

              // Get image handle
              //
              var smallImage = document.getElementById(imageId);
               console.log("document.getElementById(imageId)",smallImage);
                // var smallImage = document.getElementsByClassName('smallImage');
              // Unhide image elements
              //
               smallImage.style.display = 'block';

              // Show the captured photo
              // The in-line CSS rules are used to resize the image
              //
              smallImage.src = "data:image/jpeg;base64," + imageData;
              console.log("smallImage.src",smallImage.src);
        }

});


function onFail(message) {
      alert('Failed because: ' + message);
}

$(document).on('click', '.AttachmentofVehical', function(){ 
    if(localStorage.getItem('imageNumber') > 10){
        alert('Maximum attachment number is exceed');
    }else{
        // alert('select image');
        var grnDetailImageNumber=localStorage.getItem('imageNumber');
        console.log('grnDetailImageNumber',grnDetailImageNumber);
        $( ".AttachmentofVehical" ).after( '<div class="grnImage"><img style="display:none;width:60px;height:60px; padding:2px;" id="showVehicalImage'+grnDetailImageNumber+'" src="" /><button class="imageDelete text-center" style="width:56px">Delete</button></div>');
        console.log('AttachmentofVehical');
        // var imageId=$(this).siblings('img').attr('id');
        var imageId="showVehicalImage"+grnDetailImageNumber;
        console.log('AttachmentofVehicalimageId', imageId);
        //var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);

        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, encodingType: Camera.EncodingType.JPEG,
            popoverOptions  : new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
            destinationType: destinationType.DATA_URL });

       
        function onPhotoDataSuccess(imageData) {
              console.log('onPhotoDataSuccess');
              // Uncomment to view the base64-encoded image data
              // console.log(imageData);

              // Get image handle
              //
              var smallImage = document.getElementById(imageId);
               console.log("document.getElementById(imageId)",smallImage);
                // var smallImage = document.getElementsByClassName('smallImage');
              // Unhide image elements
              //
               smallImage.style.display = 'block';

              // Show the captured photo
              // The in-line CSS rules are used to resize the image
              //
              smallImage.src = "data:image/jpeg;base64," + imageData;
              console.log("smallImage.src",smallImage.src);
              grnDetailImageNumber=parseInt(grnDetailImageNumber)+1;
              localStorage.setItem('imageNumber', grnDetailImageNumber);

        }
    }


});
$(document).on('click', '.imageDelete', function(){
    alert("Image is deleting");
  $(this).parent().remove(); 
});


$(document).on('click', '.getPicture', function(){ 

    console.log('getPicture');
    var imageId=$(this).siblings('img').attr('id');
    console.log('driver image id', imageId);

    //var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);

    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, encodingType: Camera.EncodingType.JPEG,
       popoverOptions  : new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
       destinationType: destinationType.DATA_URL });


        function onPhotoDataSuccess(imageData) {
              console.log('onPhotoDataSuccess');
              // Uncomment to view the base64-encoded image data
              // console.log(imageData);

              // Get image handle
              //
              var smallImage = document.getElementById(imageId);
               console.log("document.getElementById(imageId)",smallImage);
                // var smallImage = document.getElementsByClassName('smallImage');
              // Unhide image elements
              //
               smallImage.style.display = 'block';

              // Show the captured photo
              // The in-line CSS rules are used to resize the image
              //
              smallImage.src = "data:image/jpeg;base64," + imageData;
              console.log("smallImage.src",smallImage.src);
        }

});



// $(function() {
//     $('#sig').signature();
//     $('#clear').click(function() {
//         $('#sig').signature('clear');
//     });
//     $('#json').click(function() {
//         alert($('#sig').signature('toJSON'));
//     });
//     $('#svg').click(function() {
//         alert($('#sig').signature('toSVG'));
//     });
// });
$(document).on('click', '.logout_open', function(){
    console.log('user is logout');
    DBHandler.clearData(); 
    setTimeout(function() {
        console.log('inside function');
         window.location = "index.html";
    }, 1000); 
});

   function generateFlagNumber(){
    return (Math.ceil(Math.random()*100000000));
}
// $(document).on('click','.damageDesc_1', function(){
//     $.ajax({
//             type: "GET",
//             url:"js/api/damage.json",
//             dataType: "json",
//             success: function (data) {
//                 var dropdown_data="";
//                 $.each(data.legend,function(i,obj)
//                 {
//                  console.log('legend',obj.material+":"+obj.damage_type);
//                  dropdown_data=dropdown_data+"<option value="+obj.damage_type+">"+obj.material+"</option>";
                
//                 });  
//                  $('.damageDesc_1').append(dropdown_data); 
//                  console.log('chosen-select');
//                  var config = {
//                   '.chosen-select'           : {},
//                   '.chosen-select-deselect'  : {allow_single_deselect:true},
//                   '.chosen-select-no-single' : {disable_search_threshold:10},
//                   '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
//                   '.chosen-select-width'     : {width:"95%"}
//                 }
//                 for (var selector in config) {
//                   $(selector).chosen(config[selector]);
//                 }
//             },
//             error: function(e) {
//             console.log(e);
//             return false;
//            }
         
//     });
// });

// $(document).on('click', '.damageDesc_2', function(){
//     // var textVal = $(".damageDesc_1 option:selected" ).text();
//      var textVal = $(".damageDesc_1").val();
//     console.log('option value',textVal);
//     $('.damageDesc_2').val(textVal);

// });


$(document).on('change', '.damageDesc_1', function(){
    var textVal = $(".damageDesc_1").val();
    console.log('option value',textVal);
    $('.damageDesc_2').val(textVal);
    $(".damageDesc_2").prop("readonly", true);

});

$(document).on('change', '.damageDesc_4', function(){
    var textVal = $(".damageDesc_4").val();
    console.log('option value',textVal);
    $('.damageDesc_5').val(textVal);
    $(".damageDesc_5").prop("readonly", true);

});


// $(document).on('click','.damageDesc_1', function(){
       // $(function(){
       //      $.ajax({
       //          type: "GET",
       //          url:"js/api/damage.json",
       //          dataType: "json",
       //          success: function (data) {
       //              var dropdown_data="";
       //              $.each(data.legend,function(i,obj)
       //              {
       //               console.log('legend',obj.material+":"+obj.damage_type);
       //               dropdown_data=dropdown_data+"<option value="+obj.damage_type+">"+obj.material+"</option>";
                    
       //              });  
       //               $('.damageDesc_1').append(dropdown_data); 
       //          },
       //          error: function(e) {
       //          console.log(e);
       //          return false;
       //         }
             
       //      });
       // }); 
        
   // });

$(document).on('click','#chassisProfileId', function(){
    var reporting_date = $('#datepicker3').val();
    var uploading_date = $('#datepicker4').val();
    if(reporting_date=="" || uploading_date==""){
       
        // e.preventDefault();
         // $('#reportVerify').fadeTo("fast", .5).removeAttr("href"); 
         $('#chassisProfileId').removeAttr("href"); 
         $(".details_1").addClass('active');
         $(".details_2").removeClass('active');
         $(".details_3").removeClass('active');
          alert("Please fill the grn details");
        // $('#report').prop('disabled',disabled);

    }else{
         $('#chassisProfileId').fadeTo("fast", .5).attr("href", "#profile"); 
         $(".details_1").removeClass('active');
         $(".details_2").addClass('active');
         $(".details_3").removeClass('active');
        // e.preventDefault();
        // $('#report').prop('disabled',disabled);
    }
});

$(document).on('click', '#reportVerify', function(){ 
    var reporting_date = $('#datepicker3').val();
    var uploading_date = $('#datepicker4').val();
    var chassisCount = $('#chassisDetail').children().size();
    if(reporting_date=="" || uploading_date==""){
       
        // e.preventDefault();
         // $('#reportVerify').fadeTo("fast", .5).removeAttr("href"); 
         $('#reportVerify').removeAttr("href"); 
         $(".details_1").addClass('active');
         $(".details_2").removeClass('active');
         $(".details_3").removeClass('active');
          alert("Please fill the grn details");
        // $('#report').prop('disabled',disabled);

    }else if(chassisCount==0){
         $('#reportVerify').removeAttr("href"); 
         $(".details_1").removeClass('active');
         $(".details_2").addClass('active');
         $(".details_3").removeClass('active');
          alert("Please fill the chassis details");
        // e.preventDefault();
        // $('#report').prop('disabled',disabled);
    }else{
         // $('#report').prop( "disabled", false );
         $('#reportVerify').fadeTo("fast", .5).attr("href", "#report"); 
         $(".details_1").removeClass('active');
         $(".details_2").removeClass('active');
         $(".details_3").addClass('active');
    }
    
});
$(document).on('click','#clear1', function(){
    console.log('clicking clear1 button');
    var c1 = document.getElementById("canvasId1");
    var ctx1 = c1.getContext("2d");
    ctx1.clearRect(0, 0, c1.width, c1.height);
});
$(document).on('click','#clear2', function(){
    console.log('clicking clear2 button');
    var c2 = document.getElementById("canvasId2");
    var ctx2 = c2.getContext("2d");
    ctx2.clearRect(0, 0, c2.width, c2.height);
});