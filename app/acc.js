
var oneDriveAPI = require('onedrive-api');



const accessToken = "EwCQA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAVEiNZtpjayGvwD2/bknr+ClJUKU6esoDA31O0L08lx9YJmwClLgHZwJ1eqUodwYbp2+iViBvjpoLq53MPYYy5GdJwRJRY9XGsHBJWsVvT6GTBbGU9mqQ9vkbp6w3tb32yaOxoGOUg4V0iftd3sG/KYjovGX/FxvFg6RT85kysXsYvjvVyYwbtXtp8uEORvupWOcgcDBHDHTCl7+TjhJp6MQVA6nzzP5X3uwy03YDsKIg8EDf9Zs5791bLIIN2GYs15ZncBKpsCr/AL/La/eWCrCJ1e/CeJlYkn876GPVD1JkmbWMTtufo44QzMKaugBBtAdLCvCMKSkwGAXwGHCYAwDZgAACAdsdjHqse52YAJX33PEo1gUuaW9uig4DZwso9IPIf/VAE1f4ZW/a4m0hbdmDfOB+GEoasFTMA9RRT8lwIkIb1NVFoDkgu86sgOPo0NeHMCUD4DLDrwpBbTre8H87WuHWFhLfPi2nKmyWy5aCRzJ0g5oesfk3BklUvqHibd0tIKi444wCVebcniAabB7kXs4X5qJk1L+SikGuS3cvo4bDY59hhfR7qeonc+KgDiOx6QlBYZVQYYjxztvq7yuMrYkvx3iyER4WAEfWv5wnwhEZduI+WeuVz0QlncJ0xigGrOk+MWXVLrL9nraFwt76URMpb0pjPcqu7/ao0p49IhQEgow3tVakDjcoa3eDtXrGva7BDNzS/zXgSuzflrn66ShLKgfekWUVaczxFJJYzXdYaI63Kz69KrWkYRyjjknUmLo+TdyOK3BreeXEiKfbaaoGfDTTGazVF3kUWHbtzbniydoWU38hKk7bvlVE3B/ezxt+nZ5R39afAa4YNz2lfvvegYkETxIyvzOv0m6Om4PXpXS4uT6mek3TQGz053AlHx8mk+exSjNGUbltqVcTyoOdOm2dJjsZA37m+Rkd45LkZ+e1FTg1q2IRGW8MP4ziVJKuTgk+D4KqTpp81LILlAnSJGnhWqTvwnDUF40Qkf1CcgTULqQjZapTzO684Swy6Y2fsM2yt0QHGBJVWe4mcUoDAKGkPberYSfvHrIY9IVchUWF+8wF+zkU0V6pOMNDLsDfFTjC20we0PFMdQEYSsGxaLEu+b4oDlDrcgh5M5RxdPoSeOXlReHJZZCjaiSPRj42bDrj48/lJcrjaQC";
//oneDriveAPI.items.createFolder({
   //accessToken: "EwCIA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAecEKB/EcaM8J/slDLfXF7PhD0ItjDHUi26uf9ucAgYtgHih7K7xSxpAlkafxZ+O0HN6yMc79xRggwwBA0UTt4TGdm/qp19Vm/ltFDle8zsWKMc7jd/sA5Gi4dNDnbmbNt+dgDJubIJOdXhO/ZVqFQcrcGu4MoyMhJ3HXpMS87KacFgP1+3USj8/I7N7fAtrXvnlZcymnNPuqSmIKa8li0a+t/6reslXXsCrPEwMu2tBxR4SD89E3Bw9a+LU6DUwuYo+daECRkgMKODZGV+rEX1GUaXWeAeCH+CqB7sgpTkR7qggQVZmSpi4JZNgtLmj3B7Llbog56vUJFg6dZP2WDQDZgAACEqk96xH7/R1WAIMdIgr3l1dcDgVz/FqbRWeaRE0i2Y5tmFxPmnMFe8LV+ILXwaj5SJf+rS5P4xlEjhCwT33ljcgCwC044SVjE5uwDRRGDcya4YKcoLs8kZArrIL0TE6E+/cU2gS0nnxbCy2JdntZWXGgFXEloX1synEuvYZveq9v5y6DtdON/HNgGNGkn3DDKGKnGf/B5IOsmglsqNhx1dJs2YNsbVACJR7167xPe7+YQNDlUHEOF86O0aaqUwBpFip6MdtCA5fr9DsgxPZH1CDrz+ngB37E6EaaEVoAHGVP7l1jm74UyNCRtA/wkaKl+j5hyqNoBToTJjDBSJsZ+0jikp5P93BF/zPDEItdCUjgaJfz/J0A03HVtKcI7oPa8aMbxTQp9oKdwPCr9Crgzj7bQzzuAIdYK9A3bP0q/GUsVSXU69rq9d/W1I+k33RTj7tdQAKl8rLSAb/dTJv/SR9i2FM7+aV17Hr41cY3lPZ6k+vhpnU3jo7IJI6O6DpmTXTm9VLc0rFlQNQcLJg1b8cnReCaF11qhP4homG2bdiqbuotyambHqgaS8W8IImZYtOLHYY0/LcQ8wcaTm2413ReGwRqghgFW5ElHVBLHXczLAifFp45eyx1KgKPs6lugknIp6vTJx+FyGQJo+0U6BQ/IOHoWjn5ZXby5BsQcndubOAwuA/cBLzFuibJXpeiuXPWovkxWh0TYiSLZStOAqglciz2XhyEfJkhvSOsdStljgaqhtCkl8Fr2gBt1CL5JlIZPHkIXr40BJArix92Ja/lbHQxZv/eoj4oxUrQHGfNaSkAg==",
    //rootItemId: "root",
    //name: "NewFile"
  //}).then((item) => {
   //console.log(item)
  // returns body of https://dev.onedrive.com/items/create.htm#response
  //})
