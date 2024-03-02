const express = require("express");
const path = require("path");
const app = express();

console.log("Server Started");

// Serve static files from the 'public' directory
app.use(express.static(path.resolve(__dirname, "public")));

// Data storage variable
var data = null;

class Data {
    constructor(flu, diab, colon, bp, skin, pros, den, vis, check) {
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
