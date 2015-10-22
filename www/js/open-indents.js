$(function() {
    document.addEventListener("deviceready", onDeviceReady, true);
});

function onDeviceReady() {
    DBHandler.initDatabase();
    showLoading();
    page_url = window.location.href;
    getParameterByName(page_url);
    pageType = getParameterByName('type');

    setTimeout(function() {
        // console.log('getIndents');

        DBHandler.getIndents(pageType, create_indents);
    }, 1000);
    $(".pageType").html(pageType);
    $(".bajaj-footer").css("display", "block");
}




function create_indents(indents) {
    // uniqueIndents = new Array();
    var date = '';
     console.log("testing "+JSON.stringify(indents));
    for (i = 0; i < indents.rows.length; i++) {
        console.log("testing "+JSON.stringify(indents.rows.item(i)));
        var seal = indents.rows.item(i).seal_no;
        var c_no = indents.rows.item(i).container_no;
        linkURL = 'indent-details.html?&indent=' + indents.rows.item(i).indent_number + '&transaction=' + indents.rows.item(i).id + '&noc=' + indents.rows.item(i).no_of_containers + '&type=' + pageType;
        
        if (indents.rows.item(i).CNT == 0) {
            lr_notify_color = 'lr_absent';
            linkURL = "javascript: alert('No LRs found');"

        } else if (seal == '' || c_no == '' || seal == null || c_no == null) {
            lr_notify_color = 'lr_present';
        } else {
            lr_notify_color = 'lr_present_filled';
        }

        txtIndents = '<tr>\
                            <td><a class="' + lr_notify_color + '" href="'+linkURL+'">' + indents.rows.item(i).indent_number + '</a></td>\
                            <td class="display-none">' + date + '</td>\
                            <td>' + indents.rows.item(i).no_of_containers + '</td>\
                            <td>' + indents.rows.item(i).partner_name + '</td>\
                        </tr>';

        $("#indents_table").append(txtIndents);

    }




    $('#indent_info_table').dataTable({
        "order": [
            [1, "desc"]
        ],
        "iDisplayLength": 10,
    });
    // $(".dataTables_filter > label").text("")
    hideLoading();

}

function showLoading() {
    $("#loading").show();
}

function hideLoading() {
    $("#loading").hide();
}