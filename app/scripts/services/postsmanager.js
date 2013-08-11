'use strict';

angular.module('repicbro.services')
  .factory('PostsManager', function ($rootScope, Posts) {

    var posts = [],
        loaded = [],
        current = null,
        index = 0,
        latest = '',
        updating = false;

    var broadcastCurrentUpdate = function (current) {
      $rootScope.$broadcast('PostsManager.CurrentUpdate', current);
    };

    var next = function () {
      current = loaded[++index];
      broadcastCurrentUpdate(current);

      checkSize();
      maybeLoad();
    };

    var prev = function () {
      current = loaded[--index];
      broadcastCurrentUpdate(current);
    };

    var checkSize = function () {
      if (posts.length - index < 50 && !updating) {
        getPosts();
      }
    };

    var maybeLoad = function () {
      if (loaded.length < index + 10) {
        loaded.push(posts.shift());
      }
    };

    var getPosts = function (callback) {
      console.log('Get posts');
      updating = true;
      Posts.get('funny', latest, function (data) {
        angular.forEach(data.data.children, function (p) {
          posts.push(p.data);
        });

        latest = posts.slice(-1)[0].name;

        if (callback) {
          callback();
        }

        updating = false;
      });
    };

    var getPostsInitial = function () {
      getPosts(function () {
        _.times(10, function () {
          loaded.push(posts.shift());
        });

        current = loaded[index];
        broadcastCurrentUpdate(current);
      });
    };

    getPostsInitial();

    return {
      posts: loaded,
      current: current,
      next: next,
      prev: prev
    };
  });
