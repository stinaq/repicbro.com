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
      return _.some(constants.blacklist, function (regex) {
        return regex.test(post.url);
      });
    };

    var rewriteGifv = function (post) {
      if (post.url.match('.gifv')) {
        post.isGifv = true;
        var fileName = post.url.split('http:')[1].split('.gifv')[0];
        post.gifv = {
          mp4: fileName + '.mp4',
          webm: fileName + '.webm',
          jpg: fileName + 'h.jpg'
        };
        console.log(post);
      }
    };

    return {
      rewritePictureUrl: rewritePictureUrl,
      blacklisted: blacklisted,
      rewriteGifv: rewriteGifv
    };
  });
