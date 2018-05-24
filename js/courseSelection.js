document.getElementById("clearSearch").onclick = clearSearch;
document.getElementById("saveClassbtn").onclick = saveClass;
document.getElementById("reccCS").onclick = reccCS;
document.getElementById("savedCS").onclick = savedCS;


var savedClasses = [];
var savedClassParts = [];
var savedClassTitles = [];
var classes;
var courseTemp;
var actualCourses = [];


// Get the modal
var modal = document.getElementById('csModal');

// The Course Detail butons
var btn0 = document.getElementById("cs0Modal");
var btn1 = document.getElementById("cs1Modal");
var btn2 = document.getElementById("cs2Modal");
var btn3 = document.getElementById("cs3Modal");
var btn4 = document.getElementById("cs4Modal");
var btn5 = document.getElementById("cs5Modal");
var btn6 = document.getElementById("cs6Modal");

// Get the <span> element that closes the modal, literally the X button
var span = document.getElementsByClassName("csModalClose")[0];

/*
the btnX.onclick functions are for the "course details" buttons. When the user clicks, it pulls the details
from chrome storage using the key 'savedCoursesDetails'. This is destroyed and recreated with each class, 
so that the key will bring the array of details per class

*/
btn0.onclick = function () {
  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // alert(result.savedCoursesTest);
    // alert(result.savedCoursesTest);
    var deats = result.savedCoursesDetails;
    //alert('actualC: '+ actualCourses);
    //  alert("tits: " +actualCourses);
    var deats0 = deats[0];
    //alert(deats);
    $("#courseCS").text(deats0[0]);
    $("#numberCS").text(deats0[1]);
    $("#sectionCS").text(deats0[2]);
    $("#timesCS").text(deats0[3]);
    $("#roomCS").text(deats0[4]);
    $("#instructorCS").text(deats0[5]);
    $("#datesCS").text(deats0[6]);
    
   

    


  });

  modal.style.display = "block";

}
btn1.onclick = function () {
  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // alert(result.savedCoursesTest);
    // alert(result.savedCoursesTest);
    var deats = result.savedCoursesDetails;
    //alert('actualC: '+ actualCourses);
    //  alert("tits: " +actualCourses);
    var deats0 = deats[1];
    $("#courseCS").text(deats0[0]);
    $("#numberCS").text(deats0[1]);
    $("#sectionCS").text(deats0[2]);
    $("#timesCS").text(deats0[3]);
    $("#roomCS").text(deats0[4]);
    $("#instructorCS").text(deats0[5]);
    $("#datesCS").text(deats0[6]);
    

  });


  modal.style.display = "block";
}
btn2.onclick = function () {
  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // alert(result.savedCoursesTest);
    // alert(result.savedCoursesTest);
    var deats = result.savedCoursesDetails;
    //alert('actualC: '+ actualCourses);
    //  alert("tits: " +actualCourses);
    var deats0 = deats[2];
    $("#courseCS").text(deats0[0]);
    $("#numberCS").text(deats0[1]);
    $("#sectionCS").text(deats0[2]);
    $("#timesCS").text(deats0[3]);
    $("#roomCS").text(deats0[4]);
    $("#instructorCS").text(deats0[5]);
    $("#datesCS").text(deats0[6]);
    

  });

  modal.style.display = "block";
}
btn3.onclick = function () {
  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // alert(result.savedCoursesTest);
    // alert(result.savedCoursesTest);
    var deats = result.savedCoursesDetails;
    //alert('actualC: '+ actualCourses);
    //  alert("tits: " +actualCourses);
    var deats0 = deats[3];
    $("#courseCS").text(deats0[0]);
    $("#numberCS").text(deats0[1]);
    $("#sectionCS").text(deats0[2]);
    $("#timesCS").text(deats0[3]);
    $("#roomCS").text(deats0[4]);
    $("#instructorCS").text(deats0[5]);
    $("#datesCS").text(deats0[6]);
   

  });

  modal.style.display = "block";
}
btn4.onclick = function () {
  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // alert(result.savedCoursesTest);
    // alert(result.savedCoursesTest);
    var deats = result.savedCoursesDetails;
    //alert('actualC: '+ actualCourses);
    //  alert("tits: " +actualCourses);
    var deats0 = deats[4];
    $("#courseCS").text(deats0[0]);
    $("#numberCS").text(deats0[1]);
    $("#sectionCS").text(deats0[2]);
    $("#timesCS").text(deats0[3]);
    $("#roomCS").text(deats0[4]);
    $("#instructorCS").text(deats0[5]);
    $("#datesCS").text(deats0[6]);
    

  });

  modal.style.display = "block";
}
btn5.onclick = function () {
  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // alert(result.savedCoursesTest);
    // alert(result.savedCoursesTest);
    var deats = result.savedCoursesDetails;
    //alert('actualC: '+ actualCourses);
    //  alert("tits: " +actualCourses);
    var deats0 = deats[5];
    $("#courseCS").text(deats0[0]);
    $("#numberCS").text(deats0[1]);
    $("#sectionCS").text(deats0[2]);
    $("#timesCS").text(deats0[3]);
    $("#roomCS").text(deats0[4]);
    $("#instructorCS").text(deats0[5]);
    $("#datesCS").text(deats0[6]);
    

  });

  modal.style.display = "block";
}

