'use strict';

angular.module('repicbro.controllers')
  .controller('StartCtrl', function ($scope, constants) {
    $scope.subreddits = constants.subreddits;
  });
