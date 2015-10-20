'use strict';

angular.module('pmtoolApp')
  .service('Backlog', function ($http, $q, $resource, $routeParams) {

	this.fetchBacklogs = function(data){
  		var deferred = $q.defer();
		
		$http.post('/api/backlog', data)
		.success(function(backlogs){
			deferred.resolve(backlogs);
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.createBacklog = function(data){
		var deferred = $q.defer();

		$http.post('/api/backlog/create', data)
		.success(function(backlog){
			deferred.resolve(backlog);
		})
		.error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.editBacklog = function(backlogId, data){
		var deferred = $q.defer();

		$http.put('/api/backlog/edit/'+backlogId, data)
		.success(function(backlog){
			deferred.resolve(backlog);
		})
		.error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.deleteBacklog = function(backlogId){
		console.log('inside delete service');
		var deferred = $q.defer();

		$http.delete('/api/backlog/'+backlogId)
		.success(function(backlog){
			deferred.resolve(backlog);
		})
		.error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.getBacklogDetails = function(backlogId){
		var deferred = $q.defer();

		$http.get('/api/backlog/'+backlogId)
		.success(function(backlog){
			deferred.resolve(backlog);
		})
		.error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

  });