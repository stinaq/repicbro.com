'use strict';

angular.module('repicbro.services')
  .factory('PostsManager', function ($rootScope, Posts, PostUrlHelper) {

    var subreddit = 'funny',
        posts     = [],
        loaded    = [],
        current   = null,
        index     = 0,
        latest    = '',
        updating  = false,
        puh       = PostUrlHelper;

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
      updating = true;
      Posts.get(subreddit, latest, function (data) {
        angular.forEach(data.data.children, function (p) {
          var post = p.data;
          if (!puh.blacklisted(post)) {
            puh.rewritePictureUrl(post);
            posts.push(post);
          }
        });

        latest = posts.slice(-1)[0].name;

        if (callback) {
          callback();
        }

        updating = false;
      });
    };

    var getPostsInitial = function () {
      // Make sure the lists are empty
      loaded.length = 0;
      posts.length = 0;
      latest = '';

      getPosts(function () {
        _.times(10, function () {
          loaded.push(posts.shift());
        });

        current = loaded[index];
        broadcastCurrentUpdate(current);
      });
    };

    var initialize = function (r) {
      subreddit = r || 'funny';
      console.log(subreddit);
      getPostsInitial();
    };

    return {
      posts: loaded,
      current: current,
      next: next,
      prev: prev,
      initialize: initialize
    };
  });
