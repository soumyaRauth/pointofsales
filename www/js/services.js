angular.module('app.services', [])

    .factory('BlankFactory', [function () {

    }])

    .service('userService', [function () {

        return {
            user: {},
            getUsername: function () {
                return this.user;
            },
            setUsername: function (user) {
                this.user = user;
            }
        }

    }]);