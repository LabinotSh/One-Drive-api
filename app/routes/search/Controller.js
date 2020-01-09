import { Controller } from "cx/ui";
import { Icon, Grid, DateField, DateTimeField } from 'cx/widgets';
import Moment from "moment";
import { extendMoment } from 'moment-range';
import JSZip from "jszip";
var AdmZip = require('adm-zip');
import { saveAs } from 'file-saver';
const fetch = require('node-fetch');
var cors = require('cors');
const axios = require('axios');


const moment = extendMoment(Moment);

var oneDriveAPI = require('onedrive-api');
var accessToken = "EwCIA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAWtynhiIl+4tn0GsvJ58ot552KMKKuf2xwgfh3wo2azVBnx7W9ujklfZq/ghJvyQlvN8sHwUugCqJ/CsbtUydMIMqRrdlapqtexOQ8z2bYpaoFe0l8qZQngLh/8HgrtqVTXiFxNyjX3nRJOZd+5M2MBuseii0UrX0oZ25M9/Mvhjf76vKuB/B1EY0wwxhMnbcSJqmKMUPoFvNX4LbucXjH66EL1CQqn5lvw211TSkn6xDUBuHidBKXS8XpM1RK9eo0GqqsbGK93e3ZXpZpswNy40yCgHkIJtP26Qhg7lrL18NVavvslVB3njQKlyNRZza0wKmNCS2mBOJVxVpz+a+jsDZgAACE3uBYYShmwLWAJJ3OH9POApnQ0R+hMeBU4BWGUnutogtdmTxS4Jj5DkPKCINHUcLtZPmYV7PfnTKT7bR8D1rlC9A3EMeTIRLmj7opQCN9iaTx+DWb9+RWvVFjzwJEHhvVx6iqBn09DpGpb8K4HB2234dHSCg7b/ENo9QKMaA23thsbhZ2pq/XCX+qYMrnRmVbhXcuXHaHK4KzxyOOBTbZZpvd20CyILOWRfnn7NSIQ/E7AIKkwQflNwwp2Y3KPIy1IX4jxtt+Wsi2VU7dtHOAdbiuEsKDzm8Wvj9Loa2EidlIr8T2ccINJk832VkbYMe0MWCsYOqfzBQfE07Q3LdLaXPw11ZFHoo71Vv2mKrvnkfY6huT0b1bSyGG3pA61DJFV/JNFc3GCTrOXQ3Uy+21IrMZlazzMymxofzOXEA3OblgMsXiQ7Wy6V1m0SRSfvuE6VsBpvzJIcqbdhcLHI1DVdcoweThqLcGUICPXU6zV3JbF3leKyA/rjYbzdIT9yHefye4aEYYR3Q8evNlIW24IAM5HZF+qhKCukSG85bvJE4rXq9V8QvGq5SNyN2NF6Rb5EaIBiSu7ERWCyqKdqWyJQsfRchT9ZKHeM9t49au2Y0jxSRpoxd+nAJzARn2MRQu7gsiltAtjF/Ids0jzjWBE4k5pNtxAOv1hRcYYt4qe//eUwretUjMWf5YX5wBI4uaRhZ8TIM1IsA8dOi1aSsitIOZmCR5N99tnsScQM++RUR+eWVsCimaqVBSW4GWNYtsps83k+g6rYjkaJf8riJX9ZaUImQLMh1O72/YMA0iWboJOkAg==";
var myFolders = [];
var myFiles = [];
var folders = [];
var files = [];
var fol = [];

