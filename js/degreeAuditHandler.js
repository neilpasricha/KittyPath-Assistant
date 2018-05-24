function showGPA() {
  setTimeout(() => {
    chrome.storage.local.get("gpa", function(obj) {
      var detail = JSON.stringify(obj);
      var gpa = detail.split(" ")[5];
      $("#GPAContent").text(gpa);
    });
  }, 10);
  currentgpa = parseInt(gpa);
}

function getUnfulfilledReqs() {
  setTimeout(() => {
    $(".list").empty();
    $("#blah").text("LIST OF UNFULFILLED REQUIREMENTS:");
    chrome.storage.local.get(["unfulfilled"], function(obj) {
      var counter0 = 0;
      list = JSON.parse(obj.unfulfilled);
      for (var obj of list) {
        // console.log('dammit', list)
        for (key in obj) {
          if (obj[key]) {
            console.log("key", key);
            let sel;
            if (obj[key]["needed"]) sel = $("<li></li>").text(`${key.trim()} - ${obj[key]["needed"]} needed`);
            if (obj[key]["gpaHave"]) sel = $("<li></li>").text(`${key.trim()} GPA - ${obj[key]["gpaHave"]} current`);
            $(".list").append(sel);
            counter0 = counter0 + 1;
          }
        }
      }
      if (counter0 == 0) {
        var sel = $("<li></li>").text("All Requirements are fulfilled.");
        $(".list").append(sel);
      }
    });
  }, 100);
}

function getNotUsedCourses() {
  setTimeout(() => {
    $(".list").empty();
    $("#blah").text("LIST OF NON USED COURSES:");

    chrome.storage.local.get(["mang"], function(boy) {
      headers = JSON.parse(boy.mang);
      var retVal = 0;
      for (var object in headers) {
        for (var o in headers[object]) {
          for (var key in headers[object][o]) {
            if (headers[object][o].hasOwnProperty(key)) {
              if (key.match("Courses Not Used")) {
                retVal = object;
              }
            }
          }
        }
      }
      chrome.storage.local.get(["auditClasses"], function(obj) {
        var counter1 = 0;

        console.log(obj);
        list = JSON.parse(obj);
        var length = list.length;
        for (i = 0; i < list[retVal][0].length; i++) {
          var sel = $("<li></li>").text(list[retVal][0][i].course);
          $(".list").append(sel);
          counter1 = counter1 + 1;
        }
        if (counter1 == 0) {
          var sel = $("<li></li>").text("There are no non used courses.");
          $(".list").append(sel);
        }
      });
    });
  }, 50);
}

/////////

function getCurrentCourses() {
  setTimeout(() => {
    $(".list").empty();
    $("#blah").text("LIST OF CURRENT COURSES:");

    chrome.storage.local.get(["mang"], function(boy) {
      headers = JSON.parse(boy.mang);
      var retVal = 0;
      for (var object in headers) {
        for (var o in headers[object]) {
          for (var key in headers[object][o]) {
            if (headers[object][o].hasOwnProperty(key)) {
              if (key.match("In Progress Courses")) {
                retVal = object;
              }
            }
          }
        }
      }
      chrome.storage.local.get(["auditClasses"], function(obj) {
        var counter1 = 0;
        list = JSON.parse(obj.auditClasses);
        var length = list.length;
        for (i = 0; i < list[retVal][0].length; i++) {
          var sel = $("<li></li>").text(list[retVal][0][i].course);
          $(".list").append(sel);
          counter1 = counter1 + 1;
        }
        if (counter1 == 0) {
          var sel = $("<li></li>").text("There are no non used courses.");
          $(".list").append(sel);
        }
      });
    });
  }, 50);
}

// function getRecomandedCourses () {setTimeout(() => {
//     $('#reccomandedCourses').empty();

//         chrome.storage.local.get(['auditClasses'], function (obj) {
//             list=JSON.parse(obj.auditClasses);
//             var counter3 = 0;
//             for(i in list){
//                 for(j in list[i]){
//                     for(k in list[i][j]){
//                         if (list[i][j][k].grade == null){
//                         // build list here

//                         var sel= $("<li></li>").text(list[i][j][k].course);
//                         $("#reccomandedCourses").append(sel);
//                         counter3 = counter3 + 1;
//                     }}}}
//                     //document.write(counter3);
//             if(counter3 == 0){
//                 var sel= $("<li></li>").text("There are no reccomanded courses.");
//                 $("#reccomandedCourses").append(sel);}

//     })}),50;}
