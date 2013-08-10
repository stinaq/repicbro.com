'use strict';

angular.module('repicbro.services')
  .factory('PostsManager', function ($rootScope, Posts) {

    var posts = [],
        current = null,
        index = 0,
        latest = '',
        updating = false;

    var broadcastCurrentUpdate = function (current) {
      $rootScope.$broadcast('PostsManager.CurrentUpdate', current);
    };

    var next = function () {
      console.log('next');
      checkSize();
      current = posts[++index];
      broadcastCurrentUpdate(current);
    };

    var prev = function () {
      console.log('prev');
      current = posts[--index];
      broadcastCurrentUpdate(current);
    };

    var checkSize = function () {
      if (posts.length - index < 50 && !updating) {
        getPosts();
      }
    };

    var getPosts = function () {
      console.log('Get posts');
      updating = true;
      Posts.get('funny', latest, function (data) {
        latest = data.data.name;

        angular.forEach(data.data.children, function (p) {
          posts.push(p.data);
        });
        current = posts[index];
        broadcastCurrentUpdate(current);
        updating = false;
      });
    };

    getPosts();

    return {
      posts: posts,
      current: current,
      next: next,
      prev: prev
    };
  });
