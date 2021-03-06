'use strict';

angular.module('repicbro.controllers')
  .controller('MainCtrl',
              function ($scope,
                        $routeParams,
                        $location,
                        $sce,
                        PostsManager,
                        NsfwManager,
                        Subreddits) {

    $scope.subreddit = Subreddits.updateCurrent($routeParams.subreddit);
    $scope.nsfw = NsfwManager.nsfw;

    PostsManager.initialize($scope.subreddit);
    $scope.posts = PostsManager.posts;

    $scope.next = PostsManager.next;
    $scope.prev = PostsManager.prev;

    $scope.isCurrent = function (post) {
      return angular.equals(PostsManager.current.post, post);
    };

    $scope.$on('NsfwManager.Update', function (event, nsfw) {
      $scope.nsfw = nsfw;
    });

    /* jshint camelcase: false */
    $scope.showNsfw = function () {
      return !PostsManager.current.post.over_18 || $scope.nsfw;
    };
    /* jshint camelcase: true */

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
        NsfwManager.toggleNsfw();
        $scope.$apply();
      }
    });
  });
