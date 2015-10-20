'use strict';

angular.module('pmtoolApp')
  .controller('contactController', function ($scope,$location, $rootScope, $routeParams, $cookieStore, Contact,Project) {
	// $scope.contacts = Contact.fetch();

	$scope.user = $rootScope.user;
	// console.log("rootscope.user",$rootScope.user);

	Contact.fetch().then(function(response){
		$scope.contacts = response;
		// console.log("contacts",$scope.contacts);
	}).catch(function(err){
		$scope.error = err.message;
	});
	var path = $location.path();
	if($routeParams.id){ 
		Project.fetch().then(function(response){
			$scope.projects = response;
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

	$scope.emailError = false;

	$scope.addNewContact = function (data) {

		var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
		if (testEmail.test(data.email)){
			$scope.emailError = false;
			Contact.add(data).then(function(response){
				$scope.contacts.push(response);
				$('.email').val('');
			}).catch(function(err){
				$scope.error = err.message;
			});
		}else{
			$scope.emailError = true;
		}
	}

	$scope.deleteContact = function(id){
		if (window.confirm('Delete!! Are You Sure?')){
			Contact.delete(id).then(function(response){
				Contact.fetch().then(function(response){
					$scope.contacts = response;
				}).catch(function(err){
					$scope.error = err.message;
				});
			}).catch(function(err){
				$scope.error = err.message;
			})
		}
	}

	$scope.selection=[];

	$scope.toggleSelection = function(id){
		var idx = $scope.selection.indexOf(id);

		if (idx > -1) {
			$scope.selection.splice(idx, 1);
		} else {
			$scope.selection.push(id);
		}

	}
});