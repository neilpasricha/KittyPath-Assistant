// Close the dropdown if the user clicks outside of it
// bind click events
document.getElementById("searchButton").onclick = searchFunc;
document.getElementById("planButton").onclick = planFunc;
document.getElementById("helpButton").onclick = helpFunc;
document.getElementById("auditButton").onclick = auditFunc;
document.getElementById("selectionButton").onclick = selectionFunc;
document.getElementById("CourseID").onclick = TabFunc;
document.getElementById("UnfulfilledReqs").onclick = unfulfilledReqFunc;
document.getElementById("NotUsed").onclick = notUsedCourses;
document.getElementById("CurrentClasses").onclick = currentClassesFunc;
document.getElementById("NeededClassesSubmitButton").onclick = RequiredClassFunc;
document.getElementById("CourseReq").onclick = ReqFunc;
document.getElementById("AttributeSubmitButton").onclick = AttributeFunc;
document.getElementById("lionPaw").onclick=changeTheme;
document.getElementById("GPACalculator").onclick=gpaFunc;



function RequiredClassFunc() {
  $('#gpacalculator').hide();
  planFetcher();
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("reqClassesContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink2");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("Required").style.display = "block";
  event.currentTarget.className += " active";
}

function gpaFunc(){
  getTotalcredits();
  $('#gpacalculator').show();
  $('#unfulfilledContent').hide();

  gpaModal.style.display = "block";

}



function AttributeFunc() {
  byRequirement();
  document.getElementById("GenEdCourses").style.display = "block";
}

