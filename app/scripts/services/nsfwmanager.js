'use strict';

angular.module('repicbro.services')
  .factory('NsfwManager',
           function ($rootScope) {

    var _nsfw = false;

    var broadcastNsfw = function () {
      $rootScope.$broadcast('NsfwManager.Update', _nsfw);
    };

    var toggleNsfw = function () {
      _nsfw = !_nsfw;
      broadcastNsfw();
    };

    return {
      toggleNsfw: toggleNsfw
    };
  });
