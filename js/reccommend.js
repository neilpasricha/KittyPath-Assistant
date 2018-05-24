let classList = [];
let savedCourses = [];
let reqs, unfulfilled, mang;
let springClasses, bulletinClasses;
let semClassesLink = "../scraped_data/classesSpringWSections.json";
let springLink = "../scraped_data/classesSpringWSections.json";

$('#semester').change(() => {
  let sem = $("#semester").val()
  console.log(sem);
  if(sem === "Fall 2018"){
    semClassesLink = "../scraped_data/classesFall.json";
  } else {
    semClassesLink = "../scraped_data/classesSpringWSections.json";
  }
  chrome.storage.local.set({"semlink" : semClassesLink}, () => {})
})

chrome.storage.local.get("semlink", (linkski) => {
  if(linkski["semlink"]){
    semClassesLink = linkski["semlink"];
    if(semClassesLink === springLink){
      $('#semester').val('Spring 2018');
    } else {
      $('#semester').val('Fall 2018');
    }
    console.log(semClassesLink);
    fetchClassData();
  } else {
    chrome.storage.local.set({"semlink" : semClassesLink}, () => {
      $('#semester').val('Spring 2018');
      console.log(semClassesLink);
      fetchClassData();
    })
  }
})

let fetchClassData = () => {
  $.getJSON("../scraped_data/new_bulletin.json", bulletin => {
    bulletinClasses = bulletin;
    $.getJSON(semClassesLink, spring => {
      springClasses = spring;
      // reccommendBitches
      console.log("loaded ya shit");
      getAuditClasses();
    });
  });
};

let getAuditClasses = () => {
  chrome.storage.local.get("auditClasses", obj => {
    console.log(obj);
    obj = JSON.parse(obj["auditClasses"]);
    for (i of obj) {
      for (j of i) {
        for (k of j) {
          classList.push(k);
        }
      }
    }
    console.log(classList);
    getMang();
  });
};

let getMang = () => {
  chrome.storage.local.get("mang", obj => {
    mang = obj;
    getUnfulfilled();
  });
};

let getUnfulfilled = () => {
  console.log("ran");
  chrome.storage.local.get("unfulfilled", obj => {
    obj = JSON.parse(obj["unfulfilled"]);
    console.log("unfulfilled", obj);
    unfulfilled = obj;
    getSaved();
    // recommend();
    $("#MajorSelect2 option:selected").onInput = recommend;
  });
};

let getSaved = () => {
  chrome.storage.local.get("savedCoursesTest", result => {
    savedCourses = result.savedCoursesTest;
    reqs = filterCourseRec();
  });
};

let filterCourseRec = () => {
  // unfulfilled.push({ "(GA)": "fuck yourself", attributes: ["GA"] });
  for (i of unfulfilled) {
    for (key in i) {
      let cls = key.trim();
      console.log(cls);
      let found = cls.match(/\([A-Z]{2,3}\)/);
      console.log(found);
      if (found) {
        let attr = found[0].replace("(", "").replace(")", "");
        let header = $(`<ul class="attr_header"></ul>`).text(`Satisfies ${attr} requirement:`);
        let recs = getSpringCoursesForGenEd(attr);
        for (i in recs) {
          rec_class = $(`<li> ${recs[i]} </li>`);
          header.append(rec_class);
        }
        $("#recommendedCourses").append(header);
      }
    }
  }
};

let getSpringCoursesForGenEd = attr => {
  console.log(attr);
  let rec_list = [];
  for (course in springClasses) {
    // console.log(course)
    cc = course
      .split("-")[0]
      .trim()
      .split(/\s+/)
      .join("");
    // console.log(cc);
    checkAttribute(cc, attr) ? rec_list.push(course) : null;
  }
  console.log("rec_list", rec_list);
  return rec_list;
};

let checkAttribute = (course, req) => {
  // console.log(course);
  if (bulletinClasses[course]) {
    for (var attr in bulletinClasses[course].attributes) {
      var element = bulletinClasses[course].attributes[attr];
      if (element.match(req)) {
        return true;
      }
    }
    return false;
  }
};

let checkClass = course => {
  let c = course.replace("0", "").replace("W", "").replace(/\s/g, "");
  for (let i = 0; i < classList.length; i++) {
    let potential = classList[i]["course"].replace("0", "").replace("W", "").replace(/\s/g, "");
    console.log("pot", potential, "c", c);
    if (potential === c) {
      return true;
    }
  }
  return false;
};

