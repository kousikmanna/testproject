host = "js/api/";
// host = "//dev.bajaj.gladminds.co/v1/gm-users/";
var domain;

$(function() {
    console.log('deviceready');
    document.addEventListener("deviceready", onDeviceReady, true);
});

function onDeviceReady() {
    //
     $.ajax({ 
        type: 'GET', 
        url: host+'index.json', 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (brandIndex, status) {

            domain = brandIndex.domain_name;

                var brand_img = '<img class="img-responsive logo" src='+brandIndex.logo_url+'>';
                console.log('brand_img',brand_img);
                $("#brand_image").append(brand_img);

                $("#brand_name").text(brandIndex.product + "!");

                if (brandIndex.user_register == 1) {
                    $(".oneApp-bajaj").css("display", "block");

                    $.ajax({ 
                        type: 'GET', 
                        url: host+'register.json', 
                        data: { get_param: 'value' }, 
                        dataType: 'json',
                        success: function (registration_form_data, status) {
                                            for (var i = 0; i < registration_form_data.legend.length; i++) {
                                                var reg_data = registration_form_data.legend;

                                                var input_fields = '<h4 class="page-header reg-form-header col-md-12">' + registration_form_data.legend[i].type + '</h4>';
                                                for (var j = 0; j < reg_data[i].fields.length; j++) {
                                                    if (reg_data[i].fields[j].mandatory == "0") {

                                                        input_fields += '<div class="form-group col-md-' + reg_data[i].fields[j].span + ' "><label>' + reg_data[i].fields[j].label + '</label><input type=' + reg_data[i].fields[j].input_type + ' class="reg-input-blocks form-control" name=' + reg_data[i].fields[j].fld_name + '></div>';
                                                    }
                                                    else {
                                                        input_fields += '<div class="form-group col-md-' + reg_data[i].fields[j].span + ' "><label>' + reg_data[i].fields[j].label + '<span class="mandatory_field"><sup>*</sup></span></label><input type=' + reg_data[i].fields[j].input_type + ' class="form-control reg-input-blocks" name=' + reg_data[i].fields[j].fld_name + '></div>';
                                                    }
                                                }
                                                $("#user-reg-form").append(input_fields);
                                            }
                                        },
                        error: function(e){
                            console.log(e);
                        }
                    });
                }
                else {
            $(".new-user-reg").css("display", "none");
                }

                $(".index-page-wrapper").css("display", "block");
            },
        error: function(e){
            console.log(e);
        }
    });

    // localStorage.clear();
    $('#Passwd').bind("cut copy paste",function(e) {
        e.preventDefault();
    }); 
    $.ajax({
        type: 'GET', 
        url: host+ 'version.json',
        dataType: 'json',
        success: function(version) {
            create_footer(version);
        },
        error: function(e){
            console.log(e);
        }
    });
    //
    DBHandler.initDatabase();
    console.log('initDatabase');
}

