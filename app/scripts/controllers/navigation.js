'use strict';

(function () {
  var NavigationCtrl = function ($scope,
                                 $location,
                                 $log,
                                 NsfwManager,
                                 Subreddits,
                                 $modal,
                                 PostsManager) {
    var navigationCtrl = this;

    this.subreddits = Subreddits.list;
    this.subreddit = Subreddits.current;

    this.changeSubreddit = function () {
      // When a new subreddit is picked from the list, the app should initialize a new get
      // of posts
      PostsManager.initialize(this.subreddit);
      $location.path('/r/' + this.subreddit);
      $log.log('Subreddit was changed to ' + this.subreddit);
    };

    $scope.$on('NsfwManager.Update', function (event, nsfw) {
      $scope.nsfw = nsfw;
    });

    this.toggleNsfw = NsfwManager.toggleNsfw;

    this.openShareModal = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/views/shareModal.html',
        controller: 'ShareModalCtrl'
      });
    };

    this.openCheatsheetModal = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/views/cheatsheetModal.html',
        controller: 'SimpleModalCtrl'
      });
    };

    this.openAboutModal = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/views/aboutModal.html',
        controller: 'SimpleModalCtrl'
      });
    };
  };

  angular.module('repicbro.controllers')
    .controller('NavigationCtrl', NavigationCtrl);
})();
