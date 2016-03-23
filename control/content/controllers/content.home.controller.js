/**
 * Created by akash on 22/3/16.
 */

'use strict';

(function (angular) {
  angular
    .module('women-WC16-buildfire')
    .controller('ContentHomeCtrl', ['$scope','AllMatchesApi','TodayMatchApi','ScoreBoardApi','FifaCodeApi','TeamsApi',
      function ($scope,AllMatchesApi,TodayMatchApi,ScoreBoardApi,FifaCodeApi,TeamsApi) {


        console.log("i am in >>>>>>>>>>>>>>>>>>>>>>>");
        var ContentHome = this;
        ContentHome.message = 'Aki';
        /*ContentHome.HitOne = {};
        ContentHome.HitTwo = {};
        ContentHome.HitThree = {};
        ContentHome.HitFour = {};
        ContentHome.HitFive = {};*/
        ContentHome.opt1 = false;
        ContentHome.opt2 = false;
        ContentHome.opt3= false;
        ContentHome.opt4 = false;
        ContentHome.opt5 = false;
        ContentHome.opt = '';
        ContentHome.optSelected = '';


        ContentHome.Disp = function(){
console.log('i am here',ContentHome.opt);

          switch (ContentHome.opt) {
            case 'a':
              AllMatchesApi.getAll(function(data){
                ContentHome.HitOne = data;
                console.log('One>>>>>>>',ContentHome.HitOne);
                ContentHome.optSelected = 'a';
              });
              break;
            case 'b':
              TodayMatchApi.getAll(function(data){
                ContentHome.HitTwo = data;
                console.log('Two>>>>>>',ContentHome.HitTwo);
                ContentHome.optSelected = 'b';
              });
              break;
            case 'c':
              ScoreBoardApi.getAll(function(data){
                ContentHome.HitThree = data;
                console.log('Three>>>>>>>',ContentHome.HitThree);
                ContentHome.optSelected = 'c';
              });
              break;
            case 'd':
              FifaCodeApi.getAll({fifa_code:'USA'},function(data){
                ContentHome.HitFour = data;
                console.log('Four>>>>>>>',ContentHome.HitFour);
                ContentHome.optSelected = 'd';
              });
              break;
            case 'e':
              TeamsApi.getAll(function(data){
                ContentHome.HitFive = data;
                console.log('Five>>>>>>>>>>>',ContentHome.HitFive);
                ContentHome.optSelected = 'e';
              });
              break;
          }

        }



        /// create a new instance of the buildfire carousel editor
        var editor = new buildfire.components.carousel.editor("#carousel");

        /// handle the loading
        function loadItems(carouselItems){
          // create an instance and pass it the items if you don't have items yet just pass []
          editor.loadItems(carouselItems);
        }

        /// call buildfire datastore to see if there are any previously saved items
        buildfire.datastore.get(function(err,obj){
          if(err)
            alert('error');
          else
            loadItems(obj.data.carouselItems)
        });

        /// save any changes in items
        function save(items){
          console.log('saving...');
          buildfire.datastore.save({carouselItems:items},function(e){
            if(e)
              alert("error");
            else
              console.log('saved.');
          });
        }


        // this method will be called when a new item added to the list
        editor.onAddItems = function (items) {
          save(editor.items);
        };
        // this method will be called when an item deleted from the list
        editor.onDeleteItem = function (item, index) {
          save(editor.items);
        };
        // this method will be called when you edit item details
        editor.onItemChange = function (item) {
          save(editor.items);
        };
        // this method will be called when you change the order of items
        editor.onOrderChange = function (item, oldIndex, newIndex) {
          save(editor.items);
        };

        //updateMasterItem(_data);

        ContentHome.bodyWYSIWYGOptions = {
          plugins: 'advlist autolink link image lists charmap print preview',
          skin: 'lightgray',
          trusted: true,
          theme: 'modern'

        };


        console.log("i am out >>>>>>>>>>>>>>>>>>>>>>>");


      }]);
})(window.angular);


