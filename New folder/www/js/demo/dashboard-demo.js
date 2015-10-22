host = 'js/api/dfsc/';
localhost = "../js/api/";
serverhost = "//bajaj.gladminds.co/";
access_token = localStorage.getItem("access_token");
var chart_details = [];

function getDateLimits(date) {  
    var date_gte = date.getFullYear()+ "-" +date.getMonth() + "-" +date.getDate();
    return date_gte;
}

function sms_transaction_graph() {
    showSectionLoading("smsTransaction_trend")
    $.ajax({ 
        type: 'GET', 
        url: serverhost+ 'v1/sms-report/?access_token=' +access_token, 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (smsTransactionTrend, status) {                 

                $("#graph2-title").text("SMS Transaction Trend"); 

                var total_sentSMS = 0;
                var total_pullSMS = 0;

                for(var i=0; i<smsTransactionTrend.objects.length;i++) {
                    total_sentSMS = total_sentSMS + parseInt(smsTransactionTrend.objects[i].sent);
                    total_pullSMS += parseInt(smsTransactionTrend.objects[i].received);
                }          

                total_sentSMS = numberWithCommas(total_sentSMS);
                total_pullSMS = numberWithCommas(total_pullSMS);

                var smsGraphHead = '<span class="small text-faded bajaj-textColor-orange" style="color:#1C92C5;">Pull SMS - </span><span class="small text-faded " style="color:#1C92C5;"><strong>'+total_pullSMS+'; </strong></span><span class="small text-faded bajaj-textColor-orange" style="color:#F39C12;">Push SMS - </span><span class="small text-faded " style="color:#F39C12;"><strong>'+total_sentSMS+'</strong></span>';

                $("#smsGraphHead").append(smsGraphHead);

                var sms_data = smsTransactionTrend.objects;

                Morris.Line({
                      element: 'bajaj-sms-transaction-trend',
                      data: sms_data,
                      xkey: 'date',
                      ykeys: ['received', 'sent'],
                      labels: ['Pull SMS', 'Push SMS'],
                      lineColors: ['#1C92C5', '#F39C12'],
                      hideHover: 'auto',
                      resize: true,
                      gridTextFamily: ['Open Sans'],
                      gridTextColor: ['#000'],
                      fillOpacity: 0.1,
                      pointSize: 0,
                      smooth: true,
                      lineWidth: 2,
                      grid: true,
                      dateFormat: function(date) {
                          d = new Date(date);
                          return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                        },
            });
                hideSectionLoading("smsTransaction_trend")

            },
        error: function(e){
            hideSectionLoading("smsTransaction_trend")
            console.log(e);
        }
    });
}

function service_coupon_status_graph() {
    showSectionLoading("coupon_status_trend");
    var d = new Date();
    var date_lte = d.getFullYear()+ "-" +(d.getMonth()+1)+ "-" +d.getDate();
    var date_gte = getDateLimits(d);

    $.ajax({ 
        type: 'GET', 
        url: serverhost+'v1/coupons-report/?access_token=' +access_token+ '&created_date__lte='+date_lte+ '&&created_date__gte='+date_gte, 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (couponTrend, status) { 

                $("#graph1-title").text("Service Coupon Status Trend");
                var total_closed = 0;
                var total_unused = 0;
                var total_inprogress = 0;

                for(var i=0; i<couponTrend.objects.length;i++) {
                    total_closed += parseInt(couponTrend.objects[i].closed);
                    total_inprogress += parseInt(couponTrend.objects[i].inprogress);
                    total_unused += parseInt(couponTrend.objects[i].unused);
                } 

                total_closed = numberWithCommas(total_closed);
                total_inprogress = numberWithCommas(total_inprogress);
                total_unused = numberWithCommas(total_unused);


                var couponGraphHead = '<span class="small text-faded bajaj-textColor-orange" style="color:#1C92C5;">Closed Coupon - </span><span class="small text-faded " style="color:#1C92C5;"><strong>'+total_closed+'; </strong></span><span class="small text-faded bajaj-textColor-orange" style="color:#F39C12;">In Progress Coupon - </span><span class="small text-faded " style="color:#F39C12;"><strong>'+total_inprogress+'; </strong></span><span class="small text-faded bajaj-textColor-orange" style="color:red">Unused Coupons - </span><span class="small text-faded " style="color:red;"><strong>'+total_unused+'; </strong></span>';

                $("#couponGraphHead").append(couponGraphHead);  

                var couponTrend_data = couponTrend.objects;
                 
                Morris.Line({
                    element: 'bajaj-coupon-status-trend',
                    data: couponTrend.objects,
                    xkey: 'date',
                    ykeys: ['closed', 'inprogress'],
                    labels: ['Closed', 'In Progress'],
                    lineColors: ['#1C92C5', '#F39C12'],
                    hideHover: 'auto',
                    resize: true,
                    gridTextFamily: ['Open Sans'],
                    gridTextColor: ['#000'],
                    fillOpacity: 0.1,
                    pointSize: 0,
                    smooth: true,
                    lineWidth: 2,
                    grid: true,
                    dateFormat: function(date) {
                        d = new Date(date);
                        return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                    }
                });
                
                hideSectionLoading("coupon_status_trend")

            },
        error: function(e){
            hideSectionLoading("coupon_status_trend")
            console.log(e);
        }
    });

}

//Flot Chart Dynamic Chart

var container = $("#flot-chart-moving-line");

var maximum = container.outerWidth() / 10 || 300;

var data = [];

function getRandomData() {

    if (data.length) {
        data = data.slice(1);
    }

    while (data.length < maximum) {
        var previous = data.length ? data[data.length - 1] : 50;
        var y = previous + Math.random() * 10 - 5;
        data.push(y < 0 ? 0 : y > 100 ? 100 : y);
    }

    // zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
    }

    return res;
}

//

series = [{
    data: getRandomData(),
    lines: {
        fill: true,
        fillColor: "rgba(255,255,255,0.4)",
    },
}];


