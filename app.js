const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.resolve(__dirname, "public")));

// Data storage variable
var data = null;

function createCards(res){
    let cardList = [];
    let today = new Date();
    let tdyYear = today.getFullYear();
    let tdyMonth = today.getMonth()+1;
    var curFlu = (data.flu == "") ? new Date(`${tdyYear}/${tdyMonth}`) : new Date(data.flu); 
    var curDiab = (data.diab == "") ? new Date(`${tdyYear}/${tdyMonth}`) : new Date(data.diab); 
    var curBP = (data.bp  == "") ? new Date(`${tdyYear}/${tdyMonth}`) : new Date(data.bp); 
    var curSkin = (data.skin  == "") ? new Date(`${tdyYear}/${tdyMonth}`) : new Date(data.skin); 
    var curPros = (data.pros  == "") ? new Date(`${tdyYear}/${tdyMonth}`) : new Date(data.pros); 
    
    while(cardList.length < 5){
        let options = []
        if (curFlu.getFullYear()+1 <= today.getFullYear){
            options.push(new Card(today,"flu",true));
        }
        else{
            options.push(new Card(curFlu,"flu",false));
        }
        if (curDiab.getFullYear()+3 <= today.getFullYear){
            options.push(new Card(curDiab,"diab",true));
        }
        else{
            options.push(new Card(curDiab,"diab",false));
        }
        if (curBP.getFullYear()+1 <= today.getFullYear){
            options.push(new Card(curBP,"bp",true));
        }
        else{
            options.push(new Card(curBP,"bp",false));
        }
        if (curSkin.getFullYear()+3<= today.getFullYear){
            options.push(new Card(curSkin,"skin",true));
        }
        else{
            options.push(new Card(curSkin,"skin",false));
        }
        if (curPros.getFullYear()+2 <= today.getFullYear){
            options.push(new Card(curPros,"pros",true));
        }
        else{
            options.push(new Card(curPros,"pros",false));
        }

        options.sort((a,b) => a.date - b.date);
        cardList.push(options[0]);

        switch (options[0].type){
        case "flu":
            curFlu = options[0].date;
            curFlu.setFullYear(options[0].date.getFullYear()+1)
            break;
        case "diab":
            var newYear = options[0].date.getFullYear();
            var newMonth = options[0].date.getMonth()+1;
            newYear += 3;
            curDiab = new Date(`${newYear}/${newMonth}`)
            break;
        case "bp":
            var newYear = options[0].date.getFullYear();
            var newMonth = options[0].date.getMonth()+1;
            newYear += 1;
            curBP = new Date(`${newYear}/${newMonth}`)
            break;
        case "skin":
            var newYear = options[0].date.getFullYear();
            var newMonth = options[0].date.getMonth()+1;
            newYear += 3;
            curSkin = new Date(`${newYear}/${newMonth}`)
            break;
        case "pros":
            var newYear = options[0].date.getFullYear();
            var newMonth = options[0].date.getMonth()+1;
            newYear += 2;
            curPros = new Date(`${newYear}/${newMonth}`)
            break;
        }
    }
    console.log(cardList);
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
    console.log(req.query);
    const { flu, diab, bp, skin, pros} = req.query;
    data = new Data(flu, diab, bp, skin, pros);
    createCards(res); // Assuming you want to create cards and respond within this function
    // For example, to send a simple response back:
    res.json({ message: "Data received and cards created" });
});

app.get('/results.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'path/to/results.html'));
});

app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
