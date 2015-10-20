'use strict';

angular.module('pmtoolApp')
  .service('UserService', function ($q, $http, $resource, $rootScope) {

	  this.postLogin = function (user) { 

      var deferred = $q.defer();  

	    $http.post('/api/user/login', user)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err) {
        deferred.reject(err);
        
      });

      return deferred.promise;
    };

    this.setNewPassword = function (user) {
      console.log("userservice",user);

       var deferred = $q.defer();  

      $http.put('/api/set_new_password', user)
      .success(function(response){
        console.log("response",response);
        deferred.resolve(response);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;

    }
	
    //Sends request to API and User Logs out from the APPLICATION
    this.signout = function() {
    
      var deferred = $q.defer();  
      
      $http.get('/api/user/logout')
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    //To fetch logedin user profile details
    
      this.fetchProfile =function(){
        var deferred = $q.defer();
        $http.get('/api/account')
        .success(function(response){
          deferred.resolve(response)
        })
        .error(function(err){
          deferred.reject(err);
        })
        return deferred.promise;
      }
 

    // To update the userprofile who is currently logged in
    this.updateProfile = function (userData) {

      var deferred = $q.defer();

      $http.put('/api/user', userData)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    //this request will be sent when user loads image in file upload elem.
    this.uploadAvatar = function(data){
        
        var deferred = $q.defer();
        
        $http.post('/api/avatar', data)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };


    this.forgotPassword = function(){
    };

    //To fetch all the user on the App for (admin)
    this.fetch = function(){

      var deferred = $q.defer();

      $http.get('/api/user')
      .success(function(response){
        deferred.resolve(response);
      }).error(function(err) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    // Fetch other User profile on click of avatar
    this.fetchUser = function(id){
      var deferred = $q.defer();
    
      $http.get('/api/user_info/'+id)
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        deferred.reject(err);
      });
      
      return deferred.promise;
    }

    // When User receive invitation in mail, then For the first time user set the Name and Password
    this.basicInfo = function(user){
      //accept the name and password as parameter and send as Object to API
      // console.log(user);
      
      var deferred = $q.defer();
      
      $http.put('/api/basic_info', user)
      .success(function(response){
        deferred.resolve(response);
      }).error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    //reset password or forgot password
    this.resetPasswordIntiate = function(data){

      var deferred = $q.defer();
      
      $http.post('api/reset_password_initiate', data)
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    //reset password or forgot password
    this.resetPassword = function(data){

      var deferred = $q.defer();
      
      $http.put('api/reset_password', data)
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };


    //to get the status of the user logged in
    this.isLoggedIn = function(){
      var deferred = $q.defer();
      
      $http.get('/api/status')
      .success(function(user){
        $rootScope.user = user;
        deferred.resolve();
      })
      .error(function(err){
        console.log('logged out status', err);
        deferred.reject(err);
      });
      
      return deferred.promise;
    };
  }
);