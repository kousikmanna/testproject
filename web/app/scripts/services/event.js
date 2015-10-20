'use strict';

angular.module('pmtoolApp')
  .service('Event', function($http) {
  	var Event = {};

  	Event.list = null;
	Event.fetch = function(){  	
	  	if(!Event.list){
	  		// $http.get('http://localhost/responses/event.php').success(function(data){
	  		// 	Event.list = data;
	  		// 	console.log(Event.list);
	  		// });
	  	}
		return Event;
	}

	Event.add = function(){

	}

	Event.delete = function(){
		
	}

	Event.update = function(){
		
	}
	return Event;    
});