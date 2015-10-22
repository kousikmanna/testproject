$(function() {
    
    document.addEventListener("deviceready", onDeviceReady, true);
    // showLoading();
});

function onDeviceReady() {
    // alert('Autosyncing');

    // $(".time_stamp").append(moment(localStorage.getItem('sync_date')).format('ll'));
    // //setupAutoSync();
    // var syncUser = document.getElementById("sync-user");

    // var isConnected = isNetworkAvailable();
    // if (isConnected) {
        // $(".sync_button").addClass('sync_available_blink');
        //alert('A network connection is available.');
    //     syncUser.disabled = false;
    // } else {

    //     syncUser.disabled = true;
    // }
    DBHandler.initDatabase();
    alert('initDatabase in home.js');
    setTimeout(function() {
         DBHandler.getAllRecords('trip', details);
        // DBHandler.getDashBoardCounts(createDashboard);
    }, 1000);

}

// function syncDatabase() {

//     showSyncing();
//     fetchData();
//     //sync indent table
//     DBHandler.getRowsToUpdate('gm_containerindent', updateIndentTable);

//     DBHandler.getRowsToUpdate('gm_containerlr', updateLRTable);


// }

// function updateIndentTable(result) {
//     //
//     //("id" INTEGER PRIMARY KEY  NOT NULL  UNIQUE , "created_date" DATETIME, "modified_date" DATETIME, "indent_number" VARCHAR, "no_of_containers" INTEGER, "status" VARCHAR, "transported_id" INTEGER, "isRowUpdated" INTEGER NOT NULL  DEFAULT 0)
//     for (var i = 0; i < result.rows.length; i++) {
//         var submitArrValues = {
//             "modified_date": result.rows.item(i).modified_date,
//             "status": result.rows.item(i).status
//         };
//         serilizedSubmitValues = JSON.stringify(submitArrValues);
//         console.log(serilizedSubmitValues)
//             //http:///qa.bajaj.gladminds.co/v1/container-indents/submit/14/?access_token=<access_token>
//             //http://qa.bajaj.gladminds.co/v1/container-indents/<zib_indent_num.id>?access_token=<access-token>
//             //http://qa.bajaj.gladminds.co/v1/container-indents/submit/51108409/?access_token=992ee207356297162b89f2f70686f82d3093845e
//         $.ajax({
//             url: 'http://qa.bajaj.gladminds.co/v1/container-indents/submit/' + result.rows.item(i).indent_number + '/?access_token=' + localStorage.getItem('access_token'),
//             data: serilizedSubmitValues,
//             dataType: 'json',
//             contentType: 'application/json',
//             cache: false,
//             type: 'PUT',
//             success: function(status, resp) {
//                 console.log("sent");
//                 var whr = 'id=' + result.rows.item(i).id;
//                 DBHandler.setUpdateRowsToDefault('gm_containerindent', whr);
//             },
//             error: function(e) {
//                 if (e.status == 401) {
//                     alert("Something is wrong. Please check your internet connection and try again");
//                 }
//             }
//         });
//     }


// }

// function updateLRTable(result) {


//     for (var i = 0; i < result.rows.length; i++) {

//         var submitArrValues = {

//             "modified_date": result.rows.item(i).modified_date,
//             "seal_no": result.rows.item(i).seal_no,
//             "container_no": result.rows.item(i).container_no,
//             "status": result.rows.item(i).status


//         };
//         serilizedSubmitValues = JSON.stringify(submitArrValues);
//         console.log(serilizedSubmitValues)

//         //http://qa.bajaj.gladminds.co/v1/container-lrs/save/10/?access_token=992ee207356297162b89f2f70686f82d3093845e
//         //http://qa.bajaj.gladminds.co/v1/container-lrs/?access_token=<access_token>

//         $.ajax({
//             url: 'http://qa.bajaj.gladminds.co/v1/container-lrs/save/' + result.rows.item(i).transaction_id + '?access_token=' + localStorage.getItem('access_token'),
//             data: serilizedSubmitValues,
//             dataType: 'json',
//             contentType: 'application/json',
//             cache: false,
//             type: 'PUT',
//             success: function(status, resp) {
//                 console.log("sent");
//                 currURL = (this.url).split("/");
//                 currURL = currURL[currURL.length-1];
//                 currURL = currURL.split("?");
//                 transaction_id = currURL[0];
                

