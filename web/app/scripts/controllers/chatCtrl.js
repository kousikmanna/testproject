// angular.module('pmtoolApp')
//   .controller('ChatController', function ($scope,$http, $rootScope, $routeParams) {
// 	// $scope.baseUrl = 'http://localhost:1337';
// 	$scope.chatList =[];
// 	var sock = io.connect('http://127.0.0.1:8000');
// 	$scope.getAllchat = function(){
// 		sock.get('api/chat');

// 		$http.get('api/chat')
// 		 .success(function(success_data){

// 		 		$scope.chatList = success_data;
// 		 		$log.info(success_data);
// 		 });
// 	};

// 	// $scope.getAllchat();

// 	$scope.chatMessage="";

// 	sock.on('chat',function(obj){
// 		if(obj.verb === 'created'){
// 			$log.info(obj)
// 			$scope.chatList.push(obj.data);
// 			$scope.$digest();
// 		}
// 	});

// 	$scope.sendMsg = function(){
// 		$log.info($scope.chatMessage);

// 		sock.post('api/chat/addconv/',{message: $scope.chatMessage},function(data){
// 			console.log('Send Message '+data);
// 		})

// 	};
// });