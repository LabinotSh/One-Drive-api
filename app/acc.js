
var oneDriveAPI = require('onedrive-api');



const accessToken = "EwCQA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAUjBqjsOP7zr+pbAYluIXz6qSJpua5XXFYAV58KyXvrcJE/LJ5MvGENHXUOaoUTXzj7e4/3M9S3XivNVPrc3hnoV+fA8vOTmFKsvaFaX49Zcros4Ljf9DzFtzKSg7CVRliCHb32ykrtdCnxDQU25h7cx7J2TQpNC0kM1BfJAc+lmHBDQmNchEHuKhAwBiA8IJZIrqRJ5spKKpqDz4FG0y/LO3zZIoYJeUZnldtxxUk+mAjXL8KhhDQ9JcaBGWgg8zUNmOhSG/lpoH62oeGl938P/4mQC7LPYRgr+KP7EYR+qtAZEnJUdI978g8UOVHRZf3V8VIO1hqdEy1tVHkv4kzkDZgAACF5sv6hY6X6yYAIhBq9X/B+UgjkFPmM/ROAn2kAl+hymqcEpuq8NPHqX/rLW1LEGzFH9PqKiImPI9dFhtzMRS+h2ribpCsqDbdZr1i8IIV9NcFsCEwSzD1tqWCDkg7ZqgwTq1O2zsrK8EbmGXDb8ajraGptdYD0YAAyrZtviTtkphybsWkC7RnIusNwzcV0drZsN2VbIGsK6B5o7FXtKuTPtCPvmIQYBf5q4sn2l71V7jfRCZCpOsG++xNdDN5r6PE946+07BULxkqOUS6b48xtvzcE107G29KF63gLSpnrhY80QOIY0dU8aiAf0sAunIMyH2omo7qKTiodVPocB/vamhm1P8LfYCKT/oa8bwJC7dD4r0jA+wiZTQhqVpKSEH4hlv80jm+lb7By6rbiDpWxKtVarvJ3fqUHFwFy7OmMeZ+RuvYKZ2nDDNOomukXFwrbfqbBkSumveWWEgvUj2rCPxUJEW4JoMFa9HYGYL53Y31FOZxClF06XvLWf2W9TpEqaKTVKOXvXzoZEasVhsCPxCNVw4HAMnEkdyOTb247SgCehnxdooWOBDOgU6cllsYlENnXD/Qn2Ikt7AetOcPpBy5f2QS6JGtkBGxG937w7oleMhtGS1ZelVFdp08hmHODCiZoPipnGM9+NjyeXr2vgkbQbSHW60pDrpUEQjC8hD0d3NUjnAlS5pOVmTlUcY0pTZlbiuNOdR2YwZe1zvxuyOfTzOhOt45/+UyIUtWR5kRWZ32dtpy6ERTzu7Tny9uCTkes+yIRaAeUy/tgmFVA2hWLqYqjRIs5zvjC98x7TGM/CU/j6nL51TqQC";
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
for(let i=0; i< child.length; i++){
var filt = onFilter(child[i]);

console.log(filt);
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
     console.log(item.createdBy.user); 
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
        return null;
     }else if(child[i].name.endsWith("docx")){
        return null;
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


  // oneDriveAPI.items.delete({
  //   accessToken: "EwCIA8l6BAAUO9chh8cJscQLmU+LSWpbnr0vmwwAAVkvVhdqsDBzjaqxdRn3RNT/M5PWW+QUlNi+ptwxazn6JYOOK9rMyCBlEO1gdCYrkt32ghecgwr2o1eKTZMe1YFmsZoIY9qqLoCA5gbPW636f7oCVQuaf1a6Wv0L7kvOVx10IBdr9gP44rLDbAwMVYE7POSQt1+N7AzP3RvrjbouJ4thwmzthih3adF3q+1hemPiXotdSDKXmFdin/vSH/9WFdgCywBnEvoDGWLijWtxneDv7u/vi2mCOcZd6xP/qtHi4TGzTx/K1Y7+LG3n/lzHsLTN7unHUQgg6cWZ4mWwx4N4JWqBBH7BnlVBzK0xO66ZLM4czK4QS9nhIqDKHogDZgAACKTC5pIDzWcpWAID7/0p9y4gfXg8Epsgvhi4OkmyPyanJY1mqmW2TRI3UdqTZGgafdXw/Uz5P7n2XzQjDc1fxK7c/GghTwdx1n0W6ZMD73kGWSkXJEEtITBL3lvWJ+g2T2F/VTuf/6LTxJtrpRRcPQswtoaUFKiBQ9CZxhnOoSbsN/ehyZ9hPg/oPBBc207YnQeEF5u27Jterc+LWRtvjzBZLoXmSiIi8CHvNahvUYh9Qegr937CiO736wYtxRkXq6YnyjjOF/3peBdfxCJjHMhnU3sQBTsil5rHakY3hhjiEUDVWBWTYpATYa0R1vjpEatyMd74WwIRiKEOfSWPiw8VSwzjJPUOBT+39f2PrZWOpuJzIJGOCMGdo2M1LKzznJtMV6WKyCZIQeeI2/fOusrfLmNZJYBgztzTj618ed/hAM36pcXIAurhlBXkIkmxLGZFiMnzp6AfSFk1ALHOUek4ui6VBVd1dOAgUFHyoNLLzuzNGUXmVOwawLL09S8nOhahC/RPVLsjqauQt+LRqv2unRsDjHeKOpaq9RFQQcY5JlZSDdsommFja51XGHbVA9NJhXGLme8RzLWQp4SkUawj3NlfpZMYwCYkuOCJGtfy59ut47g+aWjyG58QYbW46so82tBZ4zNH1UsfeAaK8DUoOXba7btUVQCHPdhN1XOTAWZbp7KfSIBo0vTMXgQUlAZ/+drzYEZCZJA28NODM4FvSAzzT3B/MSt221yEfz3YEzXcUA5JFUoXZV97kstLHpOwp2d7NrkpRrissbpAQJUyIeOq7TrqrON9fVGvw5bV/uekAg==",
  //   itemId: "369E0F52BC317579!109"
  // }).then(() => {
  // })