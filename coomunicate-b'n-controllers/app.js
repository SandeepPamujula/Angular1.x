var myModule = angular.module('myModule', []);
myModule.factory('mySharedService', function($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
});

myModule.directive('myComponent', function(mySharedService) {
    return {
        restrict: 'E',
        controller: function($scope, $attrs, mySharedService) {
            $scope.$on('handleBroadcast', function() {
                $scope.message = 'Directive: ' + mySharedService.message;
            });
        },
        replace: true,
        template: '<input>'
    };
});
myModule.controller('ControllerZero', ['$scope','$rootScope','mySharedService',function ($scope, $rootScope,mySharedService) {
    $scope.handleClick = function(msg) {
        mySharedService.prepForBroadcast(msg);
    };

    $rootScope.$on('handleBroadcast', function() {
        $scope.message = mySharedService.message;
    });
}]);
myModule.controller('ControllerOne', ['$scope','mySharedService',function ($scope, mySharedService) {
//function ControllerOne($scope, sharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'ONE: ' + mySharedService.message;
    });
}]);

myModule.controller('ControllerTwo', ['$scope','mySharedService',function ($scope, mySharedService) {
//function ControllerTwo($scope, sharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'TWO: ' + mySharedService.message;
    });
}]);

//ControllerZero.$inject = ['$scope', 'mySharedService'];

//ControllerOne.$inject = ['$scope', 'mySharedService'];

//ControllerTwo.$inject = ['$scope', 'mySharedService'];