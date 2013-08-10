'use strict';

angular.module('repicbro.controllers', ['repicbro.services'])
  .controller('MainCtrl', function ($scope, $http, Posts) {
    $scope.posts = [];
    $scope.current = null;

    Posts.get('funny', function (data) {
      angular.forEach(data.data.children, function (p) {
        $scope.posts.push(p.data);
      });
      $scope.current = $scope.posts[0];
    });

    $scope.isCurrent = function (post) {
      return angular.equals($scope.current, post);
    };

  });
