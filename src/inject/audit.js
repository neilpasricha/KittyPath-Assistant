let a;
console.log("running");
function jayBoyToJSON(jayBoy) {
  classInfoArray = jayBoy.split("~");

  jsonBoy = {};
  jsonBoy.course = classInfoArray[0];
  jsonBoy.description = classInfoArray[1];
  jsonBoy.credits = classInfoArray[2];
  jsonBoy.semester = classInfoArray[3];

  if (classInfoArray.length >= 5) {
    jsonBoy.grade = classInfoArray[4];
    jsonBoy.status = "taken";
  } else {
    jsonBoy.grade = null;
    jsonBoy.status = "inProgress/taking";
  }

  return jsonBoy;
}
setTimeout(() => {
  iframe = document.getElementById("ptifrmtgtframe");
  innerDoc = iframe.contentDocument || iframe.contentWindow.document;

  $("html").first().append(`
      <div id="load-overlay" style="opacity: 0.8; background: #001a33; width: 100%; height: 100%; position: fixed; top: 0; left: 0;">
          <div style="margin: auto; background: #000; width: 500px; z-index: 11; margin-top: 30%;padding: 5px; border-radius: 10px; text-align: center;">
              <h3 id="overlay-message" style="color: #fff">Please wait a few moments while I get your audit information...</h3>
          </div>
      </div>`);

  if ($(innerDoc).find("#DERIVED_SSSACA2_SS_DEG_PROG_LINK")[0]) {
    $(innerDoc)
      .find("#DERIVED_SSSACA2_SS_DEG_PROG_LINK")[0]
      .click();

    $(iframe).load(() => {
      superScraper();
    });
  } else {
    superScraper();
  }
}, 2000);
auditSubSections = [];
auditSubReqs = [];
outerClassList = [];
// list={};
superScraper = () => {
  iframe = document.getElementById("ptifrmtgtframe");
  innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  $(innerDoc)
    .find("#DERIVED_SAA_DPR_SSS_EXPAND_ALL")[0]
    .click();

  setTimeout(() => {
    innerObj = $.extend(true, {}, $(innerDoc));
    classGarbage = innerObj.find(".PSGROUPBOX");
    boxes = innerObj.find('div[id^="win0divDERIVED_SAA_DPR_GROUPBOX1"]');
    auditHeaders = [];
    auditBoxes = [];

    // gets main headers and then all the info below them
    for (let i = 1; i < boxes.length; i += 2) {
      auditHeaders.push(boxes[i].innerText);
      auditBoxes.push(boxes[i - 1]);
    }

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


          tableRowsObject = $(classTable).find('[id*="trSAA_ACRSE_VW"]')
        
          //will run from top to bottom of table
 
          subClassList = []
 
         for(let rowObject = 0; rowObject < tableRowsObject.length; rowObject++){
           gridLocations = $(tableRowsObject[rowObject]).find('[class*="PSLEVEL4GRIDROW"]')
           //will run through left to right of each row
 
           courseJsonObject = {}
           
           for(let descr = 0; descr < gridLocations.length; descr++){
 
             names = $(gridLocations[descr]).find('[id*="win0divCRSE_NAME"]')            
             descriptString = $(gridLocations[descr]).find('[id*="win0divCRSE_DESCR"]')
             credits = $(gridLocations[descr]).find('[id*="win0divCRSE_UNITS"]')
             when = $(gridLocations[descr]).find('[id*="win0divCRSE_WHEN"]')
             grade = $(gridLocations[descr]).find('[id*="win0divSAA_ACRSE_AVLVW_CRSE_GRADE_OFF"]')
             statusManImageVal = $(gridLocations[descr]).find('[id*="win0divCRSE_STAT$"]')
             
             if(names.length > 0)
               courseJsonObject.course = names[0].innerText
 
             if(descriptString.length > 0)
               courseJsonObject.description = descriptString[0].innerText
 
             if(credits.length > 0)
               courseJsonObject.credits = credits[0].innerText
 
             if(when.length > 0)
               courseJsonObject.semester = when[0].innerText
 
             if(grade.length > 0){
               if(grade[0].innerText = ""){
                 courseJsonObject.grade = null
               }
               else
                 courseJsonObject.grade = grade[0].innerText
             }
 
             if(statusManImageVal.length > 0){
 
               statusImageTag = $(statusManImageVal[0]).find('img')
 
               if(statusImageTag.length > 0){
                 courseJsonObject.status = $(statusManImageVal[0]).find('img').attr("alt")
               }
               else{
                 courseJsonObject.status = "Not Taken"
               }
             }
           }
           subClassList.push(courseJsonObject)
          }
        subSecClasses.push(subClassList);
      }
      outerClassList.push(subSecClasses);
      //     add to main class list
      auditClasses.push(subSecClasses);
      auditSubReqs.push(subReqs);
    }


    chrome.storage.local.set({'gpa': auditSubReqs[2][1][" 2.0 cumulative GPA minimum "]}, function() {});
    
    unfulfilled = [];
    for(i of auditSubReqs){
      for(j of i){
        for(k in j){
          let found = j[k].match(/\d+.\d\d needed/)
          let found2 = j[k].match(/\d.\d+ required, \d.\d+ actual/)
          console.log(j[k])
          console.log(found2)
          if(found){
            let needed = parseFloat(found[0].split(" ")[0])
            let taken = parseFloat(j[k].match(/\d+.\d\d taken/)[0].split(" "))
            if(needed > 0){
              let guy = {}
              guy[k] = {'taken': taken, 'needed': needed}
              unfulfilled.push(guy)
            }
          }
          if(found2){
            let gpaReq = parseFloat(found2[0].split(" ")[0])
            let gpaHave = parseFloat(found2[0].split(" ")[2])
            if(gpaHave < gpaReq){
              let guy = {}
              guy[k] = {'gpaReq': gpaReq, 'gpaHave': gpaHave}
              unfulfilled.push(guy)
            }
          }
        }
      }
    }

    console.log('auditClasses', auditClasses);
    console.log('auditSubReqs', auditSubReqs);
    console.log('unfulfilled', unfulfilled);


    chrome.storage.local.set({'unfulfilled':JSON.stringify(unfulfilled)}, function() {})
    auditClasses = JSON.stringify(auditClasses);
    chrome.storage.local.set({'auditClasses':auditClasses}, function(){});
    mang = JSON.stringify(auditSubReqs);
    chrome.storage.local.set({'mang': mang}, function() {});

    $("#overlay-message").text("Success!");
    setTimeout(() => {
      $("#load-overlay").hide();
    }, 1000);
  }, 5000);
};



