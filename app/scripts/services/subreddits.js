'use strict';

angular.module('repicbro.services')
  .factory('Subreddits', function ($rootScope, constants) {
    var subreddits = constants.subreddits,
        current;

    var current2 = {};

    var updateCurrent = function (subreddit) {
      if (!_.contains(subreddits, subreddit)) {
        subreddits.push(subreddit);
        current = _.last(subreddits);
      } else {
        current = subreddit;
      }

      $rootScope.$broadcast('Subreddits.CurrentUpdate', current);
      return current;
    };

    return {
      list: subreddits,
      current: current,
      current2: current2,
      updateCurrent: updateCurrent
    };
  });
