angular.module('app.transactionsuccessCtrl', ['ngCordova'])

    .controller('transactionsuccessCtrl', ['$scope', '$stateParams', '$state', '$cordovaSQLite', '$ionicPlatform', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $cordovaSQLite, $ionicPlatform, $ionicPopup) {



            $scope.grandTotal = 0;
            $scope.items = [];
            $scope.item = {};
            $scope.ordernumber = Math.floor(Math.random() * 2017);
            $scope.grandTotal = null;





            //EXPERIMENTAL CODE STARTS

            $ionicPlatform.ready(function () {


                var query = "SELECT SUM(total) as total FROM items";

                console.log(query);
                $cordovaSQLite.execute(db, query, []).then(function (res) {


                    $scope.grandTotal = res.rows.item(0).total;

                    //$scope.grandtotal = parseFloat(res.rows[0]['SUM(total)']);
                    console.log(res.rows.item(0).total);

                }, function (err) {
                    console.error("error=>" + err);
                });


                $scope.confirmCharge = function () {
                    var query2 = "UPDATE receipt SET ordernumber =" + "'" + $scope.ordernumber + "'" + " WHERE quantity!=''";

                    console.log($scope.ordernumber + "ORDER NUMBER");
                    console.log(query2);

                    $cordovaSQLite.execute(db, query2, []).then(function (result) {


                        $scope.grandTotal = 0;
                        console.log(result);
                        console.log($scope.items);
                        console.log($scope.items.quantity);
                        console.log($scope.items.price);
                        console.log("Time is valuable: " + $scope.items.timestamp);
                        $scope.items = [];

                    }, function (err) {
                        console.error("error=>" + err);
                    });


                    console.log();

                    //MAKING QUANTITY 0 code STARTS
                    var query = "UPDATE items SET quantity ='' ";
                    var query4 = "UPDATE receipt SET quantity ='' ";
                    console.log(query);
                    $cordovaSQLite.execute(db, query, []).then(function (result) {

                        $scope.items = [];
                        $scope.grandTotal = 0;
                        console.log(result);
                        console.log($scope.items);
                        console.log($scope.items.quantity);
                        console.log($scope.items.price);
                        console.log($scope.items.timestamp);

                    }, function (err) {
                        console.error("error=>" + err);
                    });
                    var query = "UPDATE items SET total ='' ";
                    console.log(query);
                    $cordovaSQLite.execute(db, query, []).then(function (result) {

                        $scope.items = [];
                        $scope.grandTotal = 0;
                        console.log(result);
                        console.log($scope.items);

                    }, function (err) {
                        console.error("error=>" + err);
                    });
                    $cordovaSQLite.execute(db, query4, []).then(function (result) {

                        $scope.items = [];
                        $scope.grandTotal = 0;
                        console.log(result);
                        console.log($scope.items);
                        console.log($scope.items.quantity);
                        console.log($scope.items.price);
                        console.log($scope.items.timestamp);

                    }, function (err) {
                        console.error("error=>" + err);
                    });

                    //CONFIRMATION ALERT CODE STARTS
                    var alertPopup = $ionicPopup.alert({
                        title: 'SUCCESS!!',
                        template: 'transaction Successful',
                        buttons: [

                            {
                                text: '<b>Ok</b>',
                                type: 'button-balanced',


                            }
                        ]


                    });

                    alertPopup.then(function (res) {
                        console.log('Done');



                    });

                    //CONFIRMATION ALERT CODE ENDS                    


                    $state.go('menu.sales');



                    //Making Quantity 0 ENDS


                }

                //EXPERIMENTAL CODE ENDS    

            });

        }])