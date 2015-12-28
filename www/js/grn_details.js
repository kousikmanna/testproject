$(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
     localStorage.setItem('countClick',1);
     localStorage.setItem('countClick2',1);
     localStorage.setItem('countClick3',1);
     localStorage.setItem('truckLayoutRow',6);
     localStorage.setItem('truckLayoutColumn',4);
    localStorage.setItem('imageNumber',1);
    $(".AttachmentofVehical").siblings().remove();
    $('.sigPad').signaturePad({drawOnly:true});
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    $(".searchChassis").val("");
    var damageList = new Array();
    var  serilizedDamageList = JSON.stringify(damageList);
    localStorage.setItem('selectedDamageList', serilizedDamageList);
    
    var shortageList = new Array();
    var  serilizedShortageList = JSON.stringify(shortageList);
    localStorage.setItem('selectedShortageList', serilizedShortageList);

    var alreadySelectedChassisList= new Array;
    var  serilizedalreadySelectedChassisList = JSON.stringify(alreadySelectedChassisList);
    localStorage.setItem('selectedChassisList', serilizedalreadySelectedChassisList);

    localStorage.setItem('isDamageSelected', false);
    localStorage.setItem('isShortageSelected', false);
    var c2 = document.getElementById("canvasId2");
    var ctx2 = c2.getContext("2d");
    ctx2.clearRect(0, 0, c2.width, c2.height);
    $(function() {
        // $("#datepicker3").datepicker({showButtonPanel: true, changeMonth: true, maxDate: new Date(), changeYear: true, dateFormat: 'dd-mm-yy' }).val;
        // $("#datepicker4").datepicker({showButtonPanel: true, changeMonth: true, maxDate: '0', changeYear: true, dateFormat: 'dd-mm-yy' }).val;
        $("#datepicker3").datepicker({format: 'dd/mm/yyyy', showButtonPanel: true, changeMonth: true, changeYear: true});
        $("#datepicker4").datepicker({format: 'dd/mm/yyyy', showButtonPanel: true, changeMonth: true, changeYear: true});
    });

    DBHandler.initDatabase();
    var c1 = document.getElementById("canvasId1");
    var ctx1 = c1.getContext("2d");
    ctx1.clearRect(0, 0, c1.width, c1.height);
    $('.reporting_date').on('change', function(){
        $('.datepicker').hide();
    });
    $('#scan').on('click',function(){ 
        console.log('scanning');  
        var chassisNumber;
        var scanChassisArr=new Array();
        cordova.plugins.barcodeScanner.scan(
          function (result) {
              console.log("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
              alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
              chassisNumber=result.text;
              if(chassisNumber.length>2){
                console.log('chassisNumber',chassisNumber);
                scanChassisArr.push(chassisNumber);
                var  serilizedScanChassisArr = JSON.stringify(scanChassisArr);
                localStorage.setItem('scanChassisArray', serilizedScanChassisArr);
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
                var condition=condition2 + " AND chassisno LIKE '"+chassisNumber+"%'";
                console.log('condition',condition);
                DBHandler.chassisDetails('grn_chassis', condition, chassisDetailsCallback);

              }
          }, 
          function (error) {
              alert("Scanning failed: " + error);
          },
          {
            SCAN_HEIGHT : 200, 
            SCAN_WIDTH  : 600      
          }
       );

    });
    
   $('.grnDetailsreport').on("click",function(){
        var chassisCount = $('#chassisDetail').children().size();
        if(chassisCount==0){
            $(".details_2").addClass('active'); 
            $('.grnDetailsreport').removeAttr("href");

            $(".details_1").removeClass('active');
            $(".details_2").addClass('active');
            $(".details_3").removeClass('active');
            alert("Please fill chassis details");
        }
   });
   $('.grnDetailsreport2').on("click",function(){
    console.log('grnDetailsreport2 clicking');
        // $('#report').prop( "disabled", false );
        var chassisCount = $('#chassisDetail').children().size();
        if(chassisCount==0){
            $(".details_2").addClass('active'); 
            $('.grnDetailsreport').removeAttr("href");

            $(".details_1").removeClass('active');
            $(".details_2").addClass('active');
            $(".details_3").removeClass('active');
            alert("Please fill chassis details");
        }else{
            var validationFlag1=localStorage.getItem('validationFlag1');
            // var validationFlag2=localStorage.getItem('validationFlag2');
                if(validationFlag1 == true || validationFlag1 == "true"){
                    showLoading();
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
                        reportDetail2='<label class="dealerInfo">GRN #: </label><span class="dearlerValues" id="grn1234">'+grnNumber+'</span><br>';
                        DBHandler.getAllRecords('dealer', dealerDetailCallback);

                        function dealerDetailCallback(result){
                            console.log('result.rows.length', result.rows.length);
                            console.log('items', result.rows.item(0));
                            dealer_name=result.rows.item(0).dealer_name;
                            dealer_code=result.rows.item(0).dealer_code;
                            pdi_manager=result.rows.item(0).pdi_manager;

                            reportDetail3='<label class="dealerInfo">Dealer Name: </label><span class="dearlerValues" id="dealerName1234">'+dealer_name+'</span><br><label class="dealerInfo">Dealer Code: </label><span class="dearlerValues" id="dealerCode1234">'+dealer_code+'</span><br><label class="dealerInfo">PDI Manager: </label><span class="dearlerValues">'+pdi_manager+'</span>';
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
                                        var invoiceDetail1='<h4>Invoice Details</h4><table class="invoiceTableTemp table table-striped table-bordered table-hover" id="tripTable"><thead class="invoiceTable"><th>S.N</th><th>Invice No.</th><th>Date</th><th>Part</th><th>Trip No</th><th>Billed Qty</th></thead><tbody>';
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
                                                    localStorage.setItem('truckno',result.rows.item(i).truckno);
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
                                            console.log('resLen',resLen);
                                            var damageCause=result.rows.item(0).damage_cause;
                                            var data = { resultData:result.rows, length: resLen};
                                            console.log('data',data);
                                            var isDamageSelect=  localStorage.getItem('isDamageSelected');
                                            var isShortageSelect= localStorage.getItem('isShortageSelected');
                                            if(isDamageSelect==true || isDamageSelect=="true"){
                                                var tpl = _.template($('#damageDetailTemplate').html());
                                                $('#damageDetail').append(tpl(data));
                                            }
                                            if(isShortageSelect == true || isShortageSelect == "true"){
                                                var tpl = _.template($('#shortageDetailTemplate').html());
                                                $('#shortageDetail').append(tpl(data));
                                            }
                                           
                                          
                                            DBHandler.getAllRecordsodDriver('grn_detail', grndetailCallBack);      
                                            var driverDetail='';
                                            function grndetailCallBack(result){
                                                console.log("result grndetailCallBack",result.rows.item(0));
                                                $("#driverDetail").empty();
                                                var resLen=result.rows.length;
                                                //driverDetail='<table class="table-bordered" style="height:286px;"><tr><td>Drivers Name</td><td>Raw Denim</td></tr><tr><td>Transporter code</td><td>2468</td></tr><tr><td>Truck Number</td><td>'+truckno+'</td></tr><tr><td>Reporting Time</td><td>'+result.rows.item(0).reporting_date+' '+result.rows.item(0).reporting_time+'</td></tr><tr><td>Unloading Time</td><td>'+result.rows.item(0).uploading_date+' '+result.rows.item(0).uploading_time+'</td></tr><tr><td>Delivery</td><td>'+result.rows.item(0).delay_type+'</td></tr><tr><td>Reason-delay</td><td>'+result.rows.item(0).reason_of_delay+'</td></tr><tr><td>Approximate delay</td><td>8 days</td></tr><tr><td>Pro-cause of damage</td><td>'+damageCause+'</td></tr></table>';
                                                driverDetail='<table class="table-bordered tg">\
                                                <tr>\
                                                <th class="tg-yw4l tab_head">Drivers Name</th>\
                                                <th class="tg-yw4l tab_head">Transporter code</th>\
                                                <th class="tg-yw4l tab_head">Truck Number</th>\
                                                <th class="tg-yw4l tab_head">Reporting Time</th>\
                                                </tr>\
                                                <tr>\
                                                <td class="tg-yw4l">Raw Denim</td>\
                                                <td class="tg-yw4l">2468</td>\
                                                <td class="tg-yw4l">'+truckno+'</td>\
                                                <td class="tg-yw4l">'+result.rows.item(0).reporting_date+' '+result.rows.item(0).reporting_time+'</td>\
                                                </tr>\
                                                <tr>\
                                                <th class="tg-yw4l tab_head">Unloading Time</th>\
                                                <th class="tg-yw4l tab_head">Delivery</th>\
                                                <th class="tg-yw4l tab_head">Reason-delay</th>\
                                                <th class="tg-yw4l tab_head">Approximate delay</th>\
                                                </tr>\
                                                <tr>\
                                                <td class="tg-yw4l">'+result.rows.item(0).uploading_date+' '+result.rows.item(0).uploading_time+'</td>\
                                                <td class="tg-yw4l">'+result.rows.item(0).delay_type+'</td>\
                                                <td class="tg-yw4l">'+result.rows.item(0).reason_of_delay+'</td>\
                                                <td class="tg-yw4l">8</td>\
                                                </tr>\
                                                </table>';
                                                 $("#driverDetail").append(driverDetail);
                                                 hideLoading();
                                                 // chassisArray.length=0;
                                            }

                                        }


                                        
                                    }

                            }

                        }
                    }

              }else{
                alert("Please fill the chassis details");
             }

        }
        
   })
    
}   


    function chassisDetailsCallback(result){
        var resLen = result.rows.length;
        var chassisList = new Array();
        for(var i=0; i<resLen; i++){
            var chassisNumber=result.rows.item(i).chassisno;
            chassisList.push(chassisNumber);
        }
        console.log('chassisList',chassisList);
        var scanChassis = localStorage.getItem('scanChassisArray');
        var scanChassisList = $.parseJSON(scanChassis);
        var scanChassisNo=scanChassisList[0];
        console.log('scanChassisList',scanChassisList);
        var scanChassisNumber=_.intersection(scanChassisList, chassisList);
        console.log('scanChassisNumber',scanChassisNumber);
        var length=scanChassisNumber.length;
        if(length>0){
            var chassisNo=scanChassisNumber[0];
            var len=chassisNo.length;
            if(len>2){
                chassisFunction(chassisNo);
                // $('.select_for_chessisno').click();
            }
        }else{
            // alert('This chassis number is not belong to this trip number');
            chassisFunction(scanChassisNo);
        } 
    }



    function chassisFunction(chassisNo){
        var chassisNumber=chassisNo;
        console.log('chassisNumber',chassisNumber);
        var arr = new Array();
        // console.log('type1',typeof(arr));
        arr = localStorage.getItem('selectedChassisList');
        var chassisArr = $.parseJSON(arr);
        // console.log('type2',typeof(chassisArr));
        // console.log('chassisArr',chassisArr);
        // $.each($("input[name='select_for_chessisno[]']:checked").closest("td").siblings("td"),
        //     function () {
        // chassisNumber=$(this).text();
        // console.log('chassisNumber',chassisNumber);
        // chassisArr.push(chassisNumber);
        // });
        chassisArr.push(chassisNumber);
        var  serilizedchassisArr = JSON.stringify(chassisArr);
        console.log('serilizedchassisArr',serilizedchassisArr);
        localStorage.setItem('selectedChassisList', serilizedchassisArr);

        var damageList = new Array();
        var  serilizedDamageList = JSON.stringify(damageList);
        localStorage.setItem('selectedDamageList', serilizedDamageList);
        
        var shortageList = new Array();
        var  serilizedShortageList = JSON.stringify(shortageList);
        localStorage.setItem('selectedShortageList', serilizedShortageList);

        //var chassisNumber=$("input[name='select_for_chessisno[]']:checked").closest("td").siblings("td").text();
        var chassisObj={
            chassisno: chassisNumber
        };
        console.log('chassisObj',chassisObj);
        var tpl = _.template($('#chassisTemplate').html());
        $('#chassisDetail').append(tpl(chassisObj));
    }
 //
 // $(document).ready(function(){
        
        // var shortage=localStorage.getItem(shortage);
        // var damage=localStorage.getItem(damage);
        // var short_click=localStorage.getItem(short_click);
        // var dam_click=localStorage.getItem(dam_click);
        var shortage;
        var damage;
        var short_click=1;
        var dam_click=1;
        $(document).on('click', '.damage_btn', function(e){
            var someId=$(this).attr('id');
            var someArr =someId.split('_');
            var damageChassisId=someArr[1];
            localStorage.setItem('isDamageSelected', true);
            console.log('damage_btn click');
            var damage_btnId=$(this).attr('id');
            var arr=damage_btnId.split('_');
            var chassisNumber=arr[1];
            var blockId='tableCreate'+arr[1];
            var damageBlockCount=parseInt($('#'+blockId).children().size());
            console.log('damageBlockCount',damageBlockCount);
            var type=$('#'+blockId+' .damageShortageClauses .type').last().text();
            console.log('type',type);
            var chassisObj={};
            var validationFlag;
            var chassisArray = new Array();
            if(damageBlockCount == 0){
                validationFlag=true;
            }else{

                if(type=="Damage"){
                    // chassisObj.type=type.toLowerCase();
                    // chassisObj.damage_location=localStorage.getItem('truckLayout'+chassisNumber);
                    // chassisObj.damage_detail=$('#'+blockId+' .damageShortageClauses').eq(damageBlockCount-1).find('.damageDesc_1 option:selected').text();
                    // chassisObj.damage_type=$('#'+blockId+' .damageShortageClauses').eq(damageBlockCount-1).find('.damageDesc_2').val();
                    // chassisObj.damage_cause=$('#'+blockId+' .damageShortageClauses').eq(damageBlockCount-1).find('.damageDesc_3 option:selected').text();
                    chassisObj.type=type.toLowerCase();
                    chassisObj.damage_location=localStorage.getItem('truckLayout'+chassisNumber);
                    chassisObj.damage_detail=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_1').val();
                    chassisObj.damage_type=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_2').val();
                    chassisObj.damage_cause=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_3 option:selected').text();
                    // var imageID=$('#'+tableId+' .damageShortageClauses').find('.attchmentBlock img').eq(j).attr('id');
                    // var smallImage = document.getElementById(imageID);
                    // chassisObj.attachment=smallImage.src;
                    var damageImageCount=$('#'+blockId+' .damageShortageClauses .attchmentBlock .getAttachment').eq(damageBlockCount-1).siblings().size();
                    console.log('damageImageCount',damageImageCount);
                    var imageArray = new Array();
                    for(var l=0; l<damageImageCount; l++){
                        console.log('inside for loop');
                        
                        var imageID = $('#'+blockId+' .damageShortageClauses .attchmentBlock').last().find('.damageShortageImage .image1234').eq(l).attr('id');
                    
                        console.log('imageID2',imageID);
                        var smallImage = document.getElementById(imageID);
                        imageArray.push(smallImage.src);
                    }
                    
                    var serilizedImageData = JSON.stringify(imageArray);
                    console.log('serilizedImageData',serilizedImageData);
                    chassisObj.attachment=serilizedImageData;
                    chassisArray.push(chassisObj);
                }else if(type=="Shortage"){
                    chassisObj.type=type.toLowerCase();
                    chassisObj.shortage_brand_variant=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_4').val();
                    chassisObj.shortage_part=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_5').val();
                    chassisObj.quantity=$('#'+blockId+' .damageShortageClauses').last().find('.shortageDesc').val();
                
                    var shortageImageCount=$('#'+blockId+' .damageShortageClauses .attchmentBlock .getAttachment').last().siblings().size();
                    console.log('shortageImageCount',shortageImageCount);
                    var imageArray = new Array();
                    for(var l=0; l<shortageImageCount; l++){
                        console.log('inside for loop');
                       
                        var imageID = $('#'+blockId+' .damageShortageClauses .attchmentBlock').last().find(' .damageShortageImage .image1234').eq(l).attr('id');
                       
                        console.log('imageID2',imageID);
                        var smallImage = document.getElementById(imageID);
                        imageArray.push(smallImage.src);
                    }

                    var serilizedImageData = JSON.stringify(imageArray);
                    console.log('serilizedImageData',serilizedImageData);
                    chassisObj.attachment=serilizedImageData;
                    chassisArray.push(chassisObj);

                }

                console.log('chassisArray',chassisArray);
                for(var i=0; i<chassisArray.length; i++){
                    if(chassisArray[i].type=="damage"){

                        if(chassisArray[i].damage_location==null){
                             validationFlag=false;
                             alert("Please fill the damage_location of chassis number " + damageChassisId);
                        } else if(chassisArray[i].damage_detail==""){
                             validationFlag=false;
                             alert("Please fill the damage_detail of chassis number " + damageChassisId);

                        } else if(chassisArray[i].damage_type==""){
                             validationFlag=false;
                             alert("Please fill the damage_type of chassis number " + damageChassisId);
                        } else if(chassisArray[i].damage_cause=="Probable cause of damage"){
                             validationFlag=false;
                             alert("Please fill the damage_cause of chassis number " + damageChassisId);
                        } else if(chassisArray[i].attachment=="[]"){
                             validationFlag=false;
                             alert("Please fill the attachment of chassis number " + damageChassisId);
                        } else{
                             validationFlag=true;
                        }
                    }else if(chassisArray[i].type=="shortage"){
                        if(chassisArray[i].shortage_brand_variant==""){
                            validationFlag=false;
                            alert("Please fill the shortage_brand_variant of chassis number " + damageChassisId);
                        } else if(chassisArray[i].shortage_part==""){
                            validationFlag=false;
                            alert("Please fill the shortage_part of chassis number " + damageChassisId);
                        } else if(chassisArray[i].quantity==""){
                            validationFlag=false;
                            alert("Please fill the quantity of chassis number " + damageChassisId);

                        } else{
                            validationFlag=true;
                        }

                    }

                }
            

            }
            
            if(validationFlag==true){
                add_damage_rows();
                // $(function(){
                //     $.ajax({
                //         type: "GET",
                //         url:"js/api/damage.json",
                //         dataType: "json",
                //         success: function (data) {
                //             var dropdown_data="";
                //             var selectedDamageListDetail=new Array();
                //             var selectedDamageListDetail=localStorage.getItem('selectedDamageList');
                //             var listofDamage = $.parseJSON(selectedDamageListDetail);
                //             console.log('listofDamage',listofDamage);
                //             var len=listofDamage.length;
                //             $.each(data.legend,function(i,obj)
                //             {   
                //                 if(len<1){
                //                     console.log('legend',obj.material+":"+obj.damage_type);
                //                     dropdown_data=dropdown_data+"<option value="+obj.damage_type+">"+obj.material+"</option>";
                //                 }else{
                //                     for(var i=0; i<len; i++){
                //                         if(obj.material != listofDamage[i]){
                //                             console.log('legend',obj.material+":"+obj.damage_type);
                //                             dropdown_data=dropdown_data+"<option value="+obj.damage_type+">"+obj.material+"</option>";
                //                         }

                //                     } 
                //                 }
                                
                               // console.log('legend',obj.material+":"+obj.damage_type);
                               // dropdown_data=dropdown_data+"<option value="+obj.damage_type+">"+obj.material+"</option>";
                              
                            // });  
                            // $('.damageDesc_1').append(dropdown_data); 

                            setTimeout(function() {
                                $(function () {
                                    'use strict';
                                    var countriesArray = $.map(countries, function (value, key) { return { value: value, data: key }; });

                                    // Setup jQuery ajax mock:
                                    $.mockjax({
                                        url: '',
                                        responseTime: 2000,
                                        response: function (settings) {
                                            var query = settings.data.query,
                                                queryLowerCase = query.toLowerCase(),
                                                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                                                suggestions = $.grep(countriesArray, function (country) {
                                                     // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                                                    return re.test(country.value);
                                                }),
                                                response = {
                                                    query: query,
                                                    suggestions: suggestions
                                                };

                                            this.responseText = JSON.stringify(response);
                                        }
                                    });

                                    // Initialize ajax autocomplete:
                                    $('.autocomplete-ajax').autocomplete({
                                        // serviceUrl: '/autosuggest/service/url',
                                        lookup: countriesArray,
                                        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
                                            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
                                            return re.test(suggestion.value);
                                        },
                                        onSelect: function(suggestion) {
                                            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
                                        },
                                        onHint: function (hint) {
                                            $('.autocomplete-ajax-x').val(hint);
                                        },
                                        onInvalidateSelection: function() {
                                            $('#selction-ajax').html('You selected: none');
                                        }
                                    });

                                    var nhlTeams = ['Anaheim Ducks', 'Atlanta Thrashers', 'Boston Bruins', 'Buffalo Sabres', 'Calgary Flames', 'Carolina Hurricanes', 'Chicago Blackhawks', 'Colorado Avalanche', 'Columbus Blue Jackets', 'Dallas Stars', 'Detroit Red Wings', 'Edmonton OIlers', 'Florida Panthers', 'Los Angeles Kings', 'Minnesota Wild', 'Montreal Canadiens', 'Nashville Predators', 'New Jersey Devils', 'New Rork Islanders', 'New York Rangers', 'Ottawa Senators', 'Philadelphia Flyers', 'Phoenix Coyotes', 'Pittsburgh Penguins', 'Saint Louis Blues', 'San Jose Sharks', 'Tampa Bay Lightning', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Washington Capitals'];
                                    var nbaTeams = ['Atlanta Hawks', 'Boston Celtics', 'Charlotte Bobcats', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'LA Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Jersey Nets', 'New Orleans Hornets', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia Sixers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'];
                                    var nhl = $.map(nhlTeams, function (team) { return { value: team, data: { category: 'NHL' }}; });
                                    var nba = $.map(nbaTeams, function (team) { return { value: team, data: { category: 'NBA' } }; });
                                    var teams = nhl.concat(nba);

                                    // Initialize autocomplete with local lookup:
                                    $('#autocomplete').devbridgeAutocomplete({
                                        lookup: teams,
                                        minChars: 1,
                                        onSelect: function (suggestion) {
                                            $('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data.category);
                                        },
                                        showNoSuggestionNotice: true,
                                        noSuggestionNotice: 'Sorry, no matching results',
                                        groupBy: 'category'
                                    });
                                    
                                    // Initialize autocomplete with custom appendTo:
                                    $('#autocomplete-custom-append').autocomplete({
                                        lookup: countriesArray,
                                        appendTo: '#suggestions-container'
                                    });

                                    // Initialize autocomplete with custom appendTo:
                                    $('#autocomplete-dynamic').autocomplete({
                                        lookup: countriesArray
                                    });
                                });
                                // location.reload();
                                // console.log('Before chosen-select config');
                                // var config = {
                                //     '.chosen-select'           : {},
                                //     '.chosen-select-deselect'  : {allow_single_deselect:true},
                                //     '.chosen-select-no-single' : {disable_search_threshold:10},
                                //     '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
                                //     '.chosen-select-width'     : {width:"95%"}
                                // }
                                // for (var selector in config) {
                                //     $(selector).chosen(config[selector]);
                                // }
                                // console.log('After chosen-select config');
                            }, 1000);

                          //   $('.chosen-container').removeAttr('style');
                          //   $('.chosen-container').attr('style','width:100% !important');
                               
                          // },
                //           error: function(e) {
                //           console.log(e);
                //           return false;
                //          }
                       
                //     });
                // }); 
            }
         
        });

        $(document).on('click', '.shortage_btn', function(e){
            var someId=$(this).attr('id');
            var someArr =someId.split('_');
            var shortageChassisId=someArr[1];
            localStorage.setItem('isShortageSelected', true);
            console.log('shortage_btn click');
            var damage_btnId=$(this).attr('id');
            var arr=damage_btnId.split('_');
            var chassisNumber=arr[1];
            var blockId='tableCreate'+arr[1];
            var damageBlockCount=$('#'+blockId).children().size();
            console.log('damageBlockCount',damageBlockCount);
            var type=$('#'+blockId+' .damageShortageClauses .type').last().text();
            console.log('type',type);
            var chassisObj={};
            var validationFlag;
            var chassisArray = new Array();
            if(damageBlockCount == 0){
                validationFlag=true;
            }else{

                if(type=="Damage"){
                    chassisObj.type=type.toLowerCase();
                    chassisObj.damage_location=localStorage.getItem('truckLayout'+chassisNumber);
                    chassisObj.damage_detail=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_1').val();
                    chassisObj.damage_type=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_2').val();
                    chassisObj.damage_cause=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_3 option:selected').text();
                    // var imageID=$('#'+tableId+' .damageShortageClauses').find('.attchmentBlock img').eq(j).attr('id');
                    // var smallImage = document.getElementById(imageID);
                    // chassisObj.attachment=smallImage.src;
                    var damageImageCount=$('#'+blockId+' .damageShortageClauses .attchmentBlock .getAttachment').last().siblings().size();
                    console.log('damageImageCount',damageImageCount);
                    var imageArray = new Array();
                    for(var l=0; l<damageImageCount; l++){
                        console.log('inside for loop');
                        //var imageID = $('#'+tableId+' .damageShortageClauses .attchmentBlock .damageShortageImage .image1234').eq(l).attr('id');
                        var imageID = $('#'+blockId+' .damageShortageClauses .attchmentBlock').last().find('.damageShortageImage .image1234').eq(l).attr('id');
                        // alert(imageID);
                        console.log('imageID2',imageID);
                        var smallImage = document.getElementById(imageID);
                        imageArray.push(smallImage.src);
                    }
                    
                    var serilizedImageData = JSON.stringify(imageArray);
                    console.log('serilizedImageData',serilizedImageData);
                    chassisObj.attachment=serilizedImageData;
                    chassisArray.push(chassisObj);
                }else if(type=="Shortage"){
                    chassisObj.type=type.toLowerCase();
                    chassisObj.shortage_brand_variant=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_4').val();
                    chassisObj.shortage_part=$('#'+blockId+' .damageShortageClauses').last().find('.damageDesc_5').val();
                    chassisObj.quantity=$('#'+blockId+' .damageShortageClauses').last().find('.shortageDesc').val();
                
                    var shortageImageCount=$('#'+blockId+' .damageShortageClauses .attchmentBlock .getAttachment').last().siblings().size();
                    console.log('shortageImageCount',shortageImageCount);
                    var imageArray = new Array();
                    for(var l=0; l<shortageImageCount; l++){
                        console.log('inside for loop');
                       
                        var imageID = $('#'+blockId+' .damageShortageClauses .attchmentBlock').last().find('.damageShortageImage .image1234').eq(l).attr('id');
                       
                        console.log('imageID2',imageID);
                        var smallImage = document.getElementById(imageID);
                        imageArray.push(smallImage.src);
                    }

                    var serilizedImageData = JSON.stringify(imageArray);
                    console.log('serilizedImageData',serilizedImageData);
                    chassisObj.attachment=serilizedImageData;
                    chassisArray.push(chassisObj);

                }

                console.log('chassisArray',chassisArray);
                for(var i=0; i<chassisArray.length; i++){
                    if(chassisArray[i].type=="damage"){

                        if(chassisArray[i].damage_location==null){
                             validationFlag=false;
                             alert("Please fill the damage_location of chassis number "+shortageChassisId);
                        } else if(chassisArray[i].damage_detail==""){
                             validationFlag=false;
                             alert("Please fill the damage_detail of chassis number "+shortageChassisId);

                        } else if(chassisArray[i].damage_type==""){
                             validationFlag=false;
                             alert("Please fill the damage_type of chassis number "+shortageChassisId);
                        } else if(chassisArray[i].damage_cause=="Probable cause of damage"){
                             validationFlag=false;
                             alert("Please fill the damage_cause of chassis number "+shortageChassisId);
                        } else if(chassisArray[i].attachment=="[]"){
                             validationFlag=false;
                             alert("Please fill the attachment of chassis number "+shortageChassisId);
                        } else{
                             validationFlag=true;
                        }
                    }else if(chassisArray[i].type=="shortage"){
                        if(chassisArray[i].shortage_brand_variant==""){
                            validationFlag=false;
                            alert("Please fill the shortage_brand_variant of chassis number "+shortageChassisId);
                        } else if(chassisArray[i].shortage_part==""){
                            validationFlag=false;
                            alert("Please fill the shortage_part of chassis number "+shortageChassisId);
                        } else if(chassisArray[i].quantity==""){
                            validationFlag=false;
                            alert("Please fill the quantity of chassis number "+shortageChassisId);

                        } else{
                            validationFlag=true;
                        }

                    }

                }
            

            }

            if(validationFlag==true){
                add_shortage_rows();
                // $(function(){
                //     $.ajax({
                //         type: "GET",
                //         url:"js/api/shortage.json",
                //         dataType: "json",
                //         success: function (data) {
                //             var dropdown_data2="";
                //             var selectedShortageListDetail=new Array();
                //             var selectedShortageListDetail=localStorage.getItem('selectedShortageList');
                //             var listofShortage = $.parseJSON(selectedShortageListDetail);
                //             console.log('listofShortage',listofShortage);
                //             var len=listofShortage.length;
                            // $.each(data.legend,function(i,obj)
                            // {
                            //     if(len<1){
                            //             console.log('legend2',obj.description+":"+obj.brand_varient);
                            //             dropdown_data2=dropdown_data2+"<option value="+obj.description+">"+obj.description+"</option>";
                            //         }else{
                            //             for(var i=0; i<len; i++){
                            //                 if(obj.description != listofShortage[i]){
                            //                     console.log('legend2',obj.description+":"+obj.brand_varient);
                            //                     dropdown_data2=dropdown_data2+"<option value="+obj.description+">"+obj.description+"</option>";
                            //                 }

                            //             } 
                            //         }   
                                 // console.log('legend2',obj.description+":"+obj.brand_varient);
                                 // dropdown_data2=dropdown_data2+"<option value="+obj.description+">"+obj.description+"</option>";
                                
                //             });  
                //              $('.damageDesc_4').append(dropdown_data2); 
                            setTimeout(function() {
                                $(function () {
                                    'use strict';
                                    var shortagesArray = $.map(shortages, function (value, key) { return { value: value, data: key }; });

                                    // Setup jQuery ajax mock:
                                    $.mockjax({
                                        url: '',
                                        responseTime: 2000,
                                        response: function (settings) {
                                            var query = settings.data.query,
                                                queryLowerCase = query.toLowerCase(),
                                                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                                                suggestions = $.grep(shortagesArray, function (shortage) {
                                                     // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                                                    return re.test(shortage.value);
                                                }),
                                                response = {
                                                    query: query,
                                                    suggestions: suggestions
                                                };

                                            this.responseText = JSON.stringify(response);
                                        }
                                    });

                                    // Initialize ajax autocomplete:
                                    $('.autocomplete-ajax-s').autocomplete({
                                        // serviceUrl: '/autosuggest/service/url',
                                        lookup: shortagesArray,
                                        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
                                            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
                                            return re.test(suggestion.value);
                                        },
                                        onSelect: function(suggestion) {
                                            $('#selction-ajax-s').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
                                        },
                                        onHint: function (hint) {
                                            $('.autocomplete-ajax-s-x').val(hint);
                                        },
                                        onInvalidateSelection: function() {
                                            $('#selction-ajax-s').html('You selected: none');
                                        }
                                    });

                                    var nhlTeams = ['Anaheim Ducks', 'Atlanta Thrashers', 'Boston Bruins', 'Buffalo Sabres', 'Calgary Flames', 'Carolina Hurricanes', 'Chicago Blackhawks', 'Colorado Avalanche', 'Columbus Blue Jackets', 'Dallas Stars', 'Detroit Red Wings', 'Edmonton OIlers', 'Florida Panthers', 'Los Angeles Kings', 'Minnesota Wild', 'Montreal Canadiens', 'Nashville Predators', 'New Jersey Devils', 'New Rork Islanders', 'New York Rangers', 'Ottawa Senators', 'Philadelphia Flyers', 'Phoenix Coyotes', 'Pittsburgh Penguins', 'Saint Louis Blues', 'San Jose Sharks', 'Tampa Bay Lightning', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Washington Capitals'];
                                    var nbaTeams = ['Atlanta Hawks', 'Boston Celtics', 'Charlotte Bobcats', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'LA Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Jersey Nets', 'New Orleans Hornets', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia Sixers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'];
                                    var nhl = $.map(nhlTeams, function (team) { return { value: team, data: { category: 'NHL' }}; });
                                    var nba = $.map(nbaTeams, function (team) { return { value: team, data: { category: 'NBA' } }; });
                                    var teams = nhl.concat(nba);

                                    // Initialize autocomplete with local lookup:
                                    $('#autocomplete').devbridgeAutocomplete({
                                        lookup: teams,
                                        minChars: 1,
                                        onSelect: function (suggestion) {
                                            $('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data.category);
                                        },
                                        showNoSuggestionNotice: true,
                                        noSuggestionNotice: 'Sorry, no matching results',
                                        groupBy: 'category'
                                    });
                                    
                                    // Initialize autocomplete with custom appendTo:
                                    $('#autocomplete-custom-append').autocomplete({
                                        lookup: shortagesArray,
                                        appendTo: '#suggestions-container'
                                    });

                                    // Initialize autocomplete with custom appendTo:
                                    $('#autocomplete-dynamic').autocomplete({
                                        lookup: shortagesArray
                                    });
                                });
                                
                            }, 1000);
                //         },
                //         error: function(e) {
                //         console.log(e);
                //         return false;
                //        }
                     
                //     });
                // }); 
            }
         
        });

        $(document).on('click', '.remove_all', function(){
            var id=$(this).attr('id');
            console.log('id',id);
            localStorage.setItem('removeId', id);
            console.log('remove_all');
            $('#remove-window').modal('show');
        });

        update_cnt();

        $(document).on('click', '#yes', function(){
            var removeId = localStorage.getItem('removeId');
            var chassisno=localStorage.getItem('chassisno');
            console.log('remove_all yes');
            $('#tableCreate'+removeId).children().remove();
            $('#'+chassisno).hide();
            localStorage.setItem('damage', 0);
            localStorage.setItem('shortage', 0);
            update_cnt();    
            $('#remove-window').modal('hide');
        });

        $(document).on('click', '#no', function(){
            $('#remove-window').modal('hide');
        });

        $(document).on('click', '#rc_yes', function(){
            var chassisRemoveId=localStorage.getItem('chassisRemoveId');
            var chassisId;
            if( chassisRemoveId.charAt( 0 ) === 't' ){
                chassisId = chassisRemoveId.slice( 1 );
            }
            var arr = new Array();
            arr = localStorage.getItem('selectedChassisList');
            var chassisArr = $.parseJSON(arr);
            var index = chassisArr.indexOf(chassisId);
            if (index > -1) {
                chassisArr.splice(index, 1);
            }
            var  serilizedchassisArr = JSON.stringify(chassisArr);
            localStorage.setItem('selectedChassisList', serilizedchassisArr);
            console.log('click remove_chassis');
            $('#abc'+chassisRemoveId).remove();
            $('#remove-chassis-window').modal('hide');
        });

        $(document).on('click', '#rc_no', function(){
            $('#remove-chassis-window').modal('hide');
        });

        $(document).on('click', '.remove_chassis', function(e){
            var id=$(this).attr('id');
            console.log('id',id);
            localStorage.setItem('chassisRemoveId', id);
            console.log('clicking');
            $('#remove-chassis-window').modal('show');
        });
   //  // });


    // <select class="damageDesc_4" id="'+generateFlagNumber()+'" data-title="damageDesc_4">\
    //     <option>Select Shortage</option> \
    // </select>\
    // <input type="hidden" class="damageDesc_5" value="" readonly />\
   function add_shortage_rows () {
       console.log('add_shortage_rows clicking');
       var chassisno=localStorage.getItem('chassisno');
       $('#'+chassisno).show();
       $("p").css("background-color", "yellow");
       $('#tableCreate'+chassisno).append('<div class="shortageBlock damageShortageClauses">\
                    <h4 class="type">Shortage</h4><h1 class="short_delete_row">Delete</h1>\
                    <input type="text" name="shortage" class="damageDesc_4 autocomplete-ajax-s" id="'+generateFlagNumber()+'" placeholder="Select Shortage" style="width:100%; margin-top:10px; height:35px; z-index: 2; background: transparent;"/>\
                    <input type="text" name="shortage" class="autocomplete-ajax-s-x" disabled="disabled" style="width:100%; color: #CCC; background: transparent; z-index: 1; height:1px; display:none"/>\
                    <div id="selction-ajax-s" style="width:100%; margin-top:10px; height:1px; display:none; background: transparent;"></div>\
                    <input type="hidden" class="damageDesc_5" value="" readonly />\
                    <input type="number" id="" class="shortageDesc" name="quentity" class="" placeholder="Enter quantity"/>\
                    <div class="attchmentBlock" data-title="Attachement">\
                      <h4 class="getAttachment" id="'+generateFlagNumber()+'">Attachments <span class="font-10">Vehicle Level</span><i class="fa fa-plus getChassisLabel plusStyle"></i></h4>\
                    </div>\
                  </div>'
                  );
        shortage=localStorage.getItem('shortage');
        shortage++;
        localStorage.setItem('shortage',shortage);
        update_cnt();


        $('.short_delete_row').unbind().bind('click', function(evt) {
            localStorage.setItem('isShortageSelected', false);
            shortage=localStorage.getItem('shortage');
            shortage--;
            localStorage.setItem('shortage',shortage);
            if ( shortage <= 0 ) shortage = 0; 
            update_cnt();
            $(evt.target).parent('div').remove();
        });
    }
    // <select class="damageDesc_1 chosen-select" id="'+generateFlagNumber()+'" data-placeholder="Select Damage" tabindex="2" style="width:100%;margin-top:10px;height:35px;">\
    //     <option value="">Select Damage</option>\
    // </select>\
    function add_damage_rows () {
        console.log('add_damage_rows clicking');
        var chassisno=localStorage.getItem('chassisno');
        $('#'+chassisno).show();
        $('#tableCreate'+chassisno).append('<div class="damageBlock damageShortageClauses">\
              <h4 class="type">Damage</h4> <h1 class="dam_delete_row">Delete</h1>\
              <input type="text" name="country" class="damageDesc_1 autocomplete-ajax" id="'+generateFlagNumber()+'" placeholder="Select Damage" style="width:100%; margin-top:10px; height:35px; z-index: 2; background: transparent;"/>\
              <input type="text" name="country" class="autocomplete-ajax-x" disabled="disabled" style="width:100%; color: #CCC; background: transparent; z-index: 1; height:1px; display:none"/>\
              <div id="selction-ajax" style="width:100%; margin-top:10px; height:1px; display:none; background: transparent;"></div>\
              <input type="text" class="damageDesc_2" value="" readonly/>\
              <select class="damageDesc_3">\
                    <option>Probable cause of damage</option>\
                    <option>Accident</option>\
                    <option>Loose fitting</option>\
                    <option>Others</option>\
              </select>\
              <div class="attchmentBlock" data-title="Attachement">\
                <h4 class="getAttachment" id="'+generateFlagNumber()+'">Attachments <span class="font-10">Vehicle Level</span><i class="fa fa-plus getChassisLabel plusStyle"></i></h4>\
              </div>\
          </div>'
         );
        damage=localStorage.getItem('damage');
        damage++;
        localStorage.setItem('damage',damage);
        update_cnt();

        // $('.dam_delete_row').unbind().bind('click', function(evt) {
          $('.dam_delete_row').unbind().bind('click', function(evt) {
            localStorage.setItem('isDamageSelected', false);
            damage=localStorage.getItem('damage');
            damage--;
            localStorage.setItem('damage',damage);
            if ( damage <= 0 ) damage = 0; 
            update_cnt();
            $(evt.target).parent('div').remove();
        });
    }

    $(document).on('click', '.acc_parent_block', function(){ 
        var id=$(this).attr('id');
        console.log('id',id);
        var anotherId="cn"+id;
        console.log('anotherId',anotherId);
        console.log('value2',$('#'+anotherId).text())
        var damageShortage=$('#'+anotherId).text();
        if(damageShortage==''){
          console.log('damageShortage');
          localStorage.setItem('damage', 0);
          localStorage.setItem('shortage', 0);
        }else{
          var contentArray = damageShortage.split(',');
          console.log('contentArray',contentArray);
          var damageString=contentArray[0].toString();
          var damageArray=damageString.split(':');
          var damageNumber=damageArray[1];
          var shortageString=contentArray[1].toString();
          var shortageArray=damageString.split(':');
          var shortageNumber=damageArray[1];
          console.log('damageNumber, shortagNumber',damageNumber,shortageNumber);
          localStorage.setItem('damage', damageNumber);
          localStorage.setItem('shortage', shortageNumber);
        }

        // damage=localStorage.getItem('damage');
        // shortage=localStorage.getItem('shortage');
        // if(damage==null){
        //   localStorage.setItem('damage', 0);
        // }
        // if(shortage==null){
        //   localStorage.setItem('shortage', 0);
        // }

        // id+damage=localStorage.getItem(id+damage);
        // id+shortage=localStorage.getItem(id+damage);
        // if(id+damage==null){
        //   localStorage.setItem(id+damage, 0);
        // }
        // if(id+shortage==null){
        //   localStorage.setItem(id+shortage, 0);
        // }
    });
    $(document).on('click', '.getAttachment', function(){ 
         var attachmentNumber=$(this).siblings().size();
         var attachmentId=$(this).attr('id');
         console.log('attachmentNumber',attachmentNumber);
         console.log('attachmentId',attachmentId);
        if(attachmentNumber<3){
             // navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, encodingType: Camera.EncodingType.JPEG,
             //    popoverOptions  : new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
             //    destinationType: destinationType.DATA_URL, correctOrientation: true });
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, encodingType: Camera.EncodingType.JPEG,
            popoverOptions  : new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
            destinationType: destinationType.DATA_URL, sourceType : Camera.PictureSourceType.CAMERA, correctOrientation: true});

           
            function onPhotoDataSuccess(imageData) {
                  // alert('select image');
                  // var grnDetailImageNumber=localStorage.getItem('imageNumber');
     
                  // console.log('grnDetailImageNumber',grnDetailImageNumber);
                  var randomNumber=generateFlagNumber();
                  $('#'+attachmentId).after( '<div class="damageShortageImage"><img style="display:none;width:60px;height:60px; padding:2px;" class ="image1234" id="showChassisImage'+randomNumber+'" src="" /><button class="imageDelete text-center" style="width:56px">Delete</button></div>');
                 console.log('AttachmentofChassis');
                 var imageId="showChassisImage"+randomNumber;
                 console.log('AttachmentofChassisImageId', imageId);
                 console.log('onPhotoDataSuccess');
                 var smallImage = document.getElementById(imageId);
                 console.log("document.getElementById(imageId)",smallImage);
                 smallImage.style.display = 'block';
                 smallImage.src = "data:image/jpeg;base64," + imageData;
                 console.log("smallImage.src",smallImage.src);
            }
        }else{
            alert('Maximum attachment numbers are exceed');
        }


    });

    function update_cnt () {
        var chassisno=localStorage.getItem('chassisno');
        damage=localStorage.getItem('damage');
        shortage= localStorage.getItem('shortage');
        $('#cnt'+chassisno).text("Damage:"+damage+",Shortage:"+ shortage );
    }
    function generateRandomNumber(){
        return (Math.ceil(Math.random()*100000000));
    }
    $(document).on('click', '.acc_parent_block', function(){
        shortage=0;
        damage=0;
        short_click=1;
        dam_click=1;
        var chassisno = $(this).text();
        localStorage.setItem('chassisno',chassisno);
    });

$(document).on('click', '#grndetail', function(){
        var grnCount=$('.grnDetailattchmentBlock').children().size()-1;
        console.log('grnCount',grnCount);
        var imageArray = new Array();
        for(var i=0; i<grnCount; i++){
            console.log('inside for loop');
            var imageID = $('.grnDetailattchmentBlock').find('.grnImage img').eq(i).attr('id')
            console.log('imageID2',imageID);
            var smallImage = document.getElementById(imageID);
            imageArray.push(smallImage.src);
        }
        console.log('imageArray',imageArray);
        localStorage.setItem('grnImageArray',imageArray);
        var imageData=imageArray.toString();
        var serilizedImageData = JSON.stringify(imageArray);
        console.log('serilizedImageData',serilizedImageData);
        localStorage.setItem('grnImageData',imageData);
        console.log('imageData2',imageData);
        
        var reportingDate=$('#datepicker3').val();
        var reportingTime= $('#reportingHour').val()+':'+$('#reportingMinute').val()+' '+$('#reportingFormat').val();  
        var unloadingDate=$('#datepicker4').val();
        var unloadingTime=$('#uploadingHour').val()+':'+$('#uploadingMinute').val()+' '+$('#uploadingFormat').val();
        var reportingDateTime=new Date(reportingDate +' '+ reportingTime);
        var unloadingDateTime=new Date(unloadingDate+' '+unloadingTime);
        var diff = (unloadingDateTime - reportingDateTime) / 60000;
        console.log('diff',diff);
        if(reportingDate=="" || unloadingDate==""){
            $('#reportVerify').removeAttr("href"); 
            $(".details_1").addClass('active'); 
            $(".details_2").removeClass('active');
            $(".details_3").removeClass('active');
            alert('Please fill the grn detail');
        }else if(diff <= 0){
            alert('Unloading time should be greater than Reporting time');
        }else{
            $('#grndetail').fadeTo("fast", .5).attr("href", "#profile");
            $('#chassisProfileId').fadeTo("fast", .5).attr("href", "#profile");
            $(".details_1").removeClass('active');
            $(".details_2").addClass('active');
            $(".details_3").removeClass('active');
           
            var countClick=localStorage.getItem('countClick');
            if(countClick == 1){
               countClick=parseInt(countClick)+1;
               localStorage.setItem('countClick',countClick);
               console.log('countClick',countClick);
               $("#grndetail").click();
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
        }
 
});

function dateFunc(date){
   var parts = date.split("/");
   var dateFormat = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
   return dateFormat;
   // return dateFormat.getTime();
}

$(document).on('change', '#datepicker3', function(){
    $("#NumberofDelay").empty();
    if(!/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/.test($("#datepicker3").val())) {
        $("#datepicker3").attr("placeholder", "Reporting Date").val('');
        alert("Invalid date");
    }
    if($("#datepicker3").val().length >= 8) {
        $("#reasonForDelay").empty();  
        var date = localStorage.getItem('trip_date');
        var d2=dateFunc(date);
        console.log('datepicker3',$("#datepicker3").datepicker("getDate"));
        var difference= ($("#datepicker3").datepicker("getDate") - d2)/(1000 * 60 * 60 * 24);
        if(difference < 0 || difference ==0 ){
            alert('Reporting date should be greather than trip date');
            $("#datepicker3").attr("placeholder", "Reporting Date").val('');
        }else{
            var numberOfdayTravel=Math.ceil(localStorage.getItem('totalDistance')/localStorage.getItem('travelPerDay'));
            console.log('numberOfdayTravel',numberOfdayTravel);
            // var shouldReachDate = new Date(d + numberOfdayTravel*1000*60*60*24);
            var shouldReachDate = new Date(d2.getFullYear(),d2.getMonth(),d2.getDate()+parseInt(numberOfdayTravel));
            console.log('shouldReachDate',shouldReachDate);
            var difference2 = ($("#datepicker3").datepicker("getDate") - shouldReachDate)/(1000 * 60 * 60 * 24);
            console.log('difference2',difference2);
            if(difference2 ==0){
                var option='<option selected="selected">No Delay</option>';
                $("#reasonForDelay").append(option);
                 var delay='Approximate Delay : <span style="color:green"> No Delay</span>';
                 $("#NumberofDelay").append(delay);

            }else if (difference2 > 0){
                 var optionList='<option>Problem on road/jam/accident</option><option>Fault in Truck</option><option>Accident with Truck</option><option>Late release of truck due to accessories</option><option>Late release of truck due to late invoice generation</option><option>Late release of truck due to late loading/manpower issue</option><option>Truck detained by RTO/Police</option><option>Negligence by driver</option>';
                 $("#reasonForDelay").append(optionList);
                 var delay='Approximate Delay : <span style="color:red">'+difference2+' Days</span>';
                 $("#NumberofDelay").append(delay);

                 
            }

        }
   
    }  
})

$(document).on('change', '#datepicker4', function(){
    // $("#NumberofDelay").empty();
    console.log('datepicker4 is clicking');
    
    if($("#datepicker3").val()==''){
        $("#datepicker4").attr("placeholder", "Unloading Date").val('');
        $("#datepicker3").addClass('reportingText');
        $("#datepicker3").attr("placeholder", "Select reporting date first").val('');
        // alert('Please select the reporting date first');
    } else if(!/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/.test($("#datepicker4").val())) {
    $("#datepicker4").attr("placeholder", "Unloading Date").val('');
    alert("Invalid date");
    // event.preventDefault();
    } else if ($("#datepicker3").val().length >= 8 && $("#datepicker4").val().length >= 8) {
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
    $('#chassisId').click();
}

// $(".sendGRNbutton").click(function(){
//     showLoading();
//     var driverName=$('#driverName').val();
//     setTimeout(function(){
//         hideLoading();
//     },1000);
//     localStorage.setItem('driverName',driverName);
//     alert("Your GRN has been sent successfully");
//     // window.location = "create_grn.html";
// })
$(document).on('click', '.printButton', function(){
    var grnFlag=false;
    localStorage.setItem('grnFlag',grnFlag);
    var driverImg = document.getElementById('driverImage');
    console.log('driverImg',driverImg);
    var driverName=$('#driverName').val();
    var signatureofDriver=$('#signatureofDriver').val();
    var managerSignature=$('#managerSignature').val();
    console.log('driverImg',driverImg.src);
    console.log('driverImg.src.length',driverImg.src.length);
    console.log('signatureofDriver',signatureofDriver);
    console.log('signatureofDriver.length',signatureofDriver.length);
    console.log('managerSignature',managerSignature);
    console.log('managerSignature.length',managerSignature.length);
    if(driverImg.src=='' || driverImg.src.length<=400){
        grnFlag=false;
        alert('Please take driver image');
    }else if(driverName==''){
        grnFlag=false;
        alert('Please enter driver name');
    }else if(signatureofDriver=='' || signatureofDriver.length<60){
        grnFlag=false;
        alert('Driver signature should be required');
    }else if(managerSignature =='' || managerSignature.length<100){
        grnFlag=false;
        alert('Manager signature should be required');
    }else{
        grnFlag=true;
        localStorage.setItem('grnFlag',grnFlag);
        $('#makePdf').click();
        $('.sendGRNbutton').show();
    }
    

});
$(document).on('click', '.sendGRNbutton', function(){
    // showLoading();
    var driverName=$('#driverName').val();
    // setTimeout(function(){
    //     hideLoading();
    // },1000);
    localStorage.setItem('driverName',driverName);
    // alert("Your GRN has been sent successfully");
    $('#send-grn').modal('show');
});

$(document).on('click', '#yes_grn', function(){
    $('#send-grn').modal('hide');
    window.location = "create_grn.html";
});

$(document).on('click', '#no_grn', function(){
    $('#send-grn').modal('hide');
});

$(document).on('change', '.complaintType', function(){
    if(document.getElementById("shortage11").checked) {
        $(".damageClauses").hide();
        $(".shortageClauses").show();
    } else {
        $(".damageClauses").show();
        $(".shortageClauses").hide();
    }
})

function generateGrnNumber(){
    return ('00000000'+Math.ceil(Math.random()*100000000));
}

// chassis 
$(document).on('click', '#chassisId', function(){ 
    // grnfunc();
    console.log('chassisId is clicking');
    var chassisCount=$('#chassisDetail').children().size();
    console.log('chassisCount',chassisCount);
    var chassisArray = new Array();
    flag=generateFlagNumber();
    console.log('flag create',flag);
    var validationFlag1;
    var validationFlag2;
    if(chassisCount ==0){
        validationFlag1=true;
    }else{
        //
        console.log('chassisProfileDetail is clicking');
        var chassisCount=$('#chassisDetail').children().size();
        console.log('chassisCount',chassisCount);
        var chassisArray = new Array();
        flag=generateFlagNumber();
        console.log('flag create',flag);
        var validationFlag1;
        var validationFlag2;
        for(var i=0; i<chassisCount; i++){
            var tableId=$('#chassisDetail').find('.panel-group .tableDetail .damageShortageDetail').eq(i).attr('id');
            console.log('tableId',tableId);
            var damageShortageCount=$('#'+tableId).children().size();
            console.log('damageShortageCount',damageShortageCount);
            for(var j=0; j<damageShortageCount; j++){
                var type=$('#'+tableId+' .damageShortageClauses .type').eq(j).text();
                console.log('type',type);
                var chassisObj={};
                if(type=="Damage"){
                    chassisObj.chassisno=$('#chassisDetail').find('.acc_parent_block').eq(i).text();
                    chassisObj.type=type.toLowerCase();
                    var chassisNumber=$('#chassisDetail').find('.acc_parent_block').eq(i).text();
                    chassisObj.damage_location=localStorage.getItem('truckLayout'+chassisNumber);
                    chassisObj.damage_detail=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_1').val();
                    chassisObj.damage_type=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_2').val();
                    chassisObj.damage_cause=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_3 option:selected').text();
                    var damageImageCount=$('#'+tableId+' .damageShortageClauses .attchmentBlock .getAttachment').eq(j).siblings().size();
                    console.log('damageImageCount',damageImageCount);
                    var imageArray = new Array();
                    for(var l=0; l<damageImageCount; l++){
                        console.log('inside for loop');
                        var imageID = $('#'+tableId+' .damageShortageClauses .attchmentBlock').eq(j).find('.damageShortageImage .image1234').eq(l).attr('id');
                        console.log('imageID2',imageID);
                        var smallImage = document.getElementById(imageID);
                        imageArray.push(smallImage.src);
                    }
                    
                    var serilizedImageData = JSON.stringify(imageArray);
                    console.log('serilizedImageData',serilizedImageData);
                    chassisObj.attachment=serilizedImageData;
                    chassisObj.flag=flag;
                    chassisArray.push(chassisObj);
                }else if(type=="Shortage"){
                    chassisObj.chassisno=$('#chassisDetail').find('.acc_parent_block').eq(i).text();
                    chassisObj.type=type.toLowerCase();
                    chassisObj.shortage_brand_variant=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_4').val();
                    chassisObj.shortage_part=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_5').val();
                    chassisObj.quantity=$('#'+tableId+' .damageShortageClauses').eq(j).find('.shortageDesc').val();
                    
                    var shortageImageCount=$('#'+tableId+' .damageShortageClauses .attchmentBlock .getAttachment').eq(j).siblings().size();
                    console.log('shortageImageCount',shortageImageCount);
                    var imageArray = new Array();
                    for(var l=0; l<shortageImageCount; l++){
                        console.log('inside for loop');
                        var imageID = $('#'+tableId+' .damageShortageClauses .attchmentBlock').eq(j).find('.damageShortageImage .image1234').eq(l).attr('id');
                        console.log('imageID2',imageID);
                        var smallImage = document.getElementById(imageID);
                        imageArray.push(smallImage.src);
                    }

                    var serilizedImageData = JSON.stringify(imageArray);
                    console.log('serilizedImageData',serilizedImageData);
                    chassisObj.attachment=serilizedImageData;
                    chassisObj.flag=flag;
                    chassisArray.push(chassisObj);

                }
            }   
        }

        console.log('chassisArray',chassisArray);
        for(var i=0; i<chassisArray.length; i++){
            if(chassisArray[i].type=="damage"){
                if(chassisArray[i].damage_location==null){
                     validationFlag1=false;
                     alert("Please fill the damage_location");
                } else if(chassisArray[i].damage_detail==""){
                     validationFlag1=false;
                     alert("Please fill the damage_detail");

                } else if(chassisArray[i].damage_type==""){
                     validationFlag1=false;
                     alert("Please fill the damage_type");
                } else if(chassisArray[i].damage_cause=="Probable cause of damage"){
                     validationFlag1=false;
                     alert("Please fill the damage_cause");
                } else if(chassisArray[i].attachment=="[]"){
                     validationFlag1=false;
                     alert("Please fill the attachment");
                } else{
                     validationFlag1=true;
                }
            }else if(chassisArray[i].type=="shortage"){
                if(chassisArray[i].shortage_brand_variant==""){
                    validationFlag1=false;
                    alert("Please fill the shortage_brand_variant");
                } else if(chassisArray[i].shortage_part==""){
                    validationFlag1=false;
                    alert("Please fill the shortage_part");
                } else if(chassisArray[i].quantity==""){
                    validationFlag1=false;
                    alert("Please fill the quantity");

                } else{
                    validationFlag1=true;
                }

            }

        }
        //
    }

        if(validationFlag1==true){
            var chassisNumber = $('#chassisNumber').val();
            console.log('chassisNumber', chassisNumber);
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
            var condition="("+condition2+")"+ "AND chassisno LIKE '"+chassisNumber+"%'";
            console.log('condition',condition);
            DBHandler.getChassisRecords('grn_chassis', condition, getChassisRecordsCallback);
        }
    
   
});


function getChassisRecordsCallback(result){
     $("#selectChassis").empty();
    var resLen = result.rows.length;
    console.log('resLen',resLen);

    // var data = { resultData:result.rows, length: resLen};
    var chassisList = new Array();
    for(var i=0; i<resLen; i++){
        var chassisNumber=result.rows.item(i).chassisno;
        chassisList.push(chassisNumber);

    }
    var previousChassis = localStorage.getItem('selectedChassisList');
    var previousChassisList = $.parseJSON(previousChassis);
    var filterChassisList=_.difference(chassisList, previousChassisList);
    var filterChassisListLength=_.difference(chassisList, previousChassisList).length;
    console.log('chassisList',chassisList);
    console.log('previousChassisList',previousChassisList);
    console.log('filterChassisList',filterChassisList);
    console.log('filterChassisListLength',filterChassisListLength);
    var data = { resultData:filterChassisList, length: filterChassisListLength};
    // console.log('data',result.rows);
    var tpl = _.template($('#chassisSearchTemplate').html());
    $('#selectChassis').append(tpl(data));
    
    $(".openChassisTable").click();
    
}
$(document).on('click', '.select_for_chessisno', function(){
// $("input:checkbox").change(function() {
  var chassisArr4=localStorage.getItem('selectedCheckboxChassisArr');
  var checkboxChassisArr;
  if(chassisArr4==null){
     checkboxChassisArr = new Array();
  }else{
     checkboxChassisArr = $.parseJSON(chassisArr4);
  }
  console.log('chassisArr4',chassisArr4);
  console.log('checkboxChassisArr',checkboxChassisArr);
  // var checkboxChassisArr=new Array();
  var chNumber;
  var ischecked= $(this).is(':checked');
  if(ischecked){
      // alert('checkd ' + $(this).val());
       // $("#chassisDetail").empty();
        var chassisNumber;
        var arr = new Array();
        console.log('type1',typeof(arr));
        arr = localStorage.getItem('selectedChassisList');
        var chassisArr = $.parseJSON(arr);
        console.log('type2',typeof(chassisArr));
        console.log('chassisArr',chassisArr);
        $.each($("input[name='select_for_chessisno[]']:checked").closest("td").siblings("td"),
            function () {
        chassisNumber=$(this).text();
        console.log('chassisNumber',chassisNumber);
        chassisArr.push(chassisNumber);
        chNumber='abct'+chassisNumber;
        checkboxChassisArr.push(chNumber);
        console.log('checkboxChassisArr',checkboxChassisArr);
        var  serilizedcheckboxChassisArr = JSON.stringify(checkboxChassisArr);
        console.log('serilizedcheckboxChassisArr',serilizedcheckboxChassisArr);
        localStorage.setItem('selectedCheckboxChassisArr', serilizedcheckboxChassisArr);

        });
        var  serilizedchassisArr = JSON.stringify(chassisArr);
        console.log('serilizedchassisArr',serilizedchassisArr);
        localStorage.setItem('temporarySelectedChassisList', serilizedchassisArr);

        var damageList = new Array();
        var  serilizedDamageList = JSON.stringify(damageList);
        localStorage.setItem('selectedDamageList', serilizedDamageList);
        
        var shortageList = new Array();
        var  serilizedShortageList = JSON.stringify(shortageList);
        localStorage.setItem('selectedShortageList', serilizedShortageList);

        //var chassisNumber=$("input[name='select_for_chessisno[]']:checked").closest("td").siblings("td").text();
        var chassisObj={
            chassisno: chassisNumber
        };
        console.log('chassisObj',chassisObj);
        var tpl = _.template($('#chassisTemplate').html());
        $('#chassisDetail').append(tpl(chassisObj));
  }else if(!ischecked){
      $(this).attr('checked', false);
      var checkId= $(this).attr('id');
      var arr=checkId.split('c');
      var removeId=arr[1];
      localStorage.setItem('chassisRemoveId', removeId);
      $('#rc_yes').click();
      // alert('uncheckd ' + $(this).val());
  }
});
$(document).on('click','.chassisListClose', function(){
    $('.deleteChassisDetail').click();
});
// $(document).on('click', '.select_for_chessisno', function(){ 
//     chessisfunc();
// });

// function chessisfunc() {
//      // $("#chassisDetail").empty();
//     var chassisNumber;
//     var arr = new Array();
//     console.log('type1',typeof(arr));
//     arr = localStorage.getItem('selectedChassisList');
//     var chassisArr = $.parseJSON(arr);
//     console.log('type2',typeof(chassisArr));
//     console.log('chassisArr',chassisArr);
//     $.each($("input[name='select_for_chessisno[]']:checked").closest("td").siblings("td"),
//         function () {
//     chassisNumber=$(this).text();
//     console.log('chassisNumber',chassisNumber);
//     chassisArr.push(chassisNumber);
//     });
//     var  serilizedchassisArr = JSON.stringify(chassisArr);
//     console.log('serilizedchassisArr',serilizedchassisArr);
//     localStorage.setItem('selectedChassisList', serilizedchassisArr);

//     var damageList = new Array();
//     var  serilizedDamageList = JSON.stringify(damageList);
//     localStorage.setItem('selectedDamageList', serilizedDamageList);
    
//     var shortageList = new Array();
//     var  serilizedShortageList = JSON.stringify(shortageList);
//     localStorage.setItem('selectedShortageList', serilizedShortageList);

//     //var chassisNumber=$("input[name='select_for_chessisno[]']:checked").closest("td").siblings("td").text();
//     var chassisObj={
//         chassisno: chassisNumber
//     };
//     console.log('chassisObj',chassisObj);
//     var tpl = _.template($('#chassisTemplate').html());
//     $('#chassisDetail').append(tpl(chassisObj));
// }
$(document).on('click','.deleteChassisDetail', function(){
    var chassisList=localStorage.getItem('selectedCheckboxChassisArr');
    var chassisArr = $.parseJSON(chassisList);
    console.log(chassisList);
    console.log(chassisArr);
    if(chassisList!=null){
        var len=chassisArr.length;
        if(len>0){
            for(var i=0; i<len; i++){
                var chassisNumber=chassisArr[i];
                $( "#"+chassisNumber ).remove();
            }
            localStorage.removeItem('selectedCheckboxChassisArr');
        }

    }
});
$(document).on('click', '.groupChassis', function(){ 
    console.log('clicking groupChassis');
    var chassisList=localStorage.getItem('temporarySelectedChassisList');
    var chassisArr = $.parseJSON(chassisList);
    var  serilizedchassisArr = JSON.stringify(chassisArr);
    console.log('serilizedchassisArr',serilizedchassisArr);
    localStorage.setItem('selectedChassisList', serilizedchassisArr);
    showLoading();
    setTimeout(function(){
        $(".accordian_parent").show();
        localStorage.removeItem('selectedCheckboxChassisArr');
        hideLoading();
    },1000)
});
var flag;

$(document).on('click', '#chassisProfileDetail', function(){ 
    console.log('chassisProfileDetail is clicking');
    var chassisCount=$('#chassisDetail').children().size();
    console.log('chassisCount',chassisCount);
    var chassisArray = new Array();
    flag=generateFlagNumber();
    console.log('flag create',flag);
    var validationFlag1;
    var validationFlag2;
    for(var i=0; i<chassisCount; i++){
        var tableId=$('#chassisDetail').find('.panel-group .tableDetail .damageShortageDetail').eq(i).attr('id');

        console.log('tableId',tableId);
        // alert(tableId);
        var damageShortageCount=$('#'+tableId).children().size();
        console.log('damageShortageCount',damageShortageCount);
        for(var j=0; j<damageShortageCount; j++){
            var type=$('#'+tableId+' .damageShortageClauses .type').eq(j).text();
            console.log('type',type);
            var chassisObj={};
            if(type=="Damage"){
               
                chassisObj.chassisno=$('#chassisDetail').find('.acc_parent_block').eq(i).text();
                chassisObj.type=type.toLowerCase();
                var chassisNumber=$('#chassisDetail').find('.acc_parent_block').eq(i).text();
                chassisObj.damage_location=localStorage.getItem('truckLayout'+chassisNumber);
                chassisObj.damage_detail=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_1').val();
                chassisObj.damage_type=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_2').val();
                chassisObj.damage_cause=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_3 option:selected').text();
                // var imageID=$('#'+tableId+' .damageShortageClauses').find('.attchmentBlock img').eq(j).attr('id');
                // var smallImage = document.getElementById(imageID);
                // chassisObj.attachment=smallImage.src;
                var damageImageCount=$('#'+tableId+' .damageShortageClauses .attchmentBlock .getAttachment').eq(j).siblings().size();
                console.log('damageImageCount',damageImageCount);
                var imageArray = new Array();
                for(var l=0; l<damageImageCount; l++){
                    console.log('inside for loop');
                    //var imageID = $('#'+tableId+' .damageShortageClauses .attchmentBlock .damageShortageImage .image1234').eq(l).attr('id');
                    var imageID = $('#'+tableId+' .damageShortageClauses .attchmentBlock').eq(j).find('.damageShortageImage .image1234').eq(l).attr('id');
                    // alert(imageID);
                    console.log('imageID2',imageID);
                    var smallImage = document.getElementById(imageID);
                    imageArray.push(smallImage.src);
                }
                
                var serilizedImageData = JSON.stringify(imageArray);
                console.log('serilizedImageData',serilizedImageData);
                chassisObj.attachment=serilizedImageData;
                chassisObj.flag=flag;
                chassisArray.push(chassisObj);
            }else if(type=="Shortage"){
                chassisObj.chassisno=$('#chassisDetail').find('.acc_parent_block').eq(i).text();
                chassisObj.type=type.toLowerCase();
                chassisObj.shortage_brand_variant=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_4').val();
                chassisObj.shortage_part=$('#'+tableId+' .damageShortageClauses').eq(j).find('.damageDesc_5').val();
                chassisObj.quantity=$('#'+tableId+' .damageShortageClauses').eq(j).find('.shortageDesc').val();
                // var imageID=$('#'+tableId+' .damageShortageClauses').find('.attchmentBlock img').eq(j).attr('id');
                // var smallImage = document.getElementById(imageID);
                // chassisObj.attachment=smallImage.src;
                var shortageImageCount=$('#'+tableId+' .damageShortageClauses .attchmentBlock .getAttachment').eq(j).siblings().size();
                console.log('shortageImageCount',shortageImageCount);
                var imageArray = new Array();
                for(var l=0; l<shortageImageCount; l++){
                    console.log('inside for loop');
                    //var imageID = $('#'+tableId+' .damageShortageClauses .attchmentBlock .damageShortageImage .image1234').eq(l).attr('id');
                    var imageID = $('#'+tableId+' .damageShortageClauses .attchmentBlock').eq(j).find('.damageShortageImage .image1234').eq(l).attr('id');
                    // alert(imageID);
                    console.log('imageID2',imageID);
                    var smallImage = document.getElementById(imageID);
                    imageArray.push(smallImage.src);
                }

                var serilizedImageData = JSON.stringify(imageArray);
                console.log('serilizedImageData',serilizedImageData);
                chassisObj.attachment=serilizedImageData;
                chassisObj.flag=flag;
                chassisArray.push(chassisObj);

            }
        }   
    }



    console.log('chassisArray',chassisArray);
    for(var i=0; i<chassisArray.length; i++){
        if(chassisArray[i].type=="damage"){
           // if(chassisArray[i].damage_location==null || chassisArray[i].damage_detail=="" || chassisArray[i].damage_type=="" || chassisArray[i].damage_cause=="Probable cause of damage" || chassisArray[i].attachment=="[]"){
           // if(chassisArray[i].damage_location==null || chassisArray[i].damage_detail=="" || chassisArray[i].damage_type=="" || chassisArray[i].damage_cause=="Probable cause of damage"){
           //      validationFlag1=false;
           // }else{
           //      validationFlag1=true;
           // }
            if(chassisArray[i].damage_location==null){
                 validationFlag1=false;
                 alert("Please fill the damage_location");
            } else if(chassisArray[i].damage_detail==""){
                 validationFlag1=false;
                 alert("Please fill the damage_detail");

            } else if(chassisArray[i].damage_type==""){
                 validationFlag1=false;
                 alert("Please fill the damage_type");
            } else if(chassisArray[i].damage_cause=="Probable cause of damage"){
                 validationFlag1=false;
                 alert("Please fill the damage_cause");
            } else if(chassisArray[i].attachment=="[]"){
                 validationFlag1=false;
                 alert("Please fill the attachment");
            } else{
                 validationFlag1=true;
            }
        }else if(chassisArray[i].type=="shortage"){
           // if(chassisArray[i].shortage_brand_variant=="Select Shortage" || chassisArray[i].shortage_part=="" || chassisArray[i].quantity==""){
           //      validationFlag1=false;
           // }else{
           //      validationFlag1=true;
           // }
            if(chassisArray[i].shortage_brand_variant==""){
                validationFlag1=false;
                alert("Please fill the shortage_brand_variant");
            } else if(chassisArray[i].shortage_part==""){
                validationFlag1=false;
                alert("Please fill the shortage_part");
            } else if(chassisArray[i].quantity==""){
                validationFlag1=false;
                alert("Please fill the quantity");

            } else{
                validationFlag1=true;
            }

        }

    }
    
    if(validationFlag1==true){
         localStorage.setItem('validationFlag1', validationFlag1);
         // localStorage.setItem('validationFlag2', validationFlag2);
         DBHandler.saveRecordsofgrn_chassisDetails(chassisArray, saveRecordsofgrn_chassisCallback);
    }
    // else{
    //      alert("Please fill all the chassis details");
    // }
   

});

function saveRecordsofgrn_chassisCallback(result){
  $('#reportVerify').fadeTo("fast", .5).attr("href", "#report"); 
  $('#reportVerify').fadeTo("fast", .5).attr("href", "#report"); 
  $("#profile").removeClass('active in');
  $("#report").addClass('active in');
  localStorage.setItem('countClick3',2);
  console.log('saveRecordsofgrn_chassisCallback');
  $('.grnDetailsreport2').click();

}


$(document).on('click', '.select_for_damage_location', function(){ 
    console.log('clicking');
    var id=$(this).attr('id');
    var damageLocation;
    console.log('id',id);
    var truckLayoutId=localStorage.getItem('truckLayoutId');
    if($('#upperDeck').is(':checked')){
        damageLocation='U'+id;
        console.log('damageLocation',damageLocation);
        localStorage.setItem(truckLayoutId,damageLocation);
    }else if($('#lowerDeck').is(':checked')){
        damageLocation='L'+id;
        console.log('damageLocation',damageLocation);
        localStorage.setItem(truckLayoutId,damageLocation);
    }
    var id2='1234'+localStorage.getItem('truckLayoutId');
    $('#'+truckLayoutId).siblings().remove();
    $('#'+id2).append('<h1 class="damageLocationShow">'+damageLocation+'</h1>');
   
});
$(document).on('click', '.truckLayoutTable', function(){ 
    $('#damageLocation').empty();
    var id=$(this).attr('id');
    localStorage.setItem('truckLayoutId',id);
    var rowNumber=localStorage.getItem('truckLayoutRow');
    var columnNumber=localStorage.getItem('truckLayoutColumn');
    var truckLayoutObj={};
    truckLayoutObj.row=rowNumber;
    truckLayoutObj.column=columnNumber;
    var data = {truckLayoutData:truckLayoutObj};
    console.log('data',data);
    var tpl = _.template($('#truckLayoutTemplate').html());
    $('#damageLocation').append(tpl(data));
});

$(document).on('click', '#lowerDeck', function(){
    $('#addTable').empty();
    // var id=$(this).attr('id');
    // localStorage.setItem('truckLayoutId',id);
    var rowNumber=localStorage.getItem('truckLayoutRow');
    var columnNumber=localStorage.getItem('truckLayoutColumn');
    var rowLen =parseInt(rowNumber) + parseInt(rowNumber);
    console.log('rowLen',rowLen);

    var truckLayoutObj={};
    truckLayoutObj.row=parseInt(rowNumber);
    truckLayoutObj.column=parseInt(columnNumber);
    var data = {truckLayoutData:truckLayoutObj, length: rowLen};
    console.log('data',data);
    var tpl = _.template($('#lowerDeckLayoutTemplate').html());
    $('#addTable').append(tpl(data));
})

$(document).on('click', '#upperDeck', function(){
    $('#addTable').empty();
    // var id=$(this).attr('id');
    // localStorage.setItem('truckLayoutId',id);
    var rowNumber=localStorage.getItem('truckLayoutRow');
    var columnNumber=localStorage.getItem('truckLayoutColumn');
    var truckLayoutObj={};
    truckLayoutObj.row=parseInt(rowNumber);
    truckLayoutObj.column=parseInt(columnNumber);
    var data = {truckLayoutData:truckLayoutObj};
    console.log('data',data);
    var tpl = _.template($('#upperDeckLayoutTemplate').html());
    $('#addTable').append(tpl(data));
})


function onFail(message) {
      alert('Failed because: ' + message);
}

$(document).on('click', '.AttachmentofVehical', function(){ 
    if(localStorage.getItem('imageNumber') > 10){
        alert('Maximum attachment number is exceed');
    }else{
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, encodingType: Camera.EncodingType.JPEG,
            popoverOptions  : new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
            destinationType: destinationType.DATA_URL, sourceType : Camera.PictureSourceType.CAMERA, correctOrientation: true});

       
        function onPhotoDataSuccess(imageData) {
              // alert('select image');
              var grnDetailImageNumber=localStorage.getItem('imageNumber');
              console.log('grnDetailImageNumber',grnDetailImageNumber);
              $( ".AttachmentofVehical" ).after( '<div class="grnImage"><img style="display:none;width:60px;height:60px; padding:2px;" class ="image1234" id="showVehicalImage'+grnDetailImageNumber+'" src="" /><button class="imageDelete text-center" style="width:56px">Delete</button></div>');
              console.log('AttachmentofVehical');
              var imageId="showVehicalImage"+grnDetailImageNumber;
              console.log('AttachmentofVehicalimageId', imageId);
              console.log('onPhotoDataSuccess');
              var smallImage = document.getElementById(imageId);
              console.log("document.getElementById(imageId)",smallImage);
              smallImage.style.display = 'block';
              smallImage.src = "data:image/jpeg;base64," + imageData;
              console.log("smallImage.src",smallImage.src);
              grnDetailImageNumber=parseInt(grnDetailImageNumber)+1;
              localStorage.setItem('imageNumber', grnDetailImageNumber);

        }
    }


});
$(document).on('click', '.imageDelete', function(){
    // alert("Image is deleting");
  $(this).parent().remove(); 
});


$(document).on('click', '.getPicture', function(){ 

    console.log('getPicture');
    var imageId=$(this).siblings('img').attr('id');
    console.log('driver image id', imageId);

    //var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);

    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, encodingType: Camera.EncodingType.JPEG,
       popoverOptions  : new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
       destinationType: destinationType.DATA_URL, sourceType : Camera.PictureSourceType.CAMERA, correctOrientation: true});


        function onPhotoDataSuccess(imageData) {
              console.log('onPhotoDataSuccess');
             
              var smallImage = document.getElementById(imageId);
              console.log("document.getElementById(imageId)",smallImage);
              smallImage.style.display = 'block';

              smallImage.src = "data:image/jpeg;base64," + imageData;
              console.log("smallImage.src",smallImage.src);
        }

});


// $(document).on('click', '.logout_open', function(){
//     console.log('user is logout');
//     // DBHandler.clearData(); 
//     setTimeout(function() {
//         console.log('inside function');
//          window.location = "index.html";
//     }, 1000); 
// });
function logout_user() {
    window.location = "index.html";
}

function generateFlagNumber(){
    return (Math.ceil(Math.random()*100000000));
}
$(document).on('change', '.damageDesc_1', function(){
    var damageId=$(this).attr('id');
    console.log('damageId',damageId);
    var damageVal;
    var damage_type;
    setTimeout(function() {
         damageVal=$('#'+damageId).val();
         console.log('damageVal',damageVal);
         var arr = new Array();
         arr = localStorage.getItem('selectedDamageList');
         var damageArr = $.parseJSON(arr);
         var damageArrLength=damageArr.length;
         var verifyFlag=true;
         var verifyFlag6;
         if(damageArrLength==0){
            verifyFlag6=true;
         }
         for(var j=0; j< damageArrLength; j++){
            if(damageVal == damageArr[j]){
                verifyFlag=false;
                $('#'+damageId).attr("placeholder", "Select Damage").val('');
                alert('This is already selected, Please select another.');
            }
            if(j==parseInt(damageArrLength)-1 && verifyFlag==true){
                verifyFlag6=true;
            }
         }

         if(verifyFlag6==true){

             damageArr.push(damageVal);
             var  serilizeddamageArr = JSON.stringify(damageArr);
             console.log('serilizeddamageArr',serilizeddamageArr);
             localStorage.setItem('selectedDamageList', serilizeddamageArr);
             var text=$('#selction-ajax').text();
             var textArr=text.split(',');
             var sNo=textArr[1].trim();
             console.log('sNo',sNo);
             $.ajax({
                type: 'GET',
                url: 'js/api/damage.json',
                //data: serilizedData,
                dataType: 'json',
                success: function(log_data, status) {
                    console.log('GET status',status);
                    console.log('log_data.legend',log_data.legend);
                    var damageArr=log_data.legend;
                    var len=damageArr.length;
                    for(var i=0; i< len; i++){
                        var serialNo=damageArr[i].sno;
                         console.log('serialNo',serialNo);
                        if(sNo==serialNo.trim()){
                            damage_type=damageArr[i].damage_type;
                            console.log('damage_type',damage_type);
                            $('#'+damageId).siblings('.damageDesc_2').val(damage_type);
                            $(".damageDesc_2").prop("readonly", true);
                        }
                    }
                },
                error: function(e) {
                    console.log(e);
                    return false;
                }
            });
         }
         

    }, 1000);
    
    
    // $('.damageDesc_2').val(textVal);
    

});

$(document).on('change', '.damageDesc_2', function(){
    $(this).prop("readonly", true);
});

// $(document).on('change', '.damageDesc_4', function(){
//     var textVal = $(this).val();
//     console.log('option value',textVal);
//     var shortageId=$(this).attr('id');
//     console.log('shortageVal',shortageId);
//     var shortageVal=$('#'+shortageId+' option:selected').text();
//     console.log('shortageVal',shortageVal);
//     var arr = new Array();
//     arr = localStorage.getItem('selectedShortageList');
//     var shortageArr = $.parseJSON(arr);
//     shortageArr.push(shortageVal);
//     var  serilizedshortageArr = JSON.stringify(shortageArr);
//     console.log('serilizedshortageArr',serilizedshortageArr);
//     localStorage.setItem('selectedShortageList', serilizedshortageArr);
//     console.log('option value',textVal);
//     // $('.damageDesc_5').val(textVal);
//     $(this).next().val(textVal);
//     $(".damageDesc_5").prop("readonly", true);

// });

$(document).on('change', '.damageDesc_4', function(){
    var shortageId=$(this).attr('id');
    console.log('shortageId',shortageId);
    var shortageVal;
    var shortage_part;
    setTimeout(function() {
         shortageVal=$('#'+shortageId).val();
         console.log('shortageVal',shortageVal);
         var arr = new Array();
         arr = localStorage.getItem('selectedShortageList');
         var shortageArr = $.parseJSON(arr);
         var shortageArrLength=shortageArr.length;
         var verifyFlag=true;
         var verifyFlag6;
         if(shortageArrLength==0){
            verifyFlag6=true;
         }
         for(var j=0; j< shortageArrLength; j++){
            if(shortageVal == shortageArr[j]){
                verifyFlag=false;
                $('#'+shortageId).attr("placeholder", "Select Shortage").val('');
                alert('This is alresdy selected, Please select another.');
            }
            if(j==parseInt(shortageArrLength)-1 && verifyFlag==true){
                verifyFlag6=true;
            }
         }

         if(verifyFlag6==true){

             shortageArr.push(shortageVal);
             var  serilizedshortageArr = JSON.stringify(shortageArr);
             console.log('serilizedshortageArr',serilizedshortageArr);
             localStorage.setItem('selectedShortageList', serilizedshortageArr);
             var text=$('#selction-ajax-s').text();
             var textArr=text.split(',');
             var sNo=textArr[1].trim();
             console.log('sNo',sNo);
             $.ajax({
                type: 'GET',
                url: 'js/api/shortage.json',
                //data: serilizedData,
                dataType: 'json',
                success: function(log_data, status) {
                    console.log('GET status',status);
                    console.log('log_data.legend',log_data.legend);
                    var shortageArr2=log_data.legend;
                    var len=shortageArr2.length;
                    for(var i=0; i< len; i++){
                        var serialNo=shortageArr2[i].sno;
                         console.log('serialNo',serialNo);
                        if(sNo==serialNo.trim()){
                            shortage_part=shortageArr2[i].brand_varient;
                            console.log('shortage_part',shortage_part);
                            $('#'+shortageId).siblings('.damageDesc_5').val(shortage_part);
                            $(".damageDesc_5").prop("readonly", true);
                        }
                    }
                },
                error: function(e) {
                    console.log(e);
                    return false;
                }
            });
         }
        
    }, 1000);

});

$(document).on('change', '.damageDesc_5', function(){
    $(this).prop("readonly", true);
});

$(document).on('click','#chassisProfileId', function(){
    console.log('chassisProfileId clicking');
    // localStorage.setItem('countClick2', 1);
    var reporting_date = $('#datepicker3').val();
    var uploading_date = $('#datepicker4').val();
    if(reporting_date=="" || uploading_date==""){
       
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

         var countClick2=localStorage.getItem('countClick2');
         if(countClick2 == 1){
            countClick2=parseInt(countClick2)+1;
            localStorage.setItem('countClick2',countClick2);
            $("#chassisProfileId").click();
         }
                        
        // e.preventDefault();
        // $('#report').prop('disabled',disabled);
    }
});

$(document).on('click', '.truckLayoutTable', function(){ 
    $('#damageLocation').empty();
    var id=$(this).attr('id');
    localStorage.setItem('truckLayoutId',id);
    var rowNumber=localStorage.getItem('truckLayoutRow');
    var columnNumber=localStorage.getItem('truckLayoutColumn');
    var truckLayoutObj={};
    truckLayoutObj.row=rowNumber;
    truckLayoutObj.column=columnNumber;
    var data = {truckLayoutData:truckLayoutObj};
    console.log('data',data);
    var tpl = _.template($('#truckLayoutTemplate').html());
    $('#damageLocation').append(tpl(data));
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
         var countClick3=localStorage.getItem('countClick3');
         if(countClick3 == 2){
            countClick3=parseInt(countClick3)+1;
            localStorage.setItem('countClick3',countClick3);
            $("#reportVerify").click();
         }
        
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

