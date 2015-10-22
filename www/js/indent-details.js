$(function() {
    document.addEventListener("deviceready", onDeviceReady, true);
});

function onDeviceReady() {
    DBHandler.initDatabase();
    showLoading();
    //check_data();

    page_url = window.location.href;
    getParameterByName(page_url);
    pageIndent = getParameterByName('indent');
    pageType = getParameterByName('type');
    pageTransaction = getParameterByName('transaction');
    noc = getParameterByName('noc');
    $(".txtIndentNo").text(pageIndent);
    $(".txtContainerCount").text(noc);
    var breadcrum = '<li class="first"><a href="home.html" style="z-index:9;"><span></span>Dashboard</a></li>\
                    <li class="first"><a href="open-indents.html?type=' + pageType + '" style="z-index:8;"><span></span><p class="pageType">' + pageType + '</p></a></li>\
                    <li class="first"><a href="#" style="z-index:7;"><span></span>LR Details</a></li>';
    $(".crumbs").append(breadcrum);

    DBHandler.getIndentLRs(pageIndent, showLRTable);
    $(".bajaj-footer").css("display", "block");
}

var len;

function showLRTable(result) {
    console.log(result);
    len = result.rows.length;

    for (var i = 0; i < result.rows.length; i++) {
        LrData = '<tr>\
                <td class="btn-lr-detail lr_' + i + '" data-toggle="modal" data-target="#' + result.rows.item(i).lr_number + '" rel="' + result.rows.item(i).lr_number + '" data-container_no="' + result.rows.item(i).container_no + '" data-seal_no="' + result.rows.item(i).seal_no + '">' + result.rows.item(i).lr_number + '</td>\<td>' + result.rows.item(i).truck_no + '</td>\<td>' + result.rows.item(i).lr_date + '</td>\</tr>';
        $("#Lrdata").append(LrData);

        var cno = result.rows.item(i).container_no;
        var sno = result.rows.item(i).seal_no;
        var temp_cno = '';
        if (cno == 'null' || cno == null || cno == 'undefined')
            cno = '';
        else if (cno.indexOf("DUMY") == 1)
            temp_cno = '';
        else
            temp_cno = cno;

        if (sno == 'null' || sno == null || sno == 'undefined')
            sno = '';



        var lr_details = '<div class="modal modal-flex fade in" id="' + result.rows.item(i).lr_number + '" tabindex="-1" role="dialog" aria-labelledby="flexModalLabel" aria-hidden="false">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
                    <h4 class="modal-title" id="flexModalLabel">Enter Details</h4>\
                </div>\
                <div class="modal-body modal_' + i + '">\
                    <div class="row">\
                     <div class="text-left alert alert-danger error-msg-invalid-entry">Invalid Credientials</div>\
                        <div class="col-lg-12">\
                                <label for="textInput" class="col-sm-4 control-label">Indent No.:</label>\
                                <div class="col-sm-8">\
                                    <input type="text" class="form-control" id="indNumDisp" value="' + pageIndent + '" disabled="">\
                                </div>\
                        </div>\
                    </div>\
                    <div class="row">\
                        <div class="col-lg-12">\
                                <label for="textInput" class="col-sm-4 control-label">LR No.:</label>\
                                <div class="col-sm-8">\
                                    <input type="text" class="form-control" id="LRNumDisp" value="' + result.rows.item(i).lr_number + '" disabled="">\
                                </div>\
                        </div>\
                    </div>\
                    <div class="row">\
                        <div class="col-lg-12">\
                                <label for="contNum" class="col-sm-4 control-label">Container No.:</label>\
                                <div class="col-sm-8">\
                                    <input type="text" name="contNum" class="form-control" id="contNum" placeholder="ABCD1234567" value="' + temp_cno + '" ><small style="margin-bottom:10px;display:block;">First 4 characters then 7 digits</small>\
                                </div>\
                        </div>\
                    </div>\
                    <div class="row">\
                        <div class="col-lg-12">\
                                <label for="sealNum" class="col-sm-4 control-label">Seal No.:</label>\
                                <div class="col-sm-8">\
                                    <input type="text" name="sealNum" class="form-control" id="sealNum" placeholder="Enter Seal No." value="' + sno + '">\
                                    <input type="hidden" name="transaction" id="lt_transaction" value="' + result.rows.item(i).transaction_id + '">\
                                </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="modal-footer">\
                    <button type="submit" data-srno="' + i + '" class="btn btn-green" id="saveLrDetails">Save</button>\
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                </div>\
            </div>\
        </div>\
    </div>';

        $(".lr_details_block").append(lr_details);

    }
    check_data();

    hideLoading();
}




$(document).on('click', '#saveLrDetails', function() {
    showLoading();
    var sr_no = $(this).attr('data-srno');
    //console.log(sr_no)

    if (pageType == "Open") {
        validate_openStatus(sr_no)
    }

    if (pageType == "Inprogress") {
        validate_inProgressStatus(sr_no)
    }
    // setTimeout(function() {



    // }, 1000);


});

$(document).on('keyup', '#contNum', function() {
    if (this.value.length > 11)
        this.value = this.value.slice(0, 11);
});

