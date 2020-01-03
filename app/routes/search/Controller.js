import { Controller } from "cx/ui";
import {Icon, Grid, DateField, DateTimeField} from 'cx/widgets';
import Moment from "moment";
import { extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

var oneDriveAPI = require('onedrive-api');
var accessToken = "EwCIA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAbTbfAJEZ7rZbs6LFjwNN5rjOhFuMuOqjOcYvO9aBwkOYM4GskoLUuNCyoncNuEhW6ucf2z2+JjCRIx7VkWZj2d3eF6aTWCBxZ7jl3qVkCGmqgK6KFjWSSLZjfCJXizDnVesR8t/feOGNd+OeDfdWMwSCVN34CtU4TDW7P+xfVgVZSbnZBC4jhZZSvKYr25t+AhkfxmnTqffpBl9149V0zxCsulMyZqq4Uf/L9UXL1ZqVbcMb+x1GhRZCF89w/M2zPpNvUVZvAuDSI7JXVapzJ9TlZ5es8I46v2PFyRiuoro1Y7isMR8eaXVBKxLY+PAcuyD3d3Q6c8xW3zFIIzVGEIDZgAACMCzlPefqoV5WAItBOCviZlzLZWT+qQBLJ4gzqjtyMct2CLZFQk4F6DeV6K7rwDgBeSCpIqk+q1UR6KCuDe4roWIvCwg/X57UcyGVdUmawaFw18bTZi+C0px+MlG2o2/lqVpkwrW6udERSSXrVo6NWMd45NGsS+pRSYn34LxU937zx5ZiqxdVl6pT8EEHO0hRgej3tVYwwtcRbT52mNyqKbzS9KNTIR2FMcPk6U0HsSGpDvKVl0mnv98HJxEFZqibO9jC8O6bxqmgOnXDxYWe9rE18yCEDnkJL+6vnucm+8kmpmZ94+fkZLipDYBj5g6khVoK0Ep1DaVQfOybIKSL7pD+DfbnZp3r7dErvB2ZyE2lZzCXg62d7o3Asb5hG8hC1fV5rlc/ajzP1xi3PiPgsEPXilvyhlDwR3S1Ul6XNBQAs4aVzxquVbeqVyV9ueC9XqicWM35kV6TsvHS1h2tvJ9ceXEPZz1033lMTfru7IMEdVEbDuyxtrWXAtkfFwmHnLeueQSlmSEwacaY5tSo5ZksIGORblA2sGAV5UEHPVu6dWZ9sSyY/7tWzBYsvggegASpgmipQPy9zhmgRNWF5USJfKEid01UENvNbgnFC6WF9R2tY6bjL5NgXuVZPXzo3IiptR9Fk7d6AOKbgAIbarkOEc6pv/s1sWXBeugvNobNLvetX263RFj/lF/2bDshv1kUf+bDEfwmfQVTbLClxuBcuJBgg6J3O9oslbReIi5r+xdwD3f+VFiKH3H9jzhaoMdhJYlLwf3L24mCU+OZTaxgCbokjkqHOtYcBq94/J6U6CkAg==";

export default class SearchController extends Controller {
   init() {
      super.init();

      var array = [
                   { id:1, text:'Last 7 Days'},
                   { id:2, text:'Last 30 Days'},
                   { id:3, text:'Last 180 Days'},
                   { id:4, text:'Custom Date'/*items: (<cx>
                      <DateTimeField label="time" value-bind="$page.time"/>
                   </cx>)*/}];

      this.store.set('$page.user0', array);

      //Custom Date for ....
      this.store.set("$page.visible.date", false);


      var myFolders = [];
      var myFiles = [];

      var users = [{
         id:1, text:'Labinot Sherifi'},
         {id:2, text:'Endrita Rrahmani'},
         {id:3, text:'Rinor Rafuna'},
         {id:4, text:'Doreta Maliqi'},
         {id:5, text:'Edona Ukaj'}
      ]
      this.store.set('$page.useroptions',users);

      this.store.set("$page.pageCount", 5);
      this.store.set("$page.page", 1);
      this.store.init("$page.pageSize", 10);

      var text = this.store.get("$page.modified.text");
      var value = this.store.get("$page.modified");
      console.log("Value" + value);
      console.log("Texti:  " + text);
      var arr = this.store.get('$page.user0');
      console.log("array " + arr);

      //on Load , fill the grid
      // oneDriveAPI.items.listChildren({
      //    accessToken: accessToken,
      //    itemId: 'root',
      //    shared: true,
      //    user: 'sherifilabinot'
      // }).then((childrens) => {
      //    let child = childrens.value.filter(this.onFilter);
      //    console.log(child);
      //    this.store.set('$page.records', child.map((item, i) => ({
      //       id: i++,
      //       icon: item.name,
      //       document: item.name,
      //       folder: item.parentReference.name || 'root',
      //       user: item.createdBy.user.displayName,
      //       lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
      //    }))/*.filter(item => item.hasOwnProperty("file"))*/);
      // })
      // .catch(err => console.error(err));

      let store = this.store;

      function findAll(id){ 
         oneDriveAPI.items.listChildren({
         accessToken: accessToken,
         itemId: id,
         shared: true,
         user: 'sherifilabinot'
         }).then((childrens) => {
          let myItems = childrens.value;
          for(let i=0; i<myItems.length; i++){
            myFolders.push(myItems[i]);
            if(myItems[i].hasOwnProperty('folder')){
               findAll(myItems[i].id)
             }
            myFiles = myFolders.filter(item => item.hasOwnProperty('file'));
            store.set('$page.records', myFiles.map((item,i) => ({
              id: item.id,
              icon: item.name,
              document: item.name,
              folder: item.parentReference.name || 'root',
              user: item.createdBy.user.displayName,
              lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
             })));
          }
      }).catch(err => console.error(err));     
      }

      findAll('root');

      var pageSize = this.store.get('$page.pageSize');
      var page = this.store.get("$page.page1");
      var pageCount = this.store.get("$page.pageCount");
      var records = this.store.get("$page.records");

      //NOT Working
      // this.store.set("$page.records", records.slice(0,pageSize));
      // this.store.set("$page.pageCount", Math.max(pageCount, page + records.length > pageSize ? 1 : 0));
   
      // this.addTrigger(
      //    "page",
      //    ["$page.pageSize", "$page.sorters"],
      //    () => {
      //      this.store.set("$page.page", 1);
      //    },
      //    true
      //  );

      
     
      //User lookupField trigger
      this.addTrigger('tuser',['$page.user.text'], getUsers =>{
         if(!this.store.get("$page.user.text")){  
          this.fillGrid();
         }else{
            oneDriveAPI.items.listChildren({
               accessToken: accessToken,
               itemId: 'root',
               shared: true,
               user: 'sherifilabinot'
            }).then((childrens) => {
               let child = childrens.value.filter(this.onFilter);
               let user = child[0].createdBy.user.displayName;
               console.log("user: "+ user );
             this.gridFilter(child, item => item.user === getUsers);
            }).catch(err => console.error(err));
         }

      });
      
      //Modified LookupField Trigger
      this.addTrigger('t1', ['$page.modified.text'], getDate =>{
        let text = this.store.get('$page.modified.text');
        var currentDate = moment().format('YYYY-MM-DD');
        console.log(text);
        let txt = this.dateTranslate(text);
        console.log("Final " + txt);
        if(!txt){
           this.fillGrid();
        }else{
         oneDriveAPI.items.listChildren({
            accessToken: accessToken,
            itemId: 'root',
            shared: true,
            user: 'sherifilabinot'
         }).then((childrens) => {
            let child = childrens.value.filter(this.onFilter);
            console.log(child);
            console.log("dita " + getDate);
            this.gridFilter(child,x => (x.lmodified >= txt && x.lmodified<= currentDate));
         }).catch(err => console.error(err));
        }
      }); 
   }
   
   onFilter(obj){
      if(obj.hasOwnProperty("file")){
      return obj.name;
      }
    }

    ///Search Button on Click-Search based in description
   onClick() {
       var desc = this.store.get('$page.desc');
      // console.log("Searched: " + desc);
      if(!desc){
        this.fillGrid();
      }else{
      oneDriveAPI.items.listChildren({
         accessToken: accessToken,
         itemId: 'root',
         shared: true,
         user: 'sherifilabinot'
      }).then((childrens) => {
         let child = childrens.value;
         console.log(child);
         this.gridData(child
            .filter(this.onFilter)
            .filter(x => x.name.startsWith(desc.trim())));
      }).catch(err => console.error(err));
   }
   
   }

   ///default method for populating the grid
   fillGrid(){
      oneDriveAPI.items.listChildren({
         accessToken: accessToken,
         itemId: 'root',
         shared: true,
         user: 'sherifilabinot'
      }).then((childrens) => {
         let child = childrens.value.filter(this.onFilter);
         console.log(child);
         this.gridData(child);
      }).catch(err => console.error(err));
   }

   //populate the grid
   gridData(child){
      this.store.set('$page.records', child.map((item, i) => ({
         id: item.id,
         icon: item.name,
         document: item.name,
         folder: item.parentReference.path,
         user: item.createdBy.user.displayName,
         lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
      }))
      );
  }
   //filter the grid
  gridFilter(child,item){
   this.store.set('$page.records', child.map((item, i) => ({
      id: item.id,
      icon: item.name,
      document: item.name,
      folder: item.parentReference.path,
      user: item.createdBy.user.displayName,
      lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
   })).filter(item)
   );
  }

  dateTranslate(text){
   var sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
   var thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
   var daysAgo180 = moment().subtract(180, 'day').format('YYYY-MM-DD');
  
    switch(text){
       case 'Last 7 Days':
          text = sevenDaysAgo;
          console.log(text);
          break;
       case 'Last 30 Days':
          text = thirtyDaysAgo;
          break;
       case 'Last 180 Days':
          text = daysAgo180;
          break;
       case 'Custom Date':
          this.store.set("$page.visible.date",true);
          var date = this.store.get("$page.date");
          this.store.set("$page.modified.text", moment(date).format('YYYY-MM-DD'));
          
          if(!date){
             this.fillGrid();
             this.store.set("$page.modified.text",'');
          }else{
          console.log("DATA custom " + date);
          var datetext = moment(date).subtract(date, 'day').format('YYYY-MM-DD');
          text = datetext;
          console.log("Date e shh:" + text);
          this.store.set("$page.visible.date", false);
          this.store.set("$page.date","");
          }
          break;
    }
    return text;
}


}




      





