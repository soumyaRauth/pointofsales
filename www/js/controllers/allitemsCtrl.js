
angular.module('app.allItemsCtrl', [])

    .controller('allItemsCtrl', ['$scope', '$stateParams', '$state', '$cordovaSQLite', '$ionicPopup', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $cordovaSQLite, $ionicPopup, $ionicHistory) {
            $scope.goToAddItem = function () {
                $state.go("addNewItem");
            }

            $scope.items = [];
            $scope.category = {};
            $scope.categories = ["Food", "Beverages", "Others"];


            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();


            //EXPERIMENT CODE STARTS 
            //$scope.selectAll = function() {

            //console.log($scope.category.catSelected);



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
                        });
                        //$scope.items=$scope.items;
                    }
                } else {
                    console.log("No results found");
                }
            }, function (err) {
                console.error("error=>" + err);
            });


            //SWIPE TO DELETE FUNCTIONALITY STARTS
            $scope.deleteItem = function (index, item) {

                console.log(item);

                //EXP CODE STARTS
                var myPopup = $ionicPopup.show({

                    title: 'DELETING item',
                    subTitle: 'Are you sure you want to delete the item?',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Cancel',
                            onTap: function (e) {
                                $scope.flag = 1;
                            }

                        },
                        {
                            text: 'DELETE',
                            type: 'button-assertive',
                            onTap: function (e) {

                                $scope.items.splice(item, 1);

                                console.log("LAA LAA");
                                console.log(item);


                                var query = "DELETE FROM items WHERE itemname=" + "'" + item.itemname + "'" + "AND price=" + "'" + item.price + "'";

                                console.log(query);
                                $cordovaSQLite.execute(db, query, []).then(function (res) {
                                    console.log("Item deleted");

                                }, function (err) {
                                    console.error("error=>" + err);
                                });
                            }
                        }
                    ]
                });

                //EXP CODE ENDS

            }


            //SWIPE TO DELETE ENDS  


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
                                price: res.rows.item(i).price,

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




        }])

