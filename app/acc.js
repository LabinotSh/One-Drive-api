
var oneDriveAPI = require('onedrive-api');



const accessToken = "EwCIA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAREZU+y6VPUBPCzFcyq3KTXCtgMocRxV1RpYYMPWV7Fl+FSKv5eeqkIfntMw74f1/ibpIlM+QFOyYsYDxdYtuz9GRdut1kquMc0LbjefyudJBMAtlWUFfd6HatUNcasHFoz4CGDIaZw4vnKY/rXtRYiXSnOO6CKL4CQZ2+khjX6nEnGfhrc74SxBxRpMYb1ToP0B0+62NBWxuuMtTWUNE2e9RygCVlOimT/WUUJMTdh877qMMfNw0P3DzPvoaz34OmYvIOH1/h+TPC2zNmkAj1mei6AQ5wAtIulHpEiIVWNP8SyMRjz2wvUgd95D+GKeNntAoQi1wrWaf7zsKJHhlz4DZgAACMGtvnAH/zohWAI+Usj8ssYWs1Ts+C5A7Mqix/4DTE/0ALMnDohRA3hdfGx6T+Q18uQrqGWfqPfHOfRL9NtQmvJs/x+Yw5GWRgZ0OxzW0k4vpND0H3H3D6oxZWuG46HtjC1Yhr8cr22iCb3/lhrqlpSPRs6wrugK3K8yOYusvmWMqRsLlAEZkwX+qkxa81IookneDYVzPeMZO/BEco1JyAbhKx9G7+2ZG7EC0i8gtkH4RZi/VW50SmKyqb6MG17aeyWg1GvjMOCLsJ86xsickxOwqqjkPWKxxUEKgcKTbUIw92iL6HJqeoJj+3Wff54LgJKh0G3PHgITbPEsgtrcFaDi8uSk8/8UThD3lwGBPhFwz4t3+RTobjOMeh/OyqFr0ni7Var5+1Ut3vMo2PPh+XziHvFkqjzpuB8j3WdMUpbQHYXpUsR5T9Cl3186sGFwvaNhGdzijggabq6WYusOtqRgJJFvvjoCtA2A9kjkW3M21zauMPJj66GyG25SfyLzyxDdZZ/k2UlDJ1BDIM37tZ9Fxq+wpRh/DE76O2wSE1JOaTNUEy0znyBpWK9bxpNWBhCS/HkRK+Tt478d2tWq50w/xXYuy/bBZQmt/PI+R3b09AkjU9zqKtrBxQRGPjzsCE1UNyQ7VLaV8qhzzd9bLToxDjvj04CnzLULmeTKGSfAZnQw2+PkqXV+757Iq6eEykKYphjUrpoxEC7JnVC1KEwPWB0vmWrVxejAA3skKeuvM3NLePklz2AyNSmUnOz1gRGciOBhbMxmY7rwBY1NlAVp46YwPLhIlor+cEx3RbIavdmkAg==";
//oneDriveAPI.items.createFolder({
   //accessToken: "EwCIA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAecEKB/EcaM8J/slDLfXF7PhD0ItjDHUi26uf9ucAgYtgHih7K7xSxpAlkafxZ+O0HN6yMc79xRggwwBA0UTt4TGdm/qp19Vm/ltFDle8zsWKMc7jd/sA5Gi4dNDnbmbNt+dgDJubIJOdXhO/ZVqFQcrcGu4MoyMhJ3HXpMS87KacFgP1+3USj8/I7N7fAtrXvnlZcymnNPuqSmIKa8li0a+t/6reslXXsCrPEwMu2tBxR4SD89E3Bw9a+LU6DUwuYo+daECRkgMKODZGV+rEX1GUaXWeAeCH+CqB7sgpTkR7qggQVZmSpi4JZNgtLmj3B7Llbog56vUJFg6dZP2WDQDZgAACEqk96xH7/R1WAIMdIgr3l1dcDgVz/FqbRWeaRE0i2Y5tmFxPmnMFe8LV+ILXwaj5SJf+rS5P4xlEjhCwT33ljcgCwC044SVjE5uwDRRGDcya4YKcoLs8kZArrIL0TE6E+/cU2gS0nnxbCy2JdntZWXGgFXEloX1synEuvYZveq9v5y6DtdON/HNgGNGkn3DDKGKnGf/B5IOsmglsqNhx1dJs2YNsbVACJR7167xPe7+YQNDlUHEOF86O0aaqUwBpFip6MdtCA5fr9DsgxPZH1CDrz+ngB37E6EaaEVoAHGVP7l1jm74UyNCRtA/wkaKl+j5hyqNoBToTJjDBSJsZ+0jikp5P93BF/zPDEItdCUjgaJfz/J0A03HVtKcI7oPa8aMbxTQp9oKdwPCr9Crgzj7bQzzuAIdYK9A3bP0q/GUsVSXU69rq9d/W1I+k33RTj7tdQAKl8rLSAb/dTJv/SR9i2FM7+aV17Hr41cY3lPZ6k+vhpnU3jo7IJI6O6DpmTXTm9VLc0rFlQNQcLJg1b8cnReCaF11qhP4homG2bdiqbuotyambHqgaS8W8IImZYtOLHYY0/LcQ8wcaTm2413ReGwRqghgFW5ElHVBLHXczLAifFp45eyx1KgKPs6lugknIp6vTJx+FyGQJo+0U6BQ/IOHoWjn5ZXby5BsQcndubOAwuA/cBLzFuibJXpeiuXPWovkxWh0TYiSLZStOAqglciz2XhyEfJkhvSOsdStljgaqhtCkl8Fr2gBt1CL5JlIZPHkIXr40BJArix92Ja/lbHQxZv/eoj4oxUrQHGfNaSkAg==",
    //rootItemId: "root",
    //name: "NewFile"
  //}).then((item) => {
   //console.log(item)
  // returns body of https://dev.onedrive.com/items/create.htm#response
  //})
