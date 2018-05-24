const availableClassList = {};
// gets all class names
// SSR_CLSRCH_MTG1$scroll$817
divz = $("div[id^='win0divSSR_CLSRSLT_WRK_GROUPBOX2']");
for (i of divz) {
  let className = $(i).find("div[id^='win0divSSR_CLSRSLT_WRK_GROUPBOX2GP']").text().replace(/\s+/g, " ").trim();
  sections = $(i).find("div[id^='win0divSSR_CLSRSLT_WRK_GROUPBOX3']")
  sec_arr = [];
  for (j of sections){
    // console.log(i.innerText)
    // parent tbody of class names
    // let parentBody = $(i)
    //   .parent()
    //   .parent()
    //   .parent();
    // use the parent tbody to search for all other required values
    let classNumber = $(j).find("a[id^='MTG_CLASS_NBR']")[0].innerText;
    let classSection = $(j).find("a[id^='MTG_CLASSNAME']")[0].innerText;
    let dayAndTime = $(j).find("span[id^='MTG_DAYTIME']")[0].innerText.replace("\n", " / ");
    let room = $(j).find("span[id^='MTG_ROOM']")[0].innerText.replace("\n", " / ");
    let instructor = $(j).find("span[id^='MTG_INSTR']")[0].innerText.replace("\n", " / ");
    let meetingDates = $(j).find("span[id^='MTG_TOPIC']")[0].innerText.replace("\n", " / ");
    sec_arr.push({
      number: classNumber,
      section: classSection,
      times: dayAndTime,
      room: room,
      instructor: instructor,
      dates: meetingDates
    });
  }
  availableClassList[className] = sec_arr
}

var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(availableClassList));

$('<a href="data:' + data + '" download="classSpring_edit2.json">download JSON</a>').appendTo('body')[0];
