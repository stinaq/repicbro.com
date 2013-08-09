'use strict';

angular.module('repicbro.services', [])
  .factory('Posts', function ($http) {
    return {
      name: 'Posts Service',
      get: function (subreddit, success, error) {
        var api = 'http://reddit.com/r/' + subreddit + '.json';

        var config = {
          method: 'JSONP',
          url: api,
          params: {
            jsonp: 'JSON_CALLBACK',
            limit: 100
          }
        };

        $http(config)
          .success(success)
          .error(error);
      }
    };
  });