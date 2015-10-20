'use strict';

angular.module('pmtoolApp')
  .service('Contact', function($http,$q) {
	
 	this.fetch = function(){
		var deferred = $q.defer();
		
		$http.get('/api/user')
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}

  	this.add = function(data){
		var deferred = $q.defer();
		
		$http.post('/api/user', data)
		.success(function(email){
      		$('#contacts-modal').modal('hide');
			deferred.resolve(email);
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}
  	
  	this.delete = function(id){
      var deferred = $q.defer();
      
      $http.delete('/api/user/'+id)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    }

    this.fetchOther = function(id){
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
  	// Contact.update = function(userId, callback){
  	// 	if(!Contact.list){
  	// 		$http.put('/api/user', userId)
	  // 		.success(function(user){

			// 	// Contact.list.indexOf();
			// 	// console.log(Contact.list.length);
			// 	callback(null, user);
			// })
			// .error(function(error){
			// 	Contact(error);
			// })
  	// 	}
  	// }

  	// return Contact;
});