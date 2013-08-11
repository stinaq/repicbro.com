'use strict';

angular.module('repicbro.services')
  .factory('PostsManager', function ($rootScope, Posts) {

    var posts = [],
        loaded = [],
        current = null,
        index = 0,
        latest = '',
        updating = false;

    var blacklist = [
      /imgur\.com\/gallery/,
      /imgur\.com\/a/,
      /www\.reddit\.com/
    ];

    var rewritePictureUrl = function (post) {
      if (post.url.match('^http://imgur')) {
        post.url = 'http://i.' + post.url.substring(7) + '.jpg';
      } else if (post.url.match('^http://www.quickmeme.com/meme')) {
        post.url = 'http://i.qkme.me/' + post.url.match(/[A-Za-z\d]{6}/g)[1] + '.jpg';
      } else if (post.url.match('^http://qkme.me')) {
        post.url = 'http://i.qkme.me/' + post.url.match(/[A-Za-z\d]{6}/g)[0] + '.jpg';
      }
    };

    var blacklisted = function (post) {
      var result = false;
      angular.forEach(blacklist, function (regex) {
        if (post.url.match(regex)) {
          result = true;
        }
      });

      return result;
    };

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
      Posts.get('funny', latest, function (data) {
        angular.forEach(data.data.children, function (p) {
          var post = p.data;
          if (!blacklisted(post)) {
            rewritePictureUrl(post);
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
