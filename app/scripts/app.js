'use strict';

angular.module('repicbro', ['repicbro.controllers',
                            'repicbro.services',
                            'repicbro.filters',
                            'ngRoute',
                            'ngTouch'])
  .config(function ($routeProvider, constants) {
    $routeProvider
      .when('/', {
        redirectTo: '/r/' + constants.subreddits[0]
      })
      .when('/r/:subreddit', {
        templateUrl: 'views/main.html',
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
