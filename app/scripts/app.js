'use strict';

/**
 * @ngdoc overview
 * @name twitchtvApp
 * @description
 * # twitchtvApp
 *
 * Main module of the application.
 */
angular
  .module('twitchtvApp', [
    'ngRoute',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'TwitchCtrl',
        controllerAs: 'twitch'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
