angular.module('StarterApp', [
        'ngMaterial',
        'ngMdIcons',

        'ui.router',
        'ui.router.stateHelper',


        'main.config',

        'main.controllers'
    ])


    .config(["$urlRouterProvider", "$locationProvider", function ($urlRouterProvider, $locationProvider) {

        // Gestion 404
        $urlRouterProvider.otherwise('/');

        // Enleve le # des URL
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }])

    .config(["$httpProvider", function ($httpProvider) {
        var growlMessages = function ($q, $log, $rootScope) {

            return {
                response: function (result) {
                    if (result.data.growlMessages) {
                        $rootScope.$broadcast('growlMessages', result.data.growlMessages)
                    }
                    return result;
                },
                responseError: function (result) {
                    if (result.data.growlMessages) {
                        $rootScope.$broadcast('growlMessages', result.data.growlMessages)
                    }
                    return $q.reject(result);
                }
            }
        };
        $httpProvider.interceptors.push(growlMessages);

    }])


    .run(["$rootScope", "$mdToast", "$log", "$state", function ($rootScope, $mdToast, $log, $state) {

        $rootScope.$on('growlMessages', function (event, data) {
            data.forEach(function (message) {
                $mdToast.show($mdToast.simple().hideDelay(3000).position('top right').content(message.text));
            })
        });

        $rootScope._ = window._;

        $rootScope.$state = $state;


    }])


    .controller('AppController', ['$rootScope', '$scope', '$mdSidenav', '$log', function ($rootScope, $scope, $mdSidenav, $log) {

        $log.info('AppController loaded.');


        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $log.info('toState : ', toState)
        })


    }]);
