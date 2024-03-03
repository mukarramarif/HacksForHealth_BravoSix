const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
// Serve static files from the 'public' directory
app.use(express.static(path.resolve(__dirname, "public")));

// Data storage variable
var data = null;
let cardList = [];
var encodedData = null;

function createCards(res){
    let today = new Date();
    var curFlu = (data.flu == "") ? new Date(`1000/1`) : new Date(data.flu); 
    var curDiab = (data.diab == "") ? new Date(`1000/1`) : new Date(data.diab); 
    var curBP = (data.bp  == "") ? new Date(`1000/1`) : new Date(data.bp); 
    var curSkin = (data.skin  == "") ? new Date(`1000/1`) : new Date(data.skin); 
    var curPros = (data.pros  == "") ? new Date(`1000/1`) : new Date(data.pros); 
    
    while(cardList.length < 5){
        let options = []
        if (curFlu.getFullYear()+1 < today.getFullYear() || (curFlu.getFullYear()+1 == today.getFullYear && curFlu.getMonth() >= today.getMonth())){
            options.push(new Card(new Date(today),"flu",true));
        }
        else{
            options.push(new Card(new Date(curFlu),"flu",false));
        }
        if (curDiab.getFullYear()+3 < today.getFullYear() || (curDiab.getFullYear()+3 == today.getFullYear() && curDiab.getMonth() >= today.getMonth())){
            options.push(new Card(new Date(today),"diab",true));
        }
        else{
            options.push(new Card(new Date(curDiab),"diab",false));
        }
        if (curBP.getFullYear()+1 < today.getFullYear() || (curBP.getFullYear+1 == today.getFullYear() && curBP.getMonth() >= today.getMonth())){
            options.push(new Card(new Date(today),"bp",true));
        }
        else{
            options.push(new Card(new Date(curBP),"bp",false));
        }
        if (curSkin.getFullYear()+3 < today.getFullYear() || (curSkin.getFullYear+3 == today.getFullYear() && curSkin.getMonth() >= today.getMonth())){
            options.push(new Card(new Date(today),"skin",true));
        }
        else{
            options.push(new Card(new Date(curSkin),"skin",false));
        }
        if (curPros.getFullYear()+2 < today.getFullYear() || (curPros.getFullYear+2 == today.getFullYear() && curPros.getMonth() >= today.getMonth())){
            options.push(new Card(new Date(today),"pros",true));
        }
        else{
            options.push(new Card(new Date(curPros),"pros",false));
        }

        options.sort((a,b) => a.date - b.date);
        cardList.push(options[0]);

        let newYear = options[0].date.getFullYear();
        switch (options[0].type){
        case "flu":
            curFlu.setFullYear(newYear+1)
            break;
        case "diab":
            curDiab.setFullYear(newYear+3)
            break;
        case "bp":
            curBP.setFullYear(newYear+1)
            break;
        case "skin":
            curSkin.setFullYear(newYear+3)
            break;
        case "pros":
            curPros.setFullYear(newYear+2)
            break;
        }
    }
    const jsonString = JSON.stringify(cardList);
    fs.writeFile("./public/scripts/data.json", jsonString, (error) => {
        // throwing the error
        // in case of a writing problem
        if (error) {
          // logging the error
          console.error(error);
      
          throw error;
        }
    })
    //console.log(jsonString);
    encodedData = encodeURIComponent(jsonString);
    //console.log(encodedData);
}

// app.get("/submit", (req,res) =>{
//   const flu = req.query.flu;
//   const diab = req.query.diab;
//   const bp = req.query.bp;
//   const skin = req.query.skin;
//   const pros = req.query.pros;
//   data = new Data(flu,diab,bp,skin,pros);
//   createCards(res);
// });

class  Data {
    constructor(flu,diab,bp,skin,pros){
        this.flu = flu;
        this.diab = diab;
        this.bp = bp;
        this.skin = skin;
        this.pros = pros;
        
    }
}

class Card {
    constructor(date,type,danger){
        this.date = date;
        this.type = type;
        this.danger = danger;
    }
}

app.get("/submit", (req, res) => {
    //console.log(req.query);
    const { flu, diab, bp, skin, pros} = req.query;
    data = new Data(flu, diab, bp, skin, pros);
    createCards(res); // Assuming you want to create cards and respond within this function
    // For example, to send a simple response back:
    console.log(cardList);
    res.json({ message: "Data received and cards created", data: cardList});
});

app.get('/results.html', (req, res) => {
    console.log("HELP");
    res.sendFile(path.join(__dirname, 'path/to/results.html'));
});

app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
