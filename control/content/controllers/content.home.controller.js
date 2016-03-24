/**
 * Created by akash on 22/3/16.
 */

'use strict';

(function (angular) {
  angular
    .module('women-WC16-buildfire')
    .controller('ContentHomeCtrl', ['$scope',
      function ($scope) {


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
        //ContentHome.opt = '';
        //ContentHome.optSelected = '';
        ContentHome.bodyWYSIWYG_data = '';
        ContentHome.data_content = '';
        $scope.id = '';

        ContentHome.urlOne = 'http://worldcup.sfg.io/matches';
        ContentHome.urlTwo = 'http://worldcup.sfg.io/matches/today';
        ContentHome.urlThree = 'http://worldcup.sfg.io/teams/results';
        ContentHome.urlFour = 'http://worldcup.sfg.io/matches/country';
        ContentHome.urlFive = 'http://worldcup.sfg.io/teams/';

        ContentHome.url = {
          urlOne : '',
          urlTwo : '',
          urlThree : '',
          urlFour : '',
          urlFive : ''
        };

        var tmrDelay = null;


        ContentHome.changeUrl = function(url,opt){
         /* console.log('opt >>>>>',opt);
          console.log('url >>>>>',url);
          console.log('urlObject Outside >>>>>',ContentHome.url);
*/
          if(url != undefined){

            switch (opt) {
              case 'a':
                ContentHome.url.urlOne = url;
                ContentHome.saveUrl(ContentHome.url);
                break;
              case 'b':
                ContentHome.url.urlTwo = url;
                ContentHome.saveUrl(ContentHome.url);
                break;
              case 'c':
                ContentHome.url.urlThree = url;
                ContentHome.saveUrl(ContentHome.url);
                break;
              case 'd':
                ContentHome.url.urlFour = url;
                ContentHome.saveUrl(ContentHome.url);
                break;
              case 'e':
                ContentHome.url.urlFive = url;
                ContentHome.saveUrl(ContentHome.url);
                break;
            }

          }

        }




        /*
         * Go pull any previously saved data for wysiwyg
         * */
        buildfire.datastore.get('wysiwyg',function (err, result) {
          //console.log("getting wysiwyg ....");
          if (result) {
            //console.log("getting wysiwyg .... found result>>>>>>>>>",result);
            ContentHome.data_content = result.data.data_content;
            $scope.id = result.id;
            if(!$scope.$$phase)$scope.$digest();
            if (tmrDelay)clearTimeout(tmrDelay);
          }
          /*
           * watch for changes in data and trigger the saveDataWithDelay function on change for wysiwyg
           * */
          $scope.$watch('ContentHome.data_content', ContentHome.saveDataWithDelay, true);
        });


        /*
         * Call the datastore to save the data object for wysiwyg
         */
        ContentHome.saveData = function (newObj) {
        //  console.log("saveData wysiwyg ....");
          if (newObj == undefined)return;

          buildfire.datastore.save({'data_content':newObj},'wysiwyg', function (err, result) {
          //  console.log("datastore.save data_content wysiwyg .... result",result);
            if (err || !result)
              alert(JSON.stringify(err));
            else
              console.log('data saved');
          });
        };


        /*
         * create an artificial delay so api isnt called on every character entered for wysiwyg
         * */

        ContentHome.saveDataWithDelay = function (newObj,oldObj) {
          //console.log("saveDataWithDelay wysiwyg ....");
          if(newObj == oldObj)
            return;
          if (tmrDelay)clearTimeout(tmrDelay);
          tmrDelay = setTimeout(function () {
            //console.log("saveData  wysiwyg  called....");
            //console.log("saveData  wysiwyg  called.... new obj .....",newObj);
            //console.log("saveData  wysiwyg  called.... old obj .....",oldObj);
            ContentHome.saveData(newObj);
          }, 500);
        };



        /// handle the loading Url
        ContentHome.loadUrls = function(urls){
          // create an instance and pass it the items if you don't have items yet just pass []
          ContentHome.url = urls;

          if(!$scope.$$phase){$scope.$digest();}

          if (tmrDelay){clearTimeout(tmrDelay)};

         /* console.log("retrieved data url >>>>>",ContentHome.url);
          console.log("urls >>>>>",urls);
*/
        }

        /// call buildfire datastore to see if there are any previously saved Url item
        buildfire.datastore.get('worldCupUrl',function(err,obj){
          if(err)
            alert('error');
          else{

           /* console.log('get - content >>>>>>>>>>>>>>>>>>');
            console.log('get - content - url >>>>>>>>>>>>>>>>>>',obj);*/
            ContentHome.loadUrls(obj.data.url)
          }
        });

        /// save any changes in Url item
        ContentHome.saveUrl = function(item){
          console.log('saving url...');
          buildfire.datastore.save({url:item},'worldCupUrl',function(e){
            if(e)
              alert("error");
            else{
              console.log('save - content - url >>>>>>>>>>>>>>>>>>');
            }

          });
        }



        /// create a new instance of the buildfire carousel editor
        ContentHome.editor = new buildfire.components.carousel.editor("#carousel");

        /// handle the loading
        ContentHome.loadItems = function(carouselItems){
          // create an instance and pass it the items if you don't have items yet just pass []
          ContentHome.editor.loadItems(carouselItems);
        }

        /// call buildfire datastore to see if there are any previously saved items
        buildfire.datastore.get('worldCup',function(err,obj){
          if(err)
            alert('error');
          else{
           /* console.log('get - content >>>>>>>>>>>>>>>>>>');*/
            ContentHome.loadItems(obj.data.carouselItems)
          }
        });

        /// save any changes in items
        ContentHome.save = function(items){
          console.log('saving...');
          buildfire.datastore.save({carouselItems:items},'worldCup',function(e){
            if(e)
              alert("error");
            else{
              /*console.log('save - content >>>>>>>>>>>>>>>>>>');*/
              console.log('saved.');
            }

          });
        }


        // this method will be called when a new item added to the list
        ContentHome.editor.onAddItems = function (items) {
          ContentHome.save(ContentHome.editor.items);
        };

        // this method will be called when an item deleted from the list
        ContentHome.editor.onDeleteItem = function (item, index) {
          ContentHome.save(ContentHome.editor.items);
        };

        // this method will be called when you edit item details
        ContentHome.editor.onItemChange = function (item) {
          ContentHome.save(ContentHome.editor.items);
        };

        // this method will be called when you change the order of items
        ContentHome.editor.onOrderChange = function (item, oldIndex, newIndex) {
          ContentHome.save(ContentHome.editor.items);
        };

        console.log("i am out >>>>>>>>>>>>>>>>>>>>>>>");


      }]);
})(window.angular);