validate_openStatus = function(sr_no) {
    $("#contNum, #sealNum").removeClass("warning_msg");

    var container_no = $(".modal_" + sr_no).find("#contNum").val();
    var seal_no = $(".modal_" + sr_no).find("#sealNum").val();
    var lr_transaction = $(".modal_" + sr_no).find("#lt_transaction").val();

    // console.log(lr_transaction)

    if (container_no.length != 11) {
        if (container_no.length == "") {
            pushValues(seal_no, container_no, lr_transaction, "Open");

        } else {
            $(".modal_" + sr_no).find("#contNum").addClass("warning_msg");
            // alert("Please fill a valid container no");
            $(".error-msg-invalid-entry").html('Please fill a valid container no');
            $(".error-msg-invalid-entry").show();
            hideLoading();
            return;
        }
    } else {
        if (container_no.substr(0, 4).search(/[^a-zA-Z]+/) === -1) {
            if (container_no.substr(4, 11).search(/^[0-9\b]+$/) === 0) {
                // alert("all ok")
                pushValues(seal_no, container_no, lr_transaction, "Open");
            } else {
                $(".modal_" + sr_no).find("#contNum").addClass("warning_msg");
                // alert("Please fill a valid container no");
                $(".error-msg-invalid-entry").html('Please fill a valid container no');

                $(".error-msg-invalid-entry").show();
                hideLoading();
                return;
            }
        } else {
            $(".modal_" + sr_no).find("#contNum").addClass("warning_msg");
            // alert("Please fill a valid container no");
            $(".error-msg-invalid-entry").html('Please fill a valid container no');

            $(".error-msg-invalid-entry").show();

            hideLoading();
            return;
        }
    }

}

validate_inProgressStatus = function(sr_no) {
    $("#contNum, #sealNum").removeClass("warning_msg");

    var container_no = $(".modal_" + sr_no).find("#contNum").val();
    var seal_no = $(".modal_" + sr_no).find("#sealNum").val();
    var lr_transaction = $(".modal_" + sr_no).find("#lt_transaction").val();

    console.log($(".modal_" + sr_no).find("#contNum").val())
    console.log(container_no.length)

    $(".lr_" + sr_no).attr('data-container_no', container_no)
    $(".lr_" + sr_no).attr('data-seal_no', seal_no)

    if (container_no == "") {
        pushValues(seal_no, container_no, lr_transaction, "Inprogress");
        return;
    } else {
        if (container_no.length != 11) {
            $(".modal_" + sr_no).find("#contNum").addClass("warning_msg");
            // alert("Please fill a valid container no");
            $(".error-msg-invalid-entry").html('Please fill a valid container no');

            $(".error-msg-invalid-entry").show();
            hideLoading();
            return;
        } else {
            if (container_no.substr(0, 4).search(/[^a-zA-Z]+/) === -1) {
                if (container_no.substr(4, 11).search(/^[0-9\b]+$/) === 0) {
                    // alert("all ok")
                    //pushValues(seal_no, container_no, lr_transaction, sr_no);

                } else {
                    $(".modal_" + sr_no).find("#contNum").addClass("warning_msg");
                    // alert("Please fill a valid container no");
                    $(".error-msg-invalid-entry").html('Please fill a valid container no');

                    $(".error-msg-invalid-entry").show();
                    hideLoading();
                    return;
                }
            } else {
                $(".modal_" + sr_no).find("#contNum").addClass("warning_msg");
                // alert("Please fill a valid container no");
                $(".error-msg-invalid-entry").html('Please fill a valid container no');

                $(".error-msg-invalid-entry").show();
                hideLoading();
                return;
            }
        }
    }

    hideLoading();
    $(".close").click();

}


pushValues = function(seal_no, container_no, lr_transaction, sr_no) {

    if (pageType == "Inprogress") {
        if ((container_no == "") || (seal_no == "")) {
            DBHandler.updateLR(seal_no, container_no, lr_transaction, "Open", check_data);
            return;
        } else {
            DBHandler.updateLR(seal_no, container_no, lr_transaction, "Inprogress", check_data);
        }
    }

    if (pageType == 'Open') {
        DBHandler.updateLR(seal_no, container_no, lr_transaction, "Inprogress", check_data);

    }
    // alert("LR Details saved successfully");

    hideLoading();
    $(".close").click();
    $(".success_flash_msg").show();
    $('.success_flash_msg').html("<p>LR Details saved successfully</p>");
    removeFlashMsg();

}

removeFlashMsg = function() {
    window.setTimeout(function() {
        $(".success_flash_msg").fadeOut(1000);
    }, 1000)
}



// window.setInterval(function() {
//     check_data();
// }, 1000);

check_data = function() {
    DBHandler.getIndentLRs(pageIndent, reflectData);
}



