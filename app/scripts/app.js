'use strict';

angular.module('repicbro', ['repicbro.controllers',
                            'repicbro.services',
                            'repicbro.filters'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

