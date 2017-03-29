angular.module('app.receiptCtrl', ['ngCordova'])
    .controller('receiptCtrl', ['$scope', '$stateParams', '$cordovaSQLite', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $cordovaSQLite, $state) {

            //RECEIPT CONTROLLER CODE STARTS

            $scope.items = [];
            $scope.refund = null;
            $scope.tempItem = {};
            $scope.ordernumber = [];
            // var btn = document.getElementById("refund_button");



            var query = "SELECT * FROM receipt WHERE ordernumber"
            console.log(query);
            $cordovaSQLite.execute(db, query, []).then(function (res) {


                if (res.rows.length > 0) {

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


            //ENDS     





        }])