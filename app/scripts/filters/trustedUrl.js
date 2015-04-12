'use strict';

angular.module('repicbro.filters')
  .filter('trustedUrl', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
  });
