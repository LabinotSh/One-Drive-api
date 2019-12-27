import { Controller } from "cx/ui";
import {Icon} from 'cx/widgets';
import moment from "moment";
var oneDriveAPI = require('onedrive-api');


var accessToken = "EwCQA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAUW6zyPksvLVKrmYfhA99HrMIBGAdbp0qFtVbA/lrK3B3vTR2idEKDHZcHb2UqqKp5qHoki0utDa3Vie8J8rhj7r9iVw3MESuKU6hUtV/H+N4/OInThYZxVo2AWaHCQZii9Z8KXzedE69Lw6zIdKcoyZUdpp6c8A5bes/90uSnIWFqr4tdG7dyKD7eXHhTsU592hi7Rb4OjLNaCOsQXjmhlzH0Zl6n9nmaR6WzO8gEbIlQ8n8+10lmEmsIXQ0cizderMf4rR//cLQxLOvQL3pkfgDhbkI6Jm5w1R0pUQSc0ockTKI0l1TuUBY1k8IhE4CMIV/bH1ogVmc7IKKDGeIxUDZgAACHkd4Tr/VSfiYAKtYpz2fGLjmkzUAh6Jk5IX0/UPQvfOTs2wa2M0JZ3HwQP6kJkE1L7+r5iuY945Vlqto/QsaNvDv/qNfuq6o8NQ4vPFsbD/jIv7Zh3Py0Svk1/kd3Ob0zcl4cNW0DAI7Nx9NfVBeMxQH/7FuT/H490NYcBtOcuY7bd63dcwuEkKtsZ/x1eGRz4KBbpZUBG+Wg7SYktKv+XATNrRJV8lPKkWAHLikHQSjSfCLclWzBtvM9IueyMxzt6YQbFo5XkBCwEVMxJEcYZMvtP9vYcIv4upCH/FnUy9mFs3qOPoCSGRnqG30CPcU9k0o8dianzxVPbKFCufw/7RITk05QOlcsUE70sB66DQwYBkU4EgRsT1/bDLjY7rIHunp64bUnsXtsHHKfJbpM03dNeh/e8XBMXcV+v12x8RrrBJ8bRNWel94BBp2af1FF6nZ+0/FdTblTHgaU30RpdjgvR9sogiUVwLRatqMaWuOmEFey0jk83D3zex9UVFDDutLKpvowKNie/sVBJL+IgCAn95x4U8k3IEOUEjyew9o5Yz0IjAfXImymfGeTrGh2sFY5CZ5WLc9Wipmkgk85hl3UBnhb/7PCjpz6X9vgna4nSQlczZlU4AE3XvD9sLk8urF7b3dDpdbSXwY0Ku3fG8lCc3IbsMMzSWevXFTV2F68pc+ooQi4Dg9rukLT8Fnp4OhQLbtsSlNkx2yCUBK/4zyaveC13T4iQLvrYdhUMnSGZjo5XvXvGYa2TkrJwQLFaHr1Wl8R/Ec36uBBfmmeTzQb/qnoyIhYQP/gPtTIZX5w4oebL5O9CHtKQC";

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
            icon: item.name,
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
         .filter(x => x.name.match(desc.trim()));
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