function TabFunc() {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("SearchTabContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("ClassById").style.display = "block";
  event.currentTarget.className += " active";
}

function ReqFunc() {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("SearchTabContent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("ClassByReq").style.display = "block";
  event.currentTarget.className += " active";
  $("#title").show();
  $(".chosen").hide();
  $("#tab").hide();
  $("#saveClassbtn").hide();
}

function unfulfilledReqFunc() {
  $('#gpacalculator').hide();
  getUnfulfilledReqs();
  var i, tabcontent, tablinks;

  tabcontent = document.getElementById("unfulfilledContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink1");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("unfulfilledContent").style.display = "block";
  event.currentTarget.className += " active";
}
//document.getElementById("searchByID").onclick = typeSearchFunc;
//document.getElementById("searchByReq").onclick = reqSearchFunc;


function notUsedCourses() {
  $('#gpacalculator').hide();
  getNotUsedCourses();
  var i, tabcontent, tablinks;

  tabcontent = document.getElementById("unfulfilledContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink1");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("unfulfilledContent").style.display = "block";
  event.currentTarget.className += " active";
}

function currentClassesFunc() {
  $('#gpacalculator').hide();
  getCurrentCourses();
  var i, tabcontent, tablinks;

  tabcontent = document.getElementById("unfulfilledContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink1");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("unfulfilledContent").style.display = "block";
  event.currentTarget.className += " active";
}




// list of dropdown ID's and saying whether they are shown or not
const dropdowns = {
  "myDropdownAudit": false,
  "myDropdownHelp": false,
  "myDropdownPlan": false,
  "myDropdownSearch": false,
  "myDropdownSelection": false
};

// hide all drowdowns
const hideAll = () => {
  Object.keys(dropdowns).forEach(dropdown => {
    toggleShowOff(document.getElementById(dropdown))
  })
}

// toggle dropdown off
const toggleShowOff = element => {
  if (element.classList.contains("show")) {
    element.classList.remove("show");
  }
};

// toggle dropdown on
const toggleShowOn = element => {
  hideAll();
  document.getElementById(element).classList.toggle("show");
  dropdowns[element] = true;



  //if(element=="myDropdownSearch"){ //Work in progress to have the search menu expand
  //  document.getElementsByTagName("body")[0].style.height = "450px";
  // }
  //else{
  document.getElementsByTagName("body")[0].style.height = "600px";

  //}

}

// close if you click outside of the target
document.getElementById("kittyContainer").onclick = function (event) {

  

  if (!event.target.matches("#planButton")) {
    toggleShowOff(document.getElementById("myDropdownPlan"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
  if (!event.target.matches("#searchButton")) {
    toggleShowOff(document.getElementById("myDropdownSearch"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
  if (!event.target.matches("#helpButton")) {
    toggleShowOff(document.getElementById("myDropdownHelp"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
  if (!event.target.matches("#auditButton")) {
    toggleShowOff(document.getElementById("myDropdownAudit"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
  if (!event.target.matches("#selectionButton")) {
    toggleShowOff(document.getElementById("myDropdownSelection"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
};

var pawTheme=0;
function changeTheme(){
 pawTheme+=1;
 $("#lionPaw").effect("bounce", {times : 3}, 1000);
  if(pawTheme==1){//orange
    
$("#cs0Exit").animate({
  color: "#FFA500"
});

$("#cs1Exit").animate({
  color: "#FFA500"
});

$("#cs2Exit").animate({
  color: "#FFA500"
});

$("#cs3Exit").animate({
  color: "#FFA500"
});

$("#cs4Exit").animate({
  color: "#FFA500"
});

$("#cs5Exit").animate({
  color: "#FFA500"
});

$("#cs6Exit").animate({
  color: "#FFA500"
});

   $("#sbR").animate({
    color: "#FFA500"
  });
  $("#sbc").animate({
    color: "#FFA500"
  });

  $("#goBack").animate({
    color: "#FFA500"
  });

  $("#clearSearch").animate({
    color: "#FFA500"
  });

  $("#SearchLabel").animate({
    color: "#FFA500"
  });

  $("#saveClassbtn").animate({
    color: "#FFA500"
  });

  $("#reqAt").animate({
    color: "#FFA500"
  });

  $("#atrSub").animate({
    color: "#FFA500"
  });

  $("#SemesterSelectLabel").animate({
    color: "#FFA500"
  });

  $("#MajorSelectLabel").animate({
    color: "#FFA500"
  });

  $("#SearchLabel2").animate({
    color: "#FFA500"
  });

  $("#MajorName").animate({
    color: "#FFA500"
  });

  $("#CampusName").animate({
    color: "#FFA500"
  });

  $("#gpaPlain").animate({
    color: "#FFA500"
  });

  $("#gpaCont").animate({
    color: "#FFA500"
  });

  $("#regTitle").animate({
    color: "#FFA500"
  });

  $("#unFulTit").animate({
    color: "#FFA500"
  });

  $("#curClassTit").animate({
    color: "#FFA500"
  });


  $("#compNU").animate({
    color: "#FFA500"
  });


  $("#GPACalculator").animate({
    color: "#FFA500"
  });


  $("#blah").animate({
    color: "#FFA500"
  });


  $("#gpaMod1").animate({
    color: "#FFA500"
  });

  $("#addc").animate({
    color: "#FFA500"
  });

  $("#starto").animate({
    color: "#FFA500"
  });

  $("#blah").animate({
    color: "#FFA500"
  });
  $("#saveCo").animate({
    color: "#FFA500"
  });
  $("#recCo").animate({
    color: "#FFA500"
  });
  $("#semSel").animate({
    color: "#FFA500"
  });
  $("#majSel").animate({
    color: "#FFA500"
  });
  
  $("#HelpHeader1").animate({
    color: "#FFA500"
  });
  $("#HelpHeader2").animate({
    color: "#FFA500"
  });
  $("#HelpHeader3").animate({
    color: "#FFA500"
  });


  


    $( "#searchButton" ).animate({
      color: "#FFA500",
      backgroundColor: "rgb( 20, 20, 20 )"
    });
    $( "#planButton" ).animate({
      color: "#FFA500",
      backgroundColor: "rgb( 20, 20, 20 )"
    });
    $( "#helpButton" ).animate({
      color: "#FFA500",
      backgroundColor: "rgb( 20, 20, 20 )"
    });
    $( "#auditButton" ).animate({
      color: "#FFA500",
      backgroundColor: "rgb( 20, 20, 20 )"
    });
    $( "#selectionButton" ).animate({
      color: "#FFA500",
      backgroundColor: "rgb( 20, 20, 20 )"
    });
    $('#myDropdownPlan').css('background-image', 'url(' + '/gui/menuBG.jpg' + ')');
    $("#containerBG").attr("src", "/gui/kittyContainerBackground.png");
    $("#helpButton").show();
   
    $("#planButton").text('Plan');
    $("#lionPaw").attr("src", "/gui/orangePaw.png");
    
  }
  else if(pawTheme==2){//yellow

    $("#cs0Exit").animate({
      color: "yellow"
    });
    
    $("#cs1Exit").animate({
      color: "yellow"
    });
    
    $("#cs2Exit").animate({
      color: "yellow"
    });
    
    $("#cs3Exit").animate({
      color: "yellow"
    });
    
    $("#cs4Exit").animate({
      color: "yellow"
    });
    
    $("#cs5Exit").animate({
      color: "yellow"
    });
    
    $("#cs6Exit").animate({
      color: "yellow"
    });
    $("#sbR").animate({
      color: "yellow"
    });
    $("#sbc").animate({
      color: "yellow"
    });
  
    $("#goBack").animate({
      color: "yellow"
    });
  
    $("#clearSearch").animate({
      color: "yellow"
    });
  
    $("#SearchLabel").animate({
      color: "yellow"
    });
  
    $("#saveClassbtn").animate({
      color: "yellow"
    });
  
    $("#reqAt").animate({
      color: "yellow"
    });
  
    $("#atrSub").animate({
      color: "yellow"
    });
  
    $("#SemesterSelectLabel").animate({
      color: "yellow"
    });
  
    $("#MajorSelectLabel").animate({
      color: "yellow"
    });
  
    $("#SearchLabel2").animate({
      color: "yellow"
    });
  
    $("#MajorName").animate({
      color: "yellow"
    });
  
    $("#CampusName").animate({
      color: "yellow"
    });
  
    $("#gpaPlain").animate({
      color: "yellow"
    });
  
    $("#gpaCont").animate({
      color: "yellow"
    });
  
    $("#regTitle").animate({
      color: "yellow"
    });
  
    $("#unFulTit").animate({
      color: "yellow"
    });
  
    $("#curClassTit").animate({
      color: "yellow"
    });
  
  
    $("#compNU").animate({
      color: "yellow"
    });
  
  
    $("#GPACalculator").animate({
      color: "yellow"
    });
  
  
    $("#blah").animate({
      color: "yellow"
    });
  
  
    $("#gpaMod1").animate({
      color: "yellow"
    });
  
    $("#addc").animate({
      color: "yellow"
    });
  
    $("#starto").animate({
      color: "yellow"
    });
  
    $("#blah").animate({
      color: "yellow"
    });
    $("#saveCo").animate({
      color: "yellow"
    });
    $("#recCo").animate({
      color: "yellow"
    });
    $("#semSel").animate({
      color: "yellow"
    });
    $("#majSel").animate({
      color: "yellow"
    });


   


    $("#HelpHeader1").animate({
      color: "yellow"
    });

    $("#HelpHeader2").animate({
      color: "yellow"
    });

    $("#HelpHeader3").animate({
      color: "yellow"
    });
    
  $( "#searchButton" ).animate({
    color: "yellow",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $( "#planButton" ).animate({
    color: "yellow",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $( "#helpButton" ).animate({
    color: "yellow",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $( "#auditButton" ).animate({
    color: "yellow",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $( "#selectionButton" ).animate({
    color: "yellow",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $('#myDropdownPlan').css('background-image', 'url(' + '/gui/menuBG.jpg' + ')');
  $("#containerBG").attr("src", "/gui/kittyContainerBackground.png");
  $("#helpButton").show();
  $("#planButton").text('Plan');
  $("#lionPaw").attr("src", "/gui/yellowPaw.png");
 
}else if(pawTheme==3){
 pawTheme=0;
 
  $('#myDropdownPlan').css('background-image', 'url(' + '/gui/menuBG.jpg' + ')');
 

  $("#cs0Exit").animate({
    color: "white"
  });
  
  $("#cs1Exit").animate({
    color: "white"
  });
  
  $("#cs2Exit").animate({
    color: "white"
  });
  
  $("#cs3Exit").animate({
    color: "white"
  });
  
  $("#cs4Exit").animate({
    color: "white"
  });
  
  $("#cs5Exit").animate({
    color: "white"
  });
  
  $("#cs6Exit").animate({
    color: "white"
  });


  $("#sbR").animate({
    color: "white"
  });
  $("#sbc").animate({
    color: "white"
  });

  $("#goBack").animate({
    color: "white"
  });

  $("#clearSearch").animate({
    color: "white"
  });

  $("#SearchLabel").animate({
    color: "white"
  });

  $("#saveClassbtn").animate({
    color: "white"
  });

  $("#reqAt").animate({
    color: "white"
  });

  $("#atrSub").animate({
    color: "white"
  });

  $("#SemesterSelectLabel").animate({
    color: "white"
  });

  $("#MajorSelectLabel").animate({
    color: "white"
  });

  $("#SearchLabel2").animate({
    color: "white"
  });

  $("#MajorName").animate({
    color: "white"
  });

  $("#CampusName").animate({
    color: "white"
  });

  $("#gpaPlain").animate({
    color: "white"
  });

  $("#gpaCont").animate({
    color: "white"
  });

  $("#regTitle").animate({
    color: "white"
  });

  $("#unFulTit").animate({
    color: "white"
  });

  $("#curClassTit").animate({
    color: "white"
  });


  $("#compNU").animate({
    color: "white"
  });


  $("#GPACalculator").animate({
    color: "white"
  });


  $("#blah").animate({
    color: "white"
  });


  $("#gpaMod1").animate({
    color: "white"
  });

  $("#addc").animate({
    color: "white"
  });

  $("#starto").animate({
    color: "white"
  });

  $("#blah").animate({
    color: "white"
  });
  $("#saveCo").animate({
    color: "white"
  });
  $("#recCo").animate({
    color: "white"
  });
  $("#semSel").animate({
    color: "white"
  });
  $("#majSel").animate({
    color: "white"
  });


 


  $("#HelpHeader1").animate({
    color: "white"
  });

  $("#HelpHeader2").animate({
    color: "white"
  });

  $("#HelpHeader3").animate({
    color: "white"
  });
  $( "#searchButton" ).animate({
    color: "white",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $( "#planButton" ).animate({
    color: "white",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $( "#helpButton" ).animate({
    color: "white",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $( "#auditButton" ).animate({
    color: "white",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $( "#selectionButton" ).animate({
    color: "white",
    backgroundColor: "rgb( 20, 20, 20 )"
  });
  $("#containerBG").attr("src", "/gui/kittyContainerBackground.png");
  $("#helpButton").show();
  $("#planButton").text('Plan');
  $("#lionPaw").attr("src", "/gui/lionPawSmall.png");

 
 
}
  
}




// callback functions
function searchFunc() {
  toggleShowOn("myDropdownSearch");
  console.log(this.innerText);
}

function planFunc() {
  
  

  majorSelector();
  toggleShowOn("myDropdownPlan");
  console.log(this.innerText);
}

function helpFunc() {
  toggleShowOn("myDropdownHelp");
  console.log(this.innerText);
}

function auditFunc() {
  toggleShowOn("myDropdownAudit");
  showGPA();
  console.log("this.innerText");
}


function selectionFunc() {

  toggleShowOn("myDropdownSelection");
  createSC();
}




function typeSearchFunc() {
  document.getElementById("searchByReq").checked = false;
  document.getElementById("SearchLabel").style.visibility = "visible";
  document.getElementById("search-input").style.visibility = "invisible";
  document.getElementById("serach-input").placeholder = "Enter class name or course code...";
  document.getElementById("search-input").style.visibility = "visible";
}

function reqSearchFunc() {
  document.getElementById("searchByID").checked = false;
  document.getElementById("SearchLabel").style.visibility = "visible";
  document.getElementById("search-input").placeholder = "Enter class requirement....";
  document.getElementById("search-input").style.visibility = "visible";
}

function main() {
  var source = document.getElementById("myDropdownSelection").value;
  document.getElementById(".dropbtnSelection").innerHTML = source;
}



// Get the modal
var gpaModal = document.getElementById("gpaModal");

// Get the button that opens the modal
var gpaBtn = document.getElementById("gpaButton");

// Get the <span> element that closes the modal
var gpaSpan = document.getElementsByClassName("close")[0];



/*var unfulfilledModal = document.getElementById("unfulfilledModal");
var unfulfilledBtn = document.getElementById("unfulfilledButton");
var unfulfilledSpan = document.getElementsByClassName("close")[0];

unfulfilledSpan.onclick = function () {
  unfulfilledSpan.style.display = "none";
}

unfulfilledBtn.onclick = function () {
  unfulfilledModal.style.display = "block";
}

var classModal = document.getElementById("currentClassModal");
var classButton = document.getElementById("CurrentClassButton");
var classSpan = document.getElementsByClassName("close")[0];
classSpan.onclick = function () {
  classSpan.style.display = "none";
}
classButton.onclick = function () {
  classModal.style.display = "block";
  var content = document.getElementById("ClassesTable").rows[1].cells
  content[0].innerHTML = "CMPSC 462";//lol
}

var notUsedModal = document.getElementById("NotSatisfyingModal");
var notUsedButton = document.getElementById("NotSatisfyingButton");
var notUsedSpan = document.getElementsByClassName("close")[0];
notUsedSpan.onclick = function () {
  notUsedSpan.style.display = "none";
}
notUsedButton.onclick = function () {
  notUsedModal.style.display = "block";
}*/

// When the user clicks anywhere outside of the modal, close it



window.onclick = function (event) {

  // if (event.target == gpaModal) {
  //   gpaModal.style.display = "none";
  // }
  // if (event.target == unfulfilledModal) {
  //   unfulfilledModal.style.display = "none";
  // }
  // if (event.target == classModal) {
  //   classModal.style.display = "none";
  // }
  // if (event.target == notUsedModal) {
  //   notUsedModal.style.display = "none";
  // }
}

document.getElementById("kittyContainer").onclick = function (event) {
  if (!event.target.matches("#friedButton")) {
    toggleShowOff(document.getElementById("myDropdownFried"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }

  if (!event.target.matches("#planButton")) {
    toggleShowOff(document.getElementById("myDropdownPlan"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
  if (!event.target.matches("#searchButton")) {
    toggleShowOff(document.getElementById("myDropdownSearch"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
  if (!event.target.matches("#helpButton")) {
    toggleShowOff(document.getElementById("myDropdownHelp"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
  if (!event.target.matches("#auditButton")) {
    toggleShowOff(document.getElementById("myDropdownAudit"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
  if (!event.target.matches("#selectionButton")) {
    toggleShowOff(document.getElementById("myDropdownSelection"));
    document.getElementsByTagName("body")[0].style.height = "100%";
  }
};