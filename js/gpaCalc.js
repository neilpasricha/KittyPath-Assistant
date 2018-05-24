document.getElementById("addc").onclick = addCourse;
document.getElementById("starto").onclick = startOver;
document.getElementById("gpaModalClose").onclick=closeGpa;



var gpaModal = document.getElementById('gpaModalT');

var gpaMBtn = document.getElementById("GPACalculator");


function closeGpa(){
    gpaModal.style.display="none";
}


var index = 1;
var temp ;
var credits ;
var gpa;

function getTotalcredits() {
    let total = 0;
    chrome.storage.local.get('gpa', function (obj) { 
        var detail=JSON.stringify(obj);    
        var currentgpa= detail.split(' ')[5]; 
        chrome.storage.local.get(['auditClasses'], function (obj) { 
            list=JSON.parse(obj.auditClasses);

            for(i in list){
                for(j in list[i]){               
                    for(k in list[i][j]){                      
                        if (list[i][j][k].grade != "TR" && list[i][j][k].grade != null){                       
                            total = total + parseInt(list[i][j][k].credits);                       
                    }}}}
                    credits = total;
                    temp = total * currentgpa;
                    gpa = currentgpa;
                    //document.write(credits);
    });});
}












function addCourse (){
 
    //document.write(credits);
    
    if (index <8)
    {
        var row = $("<tr></tr>");
        var course = $("<td></td>").text("Course #"+ index);
        var grade = $("<td></td>").text("Grade: "+$("#grades option:selected").text());
        var ncred = $("<td></td>").text("# of credits: "+$("#ncredits option:selected").text());
    
    
        row.append(course);
        row.append(grade);
        row.append(ncred);
    
        gr = parseFloat($("#grades option:selected").val());
        nc = parseInt($("#ncredits option:selected").val());
    
    
        temp = temp + gr * nc;
        credits =  credits + nc;
        $('#calculatorShit').append(row);
    
        index = index + 1;
    
        $('#gpa').text('Estimated GPA : '+ Number(temp/credits).toFixed(2));

    }


}

function startOver(){
    $('#calculatorShit').empty();
    getTotalcredits();
    $('#gpa').text('Estimated GPA : '+ gpa);
    index = 1;
}
