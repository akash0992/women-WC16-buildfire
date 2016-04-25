/**
 * Created by akash on 22/3/16.
 */

'use strict';

(function (angular) {
  angular
    .module('women-WC16-buildfire')
    .controller('ContentHomeCtrl', ['$scope',
      function ($scope) {

        var ContentHome = this;

        ContentHome.opt1 = false;
        ContentHome.opt2 = false;
        ContentHome.opt3= false;
        ContentHome.opt4 = false;
        ContentHome.opt5 = false;
        ContentHome.bodyWYSIWYG_data = '';
        ContentHome.data_content = '';
        ContentHome.id = '';

       /* ContentHome.urlOne = 'http://worldcup.sfg.io/matches';
        ContentHome.urlTwo = 'http://worldcup.sfg.io/matches/today';
        ContentHome.urlThree = 'http://worldcup.sfg.io/teams/results';
        ContentHome.urlFour = 'http://worldcup.sfg.io/matches/country';
        ContentHome.urlFive = 'http://worldcup.sfg.io/teams/';
*/
        ContentHome.url = {
          urlOne : '',
          urlTwo : '',
          urlThree : '',
          urlFour : '',
          urlFive : ''
        };

        ContentHome.urlFlag = {
          urlOneFlag : '',
          urlTwoFlag : '',
          urlThreeFlag : '',
          urlFourFlag : '',
          urlFiveFlag : ''
        };

        var tmrDelay = null;

        /*
         ChangeUrls
         */
        ContentHome.changeUrl = function(url,opt,flag){

          if(url != undefined){
            switch (opt) {
              case 'a':
                ContentHome.url.urlOne = url;
                ContentHome.urlFlag.urlOneFlag = flag;
                ContentHome.saveUrl(ContentHome.url,ContentHome.urlFlag);
                break;
              case 'b':
                ContentHome.url.urlTwo = url;
                ContentHome.urlFlag.urlTwoFlag = flag;
                ContentHome.saveUrl(ContentHome.url,ContentHome.urlFlag);
                break;
              case 'c':
                ContentHome.url.urlThree = url;
                ContentHome.urlFlag.urlThreeFlag = flag;
                ContentHome.saveUrl(ContentHome.url,ContentHome.urlFlag);
                break;
              case 'd':
                ContentHome.url.urlFour = url;
                ContentHome.urlFlag.urlFourFlag = flag;
                ContentHome.saveUrl(ContentHome.url,ContentHome.urlFlag);

                break;
              case 'e':
                ContentHome.url.urlFive = url;
                ContentHome.urlFlag.urlFiveFlag = flag;
                ContentHome.saveUrl(ContentHome.url,ContentHome.urlFlag);

                break;
            }
          }

        }


        /*
         Go pull any previously saved data for wysiwyg
         */
        buildfire.datastore.get('wysiwyg',function (err, result) {

          if (result) {
            ContentHome.data_content = result.data.data_content;
            ContentHome.id = result.id;
            if(!$scope.$$phase)$scope.$digest();
            if (tmrDelay)clearTimeout(tmrDelay);
          }
          /*
           watch for changes in data and trigger the saveDataWithDelay function on change for wysiwyg
           */
          $scope.$watch('ContentHome.data_content', ContentHome.saveDataWithDelay, true);
        });


        /*
         Call the datastore to save the data object for wysiwyg
         */
        ContentHome.saveData = function (newObj) {
          if (newObj == undefined)return;
          buildfire.datastore.save({data_content:newObj},'wysiwyg', function (err, result) {
            if (err || !result)
              alert(JSON.stringify(err));
            else
              console.log('data saved');
          });
        };


        /*
         create an artificial delay so api isnt called on every character entered for wysiwyg
         */
        ContentHome.saveDataWithDelay = function (newObj,oldObj) {
          if(newObj == oldObj)
            return;
          if (tmrDelay)clearTimeout(tmrDelay);
          tmrDelay = setTimeout(function () {
            ContentHome.saveData(newObj);
          }, 500);
        };


        /*
         handle the loading Url
         */
        ContentHome.loadUrls = function(urls,flags){
          ContentHome.url = urls;
          ContentHome.urlFlag = flags;
          if(!$scope.$$phase){$scope.$digest();}
          if (tmrDelay){clearTimeout(tmrDelay)};
        }


        /*
         call buildfire datastore to see if there are any previously saved Url item
         */
        buildfire.datastore.get('worldCupUrl',function(err,obj){
          if(err)
            alert('error');
          else{
            ContentHome.loadUrls(obj.data.url,obj.data.urlFlag)
          }
        });


        /*
         save any changes in Url item
         */
        ContentHome.saveUrl = function(item,flag){
          buildfire.datastore.save({url:item,urlFlag:flag},'worldCupUrl',function(e){
            if(e)
              alert("error");
            else{
              console.log('save - content - url >>>>>>>>>>>>>>>>>>');
            }
          });
        }


        /*
         create a new instance of the buildfire carousel editor
         */
        ContentHome.editor = new buildfire.components.carousel.editor("#carousel");


        /*
         handle the loading
         */
        ContentHome.loadItems = function(carouselItems){
          ContentHome.editor.loadItems(carouselItems);
        }


        /*
         call buildfire datastore to see if there are any previously saved items
         */
        buildfire.datastore.get('worldCup',function(err,obj){
          if(err)
            alert('error');
          else{
            ContentHome.loadItems(obj.data.carouselItems)
          }
        });


        /*
         save any changes in items
         */
        ContentHome.save = function(items){
          buildfire.datastore.save({carouselItems:items},'worldCup',function(e){
            if(e)
              alert("error");
            else{
              console.log('saved.');
            }

          });
        }


        /*
         this method will be called when a new item added to the list
         */
        ContentHome.editor.onAddItems = function (items) {
          ContentHome.save(ContentHome.editor.items);
        };


        /*
         this method will be called when an item deleted from the list
         */
        ContentHome.editor.onDeleteItem = function (item, index) {
          ContentHome.save(ContentHome.editor.items);
        };


        /*
          this method will be called when you edit item details
          */
        ContentHome.editor.onItemChange = function (item) {
          ContentHome.save(ContentHome.editor.items);
        };


        /*
         this method will be called when you change the order of items
         */
        ContentHome.editor.onOrderChange = function (item, oldIndex, newIndex) {
          ContentHome.save(ContentHome.editor.items);
        };


      }]);
})(window.angular);


