angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider



      .state('menu.sales', {
        url: '/sales',
        views: {
          'side-menu21': {
            cache: false,
            templateUrl: 'templates/sales.html',
            controller: 'salesCtrl',

          }
        }
      })

      .state('menu.items', {
        url: '/items',
        views: {
          'side-menu21': {
            templateUrl: 'templates/items.html',
            controller: 'itemsCtrl'
          }
        }
      })

      .state('menu.receipt', {
        url: '/receipt',
        views: {
          'side-menu21': {
            templateUrl: 'templates/receipt.html',
            controller: 'receiptCtrl'
          }
        }
      })

      .state('menu', {
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      })

      .state('addNewItem', {
        cache: false,
        url: '/addnewitem',
        templateUrl: 'templates/addNewItem.html',
        controller: 'addNewItemCtrl'
      })

      .state('menu.addNewCategory', {
        url: '/addnewcategory',
        views: {
          'side-menu21': {
            templateUrl: 'templates/addNewCategory.html',
            controller: 'addNewCategoryCtrl'
          }
        }
      })

      .state('menu.allItems', {
        cache: false,
        url: '/allitems',
        views: {
          'side-menu21': {
            templateUrl: 'templates/allItems.html',
            controller: 'allItemsCtrl'
          }
        }
      })

      .state('menu.addDiscount', {
        url: '//adddiscount',
        views: {
          'side-menu21': {
            templateUrl: 'templates/addDiscount.html',
            controller: 'addDiscountCtrl'
          }
        }
      })

      .state('menu.page8', {
        url: '/singlereceipt',
        views: {
          'side-menu21': {
            templateUrl: 'templates/page8.html',
            controller: 'receiptCtrl'
          }
        }
      })

      .state('menu.settings', {
        url: '/settings',
        views: {
          'side-menu21': {
            templateUrl: 'templates/settings.html',
            controller: 'settingsCtrl'
          }
        }
      })

      .state('menu.itemQuantity', {
        url: '/quantity',
        views: {
          'side-menu21': {
            templateUrl: 'templates/itemQuantity.html',
            controller: 'itemQuantityCtrl'
          }
        }
      })

      .state('cart', {
        cache: false,
        url: '/cart',
        templateUrl: 'templates/cart.html',
        controller: 'cartCtrl'
      })

      .state('categoryadd', {
        url: '/categoryadd',
        templateUrl: 'templates/addCategoryForm.html',
        controller: 'categoryformCtrl'
      })

      .state('transactionsuccess', {
        url: '/transactionsuccess',
        templateUrl: 'templates/transactionSuccess.html',
        controller: 'transactionsuccessCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('addnewuser', {
        url: '/addnewuser',
        templateUrl: 'templates/addNewUser.html',
        controller: 'addnewuserCtrl'

      })

    // $urlRouterProvider.otherwise('/side-menu21/sales')
    $urlRouterProvider.otherwise('/login');



  });