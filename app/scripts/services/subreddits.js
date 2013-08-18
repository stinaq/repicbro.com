'use strict';

angular.module('repicbro.services')
  .factory('Subreddits', function ($rootScope, constants) {
    var subreddits = constants.subreddits,
        current;

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
      updateCurrent: updateCurrent
    };
  });
