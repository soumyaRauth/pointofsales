angular.module('app.cartCtrl', ['ngCordova'])

    .controller('cartCtrl', ['$scope', '$stateParams', '$state', '$cordovaSQLite', '$ionicHistory', '$ionicPopup', '$ionicPlatform',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $cordovaSQLite, $ionicHistory, $ionicPopup, $ionicPlatform) {





            $scope.items = [];
            $scope.grandTotal = 0;
            $scope.receiptnumber = 0;
            $scope.receiptnumber = $scope.receiptnumber + 1;
            $scope.items = [];
            $scope.item = {};
            $scope.grandTotal = null;



            $ionicPlatform.ready(function () {



                //EXPERIMENT CODE STARTS 
                var query2 = "SELECT * FROM items WHERE quantity!='' ";
                console.log(query2);
                $cordovaSQLite.execute(db, query2, []).then(function (res) {

                    if (res.rows.length > 0) {

                        for (var i = 0; i < res.rows.length; i++) {


                            $scope.items.push({

                                itemname: res.rows.item(i).itemname,
                                price: res.rows.item(i).price,
                                quantity: res.rows.item(i).quantity,
                                total: res.rows.item(i).total,
                                timestamp: res.rows.item(i).timestamp,


                            });

                            // $scope.items = $scope.items;
                            // console.log($scope.items);
                            $scope.items = $scope.items;

                        }
                    } else {
                        console.log("No results found");
                    }
                }, function (err) {
                    console.error("error=>" + err);
                });

                //EXP CODE ENDS


                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();



                //GRAND TOTAL CALCULATION STARTS
                var query = "SELECT SUM(total) as total FROM items";

                console.log(query);
                $cordovaSQLite.execute(db, query, []).then(function (res) {


                    $scope.grandTotal = res.rows.item(0).total;
                    //console.log("SUM TOTAL TEST");
                    //console.log(res.rows[0].total);



                }, function (err) {
                    console.error("error=>" + err);
                });



                //GRAND TOTAL CALCULATION ENDS            







                //Back button STARTS
                $scope.myGoBack = function () {

                    $state.go("menu.sales");
                    // window.history.back();

                };

                //BackButton ends

                //Charge button functionality STARTS===============================/////////////////////////

                $scope.charge = function (item) {


                    //EXP CODE STARTS


                    //EXP CODE ENDS

                    $state.go('transactionsuccess');

                    // INITIAL UPDATE OF ORDER NUMBER STARTS

                    // var query5 = "UPDATE receipt SET ordernumber=" + "'" + $scope.receiptnumber + "'" + " WHERE quantity!='' OR quantity!='undefined' ";
                    // console.log(query5);

                    // $cordovaSQLite.execute(db, query5, []).then(function (result) {

                    //     $scope.items = [];
                    //     $scope.grandTotal = 0;


                    // }, function (err) {
                    //     console.error(err);
                    // });

                    //ENDS            

                }


            });
        }])