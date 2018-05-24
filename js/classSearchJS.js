document.getElementById("search-input").oninput = getClass;
// let springClasses;

//****************************************************************************************** */

//****************************************************************************************** */

function getClass() {
  $("#class_loader").show();
  console.log(semClassesLink);
  $.getJSON(semClassesLink, function(data) {
    //alert();
    springClasses = data;
    var test = $("#search-input")
      .val()
      .toLowerCase();
    if (test == "") {
      //This if/else controls the hiding/displaying of the select drop down menu
      //test is the actual input in the search form, and is evaluated while typing
      //AS WELL as after clicking the x to clear it. When the x was cleared before
      //an empty drop down menu persisted. Now when the x is clicked and the "test"
      //is evaluated, it goes away if there is no text. boom mang
      $(".chosen").hide();
      $("#tab").hide();
      $("#title").hide();
      $("#secs_list").empty();
    } else {
      $("#tab").hide();
      $("#title").hide();
      var name = $("#search-input")
        .val()
        .toLowerCase();
      $(".chosen").empty();
      $(".chosen").show();

      for (key in data) {
        var temp = key.toLowerCase();
        if (temp.indexOf(name) > -1 && name != "") {
          var sel = $('<option class="GenEdOption"></option>').text(key);
          //sel.text(sel.text().substring(0,100));
          $(".chosen").append(sel);
        }
      }
    }
    $("#class_loader").hide();
  });
}

showSections = course => {
  // clearSearch()
  $("#course").text("");
  $("#course").text(course);

  $(".chosen").hide();
  let secs_list = $('<div id="secs_list" class="savedCourses" rules=rows></div>');
  $("#title").append(secs_list);
  var tr = $("<tr></tr>");

  var foot = $("<tr></tr>");
  for (let i = 0; i < springClasses[course].length; i++) {
    let sec = $(`<tr id="${course + i}"  class="class_section"></tr>`).text(
      `${springClasses[course][i].section}` + " - " + `${springClasses[course][i].instructor}`
    );
    tr.append(sec);
    sec.click(() => {
      displayClass(course, i);
      saveSearchClass(course, i);
    });
    console.log("ran3");
    console.log(course);
    $("#secs_list").append(tr);
    $("#secs_list").append(foot);
    $("#title").show();
    $("#secs_list").show();
  }
};
document.getElementById("options").oninput = fetch;
// document.getElementById("options").onchange = fetch;

saveSearchClass = (course, index) => {
  let c = course.split(" - ")[0];
  //alert("c: " +c);
  if (
    !savedClassData.includes(course) &&
    !savedClassData.includes(springClasses[course][index].number) &&
    !savedClassData.includes(springClasses[course][index].section) &&
    !savedClassData.includes(springClasses[course][index].times) &&
    !savedClassData.includes(springClasses[course][index].room) &&
    !savedClassData.includes(springClasses[course][index].instructor) &&
    !savedClassData.includes(springClasses[course][index].dates)
  ) {
    savedClassData.push(course);
    savedClassData.push(springClasses[course][index].number);
    savedClassData.push(springClasses[course][index].section);
    savedClassData.push(springClasses[course][index].times);
    savedClassData.push(springClasses[course][index].room);
    savedClassData.push(springClasses[course][index].instructor);
    savedClassData.push(springClasses[course][index].dates);
  }

  savedClassNames = c;
  savedClassTitles.push(course);
};

function disableSearchInput() {
  document.getElementById("search-input").disabled = true;
}

function enableSearchInput() {
  document.getElementById("search-input").disabled = false;
}

$("#goBack").click(() => {
  $("#goBack").hide();
  $("#tab").hide();
  // $("#title").hide();
  $(".chosen").hide();
  // $("#search-input").val(course);
  $("#clearSearch").hide();
  $("#saveClassbtn").hide();
  console.log("clicked my guy");
  $("#secs_list").show();
});

displayClass = (course, index) => {
  $("#secs_list").hide();
  $("#goBack").show();
  disableSearchInput();
  $.getJSON("../scraped_data/new_bulletin.json", function(bulletin) {
    courseTemp = course;
    var c = course.split(" - ")[0];
    var element = c.replace(/\s+/g, "");

    $("#course").text(course);
    $("#number").text(springClasses[course][index].number);
    $("#section").text(springClasses[course][index].section);
    $("#times").text(springClasses[course][index].times);
    $("#room").text(springClasses[course][index].room);
    $("#instructor").text(springClasses[course][index].instructor);
    $("#dates").text(springClasses[course][index].dates);

    $("#tab").show();
    $("#title").show();
    $(".chosen").hide();
    $("#search-input").val(course);
    $("#clearSearch").show();
    $("#saveClassbtn").show();

    var p1 = c.split(" ")[0];
    var p2 = c.split(" ")[1];
    var link = "http://undergraduate.bulletins.psu.edu/search/?scontext=courses&search=" + p1+ "+"+ p2;
    //document.write(link);
    console.log(element);
    $("#details").attr("href",link);
    if (element in bulletin) {
      $("#prerequesites").text(bulletin[element].prerequisites);
      savedClassData.push(bulletin[element].prerequisites);
    } else {
      $("#prerequesites").text("Can't find Prereqs");
    }
/*
    document.write(link);


*/
  });
};

var savedClassData = [];
var savedClassNames;
//****************************************************************************************** */
function fetch() {
  var course = $("#options").val();
  console.log(course);
  showSections(course);
}

function byRequirement() {
  $("#GenCourses").empty();
  let attr = $("#GenedSelect option:selected").val(); //.match(/\([A-Z]{2,3}\)/)//[0].replace("(", "").replace(")", "")
  console.log(attr);
  let course_list = getSpringCoursesForGenEd(attr);
  for (let course in course_list) {
    //array
    let sel = $('<option class="GenEdOption"></option>').text(course_list[course]);
    sel.click(() => {
      console.log(course);
      showSections(course_list[course]);
      TabFunc();
    });
    $("#GenCourses").append(sel);
  }
}

/*
clearSearch() is the "New Search" button in the course search.
It clears the search and sets new stuffs

*/
function clearSearch() {
  enableSearchInput();
  $("#goBack").fadeOut();
  savedClassData = [];
  $("#search-input").val("");
  $("#tab").fadeOut();
  $("#title").fadeOut();
  $("#secs_list").empty();
  $("#clearSearch").fadeOut();
  $("#saveClassbtn").fadeOut();
  chrome.storage.local.get(
    {
      savedClasses
    },
    function(arr) {
      var savedC = JSON.stringify(arr);
    }
  );
} //end clearSearch()
