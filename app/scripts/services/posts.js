'use strict';

angular.module('repicbro.services', [])
  .factory('Posts', function ($http) {
    return {
      name: 'Posts Service',
      get: function (subreddit, latest, success, error) {

        var api = 'http://www.reddit.com/r/' + subreddit + '.json';

        var config = {
          method: 'JSONP',
          url: api,
          params: {
            jsonp: 'JSON_CALLBACK',
            limit: 100,
            after: latest
          }
        };

        $http(config)
          .success(success)
          .error(error);
      }
    };
  });