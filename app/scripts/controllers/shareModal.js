(function () {
'use strict';

  var ShareModalCtrl = function ($modalInstance, $scope, PostsManager, $rootScope) {

    $scope.ok = function () {
      $modalInstance.close();
    };

    // todo. create a service to get the url from. that service should be posted to from the post controller

    $scope.current = PostsManager.current;
  };

  angular.module('repicbro.controllers')
    .controller('ShareModalCtrl', ShareModalCtrl);
})();
