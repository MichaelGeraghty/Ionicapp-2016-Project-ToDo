var ionicApp = angular.module('ionicApp',[]);


ionicApp.controller('todoCtrl', ['$scope', function($scope) {
    //if local storage is null save the list to local storage
	 if (localStorage.getItem("task") == null)
	{
        //default task will show up if the local storage is empty
	$scope.list = [ {todoText:'Default Task', done:false} ];
	    localStorage.setItem("task", angular.toJson($scope.list));
	 }else
	 {
	     //sets up the list from local storage if not empty
	     $scope.list = angular.fromJson(localStorage.getItem("task"));
	 }
    
    // Add item 
	    $scope.todoAdd = function() {
	    	//check to see if the user has entered text, if not return
	    	  if ($scope.input == null || $scope.input == ''){return;}
	    	  
	    	//if there is text add it to the array
	    	  $scope.list.push({todoText:$scope.input, done:false});
	    	//clear the textbox for user convenience
	    	  $scope.input = "";
	    	  
	    	//resave the list to localstorage to make sure the user doesnt lose it
	    	  localStorage.setItem("task", angular.toJson($scope.list));
	    };
    
    //The Update function
        //This waits 100ms to store the data in local storage
        $scope.update = function() {
        //update local storage 300 ms after the checkbox is toggled to make sure it is processed and there is no error
        setTimeout(function(){
        localStorage.setItem("task", angular.toJson($scope.list)); 
        },300)

        }
        
         $scope.remove = function() {
	    	  //save previous list
	    	    var previousList = $scope.list;
	    	    //empty list
	    	    $scope.list = [];
	    	    //run through list
	    	    angular.forEach(previousList, function(x) {
	    	      //add any of the items not toggled/completed to todo list
	    	        if (!x.done) $scope.list.push(x);
	    	    });
	    	    //update local storage
	    	     localStorage.setItem("task", angular.toJson($scope.list));

	    	};
	    
    
}]);