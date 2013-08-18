'use strict';

angular.module('repicbro.services')
  .factory('Helpers', function (constants) {
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
      angular.forEach(constants.blacklist, function (regex) {
        if (post.url.match(regex)) {
          return true;
        }
      });

      return false;
    };

    return {
      rewritePictureUrl: rewritePictureUrl,
      blacklisted: blacklisted
    };
  });