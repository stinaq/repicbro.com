'use strict';

angular.module('repicbro.constants')
  .constant('constants', {
    'apiPrefix' : 'http://www.reddit.com/r/',
    'blacklist': [
      /imgur\.com\/gallery/,
      /imgur\.com\/a/,
      /www\.reddit\.com/
    ],
    'subreddits': [
      'funny',
      'pics',
      'gifs'
    ]
  });
