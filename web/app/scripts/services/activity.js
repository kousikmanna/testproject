'use strict';

angular.module('pmtoolApp')
  .service('Activity', function Activity($q, $http, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  
  	this.fetch = function(condition){
		var deferred = $q.defer();
		var url = '/api/activity/fetch';
		$http.post(url, condition)

		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}

  	this.addActivity = function(activityData){
  		var deferred = $q.defer();
		
		$http.post('/api/activity/add', activityData)
		.success(function(activity){
			console.log(activity);
			deferred.resolve(activity);
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.addlikesActivity = function(activityData){
  		var deferred = $q.defer();
		
		$http.post('/api/activity/like', activityData)
		.success(function(activity){
			deferred.resolve(activity);
			
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.addComment = function(commentData){
  		var deferred = $q.defer();
		
		$http.post('/api/activity/comment', commentData)
		.success(function(activity){
			deferred.resolve(activity);
			
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.addlikesComment = function(activityData){
  		var deferred = $q.defer();
		
		$http.post('/api/activity/comment/like', activityData)
		.success(function(activity){
			deferred.resolve(activity);
			
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}


	this.uploadImage = function (data) {
        var deferred = $q.defer();

        $http.post('/api/attachment', data)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

  
	this.deleteActivity = function (data) {
		var deferred = $q.defer();

        $http.delete('/api/activity/'+data.activityId, data)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };
   
   this.edit = function (data,activityId) {
      	var deferred = $q.defer();

      	$http.put('/api/activity/'+activityId, data)
      	.success(function(response){
        	deferred.resolve('jgfjfhfjh',response);
     	 })
      	.error(function(err) {
        	deferred.reject(err);
      	});

      return deferred.promise;
    };

  });
	
