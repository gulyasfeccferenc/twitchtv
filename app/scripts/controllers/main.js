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

      return $q(function(resolve, reject){
        $.getJSON('https://api.twitch.tv/kraken/streams/'+elem+'?callback=?', function(data) {
          resolve(data);
        });
      })
    }
  }
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
    const self = this;
    self.callFactory = callFactory
    $scope.digested = [];
    $scope.streamers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

    callFactory();

    function callFactory() {
      for (let i = 0; i < $scope.streamers.length;i++) {
        let z = fetchFactory($scope.streamers[i]);

        z().then(function(kurwa){
          kurwa.name = $scope.streamers[i];
          $scope.digested.push(kurwa);
          console.log($scope.digested);
        });
      }
    }

  })
  .factory('fetchFactory', fetchFactory)