btn6.onclick = function () {
  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // alert(result.savedCoursesTest);
    // alert(result.savedCoursesTest);
    var deats = result.savedCoursesDetails;
    //alert('actualC: '+ actualCourses);
    //  alert("tits: " +actualCourses);
    var deats0 = deats[6];
    $("#courseCS").text(deats0[0]);
    $("#numberCS").text(deats0[1]);
    $("#sectionCS").text(deats0[2]);
    $("#timesCS").text(deats0[3]);
    $("#roomCS").text(deats0[4]);
    $("#instructorCS").text(deats0[5]);
    $("#datesCS").text(deats0[6]);
    

  });

  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/*
savedCS() and reccCS() handle the tabs in the Course Selection
When the saved courses tab is clicked, show savedClasses and hide
reccomended classes, and vice versa
*/
function savedCS() {
  $("#reccomendedClasses").hide();
  $("#SavedClasses").show();
}

function reccCS() {
  $("#SavedClasses").hide();
  $("#reccomendedClasses").show();
  majorSelector();
}
//****************************************************************************************** */
/*
The saveClass() function handles the table of titles built in the Course Selection
tab. It only handles the titles, and checks for duplicates. It allows a maximum of 7 in the table.
Note:This only builds the table containing course titles. The
button for course details and the x button are handled elsewhere

*/
function saveClass() {
  var alreadySaved = false;
  chrome.storage.local.get({
    savedCourseTitles: []
  }, function (result) {
    var savedCourseTitles = result.savedCourseTitles;
    // alert(savedCourseTitles);
    // alert(savedClassNames);
    if (!savedCourseTitles.includes(savedClassNames)) {
      //   alert("did not includeMang");

      savedCourseTitles.push(savedClassNames);
      chrome.storage.local.set({
        savedCourseTitles: savedCourseTitles
      }, function () {

      });
    } else {
      alreadySaved = true;
      //  alert("Duplicate courseFUCK");
    }

  });
  chrome.storage.local.get('savedCourseTitles', function (result) {


    var cNamesTest = result.savedCourseTitles;
    // alert("CNames: " +cNamesTest);



    chrome.storage.local.get({
      savedCoursesDetails: []
    }, function (result) {
      // alert("SCD: " +savedClassData);
      // alert("storage: " +savedCoursesDetails);

      var savedCoursesDetails = result.savedCoursesDetails;

      // alert("SavedCourseDetails: "+savedCoursesDetails);
      // alert("savedClassData[0] " +savedClassData[0]); 
      var x = savedClassData[0].split("-");
      // alert("x: " +x[0]);//current name
      // alert("savedClassNames: " +savedClassNames);
      var y = x[0].trim();
      var z = savedClassNames.trim();
      // alert(y + " " +z);



      if (savedCoursesDetails.length < 7) {
        // alert("<7");
        if (!alreadySaved) {
          //  alert("did not contain");
          savedCoursesDetails.push(savedClassData);
          // alert(savedCoursesDetails);
          chrome.storage.local.set({
            savedCoursesDetails: savedCoursesDetails
          }, function () {

          });
        } else {
          //alert("duplicate class");
        }

      } else {
       // alert("7 classes max");
      }

    });

    chrome.storage.local.get({
      savedCoursesTest: []
    }, function (result) {
      // the input argument is ALWAYS an object containing the queried keys
      // so we select the key we need
      //alert('test');
      var savedCoursesTest = result.savedCoursesTest;
      if (savedCoursesTest.length < 7) {
        // alert(savedCoursesTest);
        // alert(courseTemp);
        //alert("fuck: " +savedCoursesTest);
        if (!savedCoursesTest.includes(courseTemp)) {
          savedCoursesTest.push(courseTemp);
          // alert("fuck2: " +savedCoursesTest);
          // set the new array value to the same key
          chrome.storage.local.set({
            savedCoursesTest: savedCoursesTest
          }, function () {
            // you can use strings instead of objects
            // if you don't  want to define default values
            chrome.storage.local.get('savedCoursesTest', function (result) {
              // alert(result.savedCoursesTest);
              // alert(result.savedCoursesTest);
              actualCourses = result.savedCoursesTest;
              //alert('actualC: '+ actualCourses);
              //  alert("tits: " +actualCourses);
              saveToCS(actualCourses);


            });
          });
        } else {
          //alert("Course is already saved.");
        }
      } else {
        alert("max 7 classes!");
      }
    });

  });




  $("#saveClassbtn").fadeOut();

} //End saveClass()

