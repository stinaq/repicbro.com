'use strict';

angular.module('repicbro', ['repicbro.controllers',
                            'repicbro.services',
                            'repicbro.filters',
                            'repicbro.directives',
                            'ngRoute',
                            'ngTouch',
                            'ui.bootstrap'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/views/start.html',
        controller: 'StartCtrl'
      })
      .when('/r/:subreddit', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('repicbro.controllers', ['repicbro.services', 'repicbro.directives']);
angular.module('repicbro.services', ['repicbro.constants']);
angular.module('repicbro.constants', []);
angular.module('repicbro.filters', []);
angular.module('repicbro.directives', []);
