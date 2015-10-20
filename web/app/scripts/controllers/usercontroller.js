'use strict';

 
angular.module('pmtoolApp')
.controller('userController',function ($scope, $rootScope, $routeParams, $location, UserService, $cookieStore){

	//User Login Method
	// $scope.loggingIn = false;
	$scope.login = function (user) {
		// $scope.loggingIn = true;
		$('#login-spinner-modal').modal('show');
		if(user.email && user.password){
			UserService.postLogin(user)
			.then(function(response){
				$('div').removeClass('modal-backdrop fade in')
				$('#login-spinner-modal').modal('hide');
				$location.path('/home');
				$scope.user = response;
				// $scope.loggingIn = false;
			}).catch(function(err){
				$('#login-spinner-modal').modal('hide');
				// $scope.loggingIn = false;
				$scope.error = err.message;
				
			});

		}
	};

		// var today=new Date() 
		// if(today.getHours() >= 0 && today.getHours() < 12) 
		// {      
		// console.log("Good morning"); 
		// }else if(today.getHours() >= 12 && today.getHours() < 16){
		// console.log("Good afternoon")
		// } 
		// else 
		// {      
		// console.log("Good evening"); 
		// } 

	//Logout method
	$scope.logout = function () {

		UserService.signout()
		.then(function(response){
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
		});
	};

	//edit profile method
	$scope.updateUser = function (user) {

		console.log('inside user contrl',user);
		//if user uploads the image, get the avatar image file name form the uploadImage method.
		user.avatar = $scope.avatarImageName;

		UserService.updateProfile(user)
		.then(function(response){
			console.log("res",response)
			$scope.user = response[0];
			$location.path('/profile');
		}).catch(function(err){
			$scope.error = err.message;
			$location.path('/profile');
		});
	};

	//This method is used convert image to BASE64
	$scope.uploadImage = function (imgElem) {
	  var el = imgElem;
	  	if(imgElem.files[0]){

  		$scope.imageUploadStatus = true;
	   	
	   	var imageData = {};
	   	var photofile = imgElem.files[0];
	   
	   	imageData.ext = photofile.type.split("/")[1];
    	var FR= new FileReader();
		FR.readAsDataURL(photofile);

	  	   	FR.onload = function (e) {
	  	   		
		    	imageData.data = e.target.result.split(",")[1];
		    	imageData.user = $scope.user.id;

		    		UserService.uploadAvatar(imageData)
		     		.then(function(response){
          				console.log('response',response);
	     				if(response){
			     			$scope.imageUploadStatus = false;
	     				}
		     			$scope.avatarImageName = response.name;
		     		}).catch(function(err){
						$scope.imageUploadStatus = false;
		      			$scope.error = err.message;
		     		});
	    	};
	    }   
  	};
	
  	var path = $location.path();
  	if((path.indexOf('profile')  > 0) && $routeParams.id){
	  	UserService.fetchUser($routeParams.id)
		.then(function(profile){
			$scope.profile = profile;
		}).catch(function(err){
			$scope.error = err.message;
			$location.path('/profile');
		});
	}
	
	//First Time Registration Method to set Name and Password.
	$scope.basicInfo = function (data) {

		var user = {
			name : data.name, 
			password : data.password, 
			hashKey : $routeParams.hashKey
		};

		UserService.basicInfo(user)
		.then(function(response){
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
		});
	};

	// if($rootScope.user){
	if((path.indexOf('profile')  > 0)){
		UserService.fetchProfile()
		.then(function(response){
			$scope.user = response;
		}).catch(function(err){
			$scope.error = err.message;
		});
	}
})

.controller('resetPasswordCtrl', function ($scope, $location, UserService, $routeParams ,$rootScope){

	$scope.user = $rootScope.user;
	$scope.requirederror = false;

	$scope.resetPassword = function (password) {
	
		var data = {
			hashKey : $routeParams.hashKey,
			password : password
		};

		UserService.resetPassword(data)
		.then(function(response){
			console.log("response",response)
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
			console.log($scope.error);
			$location.path('/resetpassword');
		});
	};

	$scope.resetPasswordIntiate = function (email) {
		UserService.resetPasswordIntiate(email)
		.then(function(response){
			$location.path('/notifyemail');
		}).catch(function(err){
			$scope.error = err.message;
			console.log(err);
			$location.path('/');
		});
	};


	$scope.changePassword = function () {
		if($scope.newPasswordFirst == undefined || $scope.newPasswordSecond == undefined || $scope.oldPassword == undefined ){
			$scope.requirederror = true;
		}else if($scope.newPasswordFirst != $scope.newPasswordSecond){
			$scope.requirederror = false;
			alert("Set Newpassword correctly")
		}else{
			$scope.requirederror = false;
			var data = {
				userId : $scope.user.id,
				oldPassword : $scope.oldPassword,
				newPassword : $scope.newPasswordFirst
			};

			UserService.setNewPassword(data)
			.then(function(response){
				$('#view-image-modal').modal('show');

				setTimeout(function() { 
					$('#view-image-modal').modal('hide');
				}, 2000);

				$scope.oldPassword = "";
				$scope.newPasswordFirst = "";
				$scope.newPasswordSecond = "";
				
			}).catch(function(err){
				$scope.error = err.message;
				console.log(err);
			});
		}
	};
})