let recommend = () => {
  // $("#clearSearch").click();
  $("#courseboys").empty();
  let sem = parseInt($("#SemesterSelect2").val());
  let majorlink = `../testPlan/Harrisburg_Done/${$("#MajorSelect2 option:selected")
    .val()
    .replace("%20", " ")}.json`;
  let majornum = $("#MajorSelect2 option:selected").attr("name");
  console.log(majorlink);
  chrome.storage.local.set({ 'semPlan': { 'semester': sem, 'major': parseInt(majornum) } }, function() {});
  $.getJSON(majorlink, planski => {
    console.log(sem);
    console.log(majorlink);

    let disPlan = planski[sem]["classes"];
    for (let i = 0; i < disPlan.length; i += 2) {
      // console.log(i)
      // console.log(disPlan[i])
      if (!checkClass(disPlan[i])) {
        let guy = disPlan[i].replace(/\s/g, "");
        // console.log(guy)
        let reggie = /[A-Z]{2,}\d{2,}/;
        let multiple = guy.split("or"),
          list = [];
        console.log(multiple);
        if (multiple.length > 1 && multiple[0].match(reggie)) {
          for (cls in multiple) {
            // console.log(multiple[cls]);
            let foundmatch = multiple[cls].match(reggie);
            if(checkClass(foundmatch[0])){
              break;
            }
            foundmatch ? list.push(foundmatch[0]) : null;
          }
          let els = [];
          let outerStr = [];
          for (cls in list) {
            console.log("list", list[cls]);
            let course = matchCourse(list[cls]);
            if (course) {
              let link = $(`<a class="courseLink" id="${course}">${list[cls]}</a>`);
              link.click(() => {
                $("#goBack").hide();
                savedClassData = [];
                $("#search-input").val(course);
                $("#tab").hide();
                $("#title").hide();
                $("#secs_list").empty();
                $("#clearSearch").hide();
                $("#saveClassbtn").hide();
                
                showSections(course);
                TabFunc();
                $("#searchButton").click();
              });
              els.push(link);
            } else if(bulletinClasses[list[cls]]) {
              console.log(bulletinClasses[list[cls]])
              let link = $(`<a href="${bulletinClasses[list[cls]]['url']}" target="_blank" class="bullyLink" id="${course}">${list[cls]}</a>`);
              els.push(link);
            } else {
              els.push(`${list[cls]}`);
            }
          }
          console.log("els", els);
          let tr = $(`<tr id=${guy}></tr>`);
          let td = $('<td class="recentry"></td>');
          let td2 = $(`<td class="recentrycred">${disPlan[i + 1]}</td>`);
          for (let j = 0; j < els.length; j++) {
            td.append(els[j]);
            console.log("els[j]", $(els[j]));
            j !== els.length - 1 ? td.append(" or ") : null;
          }
          tr.append(td);
          tr.append(td2);
          $("#courseboys").append(tr);
        } else {
          let findClass = guy.match(reggie);
          if (findClass) {
            console.log(findClass);
            let link = $(`<a class="courseLink" id="${guy}">${disPlan[i]}</a>`);
            let course = matchCourse(guy);
            link.click(() => {
              $("#goBack").hide();
              savedClassData = [];
              $("#search-input").val(course);
              $("#tab").hide();
              $("#title").hide();
              $("#secs_list").empty();
              $("#clearSearch").hide();
              $("#saveClassbtn").hide();
              
              showSections(course);
              TabFunc();
              $("#searchButton").click();
            });
            let td1 = $(`<td class="recentry"></td>`);
            td1.append(link);
            let td2 = $(`<td class="recentrycred">${disPlan[i + 1]}</td>`);
            let tr = $(`<tr></tr>`);
            tr.append(td1);
            tr.append(td2);
            $("#courseboys").append(tr);
          } else {
            let tr = $(`<tr>
                          <td class="recentry">${disPlan[i]}</td>
                          <td class="recentrycred">${disPlan[i + 1]}</td>
                        </tr>`);
            $("#courseboys").append(tr);
          }
        }
      }
    }
  });
};


let matchCourse = course => {
  let springGuy = `${course.match(/[A-Z]{2,}/)[0]} ${parseInt(course.match(/\d{2,}/)[0])}`;
  console.log("springguy", springGuy);
  for (guy in springClasses) {
    if (guy.includes(springGuy)) return guy;
  }
  return false;
};

// document.getElementById('SemesterSelect').onchange = recommend;
$("#SemesterSelect2").change(recommend);
$("#MajorSelect2").change(recommend);