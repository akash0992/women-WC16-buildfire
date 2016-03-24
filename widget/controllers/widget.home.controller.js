/**
 * Created by akash on 23/3/16.
 */

'use strict';

(function (angular) {
  angular
    .module('women-WC16-buildfire-widget')
    .controller('WidgetHomeCtrl', ['$scope','$http','$sce',
      function ($scope,$http,$sce) {


        console.log("i am in widget >>>>>>>>>>>>>>>>>>>>>>>");
        var WidgetHome = this;
        WidgetHome.message = 'Aki';
       /* WidgetHome.HitOne = {};
         WidgetHome.HitTwo = {};
         WidgetHome.HitThree = {};
         WidgetHome.HitFour = {};
         WidgetHome.HitFive = {};*/
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

        WidgetHome.Disp = function(){
        //  console.log('i am here',WidgetHome.opt.checked);

          switch (WidgetHome.opt.checked) {
            case 'a':

              $http.get(WidgetHome.url.urlOne).then(function(res){
                WidgetHome.HitOne = res.data;
              //  console.log('One>>>>>>>',WidgetHome.HitOne);
                WidgetHome.optSelected = 'a';
              });

              /*AllMatchesApi.getAll(function(data){
                WidgetHome.HitOne = data;
                console.log('One>>>>>>>',WidgetHome.HitOne);
                WidgetHome.optSelected = 'a';
              });*/
              break;
            case 'b':

              $http.get(WidgetHome.url.urlTwo).then(function(res){
                WidgetHome.HitTwo = res.data;
              //  console.log('Two>>>>>>>',WidgetHome.HitTwo);
                WidgetHome.optSelected = 'b';
              });

              /* TodayMatchApi.getAll(function(data){
                 WidgetHome.HitTwo = data;
                 console.log('Two>>>>>>',WidgetHome.HitTwo);
                 WidgetHome.optSelected = 'b';
               });*/
              break;
            case 'c':

              $http.get(WidgetHome.url.urlThree).then(function(res){
                WidgetHome.HitThree = res.data;
             //   console.log('Three>>>>>>>',WidgetHome.HitThree);
                WidgetHome.optSelected = 'c';
              });

              /*ScoreBoardApi.getAll(function(data){
                WidgetHome.HitThree = data;
                console.log('Three>>>>>>>',WidgetHome.HitThree);
                WidgetHome.optSelected = 'c';
              });*/
              break;
            case 'd':

              $http.get(WidgetHome.url.urlFour).then(function(res){
                WidgetHome.HitFour = res.data;
              //  console.log('Four>>>>>>>',WidgetHome.HitFour);
                WidgetHome.optSelected = 'd';
              });

              /*FifaCodeApi.getAll({fifa_code:'USA'},function(data){
                WidgetHome.HitFour = data;
                console.log('Four>>>>>>>',WidgetHome.HitFour);
                WidgetHome.optSelected = 'd';
              });*/
              break;
            case 'e':

              $http.get(WidgetHome.url.urlFive).then(function(res){
                WidgetHome.HitFive = res.data;
               // console.log('Five>>>>>>>',WidgetHome.HitFive);
                WidgetHome.optSelected = 'e';
              });

              /* TeamsApi.getAll(function(data){
                 WidgetHome.HitFive = data;
                 console.log('Five>>>>>>>>>>>',WidgetHome.HitFive);
                 WidgetHome.optSelected = 'e';
               });*/
              break;
          }

        }


        /// handle the loading Url
        WidgetHome.loadUrls = function(urls){
          // create an instance and pass it the items if you don't have items yet just pass []
          WidgetHome.url = urls;
          WidgetHome.optSelected = '';
          WidgetHome.opt.checked = false;

          if(!$scope.$$phase){
            $scope.$digest();
          }
        /*  console.log("retrieved data url >>>>>",WidgetHome.url);
          console.log("urls >>>>>",urls);*/
        }



        /// load any previously saved urls
        buildfire.datastore.get('worldCupUrl',function(err,obj){
          if(err)
            alert('error');
          else{
          /*  console.log('get - widget - url >>>>>>>>>>>>>>>>>>',obj);*/
            WidgetHome.loadUrls(obj.data.url);
          }
        });


        //////////////////////////wysiwyg////////////////////////

        /// handle the loading wysiwyg
        WidgetHome.loadWysiwyg = function(result){

          if (result) WidgetHome.bind(result.data);

/*
          WidgetHome.data_content = result;

          if(!$scope.$$phase){
            $scope.$digest();
          }
            console.log("retrieved data wysiwyg >>>>>",WidgetHome.data_content);
           console.log("wysiwyg >>>>>",result);
*/
        }



        /// load any previously saved wysiwyg
        buildfire.datastore.get('wysiwyg',function(err,obj){
          if(err)
            alert('error');
          else{
              console.log('get - widget - wysiwyg >>>>>>>>>>>>>>>>>>',obj);

            WidgetHome.loadWysiwyg(obj);
          }
        });

        /*
         * bind data to scope
         * */
        WidgetHome.bind = function(data) {
          WidgetHome.data_content = data;
          if (data && data.data_content) {
            WidgetHome.data_content = $sce.trustAsHtml(data.data_content);
          }
          if(!$scope.$$phase)$scope.$digest();
        }


        /////////////////////////////////////////carousel///////////////////////////////

        ///create new instance of buildfire carousel viewer
        WidgetHome.view = new buildfire.components.carousel.view("#carousel", []);

        /// load items
        WidgetHome.loadItems = function(carouselItems){
          // create an instance and pass it the items if you don't have items yet just pass []
          WidgetHome.view.loadItems(carouselItems);
        }

        /// load any previously saved items
        buildfire.datastore.get('worldCup',function(err,obj){
          if(err)
            alert('error');
          else{
          /*  console.log('get - widget >>>>>>>>>>>>>>>>>>');*/
            WidgetHome.loadItems(obj.data.carouselItems)
          }
        });

        /// handle any updates by reloading
        buildfire.datastore.onUpdate(function(e){
          console.log('onUpdate - widget >>>>>>>>>>>>>>>>>>');
          console.log('event >>>>>',e);
          if(e.tag == 'worldCup'){
            WidgetHome.loadItems( e.data.carouselItems);
            console.log('Updated - widget - WorldCup >>>>>>>>>>>>>>>>>>');
          }
          if(e.tag == 'worldCupUrl'){
            WidgetHome.loadUrls(e.data.url);
            console.log('Updated - widget - WorldCupUrl >>>>>>>>>>>>>>>>>>');
          }
          if(e.tag == 'wysiwyg'){
            WidgetHome.loadWysiwyg(e);
            console.log('Updated - widget - wysiwyg >>>>>>>>>>>>>>>>>>');
          }
        })



        console.log("i am out widget >>>>>>>>>>>>>>>>>>>>>>>");


      }]);
})(window.angular);