//
function loginCheck() {
     console.log('loginCheck');
    //
    // DBHandler.initDatabase();
    //
	// localStorage.clear();
	// $('#Passwd').bind("cut copy paste",function(e) {
 //  		e.preventDefault();
 //  	}); 
 //    $.validator.addClassRules({
	// email: {
	//     required: true,
	//     maxlength: 40,
	//     specialChars:true
	// },
	// password: {
	//     required: true,
	//     maxlength: 40,
	//     specialChars:true
	// }
 //    });
	
	

    // $("#signIn").bind('click', function(e){

    //     e.preventDefault();
    //     $("#error-msg-login-window").css("display", "none");
    //     showLoading();
    //     var input_email = $("#Email").val();
    //     var email = input_email.trim();
    //     console.log("email:",email);
    //     var input_password = $("#Passwd").val();
    //     var password = input_password.trim();
    //     console.log("password", password);
    //     var pwd_encrypted = $.md5(password);
    //     //console.log(pwd_encrypted)
	   //  var form = $("#gaia_loginform");

        // if((email == 'ticl_dealer@bajajauto.co.in') && (password == "dealer123")) {
            // if((email == 'a@gmail.com') && (password == "1234")) {
            //console.log("email: ",email, "password", password);
             //window.location.href = "create_grn.html";
             //
            // DBHandler.initDatabase();
            // $.ajax({
            //     type: 'GET', 
            //     url: host+ 'trip.json',
            //     data: { get_param: 'value' }, 
            //     dataType: 'json',
            //     success: function(log_data, status) {
            //         DBHandler.saveAllRecords(log_data.objects, dataSaved);
            //     },
            //     error: function(e){
            //         console.log(e);
            //     }
            // }); 
            //
            // window.location.href = "create_grn.html?'email'="+email;
        //     var data =  [
        //             {
        //             "tripno" : 1001,                 
        //             "created_date" : "20/10/2015",
        //             "modified_date" : "20/10/2015",
        //             "truckno" : "at01"            
        //             }
        //              ];

        //     DBHandler.saveAllRecords(data, dataSaved);
        // } else {
        //     $("#error-msg-login-window").css("display", "block");
        //     hideLoading();
        // }


//	console.log(form.validate());
//	console.log(form);
	// form.validate();
	// if(form.valid() === true) {
	//    var formData = {"txtUsername":email,"txtPassword":pwd_encrypted};
 //        //serilizedData = JSON.stringify(formData);
 //        //console.log(serilizedData);

 //     	$.ajax({
 //            url : "apis/index.php?action=loginCheck",
 //            type: "post",
	//         cache: false,
 //     	    data: formData,
 //            dataType:"json",
 //            success: function (data, resp) {
 //                if (data.status === "success") {
 //                    localStorage.setItem("user_id", data.userid);
 //        		    localStorage.setItem("user_name", data.user_name);
 //        		    localStorage.setItem("user_role", data.user_role);
 //                    window.location = "home.html";
    		    
 //                    hideLoading();
 //                } else {
 //                    $("#error-msg-login-window").css("display", "block");
 //                    hideLoading();
 //                }
 //            },
 //            error: function(error)
 //            {
 //                $("#error-msg-login-window").css("display", "block");
 //                hideLoading();
 //            }
 //        });
 //    } else {
	// 	hideLoading();
	//     return false;
	// }

    // });
    
    //
        $("#error-msg-login-window").css("display", "none");
        showLoading();
        var input_email = $("#Email").val();
        var email = input_email.trim();
        console.log("email:",email);
        var input_password = $("#Passwd").val();
        var password = input_password.trim();
        console.log("password", password);
        var pwd_encrypted = $.md5(password);
        //console.log(pwd_encrypted)
        var form = $("#gaia_loginform");

        // var formData = {
        //     "email": email,
        //     "password": password
        // };
        // serilizedData = JSON.stringify(formData);


        // console.log(serilizedData)
            //$(".errorDivClass").html("Error Message");
        // var err = validateLogin(un, pw);
        // if (err != '') {
        //     $("#error-msg-login-window").html(err);
        //     $("#error-msg-login-window").css("display", "block");
        //     return false;
        // } else {
            // sessionStorage.setItem('username',un);
            // window.location = "home.html";
            // showLoading();
            // $.ajax({
            //     type: 'POST',
            //     url: 'http://qa.bajaj.gladminds.co/v1/gm-users/login/',
            //     data: serilizedData,
            //     dataType: 'json',
            //     success: function(log_data, status) {
            //         // alert(log_data.status)
            //         if (log_data.status == 1) {

            //             localStorage.setItem('access_token', log_data.access_token)
            //                 // sessionStorage.setItem('user_group',log_data.user_group);
            //             localStorage.setItem('user_id', un);
            //             // alert(log_data.login_id+","+log_data.user_group+","+log_data.rep_manager_id);
            //             localStorage.setItem("isRegistered", true);

            //             fetchDatabase(log_data.access_token);

            //         } else if (log_data.status == 0) {
            //             //alert(status);


            //             $("#error-msg-login-window").html(log_data.message);
            //             localStorage.setItem("isRegistered", false);

            //             $("#error-msg-login-window").css("display", "block");
            //         }
            //         hideLoading();

            //     },
            //     error: function(e) {
            //         $("#error-msg-login-window").html('You are not registered. Please contact administrator');
            //         $('#error-msg').css('visibility', 'visible');
            //         $("#Passwd,#Email").val('');
            //         $("#Email").focus();


            //         return false;
            //     }
            // });
             if((email == 'a@gmail.com') && (password == "1234")) {
               console.log("condition check");
            //console.log("email: ",email, "password", password);
             //window.location.href = "create_grn.html";
             //
            // DBHandler.initDatabase();
            // $.ajax({
            //     type: 'GET', 
            //     url: host+ 'trip.json',
            //     data: { get_param: 'value' }, 
            //     dataType: 'json',
            //     success: function(log_data, status) {
            //         DBHandler.saveAllRecords(log_data.objects, dataSaved);
            //     },
            //     error: function(e){
            //         console.log(e);
            //     }
            // }); 
            //
            // window.location.href = "create_grn.html?'email'="+email;
            var data =  [
                    {
                    "tripno" : 1001,                 
                    "created_date" : "20/10/2015",
                    "modified_date" : "20/10/2015",
                    "truckno" : "at01"            
                    }
            ];
            console.log("Before DBHandler");
            DBHandler.saveAllRecords(data, dataSaved);
            console.log("After DBHandler");
           } else {
            // console.log();
            $("#error-msg-login-window").css("display", "block");

            hideLoading();
            }
      

        // }
        return false;

    //

//
  //validation for not allowing special characters in address
// $.validator.addMethod("specialChars", function(value, element) {
//     return this.optional(element) || /^[ A-Za-z0-9_]*$/i.test(value);
//     }, "No special characters except(_)"
// );

};

function dataSaved(data) {
    window.location.href = "create_grn.html";
}



function showLoading(){
    $("#loading").show();
}

function hideLoading(){
    $("#loading").hide();
}

function create_footer(version) {
    var footer = '<footer class="bajaj-footer"><span>All rights reserved by Bajaj Auto Ltd.</span><br><span>Powered by <a href="//gladminds.co/#products" target="_blank">GladMinds Connect Platform</a></span><br><span>Version '+version.version_no+'</span></footer>';

    $(".bajaj-footer").append(footer);
}
