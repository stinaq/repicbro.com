(function () {
'use strict';

  var ShareModalCtrl = function ($modalInstance, $scope, PostsManager, $rootScope) {

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.current = PostsManager.current;
  };

  angular.module('repicbro.controllers')
    .controller('ShareModalCtrl', ShareModalCtrl);
})();
