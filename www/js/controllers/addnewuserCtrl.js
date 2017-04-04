angular.module('app.addnewuserCtrl', ['ngCordova',])

    .controller('addnewuserCtrl', ['$scope', '$stateParams', '$ionicHistory', '$ionicPopup', '$cordovaSQLite', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicHistory, $ionicPopup, $cordovaSQLite, $state) {

            $scope.user = {};
            $scope.user = [];





            //EXP CODE STARTS
            $scope.insertNewUser = function () {

                if ($scope.user.username && $scope.user.email && $scope.user.password && ($scope.user.password === $scope.user.confirmpassword)) {


                    //exp code STARTS
                    var query = "SELECT * FROM user";
                    console.log(query);
                    $cordovaSQLite.execute(db, query, []).then(function (res) {

                        //  console.log("SELECTED -> " + res.rows.item(7).itemname + " " + res.rows.item(7).cashier);
                        for (var i = 0; i < res.rows.length; i++) {


                            if (res.rows.length > 0) {
                                console.log(res.rows.item(i).username);


                                $scope.user.push({

                                    username: res.rows.item(i).username,
                                    email: res.rows.item(i).email,
                                    password: res.rows.item(i).password,


                                });



                            } else {
                                console.log("No results found");
                            }
                        }
                    }, function (err) {
                        console.error("error=>" + err);
                    });

                    //exp code ENDS 


                    var query = "INSERT into user (username,email,password) VALUES(?,?,?)";
                    //var query2 = "INSERT into receipt (itemname,category,soldby,price,sku,barcode,cashier,ordernumber) VALUES(?,?,?,?,?,?,?,?)";
                    $cordovaSQLite.execute(db, query, [$scope.user.username, $scope.user.email, $scope.user.password])
                        .then(function (result) {
                            console.log($scope.user.username);
                            console.log($scope.user.email);

                            console.log("PASSWORD:");




                        }, function (error) {
                            console.log(error);

                        });


                    $state.go('menu.allItems');
                } else {
                    //CONFIRMATION ALERT CODE STARTS
                    var alertPopup = $ionicPopup.alert({
                        title: 'Please check fields again!!',
                        template: 'Please check email or password * fields',
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

            //EXP CODE ENDS            


        }])