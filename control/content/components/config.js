/**
 * Created by akash on 22/3/16.
 */

'use strict';

(function (angular) {
  angular.module('women-WC16-buildfire')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/content.home.html',
          controllerAs: 'ContentHome',
          controller: 'ContentHomeCtrl'
        })
        .otherwise('/');
    }])
})(window.angular);
