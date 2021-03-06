'use strict';

angular.module('repicbro.services')
  .factory('PostsManager',
           function ($rootScope,
                     $sce,
                     $log,
                     Posts,
                     Helpers) {

    var subreddit = 'funny',
        posts     = [],
        loaded    = [],
        current   = {},
        index     = 0,
        latest    = '',
        updating  = false;

    var updateIndex = function (newIndex, callback) {
      var post = loaded[newIndex];
      if (post) {
        current.post = post;
        index = newIndex;

        if (callback) {
          callback();
        }
      }
    };

    var next = function () {
      updateIndex(index+1, function () {
        checkSize();
        maybeLoad();
      });
    };

    var prev = function () {
      updateIndex(index-1);
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
          if (!Helpers.blacklisted(post)) {
            Helpers.rewritePictureUrl(post);
            Helpers.rewriteGifv(post);
            post.title = $sce.trustAsHtml(post.title);
            posts.push(post);
          }
        });

        latest = _.last(posts).name;

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

        current.post = loaded[index];
      });
    };

    var initialize = function (r) {
      subreddit = r;
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
