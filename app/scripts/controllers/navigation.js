'use strict';

angular.module('repicbro.controllers')
  .controller('NavigationCtrl', function ($scope, $location, Subreddits) {
    $scope.subreddits = Subreddits.list;
    $scope.subreddit = Subreddits.current;
    $scope.$on('Subreddits.CurrentUpdate', function (event, subreddit) {
      $scope.subreddit = subreddit;
    });

    $scope.change = function () {
      Subreddits.updateCurrent($scope.subreddit);
      $location.path('/r/' + $scope.subreddit);
    };
  });
