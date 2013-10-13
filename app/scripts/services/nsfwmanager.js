'use strict';

angular.module('repicbro.services')
  .factory('NsfwManager',
           function ($rootScope) {

    var _nsfw = false;

    var broadcastNsfw = function (nsfw) {
      $rootScope.$broadcast('NsfwManager.Update', nsfw);
    };

    var toggleNsfw = function () {
      _nsfw = !_nsfw;
      broadcastNsfw(_nsfw);
      console.log('broadcasting');
    };

    return {
      toggleNsfw: toggleNsfw
    };
  });
