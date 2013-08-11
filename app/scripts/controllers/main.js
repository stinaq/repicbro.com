'use strict';

angular.module('repicbro.controllers')
  .controller('MainCtrl', function ($scope, $routeParams, PostsManager) {
    $scope.current = null;
    $scope.nsfw = false;
    var subreddit = $routeParams['subreddit'];

    PostsManager.initialize(subreddit);
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

    $scope.showNsfw = function () {
      return !$scope.current.over_18 || $scope.nsfw;
    };

    $scope.toggleNsfw = function () {
      $scope.nsfw = !$scope.nsfw;
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
