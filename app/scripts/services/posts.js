'use strict';

angular.module('repicbro.services')
  .factory('Posts', function ($http, $q, $rootScope, constants) {
    return {
      name: 'Posts Service',
      timeout: null,
      get: function (subreddit, latest, success, error) {
        if (this.timeout) {
          this.timeout.resolve();
        }

        this.timeout = $q.defer();
        var api = constants.apiPrefix + subreddit + '.json';

        var config = {
          method: 'JSONP',
          url: api,
          params: {
            jsonp: 'JSON_CALLBACK',
            limit: 100,
            after: latest
          },
          timeout: this.timeout.promise
        };

        return $http(config)
          .success(success);
      }
    };
  });
