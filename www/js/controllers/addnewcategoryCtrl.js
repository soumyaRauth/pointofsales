angular.module('app.addNewCategoryCtrl', [])

.controller('addNewCategoryCtrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {

    $scope.categories=["Food","Beverages","Others"];

        $scope.goToAddCategory=function(){
            $state.go('categoryadd');
        }

}])