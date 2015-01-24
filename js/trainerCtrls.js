var currentUser = null;
angular.module('trainerCtrls', [])
.controller('login', function($scope, $location) {
	$scope.loginData = {};
  $scope.login = function() {
  	if($scope.loginData.email === 'trainer')
 	   $location.path('/profile');
 	else if($scope.loginData.email === 'client')
 		 $location.path('/myPlan');
  }
})
.controller('profile', function($scope, $location) {
 	 $scope.continue = function() {
    $location.path('/clientFeed');
  }
})
.controller('clientFeed', function($scope, $location,$ionicLoading, trainer, people) {
	$scope.people = people.list;
  	$scope.clientTask = function(client) {
  		currentUser = client;
  	  $location.path('/clientTasks');
  	}
    trainer.get().then(function(user){
      $scope.trainer = user;
    });

       $ionicLoading.show({
    template : 'Loading ...'
   });
   people.ready.then(function() {
    $ionicLoading.hide();
   });

     
})
.controller('settings',  function($scope, $location, trainer) {
    trainer.get().then(function(user){
      $scope.trainer = user;
    });

})
.controller('changePassword',  function($scope, $location, people) {
		$scope.done = function() {
  	  $location.path('/settings');
  	}
})
.controller('forgotPassword',  function($scope, $location, people) {
    $scope.send = function() {
      $location.path('/settings');
    }
})

.controller('invite', function($scope, $location) {
 	 $scope.continuedemo = function() {
    $location.path('/clientFeed');
	}
})
.controller('textMsg', function($scope, $rootScope , $location, people) {
 	 $scope.people = people.list;

   $scope.$watch('people', function(){
     console.log(people.list);
     var count = 0;
     people.list.map(function(p){
      count += (p.isSelected === true ? 1 : 0); 
     });
     $scope.count = count;
   }, true);

   $scope.invite = function() {
     $rootScope.emailList = $scope.people.reduce(function(a, b){
      if(b.isSelected) a.push(b);
      return a; 
     }, []);   
     $location.url('emailInvite');
   }
  
})
.controller('emailInvite', function($scope, $rootScope, $location){
    console.log("#123");
    console.log($rootScope.emailList); 	 
})
.controller('clients', function($scope, $location, people, $ionicLoading) {
 	 $scope.people = people.list;

 	 $scope.setClient = function(client) {
 	 	currentUser = client;
 	 	$location.path('/singleClient');
 	 };

})
.controller('singleClient', function($scope, $location) {
 	 $scope.currentUser = currentUser;
 	 $scope.clientGoals = function() {
 	 	currentUser = client;
 	 	$location.path('/clientGoals');
 	 };
})

.controller('clientTasks', function($scope, $location, ReplaceSrv) {
 	$scope.currentUser = currentUser;
 	$scope.num = [1,2,3];
 	$scope.nutrition = ['drink 16oz of water upon rising',
 						'drink half of body weight in oz', 
 						'eat a salad for lunch'];
 	$scope.running = ['walk for 15 minutes',
 						'walk for 30 minutes', 
 						'walk for 45 minutes',
 						'walk for 60 minutes'];

 		$scope.activeTab = 'first';
 	$scope.setActiveTab = function(tab) {
 		$scope.activeTab = tab;
 	}
 	$scope.editMode= false;
 	$scope.onSwipeLeft = function(work) {
 		work.editMode= true;
 		console.log(work.name);
 	}
 	$scope.onSwipeRight = function(work) {
 		work.editMode= false;
 	}

 	$scope.replace = function(work) {
    ReplaceSrv.setWork(work);
    work.editMode =false;
 		$location.path('/replace');
 	}
 	$scope.done = function() {
 		$location.path('/singleClient');
 	}

 	$scope.delete = function(work) {
 		var index = $scope.workout.indexOf(work);
		if(index!=-1)	$scope.workout.splice(index, 1);
 	}

  $scope.add = function() {
    ReplaceSrv.setWork(null);
    ReplaceSrv.setAddWork($scope.workout);
    $location.path('/replace');
  }


 	$scope.workout = [{name: 'Bicylce - Bent knee', time: '30s',
 						editMode: false, img:'img/bicyclebentknee.jpeg'},
 					  {name: 'Side Bridge', 		time: '30s',
 					  	editMode: false, img: 'img/sidebridge.jpeg'},
 					  {name: 'Push up', 			time: '1m', 
 					  	editMode: false, img:'img/bicyclebentknee.jpeg'}];

 
})
.factory('ReplaceSrv', function(){
  var selectedWork = null;
  var workList = null;

  return{
    setWork: setWork,
    getWork: getWork,
    setAddWork: setAddWork,
    getAddWork: getAddWork
  }

  function setWork(work){
    selectedWork = work;
  }
  function getWork(){
    return selectedWork
  }
  function setAddWork(list){
    workList = list;
  }
  function getAddWork(){
    return workList 
  }
})
.factory('trainer',  function($http, $q) {
  var trainer = {};
  var user = null;
  trainer.get = function(){
    var deffered = $q.defer();

    console.log(user);

    if(user) deffered.resolve(user);
    

    $http.get('http://api.randomuser.me/')
    .then(function(response) {
      user = angular.copy(response.data.results[0].user);
      deffered.resolve(user);
    });

    return deffered.promise;
  }
 
  return trainer;
})

.factory('people',  function($http, $q) {
	var people = {};
	people.list = [];

	people.add = function() {
		return $http.get('http://api.randomuser.me/')
		.then(function(response) {
			people.list.push(response.data.results[0].user);
		});
	};
	people.ready = $q.all([
		people.add(),
		people.add(),
		people.add(),
    people.add()
	]);
	return people;
});
