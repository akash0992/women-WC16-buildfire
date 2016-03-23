/**
 * Created by akash on 23/3/16.
 */


'use strict';

(function (angular) {
  angular.module('women-WC16-buildfire-widget')
    //injected ngRoute for routing
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/widget.home.html',
          controllerAs: 'WidgetHome',
          controller: 'WidgetHomeCtrl'
        })
        .otherwise('/');
    }])
})(window.angular);
