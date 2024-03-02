const express = require("express");
const path = require("path");
const app = express();

console.log("Server Started");

// Serve static files from the 'public' directory
app.use(express.static(path.resolve(__dirname, "public")));

// Data storage variable
var data = null;

function createCards(res){
    let cardList = [];

    var curFlu = data.flu;
    var curDiab = data.diab;
    var curBP = data.bp;
    var curSkin = data.skin;
    var curPros = data.pros;
    var nearestDate = new Date("9999-12");
    
    while(cardList.length < 10){
        let card = new Card(nearestDate, "", false);
        var newFlu = new Date();
        if (curFlu != ""){
            console.log("Here");
            var newFlu = new Date(curFlu);
            var newYear = newFlu.getFullYear();
            newYear += 1;
            var newMonth = newFlu.getMonth();
            newFlu = new Date(`${newYear}/${newMonth}`);
        }
        curFlu = toString(newFlu.getFullYear()) + "-" + toString(newFlu.getMonth());
        console.log(currFlu);
        if(newFlu < card.date){
            card = new Card(newFlu, "flu", false);
        }

        var newDiab = new Date();
        if (curDiab != ""){
            var newDiab = new Date(curDiab);
            var newYear = newDiab.getFullYear();
            newYear += 3;
            var newMonth = newDiab.getMonth();
            newDiab = new Date(`${newYear}/${newMonth}`);
        }
        curDiab = toString(newDiab.getFullYear()) + "-" + toString(newDiab.getMonth());
        if(newDiab < card.date){
            card = new Card(newDiab, "diab", false);
        }

        var newBP = new Date();
        if (curBP != ""){
            var newBP = new Date(curBP);
            var newYear = newBP.getFullYear();
            newYear += 1;
            var newMonth = newBP.getMonth();
            newBP = new Date(`${newYear}/${newMonth}`);
        }
        curBP = toString(newBP.getFullYear()) + "-" + toString(newBP.getMonth());
        if(newBP < card.date){
            card = new Card(newBP, "bp", false);
        }

        var newSkin = new Date();
        if (curSkin != ""){
            var newSkin = new Date(curSkin);
            var newYear = newSkin.getFullYear();
            newYear += 3;
            var newMonth = newSkin.getMonth();
            newSkin = new Date(`${newYear}/${newMonth}`);
        }
        curSkin = toString(newSkin.getFullYear()) + "-" + toString(newSkin.getMonth());
        if(newSkin < card.date){
            card = new Card(newSkin, "skin", false);
        }

        var newPros = new Date();
        if (curPros != ""){
            var newPros = new Date(curFlu);
            var newYear = newPros.getFullYear();
            newYear += 2;
            var newMonth = newPros.getMonth();
            newPros = new Date(`${newYear}/${newMonth}`);
        }
        curPros = toString(newPros.getFullYear()) + "-" + toString(newPros.getMonth());
        if(newPros < card.date){
            card = new Card(newPros, "pros", false);
        }
        cardList.push(card);
    }
    console.log(cardList);
}

app.get("/submit", (req,res) =>{
  const flu = req.query.flu;
  const diab = req.query.diab;
  const bp = req.query.bp;
  const skin = req.query.skin;
  const pros = req.query.pros;
  data = new Data(flu,diab,bp,skin,pros);
  createCards(res);
});

class  Data {
    constructor(flu,diab,bp,skin,pros){
        this.flu = flu;
        this.diab = diab;
        this.bp = bp;
        this.skin = skin;
        this.pros = pros;
        this.den = den;
        this.vis = vis;
        this.check = check;
    }
}

function createCards(res) {
    let cardList = [];
    // Logic to create cards based on 'data'
    console.log("I made a list");
    // Example: res.send(cardList); to send the list back to the client
}

app.get("/submit", (req, res) => {
    console.log(req.query);
    const { flu, diab, colon, bp, skin, pros, den, vis, check } = req.query;
    data = new Data(flu, diab, colon, bp, skin, pros, den, vis, check);
    createCards(res); // Assuming you want to create cards and respond within this function
    // For example, to send a simple response back:
    res.json({ message: "Data received and cards created" });
});

app.get('/results.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'path/to/results.html'));
});

app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
