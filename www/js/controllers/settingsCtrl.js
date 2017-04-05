angular.module('app.settingsCtrl', ['ngCordova'])
    .controller('settingsCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$timeout', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $ionicHistory, $timeout, $ionicPopup) {
            $scope.exit = function () {
                //$state.go('login');


                //EXIT CONFIRMATION CODE STARTS
                var myPopup = $ionicPopup.show({

                    title: 'Signing out ',
                    subTitle: 'Are you sure?',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Cancel',
                            onTap: function (e) {
                                $scope.flag = 1;
                            }

                        },
                        {
                            text: '<b>Ok</b>',
                            type: 'button-dark',
                            onTap: function (e) {
                                $ionicHistory.clearCache();

                                $ionicHistory.clearCache().then(function () {
                                    $state.go('login');
                                });
                            }
                        }
                    ]
                });

                //ENDS                    





            }

        }])