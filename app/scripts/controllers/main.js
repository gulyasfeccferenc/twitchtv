/**
* My very first controller! Yaay
*
* @gulyasfeccferenc
*/

'use strict';


/**
 * fetchFactory - Factory, to fetch get info about a given streamer.
 *
 * @param  {type} $q
 * @return {function}
 */
function fetchFactory($q) {
  /**
   * getData - The actual fetching with a promise
   *
   * @param  {string} elem streamers name
   * @return {Object}      promise
   */
  return function getData(elem) {

    return function () {

      return $q(function(resolve){
        $.getJSON('https://api.twitch.tv/kraken/streams/'+elem+'?callback=?', function(data) {
          data.name = elem;
          resolve(data);
        });
      });
    };
  };
}
/**
 * @ngdoc function
 * @name twitchtvApp.controller:AboutCtrl
 * @My very first controller
 * # AboutCtrl
 * Controller of the twitchtvApp
 */
angular.module('twitchtvApp')
  .controller('TwitchCtrl', function (fetchFactory, $scope) {
    var self = this;
    $scope.digested = [];
    $scope.streamers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

    function callFactory() {
      for (var i = 0; i < $scope.streamers.length; i++) {
        var z = fetchFactory($scope.streamers[i]);

        z().then(function(streamer){
          $scope.digested.push(streamer);
        });
      }
    }
    self.callFactory = callFactory;
    callFactory();
  })
  .factory('fetchFactory', fetchFactory);
