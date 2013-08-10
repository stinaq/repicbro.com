'use strict';

angular.module('repicbro.services')
  .factory('PostsManager', function ($rootScope, Posts) {

    var posts = [],
        current = null,
        index = 0;

    Posts.get('funny', function (data) {
      angular.forEach(data.data.children, function (p) {
        posts.push(p.data);
      });
      current = posts[index];
      $rootScope.$broadcast('PostsManager.CurrentUpdate', current);
    });

    var next = function () {
      console.log('next');
      current = posts[++index];
      $rootScope.$broadcast('PostsManager.CurrentUpdate', current);
    };

    var prev = function () {
      console.log('prev');
      current = posts[--index];
      $rootScope.$broadcast('PostsManager.CurrentUpdate', current);
    };

    return {
      posts: posts,
      current: current,
      next: next,
      prev: prev
    };
  });