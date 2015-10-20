'use strict';

angular.module('pmtoolApp')

  	.directive('updateactivity', function ($rootScope, $routeParams, $location, Project, UserService, Activity) {
	    return {
	      	templateUrl: 'views/updateactivity.html',
	      	restrict: 'CE',
	      	scope: {
            	activities1: '=activities1',
            	projects: '=projects'
            	
			},

	      	link: function(scope, element, attrs) {
	      		//for displaying popup on seect of button
	      		scope.updateActivity = function(){
	      			$(element).find('.list-projects').toggleClass('show');
	      		};
	      		scope.typeInProcess = false;
	      		scope.typeInProcess= function() {      
				  scope.typeInProcess = true;
				}; 
	
	      		scope.uploadAttachment = function (imgElem) {
	      			
	      		
				  var el = imgElem;
				  	if(imgElem.files[0]){

				   	scope.imageData = {};
				   	var photofile = imgElem.files[0];

				   	scope.attach_name = photofile.name;
				   	console.log('scope.attach_name',scope.attach_name);

				   var ext = photofile.name.split(".");
				   	scope.imageData.ext = ext[ext.length-1];
			    	var FR= new FileReader();
					FR.readAsDataURL(photofile);

				  	   	FR.onload = function (e) {
				  	   		alert("upload complete");
				  	   		// scope.loader = false;
				  	   		
					    	scope.imageData.data = e.target.result.split(",")[1];
					    	// scope.imageData.fullFormat = e.target.result;
					    	console.log(e.target.result);

					    		
				    	};
				    }   
			  	};	 

			  	scope.loader = false;
			  	scope.processing = false;

	      		scope.sendActivity = function (description, projectId) {
	      			
	      			scope.processing = true;
	      			$('.list-projects').removeClass('show');
	      			scope.loader = true;
	      			if(scope.imageData){
		      			Activity.uploadImage(scope.imageData)
			     		.then(function(response){
			     			
			     			console.log('image upload',response);
			     			scope.attachment = response.name;
			     			console.log('scope.attachment',scope.attachment);
			     			var activityData = {
			      				description: description, 
			      				project: projectId,
			      				attachment:scope.attachment,
			      				likes:[],
			      				parentId: null,
			      				comments:[]
			      			};
			      			console.log('activityData',activityData);
			     			Activity.addActivity(activityData)
			      			.then(function(response){
			      				scope.loader = false;
			      				scope.processing = false;
			      				console.log('activity',response);
								scope.activities1.unshift(response);
								scope.activity.description = "";
								scope.attach_name = "";
								scope.imageData = "";
			      			}).catch(function(err){
		      					console.log(err);
			      			})
		     				if(response){
				     			scope.imageUploadStatus = false;
		     				}
			     		}).catch(function(err){
							scope.imageUploadStatus = false;
			      			scope.error = err.message;
			     		});
			     	}else{
			     		var activityData = {
		      				description: description, 
		      				project: projectId,
		      				likes:[],
			      			parentId: null,
			      			comments:[]
		      			};
		      			Activity.addActivity(activityData)
		      			.then(function(response){
		      				console.log('activity response',response);
		      				scope.loader = false;
		      				scope.processing = false;
							scope.activities1.unshift(response);
							$('.list-projects').removeClass('show');
							scope.activity.description = "";
							scope.attach_name = "";
							
		      			}).catch(function(err){
	      					console.log(err);
		      			});
			     	}
	      		}

	      		scope.path = $location.path();
	      		
      			scope.updateInProject = function(description){
	      			var projectId = $routeParams.id;
	      			var activityData = {
	      				description: description,
	      				project: projectId,
	      				likes : []
	      			}
	      			Activity.addActivity(activityData)
	      			.then(function(response){
	      				console.log('inside updateInProject',response);
	      				scope.activities1.unshift(response);
	      				scope.activity.description = "";
	      				scope.attach_name = "";
	      				scope.imageData = "";
	      			}).catch(function(err){
	  					console.log(err);
	      			})
	      		}

	      		scope.updateInTask = function(description){
	      			var taskId = $routeParams.id;
	      			console.log('description',description);
	      			var activityData = {
	      				description: description,
	      				task: taskId,
	      				project: attrs.project,
	      				likes : []
	      			}
	      			Activity.addActivity(activityData)
	      			.then(function(response){
	      				console.log('inside updateInTask',response);
	      				scope.activities1.unshift(response);
	      				scope.activity.description = "";
	      				scope.attach_name = "";
	      				scope.imageData = "";
	      			}).catch(function(err){
	  					console.log(err);
	      			})
	      		}

	      		$('.tag-user').mentionable('/api/user/suggest/',
	      			{
	      				minimumChar: 1,
	      				parameterName: 'term'
	      			}, function(lists){
                    console.log(lists);
                });
	      		
	      		
	      	}
	    };
	}
);