//****************************************************************************************** */

/*

createSC() makes the table which the titles are displayed on, dynamically. 

*/

function createSC() {
  chrome.storage.local.get('savedCoursesTest', function (result) {
    $('#courseTable').empty();
    displayCourses = result.savedCoursesTest;

    var alreadyDisplayed = [];
    if (displayCourses.length != 0) {

      //loadCourses(displayCourses);
      //refreshCourseSelection(actualCourses);
      // alert(displayCourses);

      for (var i = 0; i < displayCourses.length; i++) {
        // alert("alreadyDisplayed: " +alreadyDisplayed);
        // alert("displayCourses in loop: "+displayCourses);
        // if(!alreadyDisplayed.includes(courseCode)){
        var tr = $("<tr></tr>");
        alreadyDisplayed.push(courseCode);
        var courseCode = displayCourses[i].split("-");
        //alert("displaycourses[i]: " +displayCourses[i]);
        // alert(courseCode[0]);

        var tr1 = $("<td></td>").text(courseCode[0]);
       // tr1.attr("style", "color:#DCF3FF");
        var buttonShow = "#cs" + i + "Exit";
        // alert(buttonShow);
        var detailsShow = "#cs" + i + "Modal";
        $(detailsShow).show();
        $(buttonShow).show();
        //var btn = document.createElement("BUTTON");
        // btn.setAttribute("id", "cs" +i+ "Exit");
        // btn.setAttribute("class", "savedCourses");git 
        // td.append(btn);
        tr.append(tr1);
        // tr.append(btn);
        $('#courseTable').append(tr);
        var foot = $("<tr></tr>");

        $('#courseTable').append(foot);
      }



    }


    // }
  });
}


// document.getElementById("cs0Modal").onclick=function(event){

//}

/*
The csXExit button functions deal with the X buttons on the right of each
course title. When it is clicked, the table is automatically and dynamically rebuilt
to restart the indexes for the classes so it doesnt mess up.
It wipes the class title and details from the chrome storage, using "splice" 
which returns an array which automatically moves each index down. 
The table is then immediately rebuilt using the new arrays, so that the new indexes
are then accounted for.

*/

document.getElementById("cs0Exit").onclick = function (event) {
  //alert("MANG");
  synchButtons();

  chrome.storage.local.get('savedCourseTitles', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCourseTitles = result.savedCourseTitles;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCourseTitles.length == 0) {
      savedCourseTitles = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCourseTitles.splice(0, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCourseTitles: savedCourseTitles
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesDetails = result.savedCoursesDetails;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesDetails.length == 0) {
      savedCoursesDetails = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesDetails.splice(0, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesDetails: savedCoursesDetails
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });


  chrome.storage.local.get('savedCoursesTest', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesTest = result.savedCoursesTest;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesTest.length == 0) {
      savedCoursesTest = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesTest.splice(0, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    $("#cs0Exit").fadeOut();
    $("#cs0Modal").fadeOut();

    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesTest: savedCoursesTest
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });

    createSC();





  });
}

document.getElementById("cs1Exit").onclick = function (event) {
  //alert("MANG");
  synchButtons();

  chrome.storage.local.get('savedCourseTitles', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCourseTitles = result.savedCourseTitles;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCourseTitles.length == 0) {
      savedCourseTitles = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCourseTitles.splice(1, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCourseTitles: savedCourseTitles
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesDetails = result.savedCoursesDetails;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesDetails.length == 0) {
      savedCoursesDetails = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesDetails.splice(1, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesDetails: savedCoursesDetails
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });
  chrome.storage.local.get('savedCoursesTest', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');

    var savedCoursesTest = result.savedCoursesTest;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesTest.length == 0) {
      savedCoursesTest = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesTest.splice(1, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    $("#cs1Exit").fadeOut();
    $("#cs1Modal").fadeOut();

    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesTest: savedCoursesTest
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });
    synchButtons();
    createSC();





  });
}

document.getElementById("cs2Exit").onclick = function (event) {
  //alert("MANG");
  synchButtons();

  chrome.storage.local.get('savedCourseTitles', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCourseTitles = result.savedCourseTitles;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCourseTitles.length == 0) {
      savedCourseTitles = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCourseTitles.splice(2, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCourseTitles: savedCourseTitles
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesDetails = result.savedCoursesDetails;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesDetails.length == 0) {
      savedCoursesDetails = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesDetails.splice(2, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesDetails: savedCoursesDetails
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesTest', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesTest = result.savedCoursesTest;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesTest.length == 0) {
      savedCoursesTest = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesTest.splice(2, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    $("#cs2Exit").fadeOut();
    $("#cs2Modal").fadeOut();

    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesTest: savedCoursesTest
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });

    createSC();





  });
}