//                 var where = 'transaction_id=' + transaction_id;
//                 DBHandler.setUpdateRowsToDefault('gm_containerlr', where);
//                 if (i == result.rows.length) {

//                     var updated_date = moment(localStorage.getItem('sync_date')).format('ll');
//                     console.log(updated_date)

//                     $(".time_stamp").append(updated_date);
//                     hideSyncing();
//                     window.refresh();
//                 }

//             },
//             error: function(e) {
//                 hideLoading();
//                 if (e.status == 401) {
//                     alert("Something is wrong. Please check your internet connection and try again");
//                 }
//                 if (i == result.rows.length) {
//                     hideSyncing();
//                     window.refresh();
//                     localStorage.setItem('sync_date', printDate());
//                 }
//             }
//         });
//     }

//     if (result.rows.length == 0) {
//         hideSyncing();
//         localStorage.setItem('sync_date', printDate());
//     }


// }


arrColor = [{
    'color': '#597DA1'
}, {
    'color': '#16A085'
}, {
    'color': '#E74C3C'
}]

// function createDashboard(result) {
//     var openRibbons, inprogressRibbons;
//     var resLen = result.rows.length;
//     var i = 0;
//     switch (resLen) {
        // case 0:
        //     openRibbons = '<div class="col-lg-2 col-sm-6 col-xs-6 cts-dashboard-ribbons" ><div class="circle-tile"><a href="#"><div class="circle-tile-heading" style="background-color : ' + arrColor[0].color + '"><i class="fa fa-tasks fa-fw fa-3x"></i></div></a><div class="circle-tile-content" style="background-color : ' + arrColor[0].color + '"><div class="circle-tile-description text-faded">"Open"</div><div id="count_open" class="circle-tile-number text-faded">0</div><a class="circle-tile-footer">More Info <i class="fa fa-chevron-circle-right"></i></a></div></div></div>';
        //     inprogressRibbons = '<div class="col-lg-2 col-sm-6 col-xs-6 cts-dashboard-ribbons" ><div class="circle-tile"><a href="#"><div class="circle-tile-heading" style="background-color : ' + arrColor[1].color + '"><i class="fa fa-tasks fa-fw fa-3x"></i></div></a><div class="circle-tile-content" style="background-color : ' + arrColor[1].color + '"><div class="circle-tile-description text-faded">"Close"</div><div id="count_open" class="circle-tile-number text-faded">0</div><a class="circle-tile-footer">More Info <i class="fa fa-chevron-circle-right"></i></a></div></div></div>';
        //     break;
        // case 1:
        //     moreinfo = "open-indents.html?type=" + result.rows.item(0).status;

            // if (result.rows.item(0).status == "Open") {
            //     openRibbons = '<div class="col-lg-2 col-sm-6 col-xs-6 cts-dashboard-ribbons" onclick="redirect_indentPage(\'' + moreinfo + '\')"><div class="circle-tile"><a href="#"><div class="circle-tile-heading" style="background-color : ' + arrColor[0].color + '"><i class="fa fa-tasks fa-fw fa-3x"></i></div></a><div class="circle-tile-content" style="background-color : ' + arrColor[0].color + '"><div class="circle-tile-description text-faded">' + result.rows.item(0).status + '</div><div id="count_open" class="circle-tile-number text-faded">' + result.rows.item(0).cnt + '</div><a href=' + moreinfo + ' class="circle-tile-footer">More Info <i class="fa fa-chevron-circle-right"></i></a></div></div></div>';
            //     inprogressRibbons = '<div class="col-lg-2 col-sm-6 col-xs-6 cts-dashboard-ribbons" ><div class="circle-tile"><a href="#"><div class="circle-tile-heading" style="background-color : ' + arrColor[1].color + '"><i class="fa fa-tasks fa-fw fa-3x"></i></div></a><div class="circle-tile-content" style="background-color : ' + arrColor[1].color + '"><div class="circle-tile-description text-faded">"Close"</div><div id="count_open" class="circle-tile-number text-faded">0</div><a class="circle-tile-footer">More Info <i class="fa fa-chevron-circle-right"></i></a></div></div></div>';

            // } else {
            //     openRibbons = '<div class="col-lg-2 col-sm-6 col-xs-6 cts-dashboard-ribbons" ><div class="circle-tile"><a href="#"><div class="circle-tile-heading" style="background-color : ' + arrColor[0].color + '"><i class="fa fa-tasks fa-fw fa-3x"></i></div></a><div class="circle-tile-content" style="background-color : ' + arrColor[0].color + '"><div class="circle-tile-description text-faded">"Open"</div><div id="count_open" class="circle-tile-number text-faded">0</div><a class="circle-tile-footer">More Info <i class="fa fa-chevron-circle-right"></i></a></div></div></div>';

            //     inprogressRibbons = '<div class="col-lg-2 col-sm-6 col-xs-6 cts-dashboard-ribbons" onclick="redirect_indentPage(\'' + moreinfo + '\')"><div class="circle-tile"><a href="#"><div class="circle-tile-heading" style="background-color : ' + arrColor[1].color + '"><i class="fa fa-tasks fa-fw fa-3x"></i></div></a><div class="circle-tile-content" style="background-color : ' + arrColor[1].color + '"><div class="circle-tile-description text-faded">' + result.rows.item(0).status + '</div><div id="count_open" class="circle-tile-number text-faded">' + result.rows.item(0).cnt + '</div><a href=' + moreinfo + ' class="circle-tile-footer">More Info <i class="fa fa-chevron-circle-right"></i></a></div></div></div>';

            // }
        //     break;
        // case 2:
            // for (var i = 0; i < resLen; i++) {
            //     moreinfo = "open-indents.html?type=" + result.rows.item(i).status;
            //     if (result.rows.item(i).status == "Open")
            //         openRibbons = '<div class="col-lg-2 col-sm-6 col-xs-6 cts-dashboard-ribbons" onclick="redirect_indentPage(\'' + moreinfo + '\')"><div class="circle-tile"><a href="#"><div class="circle-tile-heading" style="background-color : ' + arrColor[i].color + '"><i class="fa fa-tasks fa-fw fa-3x"></i></div></a><div class="circle-tile-content" style="background-color : ' + arrColor[i].color + '"><div class="circle-tile-description text-faded">' + result.rows.item(i).status + '</div><div id="count_open" class="circle-tile-number text-faded">' + result.rows.item(i).cnt + '</div><a href=' + moreinfo + ' class="circle-tile-footer">More Info <i class="fa fa-chevron-circle-right"></i></a></div></div></div>';
            //     else
            //         inprogressRibbons = '<div class="col-lg-2 col-sm-6 col-xs-6 cts-dashboard-ribbons" onclick="redirect_indentPage(\'' + moreinfo + '\')"><div class="circle-tile"><a href="#"><div class="circle-tile-heading" style="background-color : ' + arrColor[i].color + '"><i class="fa fa-tasks fa-fw fa-3x"></i></div></a><div class="circle-tile-content" style="background-color : ' + arrColor[i].color + '"><div class="circle-tile-description text-faded">' + result.rows.item(i).status + '</div><div id="count_open" class="circle-tile-number text-faded">' + result.rows.item(i).cnt + '</div><a href=' + moreinfo + ' class="circle-tile-footer">More Info <i class="fa fa-chevron-circle-right"></i></a></div></div></div>';


            // }
            // break;
//     }


//     $("#cts-dashboard").append(openRibbons);
//     $("#cts-dashboard").append(inprogressRibbons);
//     $(".bajaj-footer").css("display", "block");
//     hideLoading();
// }

// redirect_indentPage = function(moreinfo_url) {
//     window.location = moreinfo_url;
// }






function details(result) {
    alert('inside result in home.js');
    var trip_invoice;
    console.log("details", result);
    var resLen = result.rows.length;
    console.log("resLen",  result.rows.length);
    console.log("resLen",  result.rows.length);
    for (var i = 0; i < resLen; i++) {
        console.log("result.rows.item(i)",  result.rows.item(i));
        console.log("result.rows.item(i)",  result.rows.item(i));
        console.log("result.rows.item(i).tripno",  result.rows.item(i).tripno);
        trip_invoice='<td>'+result.rows.item(i).tripno+'</td><td>'+result.rows.item(i).created_date+'</td><td>'+result.rows.item(i).truckno+'</td><td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>';
     }

     
     
    $("#tabledetail").append(trip_invoice);
    hideLoading();

}