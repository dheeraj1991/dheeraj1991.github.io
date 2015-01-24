angular.module('clientCtrls', [])
.controller('myPlan', function($scope, $location) {
 	$scope.message = function() {
 		$location.path('/messages');
 	}
})
.controller('todayWorkout', function($scope, $location) {
 	$scope.start = function() {
 		$location.path('/preview');
 	}
})