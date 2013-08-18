'use strict';

angular.module('repicbro.controllers')
  .controller('NavigationCtrl', function ($scope, Subreddits) {
    $scope.subreddits = Subreddits.list;
    $scope.subreddit = Subreddits.current;

    $scope.change = function () {
      Subreddits.updateCurrent($scope.subreddit);
    };
  });