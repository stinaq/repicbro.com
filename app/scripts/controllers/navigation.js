'use strict';

angular.module('repicbro.controllers')
  .controller('NavigationCtrl',
              function ($scope,
                        $location,
                        NsfwManager,
                        Subreddits,
                        $modal) {
    $scope.subreddits = Subreddits.list;
    $scope.subreddit = Subreddits.current;
    $scope.$on('Subreddits.CurrentUpdate', function (event, subreddit) {
      $scope.subreddit = subreddit;
    });

    $scope.change = function () {
      Subreddits.updateCurrent($scope.subreddit);
      $location.path('/r/' + $scope.subreddit);
    };

    $scope.$on('NsfwManager.Update', function (event, nsfw) {
      $scope.nsfw = nsfw;
    });

    $scope.toggleNsfw = NsfwManager.toggleNsfw;

    $scope.openShareModal = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/views/shareModal.html',
        controller: 'ShareModalCtrl'
      });
    };
  });
