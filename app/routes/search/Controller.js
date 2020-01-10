import { Controller } from "cx/ui";
import { Icon, Grid, DateField, DateTimeField } from 'cx/widgets';
import Moment from "moment";
import { extendMoment } from 'moment-range';
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from 'file-saver';
const axios = require('axios');
const moment = extendMoment(Moment);

var folders = [];

export default class SearchController extends Controller {
   init() {
      super.init();

      var array = [{ id: 1, text: 'Last 7 Days' },
      { id: 2, text: 'Last 30 Days' },
      { id: 3, text: 'Last 180 Days' },
      { id: 4, text: 'Custom Date' }];

      this.store.set('$page.user0', array);
      this.store.set('$page.name', '');

      //Custom Date for ....
      this.store.set("$page.visible.date", false);
      this.store.set("$page.visible.window", false);
      //Call the method to populate the grid
      this.apiOneDrive();

      this.store.init('$page.pageSize', 20);

      var users = [{ id: 1, text: 'Labinot Sherifi' },
      { id: 2, text: 'Endrita Rrahmani' },
      { id: 3, text: 'Rinor Rafuna' },
      { id: 4, text: 'Doreta Maliqi' },
      { id: 5, text: 'Edona Ukaj' }];
      this.store.set('$page.useroptions', users);

      this.store.set("$page.pageCount", 5);
      this.store.set("$page.page", 1);
       //Emptying the search fields
      this.store.set('$page.modified.text','');
      this.store.set('$page.desc', ' ');

      //User lookupField trigger
      this.addTrigger('tuser', ['$page.selectedusers'], getUsers => {
         if (this.store.get("$page.selectedusers").length === 0) {
           this.onUpdate();
         } else {
               let userrr = this.store.get("$page.selectedusers");
               for(let i=0; i< userrr.length; i++){
                  console.log("userr ", userrr[i].text);
                  this.gridFilter(folders,item => (item.user === userrr[i].text));
               }
               console.log("User chosen: ", userrr);
         }
      });
      //Modified LookupField Trigger
      this.addTrigger('t1', ['$page.modified.text'], getDate => {
         let text = this.store.get('$page.modified.text');
         var currentDate = moment().format('YYYY-MM-DD');
         console.log(text);
         let txt = this.dateTranslate(text);
         console.log("Final " + txt);
         if (!txt) {
            this.onUpdate();
         } else {
               console.log("dita " + getDate);
               this.gridFilter(folders, x => (x.lmodified >= txt && x.lmodified <= currentDate));
         }
      });

   }
   //This function triggers the lambda functions which gets all the files from one-drive
   apiOneDrive(){
      axios.get('http://localhost:3000/getAll')
      .then(function (response) {
         // handle success
        folders = response.data.message;
        console.log("Folders", folders);
        return folders
        }).then((folders)=>{
         this.store.set("$page.records", folders.map((item, i) => ({
            id: item.id,
            icon: item.name,
            document: item.name,
            folder: item.parentReference.name || 'root',
            user: item.createdBy.user.displayName,
            lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
          })));
        })
        .catch(function (error) {
        // handle error
         console.log(error);
         }); 
         var rec = this.store.get("$page.records");
         console.log('Recordss',rec);   
   }

    getFileName(fileName) {
      let onlyFileName = fileName.split(".");
      onlyFileName = onlyFileName[0];
      return onlyFileName;
     }


 //Export as zip button functionality
  onZip(){
     var select = this.store.get('$page.selection');
     var zip = new JSZip();
       for(let i=0; i<folders.length; i++){
        if(folders[i].name === select){
           var  name = this.getFileName(folders[i].name);
          console.log('NAME',select);
          JSZipUtils.getBinaryContent(folders[i]['@microsoft.graph.downloadUrl'], function (err, data) {
            if(err) {
                alert('err');
                throw err;
            }
            else{
              zip.file(folders[i].name,data,{binary:true});
              zip.generateAsync({ type: "Blob" }).then(function (content) {
              saveAs(content, `${name}.zip`);
              });
            }  
          });
       }
    }
  }
   //updating the grid
   onUpdate(){
      this.store.set("$page.records", folders.map((item, i) => ({
         id: item.id,
         icon: item.name,
         document: item.name,
         folder: item.parentReference.name || 'root',
         user: item.createdBy.user.displayName,
         lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
       })));
   }
   ///Search Button on Click-Search based in description
   onClick() {
      var desc = this.store.get('$page.desc');
      if (!desc) {
         folders = [];
         this.apiOneDrive();
      } else {        
            this.gridData(folders
               .filter(x => x.name.startsWith(desc.trim())));
      }
   }
   //Modify the document's name
   onModify(){
      this.store.set('$page.windowTitle','Modify the name');
      var select = this.store.get('$page.selection');
      console.log('Select',select);
      this.store.set('$page.textValue1','Name:');
      var id;
      if(select){
         this.store.set("$page.visible.window", true);
      }
      for(let i=0; i<folders.length; i++){
         if(folders[i].name === select){
            console.log('NAAAAAME', folders[i].name);
            id = folders[i].id;
            console.log('IDDD',id);
         }
      }
      return id;
   }
   //Method to update/change the document's name
   onChangeName(){
      var id = this.onModify();
      var select = this.store.get('$page.selection');
      var name = this.store.get('$page.name');
      console.log('seee',select);
      console.log('id', id);
      console.log('name',name);
      
      axios.get(`http://localhost:3000/getAll/${name}/${id}`)
      .then(function (response) {
         // handle success
        console.log("UN JAM BABLOK", response.data.message);
         folders = response.data.message;
         return folders;
      //   console.log("FFFFF", folders);
        }).then((folders)=>{
         this.store.set("$page.records", folders.map((item, i) => ({
            id: item.id,
            icon: item.name,
            document: item.name,
            folder: item.parentReference.name || 'root',
            user: item.createdBy.user.displayName,
            lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
          })));
        })
        .catch(function (error) {
        // handle error
         console.log(error);
         });
         //this.store.set('$page.selection',false);
         this.store.set("$page.visible.window", false);      
   }

   //populate the grid
   gridData(child) {
      this.store.set('$page.records', child.map((item, i) => ({
         id: item.id,
         icon: item.name,
         document: item.name,
         folder: item.parentReference.name || 'root',
         user: item.createdBy.user.displayName,
         lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
      }))
      );
   }
   //populate and filter the grid
   gridFilter(child, item) {
      this.store.set('$page.records', child.map((item, i) => ({
         id: item.id,
         icon: item.name,
         document: item.name,
         folder: item.parentReference.name || 'root',
         user: item.createdBy.user.displayName,
         lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
      })).filter(item)
      );
   }

   //Translating text from lookupfield to actual date format
   dateTranslate(text) {
      var sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
      var thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
      var daysAgo180 = moment().subtract(180, 'day').format('YYYY-MM-DD');

      switch (text) {
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
            this.store.set("$page.visible.date", true);
            var date = this.store.get("$page.date");
            this.store.set("$page.modified.text", moment(date).format('YYYY-MM-DD'));
            if (!date) {
               //folders = [];
               this.store.set("$page.modified.text", '');
            } else {
               this.onUpdate();
               var datetext = moment(date).subtract(date, 'day').format('YYYY-MM-DD');
               text = datetext;
               console.log("Date e shh:" + text);
               this.store.set("$page.visible.date", false);
               this.store.set("$page.date", "");
            }
            break;
      }
      return text;
   }
}