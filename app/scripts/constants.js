'use strict';

angular.module('repicbro.constants')
  .constant('constants', {
    'apiPrefix' : 'http://www.reddit.com/r/',
    'blacklist': [
      /imgur\.com\/gallery/,
      /imgur\.com\/a\//,
      /www\.reddit\.com/,
      /www\.youtube\.com/,
      /www\.flickr\.com/
    ],
    'subreddits': [
      'funny',
      'pics',
      'AnimalsBeingJerks',
      'pic',
      'gifs',
      'aww',
      'mostbeautiful',
      'earthporn',
      'roomporn',
      'animalporn',
      'historyporn',
      'spaceporn',
      'adviceanimals',
      'minecraft',
      'perfectloops'
    ]
  });
