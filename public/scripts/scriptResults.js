window.onload = makeCards;

let json = ['{"type":"flu", "date":"2024-05-05T00:00:00.000Z", "danger": true}', '{"type":"pros", "date":"2023-03-05T00:00:00.000Z", "danger": false}'];

function makeCards(){
    
    let cards = document.getElementById("cards");

    for (let i = 0; i < json.length; i++){
    let obj = JSON.parse(json[i]);
    let currCard = "<label for=\"" + obj.type + "\">";

    //urgent or not
    if (obj.danger){
        currCard += "<span class=\"danger\">";
    }else{
        currCard += "<span>";
    }
    currCard += "<div>";
    
    //date
    let date = obj.date.split('-');
    let year = parseInt(date[0]);
    let month = parseInt(date[1]);
    let monthList = ['', 'January ', 'February ', 'March ', 'April ', 'May ', 'June ', 'July ', 'August ', 'September ', 'October ', 'November ', 'December '];
    currCard += monthList[month] + year;
    
    currCard += "</div>"
    
    //handles differences between procedures
    let riskList = "";
    switch(obj.type){
        case "flu":
            currCard += "Flu Shot";
            riskList = fluRisks;
            break;
        case "diab":
            currCard += "Diabetes Screening";
            riskList = diabRisks;
            break;
        case "bp":
            currCard += "Blood Pressure Test";
            riskList = bpRisks;
            break;
        case "skin":
            currCard += "Skin Exam";
            riskList = skinRisks;
            break;
        case "pros":
            currCard += "Prostate Exam";
            riskList = prosRisks;
            break;
    }
    currCard += "</span></label><input type=\"checkbox\"";
    currCard += "id=\"" + obj.type + "\"><ul class=\"slide\"><lh>Potential Risks:</br></br></lh>";

    currCard += riskList;

    cards.innerHTML += currCard;
    }

}

let fluRisks = "<li>Fever</li><li>Aching Muscles</li><li>Chills and Sweats</li><li>Headache</li><li>Cough</li><li>Runny or Stuffy Nose</li><li>Sore Throat</li></ul>";
let diabRisks = "<li>Heart Disease</li><li>Chronic Kidney Disease</li><li>Nerve Damage</li><li>Foot Health</li><li>Oral Health</li><li>Hearing Loss</li><li>Vision Loss</li></ul>";
let bpRisks = "<li>Heart Attack</li><li>Aneurysms</li><li>Heart Failure</li><li>Kidney Problems</li><li>Eye Problems</li><li>Metabolic Syndrome</li><li>Vascular Dementia</li></ul>";
let skinRisks = "<li>Skin Cancer</li></ul>";
let prosRisks = "<li>Trouble Urinating</li><li>Decreased Force in the Stream of Urine</li><li>Blood in the Urine</li><li>Blood in the Semen</li><li>Bone Pain</li><li>Losing Weight Without Trying</li><li>Erectile Dysfunction</li></ul>";

currCard = "<label for=\"flu\"><span class=\"danger\"><div>June 2024</div>Flu Shot</span></label><input type=\"checkbox\" id=\"flu\"><ul class=\"slide\"><lh>Potential Risks:</br></br></lh><li>Diabetes</li><li>Blood Pressure</li><li>Prostate</li><li>Lung</li><li>Breast</li><li>Colon</li><li>Kidney</li></ul>";