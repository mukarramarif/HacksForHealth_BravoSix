// Name: Selase Dzathor id: skd225

console.log("Server Started: ")

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(
  path.resolve(__dirname, "public")
));

var data = null;

function createCards(res){
  let cardList = [];
//   while(cardList.length < 10){
    

//   }
//   const ret = JSON.stringify(bookList);
 console.log("I made a list");
}

app.get("/submit", (req,res) =>{
  console.log(req.query);
//   const flu = req.query.flu;
//   const diab = req.query.diab;
//   const colon = req.query.colon;
//   const bp = req.query.bp;
//   const skin = req.query.skin;
//   const pros = req.query.pros;
//   const den = req.query.pros;
//   const vis = req.query.vis;
//   data = new Data(flu,diab,colon,bp,skin,pros,den,vis);
//   createCards(res);
});

class  Data {
    constructor(flu,diab,colon,bp,skin,pros,den,vis,check){
        this.flu = flu;
        this.diab = diab;
        this.colon = colon;
        this.bp = bp;
        this.skin = skin;
        this.pros = pros;
        this.den = den;
        this.vis = vis;
        this.check = check;
    }
}
app.listen(3000);

