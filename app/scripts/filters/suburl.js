'use strict';

angular.module('repicbro.filters')
  .filter('suburl', function () {
    return function (subreddit) {
      return '/r/' + subreddit;
    };
  });