document.getElementById("cs3Exit").onclick = function (event) {
  //alert("MANG");
  synchButtons();

  chrome.storage.local.get('savedCourseTitles', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCourseTitles = result.savedCourseTitles;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCourseTitles.length == 0) {
      savedCourseTitles = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCourseTitles.splice(3, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCourseTitles: savedCourseTitles
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesDetails = result.savedCoursesDetails;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesDetails.length == 0) {
      savedCoursesDetails = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesDetails.splice(3, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesDetails: savedCoursesDetails
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });


  chrome.storage.local.get('savedCoursesTest', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesTest = result.savedCoursesTest;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesTest.length == 0) {
      savedCoursesTest = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesTest.splice(3, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    $("#cs3Exit").fadeOut();
    $("#cs3Modal").fadeOut();

    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesTest: savedCoursesTest
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });

    createSC();





  });
}

document.getElementById("cs4Exit").onclick = function (event) {
  //alert("MANG");
  synchButtons();

  chrome.storage.local.get('savedCourseTitles', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCourseTitles = result.savedCourseTitles;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCourseTitles.length == 0) {
      savedCourseTitles = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCourseTitles.splice(4, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCourseTitles: savedCourseTitles
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesDetails = result.savedCoursesDetails;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesDetails.length == 0) {
      savedCoursesDetails = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesDetails.splice(4, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesDetails: savedCoursesDetails
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesTest', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesTest = result.savedCoursesTest;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesTest.length == 0) {
      savedCoursesTest = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesTest.splice(4, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    $("#cs4Exit").fadeOut();
    $("#cs4Modal").fadeOut();

    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesTest: savedCoursesTest
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });

    createSC();





  });
}

document.getElementById("cs5Exit").onclick = function (event) {
  //alert("MANG");
  synchButtons();

  chrome.storage.local.get('savedCourseTitles', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCourseTitles = result.savedCourseTitles;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCourseTitles.length == 0) {
      savedCourseTitles = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCourseTitles.splice(5, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCourseTitles: savedCourseTitles
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesDetails = result.savedCoursesDetails;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesDetails.length == 0) {
      savedCoursesDetails = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesDetails.splice(5, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesDetails: savedCoursesDetails
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesTest', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesTest = result.savedCoursesTest;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesTest.length == 0) {
      savedCoursesTest = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesTest.splice(5, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    $("#cs5Exit").fadeOut();
    $("#cs5Modal").fadeOut();

    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesTest: savedCoursesTest
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });

    createSC();





  });
}


document.getElementById("cs6Exit").onclick = function (event) {
  //alert("MANG");
  synchButtons();

  chrome.storage.local.get('savedCourseTitles', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCourseTitles = result.savedCourseTitles;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCourseTitles.length == 0) {
      savedCourseTitles = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCourseTitles.splice(6, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCourseTitles: savedCourseTitles
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });

  chrome.storage.local.get('savedCoursesDetails', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesDetails = result.savedCoursesDetails;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesDetails.length == 0) {
      savedCoursesDetails = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesDetails.splice(6, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesDetails: savedCoursesDetails
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });




  });


  chrome.storage.local.get('savedCoursesTest', function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    //alert('test');
    var savedCoursesTest = result.savedCoursesTest;
    // alert(savedCoursesTest);
    // alert(courseTemp);
    //alert("fuck: " +savedCoursesTest);
    if (savedCoursesTest.length == 0) {
      savedCoursesTest = [];
    } else {

      //alert("beforeSplice: " +savedCoursesTest);
      savedCoursesTest.splice(6, 1);
      // alert("afterSplice: " +savedCoursesTest);
    }



    $("#cs6Exit").fadeOut();
    $("#cs6Modal").fadeOut();

    // alert("fuck2: " +savedCoursesTest);
    // set the new array value to the same key

    chrome.storage.local.set({
      savedCoursesTest: savedCoursesTest
    }, function () {
      // you can use strings instead of objects
      // if you don't  want to define default values
    });

    createSC();





  });
}

/*
synchButton() hides all of the buttons immediately. This is called before a splice occurs to prevent errors,
and keep everything in sync. The other functions call on the buttons they need to be shown, so by hiding them
all before that happens, we ensure no unnecessary buttons are being shown.
*/

function synchButtons() {
  for (var i = 0; i < 7; i++) {
    var mTest = "#cs" + i + "Modal";
    var bTest = "#cs" + i + "Exit";
    $(bTest).hide();
    $(mTest).hide();
  }


}