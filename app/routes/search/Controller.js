import { Controller } from "cx/ui";
import {Icon} from 'cx/widgets';
import moment from "moment";
var oneDriveAPI = require('onedrive-api');


var accessToken = "EwCIA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAQ4D5/OP7ghXATaRzENxz3gLsjJNzoN/7tEGTLuDUcNLwTe5MZ0rr5Xxp9xjRGpbYz1HUNG5ZubfXUyVPcJhVBJs9L3bfq5HWIymN/+aYHaq5QW9aL59Ut87Xt8EnexDwRId8GvuPg0PPJfDw7rLMWB7GK/InDQdP91IRI/od0SsNdLgttcF+i2F2F3k51pw/l59roDgBZaW5a7JczyWfqNo/TKguCkOAJFJePhEc24uIo4srnkDmY9ZSJEEkOc7oRgHz+iGoVwpYgELnioP9+6rg1kwL5roXxg5aOXYp9SsVkPYQhOB0bHJqBF/3TB4R2VZWoA657k0f/cTMXh50TYDZgAACPQXGhaMPauvWAL3KRXtd/KuoCbvCnDFOx3WA3diOE40g1Bhkk4VHPGtjyJkX8GDVm9BmIY3V2gVOgDT3CFKvtgelyH8W8kU3brUaqUvJp4S8/lClY++MmIEPXG0z/nTTAIFpb9jEfNdVDvjYSA2pficujjBZOxaTg6CFMu1m0lN867HWAkgJHYqZgzXvYg2CitlaAHvUuu/tDdn9ktcaTnXxoRVwT0DPeqan4vmdhSPGFc0KFMIzW17tnj2vYF7ph+5m3kzXAWKJNzM2mbNUxIy6MPtP6syVeedoimp0g1fThQQBfOy8gOz1ogHigJ9i/mDGbZnXo1CxaJmRWsXBqnsyrCbMaOxjc339UDFc5GJUKe9NVvgpkXDJJK5nk6tjQxqkvlfKYcsXe56bNwThp8+viQpMTxP0OyM0hLA+Qhv5GI+TGUrK7Bh33TZft/5ObxAS56wqksMt8nx+OSiq351Vtsdvv6B7LZlWKtUrS4v3l0CdKqvGtAZ63Icu+7JOxVOYV/ty+QbxwGdRHbEGmY9qBIqFTivFVnrkMsHbCDGomGJz8umP35IN7yXf9QjN21lTNLYlKYVdMiuQ5UfewB/TUKmJzTdtV5Mub0OiQrbKAiUXEv2Z/hERrN1vqZRLchQJ8Y3fn83WdDST9X1j9mXCZSF9QDB87ZblU9dhLK2qL0BQEBw1kZwI6JpmZdojCwKkW5BxuH03V7FBB+mQK/hF3elDTQOF15JRls93qoKQl2M/FyVXHh5vrZQWVhyIMmZC0o1EaH6UuqlNz42Iex/QzHFmwGTMToGE2NjpADncnGkAg==";

export default class SearchController extends Controller {
   init() {
      super.init();

      var array = [{ id:1, text:'Last 7 Days'},
                   { id:2, text:'Last 30 Days'},
                   { id:3, text:'Last 180 Days'},
                   { id:4, text:'Custom Date'}];

      this.store.set('$page.user0', array);

      this.store.set("$page.pageCount", 5);
      this.store.set("$page.page1", 1);
      this.store.init("$page.pageSize", 10);


      oneDriveAPI.items.listChildren({
         accessToken: accessToken,
         itemId: 'root',
         shared: true,
         user: 'sherifilabinot'
      }).then((childrens) => {
         let child = childrens.value.filter(this.onFilter);
         console.log(child);
         //console.log(child[4].hasOwnProperty("file"));
         this.store.set('$page.records', child.map((item, i) => ({
            id: i++,
            icon:"P",
            document: item.name,
            folder: item.parentReference.path,
            user: item.createdBy.user.displayName,
            lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
         }))/*.filter(item => item.hasOwnProperty("file"))*/);
      })
      .catch(err => console.error(err));

      var pageSize = this.store.get('$page.pageSize');
      var page = this.store.get("$page.page1");
      var pageCount = this.store.get("$page.pageCount");

      //this.store.set("$page.records", dataset.slice(0,this.store.get('$page.pageSize')));
      //this.store.set("$page.pageCount", Math.max(pageCount, page + (dataset.length > this.store.get("$page.pageSize") ? 1 : 0)));
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
        this.onSearch();
      }else{
      oneDriveAPI.items.listChildren({
         accessToken: accessToken,
         itemId: 'root',
         shared: true,
         user: 'sherifilabinot'
      }).then((childrens) => {
         let child = childrens.value
         .filter(this.onFilter)
         .filter(x => x.name.match(desc/*.trim()*/));
         console.log(child);
         this.store.set('$page.records', child.map((item, i) => ({
            id: item.id,
            icon: "P",
            document: item.name,
            folder: item.parentReference.path,
            user: item.createdBy.user.displayName,
            lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
         }))
         );
      });
   }
   
   }

   onSearch(){
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
            icon: "P",
            document: item.name,
            folder: item.parentReference.path,
            user: item.createdBy.user.displayName,
            lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
         }))
         );
      });
   }

    //not finished.....
   onLastModified() {
      var sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
      var thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
      var daysAgo180 = moment().subtract(180, 'day').format('YYYY-MM-DD');
      var currentDate = moment().format('YYYY-MM-DD');
      var text  = this.store.get('$page.user.text');
   
      oneDriveAPI.items.listChildren({
         accessToken: accessToken,
         itemId: 'root',
         shared: true,
         user: 'sherifilabinot'
      }).then((childrens) => {
         let child = childrens.value;
         console.log(child);
         let date1 = moment(child.lastModifiedDateTime).format('YYYY-MM-DD');
         console.log(date1);
      })
   
   }
}

//not finished
function icon(){
   oneDriveAPI.items.listChildren({
      accessToken: accessToken,
      itemId: 'root',
      shared: true,
      user: 'sherifilabinot'
   }).then((childrens) => {

      let child = childrens.value;
      console.log(child);
      if(child.name.endsWith("pdf")){
         return <cx><Icon name="calendar" /></cx>;
      }else if(child.name.endsWith("docx")){
         return <cx><Icon name="calendar" /></cx>;
      }else{
         return "something else";
      }
});
}



