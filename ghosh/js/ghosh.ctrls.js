  angular.module('starter')
  .controller('MessageCtrl', function($scope, $http){
    $scope.messages = [
      {sender: 'self', text:'Hey, thank you for keeping me accountable. David!'},
      {sender: 'other', text: 'You finished you workout for the day?'},
      {sender: 'self', text:'It was so good! It really was probably the best one yet'},
      {sender: 'other', text: 'Glad to hear that!!'}
    ];
		
    $http.get('http://api.randomuser.me/')
		.then(function(response) {
			console.log(response.data.results[0].user);
			$scope.user = response.data.results[0].user;
		});

    $scope.addMsg = function(){
      $scope.messages.push({
        sender: 'self',
        text: $scope.message
      });
      $scope.message = '';
    }
  })
  .controller('PreviewCtrl', function($scope){
    $scope.count = [4,5,6,7,8,9,10,11];    
    $scope.pageIndex = 0;
    $scope.resp = 8;
    $scope.intensity = 0;
     $scope.myplan = function() {
    
    $location.path('/myPlan');
   };
    
    $scope.list = [
      {name: 'Push ups', url:''},
      {name: 'Abs', url:''},
    ]

    $scope.prev = function pageIndex(){
      $scope.pageIndex = ($scope.pageIndex - 1) % 4;
    }
    $scope.next = function pageIndex(){
      $scope.pageIndex = ($scope.pageIndex + 1) % 4;
    }
    $scope.seleResp = function(c){
      $scope.resp = c;
    }

    $scope.setIntensity = function(i){
      $scope.intensity = i;
    }
  })
  .controller('ReplaceCtrl', function($scope, $location, ReplaceSrv){
    var master = [
      {name: 'push up', img: 'img/arm.jpg',time: '1m', editMode: false},
      {name: 'pull up', img: 'img/chest.jpg',time: '1m', editMode: false},
      {name: 'side bridge', img: 'img/back.jpg',time: '1m', editMode: false},
      {name: 'bicycle bent', img: 'img/butt.jpg',time: '1m', editMode: false},
      {name: 'running', img: 'img/thigh.jpg',time: '1m', editMode: false}
    ]

    $scope.selectedWork = ReplaceSrv.getWork();
    if($scope.selectedWork === null) {
      $scope.title = 'Add';
      $scope.hideSelected = true;
      $scope.workList = ReplaceSrv.getAddWork();
    } else {
      $scope.title = 'Replace';
      $scope.hideSelected = false;
    }  

    $scope.list = master;
    $scope.selected = null;
    $scope.showDone = false;
    $scope.option = 1;

    $scope.showRecent = function(){
      $scope.option = 2;
      $scope.list = master.slice(0, 4);
    }

    $scope.select = function(m){
      $scope.selected = m;
      $scope.showDone = true;
    }

    $scope.showArea = function(){
      $scope.option = 1;
      $scope.list = master;
    }

    $scope.sortList = function(){
      $scope.option = 3;
      var temp = master.slice(0);
      $scope.list = temp.sort(function(a, b){
        return a.name > b.name;
      });
    }
    $scope.done = function() {
        if($scope.hideSelected) {
            $scope.workList.push($scope.selected);
        }else {
       ReplaceSrv.getWork().name = $scope.selected.name;
       ReplaceSrv.getWork().img = $scope.selected.img;
     }
      $location.path('/clientTasks');
    }
  })
  .controller('TrainStepsCtrl', function($scope){
    $scope.count = -1;
    var images = [
      'step_1.jpg',
      'step_2.jpg',
      'step_3.jpg',
    ];

    $scope.desc = [
      'Descirption of step 1 of exercise',
      'Descirption of step 2 of exercise',
      'Descirption of step 3 of exercise',
    ];

    $scope.changeStep = function(delta){
      $scope.count = ($scope.count + delta) % 3;
      $scope.image = images[$scope.count];
    }

    $scope.changeStep(1);
  });

