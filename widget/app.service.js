/**
 * Created by akash on 22/3/16.
 */


angular.module("women-WC16-buildfire-widget")
  .factory('AllMatchesApi', function ($resource) {
    return $resource('http://worldcup.sfg.io/matches',{},
      {
        getAll: {
          method: 'GET',
          isArray:true
        }
      });
  })
  .factory('TodayMatchApi', function ($resource) {
    return $resource('http://worldcup.sfg.io/matches/today',{},
      {
        getAll: {
          method: 'GET',
          isArray:true
        }
      });
  })
  .factory('ScoreBoardApi', function ($resource) {
    return $resource('http://worldcup.sfg.io/teams/results',{},
      {
        getAll: {
          method: 'GET',
          isArray:true
        }
      });
  })
  .factory('FifaCodeApi', function ($resource) {
    //via query parameters
    return $resource('http://worldcup.sfg.io/matches/country',{},
      {
        getAll: {
          method: 'GET',
          isArray:true
        }
      });
  })
  .factory('TeamsApi', function ($resource) {
    //via query parameters
    return $resource('http://worldcup.sfg.io/teams/',{},
      {
        getAll: {
          method: 'GET',
          isArray:true
        }
      });
  })