const getChildrens = () => {
  oneDriveAPI.items.listChildren({
  accessToken: accessToken,
  itemId: 'root',
  shared: true,
  user: 'sherifilabinot'
}).then((childrens) => {
// list all children of dkatavics root directory
let child = childrens.value;

console.log(child.length);
console.log(child[3].folder.childCount);
for(let i=0; i< child.length; i++){
var filt = onFilter(child[i]);
var searched  = onSearch(child[i].name,'w');

//console.log(filt);
console.log(searched);
// console.log(childrens.value[i].name);
}
// returns body of https://dev.onedrive.com/items/list.htm#response
})
}

//Working
 const getMetaData = () =>{
  oneDriveAPI.items.getMetadata({
    accessToken: accessToken,
    itemId: '369E0F52BC317579!102'
  }).then((item) => {
     console.log(item); 
    // returns body of https://dev.onedrive.com/items/update.htm#response
  })
 }
 //getMetaData();
 getChildrens();

 function onFilter(obj){
   if(obj.hasOwnProperty("file")){
     return obj.name;
   }
  }

  function onSearch(obj,desc){
    if(obj.startsWith(desc)){
      return obj;
    }
    }   




const getChildrenOfFolder = () => {
  oneDriveAPI.items.listChildren({
    accessToken: accessToken,
    itemId: '369E0F52BC317579!103',
    shared: true,
    user: 'sherifilabinot'
  }).then((childrens) => {
  // list all children of dkatavics root directory
  let child = childrens;
   console.log(child);
})
};
//getChildrenOfFolder();


function icon(){
  oneDriveAPI.items.listChildren({
     accessToken: accessToken,
     itemId: 'root',
     shared: true,
     user: 'sherifilabinot'
  }).then((childrens) => {

     let child = childrens.value;
     console.log(child);
     
     for(let i=0; i<child.length; i++){
       console.log(child[i].name);
     if(child[i].name.endsWith("pdf")){
        return "P";
     }else if(child[i].name.endsWith("docx")){
        return "W";
     }else{
        return "something else";
     }
    }
});
}

//icon();


let child = [
  {
      file: "dmth"
  },
  {
      folder: "folderi",
      file: "file2"
  },
  {
      file: "file2"
  },
  {
      folder: "folder2",
      file: "file2"
  }
].filter(item => {
  item.file === "dmth"
});
//  child.filter(item => {
//   item.file === "dmth"
// });

console.log(child);





// oneDriveAPI.items.uploadSimple({
//   accessToken: 'EwCQA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAdd4La/uPPImTVEA1BXC6Hkddt7Aq1fS8RHLeE76EVRx6oyPtRx7RCWyntEey37I3MAiptGRg2rRUbhQ0WRZq8B9CZtsZfb+9yjMss8MJlfzTo0cJXjj+RZ2Xhhs1EdoB2mNP7MUvTJS5jFULsDU41KHfcjcq6T5nHyxhD65Y4Ie9wHy70dMZnvGvI9h1OPCJzp3s2PTYg1vD6nuav9qcUocGXP01NGVz/jsEJxPNbsZV/zIZZQC9tBieMFuyS6d39ly0M7K8WfyJRLLAHuLgavQHkyExvhRMBzitr85rT3+DlrimsZth1eGRd5tPI28trEA/SHT/vg2yTVski9EMQYDZgAACGy7q6jMOCx8YAJTyJsrdmOwOVzRgsBPQMtCK7gpEAL+houDfMJrphp0HdeEVRlgN2SgtuIMjimw3JGvUNpw0lYhddzXIuqPdpyZi8Ol+eoiLkD+ehvhaFpKvr4PNS13SxUagDcSyKaiRjg9/JpqeP7hU+EBvEJF1fJpq+dLC64wX2jZESs92vTJEZLFjfxVUzkHOWhPg2I7gHQUy8mtk9onw14rNnlLywlqzA5fGJbw+rPBnpd1ct0tAvMcF3DSHMMq3nCXdqoNm9jYnajbkqxeBlrlwhD+tzChD+6NGLUyE9mxix/gfHUtnB3KgkSaZIhb6M049pOp/bfTS3yLjLYiJKAbGb2dfHgBLtZmBMPy8l9LaTFuFDSEApM2vX+MrZ53HvWfSyby8oOsAS3Oll1Rp1L/lEwYdMVDs4zqA+dh1vplRSWYARx/HXGI/BzR+jigG4OMMkHG/RSk/Z+FJ2v97BO4r46ridvCs5JxAlUxA2WFyy2GTv+KYd7ZHNhzqVN/XKgEGiX0vR2iZvEpQo1m4B5/CMiylWVAa2Q0kqe0NNWjOa5eqYgJYF+dLpunSts6qaFpYyGmaTfnAscINpz69Bz6BA/hl9a6yIqYwphe4rIVHNuZCmngtX68WTdADNbXXN+9UjcUHL3trYFqx6HzwnFXACZys2mXig3s69fwZLHYSWImtvp2hGT4UsWoF2XKTmB9sn8iOdcNVY58Ip4+h6yvNgiyxMsxCBrZQD733tJLifyVZ4CrBOTXuDMG+Q0fOvZbw2o5Pwj8A4QLgVUGn8bny7UMqX9ua26JMpjYgV6+nVrP/jdGV6QC',
//   filename: 'welcome',
//   readableStream: 'C:\Users\LabinotSherifi\JS - workspace\One-Drive-api\assets\img'
// }).then((item) => {
//  console.log(item);
// // returns body of https://dev.onedrive.com/items/upload_put.htm#response
// })
 
