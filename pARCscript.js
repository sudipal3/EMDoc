let selectedScores = {

sex:null,
duration:null,
walking:null,
migration:null,
rlq:null,
guarding:null

};



const sectionTitles = {

sex:"Sex",
duration:"Pain duration",
walking:"Pain with walking",
migration:"Migration to RLQ",
rlq:"RLQ tenderness",
guarding:"Guarding"

};





function handleButtonClick(button,section,value){


const buttons =
button.parentElement.querySelectorAll("button");


if(button.classList.contains("pressed")){


button.classList.remove("pressed");

selectedScores[section]=null;


}

else{


buttons.forEach(btn =>
btn.classList.remove("pressed")
);


button.classList.add("pressed");

selectedScores[section]=value;


}


calculateScore();

}







function calculateScore(){


let age =
parseFloat(document.getElementById("ageInput").value) || 0;



let wbc =
parseFloat(document.getElementById("wbcInput").value);



let neutrophil =
parseFloat(document.getElementById("neutrophilInput").value);



let anc =
calculateANC(wbc, neutrophil);





let x = -8.6855;






// Sex

if(selectedScores.sex==="male"){

x += 1.2780;

}






// Age by sex

if(selectedScores.sex==="female"){


if(age>=5 && age<=7){

x += 0.3810;

}

else if(age>=8 && age<=11){

x += 0.6513;

}

}



if(selectedScores.sex==="male"){


if(age>=5 && age<=7){

x -= 0.6653;

}

else if(age>=8 && age<=13){

x -= 0.0654;

}

}







// Duration

if(selectedScores.duration==="24to48"){

x += 0.4696;

}


if(selectedScores.duration==="48to96"){

x += 0.1003;

}









// Symptoms

if(selectedScores.walking===true){

x += 1.0494;

}


if(selectedScores.migration===true){

x += 0.4557;

}


if(selectedScores.rlq===true){

x += 1.1435;

}


if(selectedScores.guarding===true){

x += 0.6736;

}










// ANC

if(anc !== null){


if(anc < 14){

x += 1.7734 * Math.sqrt(anc);

}

else{

x += 6.6195;

}

}









// Community ED adjustment

let finalX =
-0.615 + (1.1 * x);








// Logistic equation

let risk =
100 *
(
Math.exp(finalX) /
(1 + Math.exp(finalX))
);








let category =
getRiskCategory(risk);






let details=[];



for(let item in selectedScores){


if(selectedScores[item] !== null){


details.push(

"• " +
sectionTitles[item] +
": " +
formatValue(item,selectedScores[item])

);


}

}








document.getElementById("parcScoreOutput").innerHTML =


"<strong>pARC Appendicitis Risk</strong>" +

"<br><br>" +

"Estimated Risk: <strong>" +

risk.toFixed(1) +

"%</strong>" +

"<br><br>" +

"Based upon the pARC score for community emergency departments, the risk of appendicitis is <strong>" +

category +

"</strong>." +

"<br><br>" +

details.join("<br>");



}









function calculateANC(wbc, neutrophil){



if(!wbc || isNaN(wbc)){

return null;

}




if(!isNaN(neutrophil)){


return (neutrophil * wbc) / 100;


}




return Math.pow(

(-0.8783 + 1.1008 * Math.sqrt(wbc)),

2

);


}











function getRiskCategory(risk){


if(risk < 5){

return "Very Low";

}


if(risk < 15){

return "Low";

}


if(risk < 85){

return "Intermediate";

}


return "High";

}











function formatValue(section,value){


if(value === true){

return "Yes";

}



if(value === false){

return "No";

}







if(section==="duration"){


if(value==="lt24")
return "<24 hours";


if(value==="24to48")
return "24 to 48 hours";


if(value==="48to96")
return "48 to 96 hours";


if(value==="gt96")
return "≥96 hours";


}







if(section==="sex"){


return value.charAt(0).toUpperCase() +

value.slice(1);


}





return value;


}









function clearOutput(){


document.getElementById("ageInput").value="";


document.getElementById("wbcInput").value="";


document.getElementById("neutrophilInput").value="";



document.querySelectorAll(".pressed")
.forEach(button=>{

button.classList.remove("pressed");

});



selectedScores={

sex:null,
duration:null,
walking:null,
migration:null,
rlq:null,
guarding:null

};



document.getElementById("parcScoreOutput").innerHTML="";


}








function copyToClipboard(){


const output =
document.getElementById("parcScoreOutput");


const range=document.createRange();


range.selectNode(output);


window.getSelection().removeAllRanges();


window.getSelection().addRange(range);


document.execCommand("copy");


window.getSelection().removeAllRanges();


}