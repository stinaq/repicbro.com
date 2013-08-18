'use strict';

angular.module('repicbro.services')
  .factory('Subreddits', function ($rootScope, constants) {
    var subreddits = constants.subreddits;
    var current = subreddits[0];

    var updateCurrent = function (subreddit) {
      if (!_.contains(subreddits, subreddit)) {
        subreddits.push(subreddit);
      }

      current = subreddit;
      $rootScope.$broadcast('Subreddits.CurrentUpdate', current);
    };

    return {
      list: subreddits,
      current: current,
      updateCurrent: updateCurrent
    };
  });
