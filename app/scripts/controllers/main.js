'use strict';

angular.module('repicbro.controllers', ['repicbro.services'])
  .controller('MainCtrl', function ($scope, $http, Posts) {
    $scope.posts = [];

    Posts.get('funny', function (data) {
      angular.forEach(data.data.children, function (p) {
        $scope.posts.push(p.data);
      });
    });
  });
