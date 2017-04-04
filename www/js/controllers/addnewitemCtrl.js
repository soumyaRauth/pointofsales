angular.module('app.addNewItemCtrl', ['ngCordova'])

    .controller('addNewItemCtrl', ['$scope', '$stateParams', '$state', '$cordovaSQLite', '$ionicPlatform', '$ionicPopup', '$ionicHistory', 'userService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $cordovaSQLite, $ionicPlatform, $ionicPopup, $ionicHistory, userService) {


            $scope.item = {};
            $scope.categories = ["Food", "Beverages", "Others"];
            $scope.item.ordernumber = 0;
            $scope.userName = {};

            $scope.userName = userService.getUsername();
            console.log("CURRENT USER");
            console.log($scope.userName.username);


            $ionicPlatform.ready(function () {

                // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                //EXPERIMENTAL CODE STARTS


                $scope.insertNewItem = function () {

                    if ($scope.item.itemname && $scope.item.soldby && $scope.item.price) {
                        var query = "INSERT into items (itemname,category,soldby,price,sku,barcode) VALUES(?,?,?,?,?,?)";
                        //var query2 = "INSERT into receipt (itemname,category,soldby,price,sku,barcode,cashier,ordernumber) VALUES(?,?,?,?,?,?,?,?)";
                        $cordovaSQLite.execute(db, query, [$scope.item.itemname, $scope.item.category, $scope.item.soldby, $scope.item.price, $scope.item.sku, $scope.item.barcode,])
                            .then(function (result) {
                                console.log($scope.item.itemname);
                                console.log($scope.item.category);
                                console.log($scope.item.soldby);
                                console.log($scope.item.price);
                                console.log($scope.item.sku);
                                console.log("Printing barcode");
                                console.log($scope.item.barcode);
                                console.log($scope.item.total);

                                //ITEM ADDED SUCCESS POPUP STARTS                




                                //ITEM ADDED SUCCESS POPUP ENDS  


                            }, function (error) {
                                console.log(error);

                            });

                        // $scope.item = {
                        //     itemname: $scope.item.itemname,
                        // };
                        $state.go('menu.allItems');
                    } else {
                        //CONFIRMATION ALERT CODE STARTS
                        var alertPopup = $ionicPopup.alert({
                            title: 'Empty field!!',
                            template: 'Fill out all the * fields',
                            buttons: [

                                {
                                    text: '<b>Ok</b>',
                                    type: 'button-energized',


                                }
                            ]


                        });

                        alertPopup.then(function (res) {
                            console.log('Done');



                        });



                        //CONFIRMATION ALERT CODE ENDS
                    }
                }


                //STARTS





                //ENDS

                //EXPERIMENTAL CODE ENDS

            });
            //Back button Functionality STARTS
            $scope.myGoBack = function () {
                $ionicHistory.goBack();
            };
            //Back button ends            


        }])


