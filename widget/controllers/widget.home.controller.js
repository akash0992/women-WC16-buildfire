/**
 * Created by akash on 23/3/16.
 */

'use strict';

(function (angular) {
  angular
    .module('women-WC16-buildfire-widget')
    .controller('WidgetHomeCtrl', ['$scope','$http','$sce',
      function ($scope,$http,$sce) {

        var WidgetHome = this;

        WidgetHome.opt1 = false;
        WidgetHome.opt2 = false;
        WidgetHome.opt3= false;
        WidgetHome.opt4 = false;
        WidgetHome.opt5 = false;
        WidgetHome.opt = {
          checked : false
        };
        WidgetHome.optSelected = '';
        WidgetHome.url = {
          urlOne : '',
          urlTwo : '',
          urlThree : '',
          urlFour : '',
          urlFive : ''
        };
        WidgetHome.data_content = '';

        /*
         Display
         */
        WidgetHome.Disp = function(){
          switch (WidgetHome.opt.checked) {
            case 'a':
              $http.get(WidgetHome.url.urlOne).then(function(res){
                WidgetHome.HitOne = res.data;
                WidgetHome.optSelected = 'a';
              });
              break;
            case 'b':
              $http.get(WidgetHome.url.urlTwo).then(function(res){
                WidgetHome.HitTwo = res.data;
                WidgetHome.optSelected = 'b';
              });
              break;
            case 'c':
              $http.get(WidgetHome.url.urlThree).then(function(res){
                WidgetHome.HitThree = res.data;
                WidgetHome.optSelected = 'c';
              });
              break;
            case 'd':
              $http.get(WidgetHome.url.urlFour).then(function(res){
                WidgetHome.HitFour = res.data;
                WidgetHome.optSelected = 'd';
              });
              break;
            case 'e':
              $http.get(WidgetHome.url.urlFive).then(function(res){
                WidgetHome.HitFive = res.data;
                WidgetHome.optSelected = 'e';
              });
              break;
          }
        }


        /*
         handle the loading Url
         */
        WidgetHome.loadUrls = function(urls){
          WidgetHome.url = urls;
          WidgetHome.optSelected = '';
          WidgetHome.opt.checked = false;
          if(!$scope.$$phase){
            $scope.$digest();
          }
        }

        /*
         load any previously saved urls
         */
        buildfire.datastore.get('worldCupUrl',function(err,obj){
          if(err)
            alert('error');
          else{
            WidgetHome.loadUrls(obj.data.url);
          }
        });


        //////////////////////////wysiwyg////////////////////////

        /*
         handle the loading wysiwyg
         */
        WidgetHome.loadWysiwyg = function(result){
          if (result) WidgetHome.bind(result.data);
        }

        /*
         load any previously saved wysiwyg
         */
        buildfire.datastore.get('wysiwyg',function(err,obj){
          if(err)
            alert('error');
          else{
            WidgetHome.loadWysiwyg(obj);
          }
        });

        /*
         bind data to scope
         */
        WidgetHome.bind = function(data) {
          WidgetHome.data_content = data;
          if (data && data.data_content) {
            WidgetHome.data_content = $sce.trustAsHtml(data.data_content);
          }
          if(!$scope.$$phase)$scope.$digest();
        }


        /////////////////////////////////////////carousel///////////////////////////////

        /*
         create new instance of buildfire carousel viewer
         */
        WidgetHome.view = new buildfire.components.carousel.view("#carousel", []);


        /*
         load items
         */
        WidgetHome.loadItems = function(carouselItems){
          WidgetHome.view.loadItems(carouselItems);
        }


        /*
         load any previously saved items
         */
        buildfire.datastore.get('worldCup',function(err,obj){
          if(err)
            alert('error');
          else{
            WidgetHome.loadItems(obj.data.carouselItems)
          }
        });


        /*
         handle any updates by reloading
         */
        buildfire.datastore.onUpdate(function(e){
          if(e.tag == 'worldCup'){
            WidgetHome.loadItems( e.data.carouselItems);
          }
          if(e.tag == 'worldCupUrl'){
            WidgetHome.loadUrls(e.data.url);
          }
          if(e.tag == 'wysiwyg'){
            WidgetHome.loadWysiwyg(e);
          }
        })


      }]);
})(window.angular);


