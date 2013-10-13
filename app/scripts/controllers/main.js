'use strict';

angular.module('repicbro.controllers')
  .controller('MainCtrl',
              function ($scope,
                        $routeParams,
                        $location,
                        $sce,
                        PostsManager,
                        Subreddits) {

    $scope.subreddit = Subreddits.updateCurrent($routeParams.subreddit);
    $scope.nsfw = false;

    PostsManager.initialize($scope.subreddit);
    $scope.posts = PostsManager.posts;
    $scope.current = PostsManager.current;

    $scope.$on('PostsManager.CurrentUpdate', function (event, post) {
      $scope.current = post;
    });

    $scope.next = PostsManager.next;
    $scope.prev = PostsManager.prev;

    $scope.isCurrent = function (post) {
      return angular.equals($scope.current, post);
    };

    $scope.$on('NsfwManager.Update', function (event, nsfw) {
      $scope.nsfw = nsfw;
    });

    $scope.showNsfw = function () {
      return !$scope.current.over_18 || $scope.nsfw;
    };

    $scope.trustedHtml = function (post) {
      return $sce.trustAsHtml(post.title);
    };

    $(window).keydown(function (e) {
      if(e.which === 37 || e.which === 75) {
        $scope.prev();
        $scope.$apply();
      }
      else if (e.which === 39 || e.which === 74) {
        $scope.next();
        $scope.$apply();
      }
      else if (e.which === 78) {
        $scope.toggleNsfw();
        $scope.$apply();
      }
    });
  });
