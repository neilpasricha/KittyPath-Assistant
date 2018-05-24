iframe = document.getElementById("ptifrmtgtframe");
innerDoc = iframe.contentDocument || iframe.contentWindow.document;
innerObj = $.extend(true, {}, $(innerDoc));
classGarbage = innerObj.find(".PSGROUPBOX");
boxes = innerObj.find('div[id^="win0divDERIVED_SAA_DPR_GROUPBOX1"]');
auditHeaders = [];
auditBoxes = [];


function jayBoyToJSON(jayBoy){
  classInfoArray = jayBoy.split('~')

  jsonBoy = {}
  jsonBoy.course      = classInfoArray[0]
  jsonBoy.description = classInfoArray[1]
  jsonBoy.credits     = classInfoArray[2]
  jsonBoy.semester    = classInfoArray[3]

  if(classInfoArray.length >= 5){
    jsonBoy.grade     = classInfoArray[4]
    jsonBoy.status    = "taken"
  }
  else{
    jsonBoy.grade     = null
    jsonBoy.status    = "inProgress/taking"
  }

  return jsonBoy
}




// gets main headers and then all the info below them
for (let i = 1; i < boxes.length; i += 2) {
  //console.log(boxes[i]).text()
  auditHeaders.push(boxes[i].innerText);
  auditBoxes.push(boxes[i - 1]);
}
auditSubSections = [];
auditSubReqs = [];
// array of classes
auditClasses = [];
for (let i = 0; i < auditBoxes.length; i++) {
  subSec = $(auditBoxes[i]).find("table.PSLEVEL1SCROLLAREABODYNBOWBO:not([id])");
  auditSubSections.push(subSec);
  subReqs = [];
  //     class list
  subSecClasses = [];
  for (let j = 0; j < subSec.length; j++) {
    subHeader = $(subSec[j])
      .find('div[id^="win0divDERIVED_SAA_DPR_GROUPBOX3GP"]')
      .first()
      .text();
    satisfied = $(subSec[j])
      .find("span.PSLONGEDITBOX")
      .text();
    subReq = {};
    subReq[subHeader] = satisfied;
    subReqs.push(subReq);

    classTable = $(subSec[j]).find(".PSGROUPBOXNBO");
    tableRows = classTable
      .find('[id*="trSAA_ACRSE_VW$"]')
      .text()
      .split("\n");
    jayBoy = "";
     console.log(subHeader);
     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    subClassList = [];
    for (let p = 0; p < tableRows.length - 1; p++) {
      //get rid of garbage rows in the tables that are just whitespace
      if (tableRows[p] != "") {
        if (tableRows[p] == "\xa0" && jayBoy.length >= 2) {
          jayBoy = jayBoy.substring(1, jayBoy.length)

          classTableRowJSON = jayBoyToJSON(jayBoy)
          console.log(classTableRowJSON)
          subClassList.push(jayBoy)

          jayBoy = "";
        } else {
          if (tableRows[p] == "\xa0") {
            jayBoy = "";
          } else {
            jayBoy = jayBoy + "~" + tableRows[p];
          }
        }
      }
    }
    subSecClasses.push(subClassList);
  }
  //     add to main class list
  auditClasses.push(subSecClasses);
  auditSubReqs.push(subReqs);
}
