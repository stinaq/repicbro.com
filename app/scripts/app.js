'use strict';

angular.module('repicbro', ['repicbro.controllers',
                            'repicbro.services',
                            'repicbro.filters',
                            'ngRoute',
                            'ngTouch'])
  .config(function ($routeProvider, $locationProvider, constants) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/views/start.html',
        controller: 'MainCtrl'
      })
      .when('/r/:subreddit', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('repicbro.controllers', ['repicbro.services']);
angular.module('repicbro.services', ['repicbro.constants']);
angular.module('repicbro.constants', []);
angular.module('repicbro.filters', []);
