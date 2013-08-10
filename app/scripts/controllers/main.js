'use strict';

angular.module('repicbro.controllers', ['repicbro.services'])
  .controller('MainCtrl', function ($scope, $http, Posts) {
    $scope.posts = [];
    $scope.current = null;
    $scope.nsfw = false;
    $scope.index = 0;

    Posts.get('funny', function (data) {
      angular.forEach(data.data.children, function (p) {
        $scope.posts.push(p.data);
      });
      $scope.current = $scope.posts[$scope.index];
    });

    $scope.isCurrent = function (post) {
      return angular.equals($scope.current, post);
    };

    $scope.showNsfw = function () {
      return !$scope.posts[0].over_18 || $scope.nsfw;
    };

    $scope.toggleNsfw = function () {
      $scope.nsfw = !$scope.nsfw;
    };

    $scope.next = function () {
      $scope.index++;
      $scope.current = $scope.posts[$scope.index];
    };

    $scope.prev = function () {
      $scope.index--;
      $scope.current = $scope.posts[$scope.index];
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
