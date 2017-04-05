// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('app', [
  'ionic',
  'ngCordova',
  'ionic-toast',
  'app.controllers',
  'app.allItemsCtrl',
  'app.routes',
  'app.directives',
  'app.services',
  'app.addNewCategoryCtrl',
  'app.addNewItemCtrl',
  'app.salesCtrl',
  'app.cartCtrl',
  'app.transactionsuccessCtrl',
  'app.receiptCtrl',
  'app.addnewuserCtrl',
  'app.LoginCtrl',
  'app.settingsCtrl',
  'app.menuCtrl'

])

  .config(function ($ionicConfigProvider, $sceDelegateProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    ionic.Platform.isFullScreen = true;
    console.log("Caching");


    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

  })

  .run(function ($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {



      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      // DATABASE SECTION STARTS
      if (window.cordova) {
        db = $cordovaSQLite.openDB({ name: "pos.db", location: 2 }); //device
        console.log("not in browser");
      } else {
        db = window.openDatabase("pos.db", '1', 'my', 1024 * 1024 * 100); // browser
        console.log("browser");

      }
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS items (id integer primary key ,itemname text ,category text ,soldby text ,price REAL ,quantity REAL ,sku integer ,barcode text,timestamp DATE DEFAULT (datetime('now','localtime')),cashier text,total REAL,receitnumber integer,grandtotal REAL)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS receipt (id integer primary key,itemname text ,category text ,soldby text ,price REAL ,quantity REAL,sku integer,barcode text,timestamp DATE DEFAULT (datetime('now','localtime')),cashier text,total REAL,grandtotal REAL,ordernumber integer,tempquantity integer,refund integer)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (id integer primary key,username text ,email text,password text,timestamp DATE DEFAULT (datetime('now','localtime')))");
      $cordovaSQLite.execute(db, "CREATE TEMPORARY TABLE items_backup (id integer primary key ,itemname text ,category text ,soldby text ,price REAL ,quantity REAL ,sku integer ,barcode text,timestamp DATE DEFAULT (datetime('now','localtime')),cashier text,total REAL,receitnumber integer,grandtotal REAL)");
      $cordovaSQLite.execute(db, "INSERT INTO items_backup SELECT * FROM items;");
      $cordovaSQLite.execute(db, "DROP TABLE items");
      $cordovaSQLite.execute(db, "CREATE TABLE items (id integer primary key ,itemname text ,category text ,soldby text ,price REAL ,quantity REAL ,sku integer ,barcode text,timestamp DATE DEFAULT (datetime('now','localtime')),cashier text,total REAL,receitnumber integer,grandtotal REAL)");
      $cordovaSQLite.execute(db, "INSERT INTO items SELECT * FROM items_backup");
      $cordovaSQLite.execute(db, "DROP TABLE items_backup;");

      //DATABASE SECTION ENDS

      // db=$cordovaSQLite.openDB({name:"pos.db"});
    });
  })

  /*
    This directive is used to disable the "drag to open" functionality of the Side-Menu
    when you are dragging a Slider component.
  */
  .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function ($ionicSideMenuDelegate, $rootScope) {
    return {
      restrict: "A",
      controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

        function stopDrag() {
          $ionicSideMenuDelegate.canDragContent(false);
        }

        function allowDrag() {
          $ionicSideMenuDelegate.canDragContent(true);
        }

        $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
        $element.on('touchstart', stopDrag);
        $element.on('touchend', allowDrag);
        $element.on('mousedown', stopDrag);
        $element.on('mouseup', allowDrag);

      }]
    };
  }])

  /*
    This directive is used to open regular and dynamic href links inside of inappbrowser.
  */
  .directive('hrefInappbrowser', function () {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      link: function (scope, element, attrs) {
        var href = attrs['hrefInappbrowser'];

        attrs.$observe('hrefInappbrowser', function (val) {
          href = val;
        });

        element.bind('click', function (event) {

          window.open(href, '_system', 'location=yes');

          event.preventDefault();
          event.stopPropagation();

        });
      }
    };
  });