reflectData = function(result) {



    //if ($("#dataTable_filter label input").val() == "") {
    count = 0;
    for (p = 0; p < result.rows.length; p++) {
        txtSeal_no = result.rows.item(p).seal_no;
        txtCont_no = result.rows.item(p).container_no;
        if (txtSeal_no == "null") {
            txtSeal_no = ''
        };
        if (txtCont_no == "null") {
            txtCont_no = ''
        };


        if (txtSeal_no.trim() != "" && txtCont_no.trim() != "") {
            $(".lr_" + p).css("color", "#00ff00");
            count++;
        } else
            $(".lr_" + p).css("color", "blue");
    }

    if ((count != 0) && (len == count)) {
        $(".indent-submit-btn").removeClass('disabled')
    } else {
        $(".indent-submit-btn").addClass('disabled')
    }
    //   }
    hideLoading();
}

$("#submit_indents").click(function() {

    console.log(pageType)
    console.log(pageTransaction)
    DBHandler.getIndentStatus(pageIndent, processIndentStaus);
    for (p = 0; p < len; p++) {
        var lr_cont = $(".modal_" + p).find("#contNum").val();
        var lr_seal = $(".modal_" + p).find("#sealNum").val();
        var lr_trans = $(".modal_" + p).find("#lt_transaction").val();

        if ((lr_cont == "") || (lr_seal == "")) {
            status = "Open"
        } else {
            status = "Inprogress"
        }

        var submitArrValues = {
            "consignment_id": pageIndent,
            "container_no": lr_cont,
            "resource_uri": "/v1/container-trackers/" + lr_trans + "/",
            "seal_no": lr_seal,
            "sent_to_sap": "false",
            "status": status,
            "submitted_by": localStorage.getItem("user_id")
        };

    }
    $(".close").click();
    alert("Your request has been submitted.");
    location.href = "home.html";


    var isConnected = isNetworkAvailable();
    if (isConnected) {
        DBHandler.getIndentLRs(pageIndent, updateLRonServer);

    }


})

function updateLRonServer(result) {


    for (var i = 0; i < result.rows.length; i++) {

        var submitArrValues = {

            "modified_date": result.rows.item(i).modified_date,
            "seal_no": result.rows.item(i).seal_no,
            "container_no": result.rows.item(i).container_no,
            "status": result.rows.item(i).status


        };
        serilizedSubmitValues = JSON.stringify(submitArrValues);
        console.log(serilizedSubmitValues)

        //http://qa.bajaj.gladminds.co/v1/container-lrs/save/10/?access_token=992ee207356297162b89f2f70686f82d3093845e
        //http://qa.bajaj.gladminds.co/v1/container-lrs/?access_token=<access_token>

        $.ajax({
            url: 'http://qa.bajaj.gladminds.co/v1/container-lrs/save/' + result.rows.item(i).transaction_id + '?access_token=' + localStorage.getItem('access_token'),
            data: serilizedSubmitValues,
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            type: 'PUT',
            success: function(status, resp) {

                var where = 'transaction_id=' + result.rows.item(i).transaction_id;
                DBHandler.setUpdateRowsToDefault('gm_containerlr', where);
                if (i == result.rows.length) {

                    var updated_date = moment(localStorage.getItem('sync_date')).format('ll');
                    console.log(updated_date)

                    $(".time_stamp").append(updated_date);
                    window.refresh();
                }

            },
            error: function(e) {
                hideLoading();
                if (e.status == 401) {
                    alert("Something is wrong. Please check your internet connection and try again");
                }
                if (i == result.rows.length) {
                    hideSyncing();
                    window.refresh();
                    localStorage.setItem('sync_date', printDate());
                }
            }
        });
    }

    if (result.rows.length == 0) {

        var submitArrValues = {
            "modified_date": printDate(),
            "status": status
        };
        serilizedSubmitValues = JSON.stringify(submitArrValues);
        console.log(serilizedSubmitValues)
            //http:///qa.bajaj.gladminds.co/v1/container-indents/submit/14/?access_token=<access_token>
            //http://qa.bajaj.gladminds.co/v1/container-indents/<zib_indent_num.id>?access_token=<access-token>
            //http://qa.bajaj.gladminds.co/v1/container-indents/submit/51108409/?access_token=992ee207356297162b89f2f70686f82d3093845e
        $.ajax({
            url: 'http://qa.bajaj.gladminds.co/v1/container-indents/submit/' + pageIndent + '/?access_token=' + localStorage.getItem('access_token'),
            data: serilizedSubmitValues,
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            type: 'PUT',
            success: function(status, resp) {
                console.log("sent");
                var whr = 'id=' + result.rows.item(i).id;
                hideSyncing();

                DBHandler.setUpdateRowsToDefault('gm_containerindent', whr);
            },
            error: function(e) {
                if (e.status == 401) {
                    alert("Something is wrong. Please check your internet connection and try again");
                }
            }
        });
    }


}



function processIndentStaus(result) {

    var resLength = result.rows.length;
    var status;
    if (resLength == 1) {
        if (result.rows.item(0).status == "Inprogress")
            status = "Inprogress";
        else
            status = "Open";
    } else {
        status = "Open";

    }
    var modifieddate = printDate(); //todays date
    DBHandler.updateIndentStatus(pageIndent, status, modifeddate);
}


//ctsadmin, tracker@123
//open #D0E9C6
// Inprogress #D9EDF7
