angular.module('app.salesCtrl', ['ngCordova'])

    .controller('salesCtrl', ['$scope', '$state', '$stateParams', '$cordovaSQLite', '$ionicPlatform', '$ionicPopup', 'userService',
        function ($scope, $state, $stateParams, $cordovaSQLite, $ionicPlatform, $ionicPopup, userService) {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                console.log("Keyboard code");
            }

            $scope.category = {};
            $scope.categories = ["Food", "Beverages", "Others"];
            $scope.flag = 0;
            refund = 0;
            $scope.userName = {};

            $scope.userName = userService.getUsername();
            console.log("CURRENT USER");
            console.log($scope.userName.username);





            $scope.cartPage = function () {

                $state.go('cart');

            }







            $scope.items = [];




            //EXPERIMENT CODE STARTS 




            $ionicPlatform.ready(function () {

                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }


                var query = "SELECT * FROM items";
                console.log(query);
                $cordovaSQLite.execute(db, query, []).then(function (res) {

                    if (res.rows.length > 0) {
                        //  console.log("SELECTED -> " + res.rows.item(7).itemname + " " + res.rows.item(7).cashier);
                        for (var i = 0; i < res.rows.length; i++) {

                            $scope.items.push({

                                itemname: res.rows.item(i).itemname,
                                price: res.rows.item(i).price,
                                quantity: res.rows.item(i).quantity,
                                category: res.rows.item(i).category,
                                sku: res.rows.item(i).sku,
                                barcode: res.rows.item(i).barcode,
                                cashier: res.rows.item(i).cashier,
                                timestamp: res.rows.item(i).timestamp,
                            });
                            //$scope.items=$scope.items;
                        }
                    } else {
                        console.log("No results found");
                    }
                }, function (err) {
                    console.error("error=>" + err);
                });


                //EXPERIMENTS CODE ENDS


                //CHANGE SELECT CODE STARTS==========================================


                $scope.showSelectValue = function (mySelect) {


                    $scope.items.splice(0, $scope.items.length);


                    var query = "SELECT * FROM items WHERE category=" + "'" + mySelect + "'";
                    console.log(query);
                    $cordovaSQLite.execute(db, query, []).then(function (res) {

                        if (res.rows.length > 0) {
                            //  console.log("SELECTED -> " + res.rows.item(7).itemname + " " + res.rows.item(7).cashier);
                            for (var i = 0; i < res.rows.length; i++) {

                                $scope.items.push({

                                    itemname: res.rows.item(i).itemname,
                                    category: res.rows.item(i).category,
                                    sku: res.rows.item(i).sku,
                                    barcode: res.rows.item(i).barcode,
                                    cashier: res.rows.item(i).cashier,
                                    timestamp: res.rows.item(i).timestamp,
                                    grandtotal: res.rows.item(i).grandtotal,
                                    ordernumber: res.rows.item(i).ordernumber,
                                    timestamp: res.rows.item(i).timestamp,

                                });

                            }
                        } else {
                            console.log("No results found");
                        }
                    }, function (err) {
                        console.error("error=>" + err);
                    });
                    //all


                }



                //CHANGE SELECT CODE ENDS==============================


                //GET QUANTITY STARTS



                $scope.getQuantity = function (item) {

                    console.log(item.itemname);

                    $scope.data = {};

                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                        template: '<input type="number" ng-model="data.quantity">',
                        title: 'Enter item quantity to add to cart ',
                        subTitle: 'Number of items',
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
                                type: 'button-balanced',
                                onTap: function (e) {
                                    if (!$scope.data.quantity) {
                                        //don't allow the user to close unless he enters wifi password
                                        e.preventDefault();
                                    } else {
                                        return $scope.data.quantity;
                                    }
                                }
                            }
                        ]
                    });

                    myPopup.then(function (res) {
                        console.log("RES IS " + res);
                        if (res != undefined) {





                            //EXPERIMENT CODE STARTS

                            var query1 = "UPDATE items SET quantity =" + "'" + res + "'" + " WHERE itemname=" + "'" + item.itemname + "' AND price=" + "'" + item.price + "'";
                            var query2 = "UPDATE receipt SET quantity =" + "'" + res + "'" + " WHERE itemname=" + "'" + item.itemname + "' AND timestamp=" + "'" + item.timestamp + "'";

                            var query3 = "INSERT into receipt (itemname,category,soldby,price,quantity,sku,barcode,cashier,ordernumber,tempquantity,refund) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
                            console.log(query);
                            $cordovaSQLite.execute(db, query1, []).then(function (result) {


                                console.log("Updated " + result);

                            }, function (err) {
                                console.error("error=>" + err);
                            });






                            $cordovaSQLite.execute(db, query2, []).then(function (result) {


                                console.log("Updated " + result);

                            }, function (err) {
                                console.error("error=>" + err);
                            });



                            //EXPERIMENT

                            //console.log("SELECTED -> " + res.rows.item(7).itemname + " " + res.rows.item(7).cashier);


                            console.log("ITEMS.INCLUDES " + $scope.items.includes(item.itemname));
                            $cordovaSQLite.execute(db, query3, [item.itemname, item.category, item.soldby, item.price, res, item.sku, item.barcode, item.cashier, item.ordernumber, res, refund,])
                                .then(function (result) {
                                    console.log("LETS SEE:" + item.itemname);
                                    console.log("LETS SEE:" + item.category);
                                    console.log(item.soldby);
                                    console.log(item.price);
                                    console.log(item.sku);
                                    console.log(item.barcode);
                                    console.log(item.cashier);
                                    console.log(item.total);
                                    console.log(res);
                                    console.log(item.ordernumber);
                                    console.log(item.tempquantity);




                                }, function (error) {
                                    console.log(error);

                                });





                            //QUANTITY UPDATE ENDS


                            //TOTAL PRICE CALCULATION STARTS
                            var query = "UPDATE items SET total =" + "'" + res * item.price + "'" + " WHERE itemname=" + "'" + item.itemname + "'";
                            var query2 = "UPDATE receipt SET total =" + "'" + res * item.price + "'" + " WHERE itemname=" + "'" + item.itemname + "'";
                            console.log(query);
                            $cordovaSQLite.execute(db, query, []).then(function (result) {


                                console.log("Updated " + res);

                            }, function (err) {
                                console.error("error=>" + err);
                            });
                            $cordovaSQLite.execute(db, query2, []).then(function (result) {


                                console.log("Updated " + res);

                            }, function (err) {
                                console.error("error=>" + err);
                            });



                            //TOTAL PRICE CALCULATION ENDS

                            //EXPERIMENT CODE ENDS
                            console.log('Tapped!', res);

                            //IONIC ALERT STARTS
                            var alertPopup = $ionicPopup.alert({
                                title: 'Item added to the Cart',
                                template: 'Go to cart',
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

                        } else {
                            console.log("Cancelled");
                        }
                        //IONIC ALERT ENDS



                    });



                }




                //GET QUANTITY ENDS


            });


        }])