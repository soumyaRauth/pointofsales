angular.module('app.LoginCtrl', ['ngCordova'])
    .controller('LoginCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$cordovaSQLite', '$timeout', 'ionicToast', '$ionicPlatform', 'userService',

        function ($scope, $stateParams, $state, $ionicHistory, $cordovaSQLite, $timeout, ionicToast, $ionicPlatform, userService) {
            $scope.user = {};
            $scope.users = [];
            $scope.currentUser = {};


            $ionicPlatform.ready(function () {
                //console.log($scope.user);
                //storing all username into users array
                var query = "SELECT * FROM user";
                console.log(query);
                $cordovaSQLite.execute(db, query, []).then(function (res) {
                    console.log("Username");



                    if (res.rows.length > 0) {
                        //  console.log("SELECTED -> " + res.rows.item(7).itemname + " " + res.rows.item(7).cashier);
                        for (var i = 0; i < res.rows.length; i++) {



                            $scope.users.push({
                                username: res.rows.item(i).username,
                                password: res.rows.item(i).password,
                            });
                            //console.log($scope.user);

                            //$scope.items=$scope.items;
                        }
                    } else {
                        console.log("No results found");
                    }
                }, function (err) {
                    console.error("error=>" + err);
                });

                //ENDS

                //CHECKING WHETHER USER EXISTS
                Array.prototype.hasElement = function (username, password) {
                    var j;
                    for (j = 0; j < this.length; j++) {
                        if (this[j].username === username && this[j].password === password) {
                            return true; //Returns element position, so it exists
                        }
                    }

                    return false; //The element isn't in your array
                };

                //END

                $scope.login = function () {
                    console.log("consoleing");
                    console.log($scope.user.username);
                    console.log($scope.user.password);

                    $scope.result = $scope.users.hasElement($scope.user.username, $scope.user.password);

                    console.log("STATE RESULT");
                    console.log($scope.result);

                    if ($scope.result == true) {
                        $scope.currentUser = {
                            username: $scope.user.username,

                        };
                        userService.setUsername($scope.currentUser);
                        console.log("WHATS IN GET USERNAME::::");
                        console.log(userService.getUsername());
                        $state.go('menu.sales');
                        ionicToast.show('Logged in successfully', 'top', false, 2000);
                        $timeout(function () {
                            $ionicHistory.clearCache();
                            $ionicHistory.clearHistory();
                        }, 200)


                    } else {
                        ionicToast.show('username, password don\'t match', 'top', false, 1100);
                    }

                }
                $scope.registration = function () {
                    $state.go('addnewuser');
                    console.log("registration() function activated");
                }

            });
        }])


