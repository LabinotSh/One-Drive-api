import { Controller } from "cx/ui";
import {Icon} from 'cx/widgets';
import moment from "moment";
var oneDriveAPI = require('onedrive-api');


var accessToken = "EwCQA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAZaawa4FKmUkVBX7CFf4ekVbjvK2ZdVXmFGcJp+pRKDPvyG85c9uImg0dialCxD5LlYp5RiuOedTn6T/uuCjUoxhrzhQSXSd2HL2nrjnUZ8TWXisPNoHPmx0jW6pW91f/tqGlb9rkCiDCWM0LJ+/UxN7CAC5AAAtLRF9POaiBDlXXqK1G3KJsaBo2w0GbRqzRsm74K1rN782uwq3vyjIVKDccMtg6qlfE0waGk6m+HbNsZcjc470nfRmbs6culw+8RuTEwqwMtGUijMR+LKwK3YrhhXHRtecUL7PHNw04i8iM+pvEQF+duNTD+27JAHT30Ol01IkrdrnH1DeL6r+qgYDZgAACMnfwF6U9+NhYAK+WdKwVye81AYKALBJfWmFb4t8sE8pTgA6XsMseLwGuOUP+tWKB0/ipTH5uk6Bm+afsXobr5xs+ninUmQexjAK1fuErDxE2yuGW69kBe4xJbbjleJ4eBSkLxLkoaYztG9wcVPtEF8MQ0Wnss3HNXtE2shEqyPl0UQGeOmvXQIc6Fw6Z5DhOeiAVeRaRuXM9jffF1/t3klscpAOvtsWK3hgE13rIP566heWv5tddxwX1vRQOaSX7FgMn/L7B5rqNMJSc9xgMrUOoN/BTPpdcEBFbmtYdKEnFbvLTN4X1JorW4xQZ2KGZg5i5WhbR5uKfcH1YAY4e006V/EtPtYnv4khSlSKGRZMQYL5z3MOtxi97LETreECW3A0u4klnG6JIP3EVLw2AbKApFR/9Dao2oFPXwIqKBNyNpBhLhmWqInp5exQOJHouCTd7LDK5gqUDTJbEgNKbaCSTli8TGpp64vrEAUsiug6b1JQO1tX8dsBvXcHmpNtBR3j8d5RBaRFqyGHJYI0toVxXElWq3/hrRyo6UQUt+FkchOTuiO8tyhIbTKeFYQhPawUkawnyIljSGbF+YbUF/dtKvBZeK8hLJE0kCpyBltbdXpazRszau7ROAUd8qDmwV4HB7NfKikkk1RtjEUIJWccsjjBCQAPpLBEkYPiDlRwyP4lMqey9aQcj0c7WiUFTOEUrQVMgltDwtuhJum9m/VJC4ZI+WXuERREIgNNDafDuSLzH2e7eI5KfypIkXHB+rVtuKbl0KQRhJPmSgXDsgOGb6Zqlos5YobKbrx6Hk3Eapen+d+lxpMeQaQC";

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
         let child = childrens.value;
         console.log(child);
         console.log(child[4].hasOwnProperty("file"));
         this.store.set('$page.records', child.map((item, i) => ({
            id: i++,
            icon:"P",
            document: this.onFilter(item),
            folder: item.name,
            user: item.createdBy.user.displayName,
            lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
         }))/*.filter(item => item.hasOwnProperty("file"))*/);
      })
      .catch(err => console.error(err));

      //  var dataset;
      //  this.store.set('$page.records', dataset = Array.from({length: 45}).map((v, i)=>({
      //     id: i + 1,
      //     icon: i++,
      //     document: "Europe",
      //     folder: "gg",
      //     user: "OS",
      //     lmodified: "2"
      //  })));

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
      oneDriveAPI.items.listChildren({
         accessToken: accessToken,
         itemId: 'root',
         shared: true,
         user: 'sherifilabinot'
      }).then((childrens) => {
         let child = childrens.value;
         console.log(child);
         // child.lastModifiedDateTime = moment().format("YYYY-MM-DD");
         // console.log(child.lastModifiedDateTime);
         this.store.set('$page.records', child.map((item, i) => ({
            id: item.id,
            icon: "P",
            document: item.name,
            folder: item.name,
            user: item.createdBy.user.displayName,
            lmodified: moment(item.lastModifiedDateTime).format("YYYY-MM-DD")
         }))
         );
      });
   }


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



