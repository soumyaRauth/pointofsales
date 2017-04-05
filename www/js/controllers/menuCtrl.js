angular.module('app.menuCtrl', ['ngCordova'])
    .controller('menuCtrl', ['$scope', '$stateParams', 'userService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, userService) {
            $scope.userName = {};

            $scope.userName = userService.getUsername();
            console.log("CURRENT USER");
            console.log($scope.userName.username);

        }])