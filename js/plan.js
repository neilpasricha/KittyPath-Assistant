function majorSelector() {
    $('#MajorSelect').empty();
    $("#MajorSelect").append($("<option></option>").text('Select a plan'));
    $.getJSON('../testPlan/Harrisburg_Done/planBoy.json', function (majors) {
        $("#MajorSelect").empty();
        $("#MajorSelect2").empty();
        for (var major in majors) {
            var justName = majors[major].replace('Recommended Academic Plan','');
            var justName2 = justName.replace('-','');
            var sel = $(`<option name=${major}></option>`).text(majors[major]);
            $("#MajorSelect").append(sel);
            
            var sel2 = $(`<option name=${major}></option>`).text(majors[major]);
            $("#MajorSelect2").append(sel2);
            
        }

        chrome.storage.local.get("semPlan", semPlan => {
            if(semPlan){
              console.log(semPlan);
              $(`#MajorSelect2 option[name=${semPlan['semPlan']['major']}]`).attr('selected', 'selected')
              $(`#SemesterSelect2 option[value=${semPlan['semPlan']['semester']}]`).attr('selected', 'selected')
            }
            recommend();

        })
        //document.write(majors[0]);
    });
}


function planFetcher() {
    $('#planTable').empty();
    $("#class_loader2").show();
    var major = $("#MajorSelect option:selected").val();
    var semester = "Semester " + $("#SemeseterSelection option:selected").val();
    var link = "../testPlan/Harrisburg_Done/" + major + ".json";

    $('#MajorName').text(major.split('-')[0] + " : " + semester);
    $('#CampusName').text("Campus: "+$("#campusSelect option:selected").val());


    // document.write(link);


    $.getJSON(link, function (plan) {
        
        for (var index in plan) {
            if (semester == plan[index].semester) {
                var i = 0;
                for (course in plan[index].classes) {

                    if (i % 2 == 0) {
                        var tr = $("<tr></tr>");
                    }

                    var td = $("<td></td>").text(plan[index].classes[course]);

                    tr.append(td);

                    if (i % 2 != 0) {
                        $('#planTable').append(tr);
                    }

                    i = i + 1;

                }
                //document.write(plan[index].website);
                var foot = $("<tr></tr>");
                var last = $("<td></td>");
                var tag = $("<a></a>").text('Click to visit the Plan Page');
                tag.attr("href", plan[index].website);
                tag.attr("target", "_blank");
                tag.attr("style", "color:rgb(141, 243, 155)");
                last.append(tag);
                foot.append(last);

                $('#planTable').append(foot);

            }
        }

        $("#class_loader2").hide();


    });
    
}