export default class SearchController extends Controller {
   init() {
      super.init();

      var array = [{ id: 1, text: 'Last 7 Days' },
      { id: 2, text: 'Last 30 Days' },
      { id: 3, text: 'Last 180 Days' },
      { id: 4, text: 'Custom Date' }];

      myFiles = [];
      myFolders = [];
      

      this.store.set('$page.user0', array);

      this.store.load(this.findAll('root'));
      //Custom Date for ....
      this.store.set("$page.visible.date", false);
      this.store.set("$page.visible.window", false);

      //this.apiOneDrive();

      this.store.init('$page.pageSize', 10);

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

      // var pageSize = this.store.get("$page.pageSize");
      // var page = this.store.get("$page.page");
      // var pageCount = this.store.get("$page.pageCount");

      //NOT Working
      // this.store.set('$page.records', this.store.get("$page.records").slice(0,pageSize));
      // this.store.set("$page.pageCount", Math.max(pageCount, page + this.store.get("$page.records").length > pageSize ? 1 : 0));

      //User lookupField trigger
      this.addTrigger('tuser', ['$page.selectedusers'], getUsers => {
         if (this.store.get("$page.selectedusers").length === 0) {
            myFolders = [];
            this.findAll();
         } else {
               let userrr = this.store.get("$page.selectedusers");
               for(let i=0; i< userrr.length; i++){
                  console.log("userrrrrrr", child.user);
                  console.log("userr ", userrr[i].text);
                  this.gridFilter(myFiles,item => (item.user === userrr[i].text));
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
         console.log("")
         if (!txt) {
            myFolders = [];
            this.findAll();
         } else {
               console.log("dita " + getDate);
               this.gridFilter(myFiles, x => (x.lmodified >= txt && x.lmodified <= currentDate));
         }
      });

   }
   
   apiOneDrive(){
      axios.get('http://localhost:3000/hello')
      .then(function (response) {
         // handle success
        console.log("UN JAM BABLOK", response.data.message);
        folders = response.data.message;
        console.log("FFFFF", folders);
        })
        .catch(function (error) {
        // handle error
         console.log(error);
         });
           this.store.set("$page.records", folders.map((item, i) => ({
             id: item.id,
             icon: item.name,
             document: item.name,
             folder: item.parentReference.name || 'root',
             user: item.createdBy.user.displayName,
             lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
           })));
   }


   onZip(){
      oneDriveAPI.items.listChildren({
         accessToken: accessToken,
         itemId: 'root',
         shared: true,
         user: 'sherifilabinot'
      }).then((childrens) => {
         let child = childrens.value.filter(this.onFilter);
          console.log("Childddd", child[0].webUrl);
          var path = "/file.zip"
          var fajll = child[7].webUrl;
          var ffo = child[1]["@microsoft.graph.downloadUrl"];
          console.log("Mic", ffo);
          var zip = new JSZip();
          zip.file(ffo);
          zip.generateAsync({type:"blob"}).then(function(content){
             console.log("Content :" ,content);
                saveAs(content,"example.zip");
             //console.log("Folderr", fol);
          });
      });
   }

   onFilter(obj) {
      if (obj.hasOwnProperty("file")) {
         return obj.name;
      }
   }
   //Find all the files within all the folders
   findAll(id) {
      oneDriveAPI.items.listChildren({
         accessToken: accessToken,
         itemId: id,
         shared: true,
         user: 'sherifilabinot'
      }).then((childrens) => {
         let myItems = childrens.value;
         console.log("ITEMSSS", myItems);
         console.log("FOLDERSSS",folders);
         this.gridData(this.findFiLes(myItems));
         console.log(myFiles);
       }).catch(err => console.error(err));     
   }

    //For finding all files 
   findFiLes(myItems){
      for (let i = 0; i < myItems.length; i++) {
         myFolders.push(myItems[i]);
         if (myItems[i].hasOwnProperty('folder')) {
            this.findAll(myItems[i].id)
         }
      }
      myFiles = myFolders.filter(this.onFilter);
      return myFiles;
   }

   ///Search Button on Click-Search based in description
   onClick() {
      var desc = this.store.get('$page.desc');
      // console.log("Searched: " + desc);
      if (!desc) {
         myFolders = [];
         this.findAll();
      } else {        
            this.gridData(myFiles
               .filter(this.onFilter)
               .filter(x => x.name.startsWith(desc.trim())));
      }
   }
   //Modify the document's name
   onModify(){
      this.store.set('$page.windowTitle','Modify the name');
      var select = this.store.get('$page.selection');
      console.log('Select',select);
      var name = this.store.get('$page.name');
      this.store.set('$page.textValue1','Name:');
      console.log('GGGG',myFiles[0].name);
      var id;
      if(select){
         this.store.set("$page.visible.window", true);
      }
      for(let i=0; i<myFiles.length; i++){
         if(myFiles[i].name === select){
            console.log('NAAAAAME', myFiles[i].name);
            id = myFiles[i].id;
            console.log('IDDD',id);
         }
      }
      return id;
   }

   onChangeName(){
      var id = this.onModify();
      var select = this.store.get('$page.selection');
      var name = this.store.get('$page.name');
      console.log('seee',select);
      console.log('id', id);
      console.log('name',name);
      oneDriveAPI.items.update({
         accessToken: accessToken,
         itemId: id,
         toUpdate: {
               name: name
             }
       }).then((item) => {
        //console.log(item.name);
       // returns body of https://dev.onedrive.com/items/update.htm#response
       })
       myFolders = [];
       this.findAll('root');
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
            myFolders = [];
            this.store.set("$page.visible.date", true);
            var date = this.store.get("$page.date");
            this.store.set("$page.modified.text", moment(date).format('YYYY-MM-DD'));
            if (!date) {
               myFolders = [];
               this.store.set("$page.modified.text", '');
            } else {
               myFolders = [];
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

