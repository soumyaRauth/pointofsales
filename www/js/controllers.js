angular.module('app.controllers', ['ngCordova'])


    .controller('itemsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])


    .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])



    .controller('addDiscountCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicPopup) {

            $scope.discount = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'COMING SOON',
                    template: 'COMING SOON',
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

            }
            //CODE ENDS


        }])

    .controller('page8Ctrl', ['$scope', '$stateParams', '$cordovaSQLite',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $cordovaSQLite) {

            $scope.items = [];

            var query = "SELECT * FROM receipt";
            console.log(query);
            $cordovaSQLite.execute(db, query, []).then(function (res) {

                if (res.rows.length > 0) {
                    //  console.log("SELECTED -> " + res.rows.item(7).itemname + " " + res.rows.item(7).cashier);
                    for (var i = 0; i < res.rows.length; i++) {

                        $scope.items.push({

                            itemname: res.rows.item(i).itemname,
                            price: res.rows.item(i).price,
                            tempquantity: res.rows.item(i).tempquantity,
                            category: res.rows.item(i).category,
                            sku: res.rows.item(i).sku,
                            barcode: res.rows.item(i).barcode,
                            cashier: res.rows.item(i).cashier,
                            timestamp: res.rows.item(i).timestamp,
                            ordernumber: res.rows.item(i).ordernumber,
                            total: res.rows.item(i).total,
                        });
                        //$scope.items=$scope.items;
                    }
                } else {
                    console.log("No results found");
                }
            }, function (err) {
                console.error("error=>" + err);
            });


        }])



    .controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('itemQuantityCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])



    .controller('categoryformCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])


