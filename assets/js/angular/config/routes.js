angular.module('main.config', [])

    .config(['$stateProvider', 'stateHelperProvider', function ($stateProvider, stateHelperProvider) {

        stateHelperProvider.state({
            name: 'index',
            url: '',
            abstract: true,
            template: '<div ui-view></div>',
            children: [{
                name: 'home',
                url: '/',
                templateUrl: '/views/partials/home.html',
                controller: 'HomeController'
            }]


        })


    }]);
