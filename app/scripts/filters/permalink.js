'use strict';

angular.module('repicbro.filters')
  .filter('permalink', function () {
    return function (post) {
      return 'http://reddit.com' + post.permalink;
    };
  });
