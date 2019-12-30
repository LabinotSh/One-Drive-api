import { Controller } from "cx/ui";
import {Icon, Grid, DateField, DateTimeField} from 'cx/widgets';
import Moment from "moment";
import { extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

var oneDriveAPI = require('onedrive-api');
var accessToken = "EwCIA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAASBYoJBbA7K/5CBqCBUX0Mc1t4H81TIHG1UCEQmAhvDI+JfvulpHxXpKOwX8KEQ9kc5nE3sbD8VIKv0qaqyYwUz8PTPdidE9sQgMVSopwyUScQJ7FLAyFUErx3WBJy1ysUH3vK6bj9D6qC7LCuQ16nZZFv82ZE5/4d6AOPeCkTemmnNCzS+J9ve9jtTtTcs8yx+N4aDLV+UbygTTTQx1IU9wKqePhqEVeZvxmhfN5NxB+U424xVcWmwSqaGx5PImsLIC7K63HEmQPeOpzjShZCESQErKGIAMeBJxmjBqetmmfo3UykvmiGWXHYvFJYoUmzdg7rNbeK0mfu7w7iLJqAMDZgAACG71Y2DukzwfWAKr6o0xfJa5YMHDfFUhTGBg92YSJyo/4BAeGQrft6WBlx6nKbXcAqXuHu092AVvlv/JOrmt2d9NZKV289TewuSLyOwcG5IQDR07HHTC+oFFCx9ZI1A1S7b/f2JrmBbbc7iUe5WtED2EBC5WIaZLuD55cqHJSIfSqcHMV3vBivfIJApkqSDA+18ow2FjQaCYPsPrcyJlhSIGQjEQQIXzaQarXpxGWg1F3ogxHxkPLpNK5OuFMDqJDxMAvzfPyTUxKDIe7JqXRBsSX2MiVjtcRUbL5QKX7MjnrxHCmbBmUeg21XXJaA41gZtb+XmzzDcQvkbQsRDwe6x4PpMOIKg68CRBrpyQvrXhrgw8uwtwYW57z7i6NmvtMAkyXxFSxb8XxbyZRMazHnhMQR4Bm7+93EP4KC0jHJxG1oxx+nTsxSo/X3Tzynau1nkC3XoREjUkeFYOtlooC6MtJmH/YhdYPWaZGqppItaxJ4nvmEgg86l0AyHaAsjS46uX27/tSfcP+cqLzquQ73m3DfI5ux8cIoP/dHr1pbXagM4luXe64dbxmM08Uu2abqQCD4ly6aG8zI1Klgw63jot21AAt4HqRdwBstgu8XDeYvftgbxhLoZZVTcBweJvfIRllIoj8kYkq1NLWtO2kNztGRrqdU66TQevxXmS9XhvfCotdMjOgVK+F5GJpZCGZwZGD7GVuFe9jc55+5KipSx3nhJrR9yjoTerm4ldrriWDD1dtxDt/HPRWNTFI0B/QijjQTmu0ZCZeBzr2HCq70qaprEL3Y/8NLH/UuBnSYPGQ/SkAg==";

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
      this.store.set("$page.page1", 1);
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

      //this.store.set("$page.records", dataset.slice(0,this.store.get('$page.pageSize')));
      //this.store.set("$page.pageCount", Math.max(pageCount, page + (dataset.length > this.store.get("$page.pageSize") ? 1 : 0)));
   

     
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

               this.store.set('$page.records', child.map((item, i) => ({
                  id: item.id,
                  icon: item.name,
                  document: item.name,
                  folder: item.parentReference.path,
                  user: item.createdBy.user.displayName,
                  lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
               })).filter(item => item.user === getUsers)
               );
            }).catch(err => console.error(err));
         }

      });
      
      //Modified LookupField Trigger
      this.addTrigger('t1', ['$page.modified.text'], getDate =>{
        let text = this.store.get('$page.modified.text');
        var currentDate = moment().format('YYYY-MM-DD');
        console.log(text);
       
        let txt = dateTranslate(text);
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
            console.log("dd" + child[0].lastModifiedDateTime);
            console.log("dita " + getDate);
            console.log(" Jeeez " + (child[5].lastModifiedDateTime >= text))
            this.store.set('$page.records', child.map((item, i) => ({
               id: item.id,
               icon: item.name,
               document: item.name,
               folder: item.parentReference.path,
               user: item.createdBy.user.displayName,
               lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
            })).filter(x => (x.lmodified >= txt && x.lmodified<= currentDate))
            );
         }).catch(err => console.error(err));
        }
         
      });
   
   }


   onFilter(obj){
      if(obj.hasOwnProperty("file")){
      return obj.name;
      }
    }

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
         let child = childrens.value
         .filter(this.onFilter)
         .filter(x => x.name.startsWith(desc.trim()));
         console.log(child);
         this.store.set('$page.records', child.map((item, i) => ({
            id: item.id,
            icon: item.name,
            document: item.name,
            folder: item.parentReference.path,
            user: item.createdBy.user.displayName,
            lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
         }))
         );
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
         this.store.set('$page.records', child.map((item, i) => ({
            id: item.id,
            icon: item.name,
            document: item.name,
            folder: item.parentReference.path,
            user: item.createdBy.user.displayName,
            lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
         }))
         );
      }).catch(err => console.error(err));
   }
    
   // findAll(id){
      
   //    oneDriveAPI.items.listChildren({
   //    accessToken: accessToken,
   //    itemId: id,
   //    shared: true,
   //    user: 'sherifilabinot'
   //    }).then((childrens) => {
   //     let myItems = childrens.value;
   //     for(let i=0; i<myItems.length; i++){

   //       myFolders.push(myItems[i]);
   //       if(myItems[i].hasOwnProperty('folder')){
   //          this.findAll(myItems[i].id)
            
   //        }
   //       myFiles = myFolders.filter(item => item.hasOwnProperty('file'));
   //       this.store.set('$page.records', myFiles.map((item,i) => ({
   //         id: item.id,
   //         icon: item.name,
   //         document: item.name,
   //         folder: item.parentReference.name || 'root',
   //         user: item.createdBy.user.displayName,
   //         lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
   //        })));
   //     }
      
   // }).catch(err => console.error(err));     
   // }

}

function dateTranslate(text){
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
          text = moment(new Date()).format('YYYY-MM-DD');//not finished
          console.log("Date e shh:" + text)
    }
    return text;
}

      