const getChildrens = (itemId) => {

  if(itemId === 'root'){
  oneDriveAPI.items.listChildren({
  accessToken: accessToken,
  itemId: itemId,
  shared: true,
  user: 'sherifilabinot'
}).then((childrens) => {
// list all children of dkatavics root directory
let child = childrens.value;
//console.log(child);
console.log(child.length);
console.log(child[3].folder.childCount);
for(let i=0; i< child.length; i++){
var filt = onFilter(child[i]);
//var searched  = onSearch(child[i].name,'w');

console.log(filt);


//console.log(searched);
// console.log(childrens.value[i].name);
}
// returns body of https://dev.onedrive.com/items/list.htm#response
})
}else if(itemId !== 'root'){
  
   
}

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

function getFolders(obj){
    
    if(obj.hasOwnProperty("folder")){
      //console.log(obj);
    return /*obj.name + " And id: " +*/obj.id;
    }else{
      null;
    }
  
  
}

const getChildrenOfFolder = (itemId) => {
  var child;
  
  oneDriveAPI.items.listChildren({
    accessToken: accessToken,
    itemId: 'root',
    shared: true,
    user: 'sherifilabinot'
  }).then((childrens) => {
  // list all children of dkatavics root directory
   child = childrens.value;
   
   let ch = child.filter(x => x.hasOwnProperty("folder"))
    console.log(ch.id);
})

   //console.log(child);
   for(let i=0; i< child.length; i++){
   var chh = getFolders(child[i]); 
   console.log("AA " + chh);
   }

};
getChildrenOfFolder();







// oneDriveAPI.items.uploadSimple({
//   accessToken: 'EwCQA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAdd4La/uPPImTVEA1BXC6Hkddt7Aq1fS8RHLeE76EVRx6oyPtRx7RCWyntEey37I3MAiptGRg2rRUbhQ0WRZq8B9CZtsZfb+9yjMss8MJlfzTo0cJXjj+RZ2Xhhs1EdoB2mNP7MUvTJS5jFULsDU41KHfcjcq6T5nHyxhD65Y4Ie9wHy70dMZnvGvI9h1OPCJzp3s2PTYg1vD6nuav9qcUocGXP01NGVz/jsEJxPNbsZV/zIZZQC9tBieMFuyS6d39ly0M7K8WfyJRLLAHuLgavQHkyExvhRMBzitr85rT3+DlrimsZth1eGRd5tPI28trEA/SHT/vg2yTVski9EMQYDZgAACGy7q6jMOCx8YAJTyJsrdmOwOVzRgsBPQMtCK7gpEAL+houDfMJrphp0HdeEVRlgN2SgtuIMjimw3JGvUNpw0lYhddzXIuqPdpyZi8Ol+eoiLkD+ehvhaFpKvr4PNS13SxUagDcSyKaiRjg9/JpqeP7hU+EBvEJF1fJpq+dLC64wX2jZESs92vTJEZLFjfxVUzkHOWhPg2I7gHQUy8mtk9onw14rNnlLywlqzA5fGJbw+rPBnpd1ct0tAvMcF3DSHMMq3nCXdqoNm9jYnajbkqxeBlrlwhD+tzChD+6NGLUyE9mxix/gfHUtnB3KgkSaZIhb6M049pOp/bfTS3yLjLYiJKAbGb2dfHgBLtZmBMPy8l9LaTFuFDSEApM2vX+MrZ53HvWfSyby8oOsAS3Oll1Rp1L/lEwYdMVDs4zqA+dh1vplRSWYARx/HXGI/BzR+jigG4OMMkHG/RSk/Z+FJ2v97BO4r46ridvCs5JxAlUxA2WFyy2GTv+KYd7ZHNhzqVN/XKgEGiX0vR2iZvEpQo1m4B5/CMiylWVAa2Q0kqe0NNWjOa5eqYgJYF+dLpunSts6qaFpYyGmaTfnAscINpz69Bz6BA/hl9a6yIqYwphe4rIVHNuZCmngtX68WTdADNbXXN+9UjcUHL3trYFqx6HzwnFXACZys2mXig3s69fwZLHYSWImtvp2hGT4UsWoF2XKTmB9sn8iOdcNVY58Ip4+h6yvNgiyxMsxCBrZQD733tJLifyVZ4CrBOTXuDMG+Q0fOvZbw2o5Pwj8A4QLgVUGn8bny7UMqX9ua26JMpjYgV6+nVrP/jdGV6QC',
//   filename: 'welcome',
//   readableStream: 'C:\Users\LabinotSherifi\JS - workspace\One-Drive-api\assets\img'
// }).then((item) => {
//  console.log(item);
// // returns body of https://dev.onedrive.com/items/upload_put.htm#response
// })
 
