$('#injectSaved').click(()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
        let activeTab = arrayOfTabs[0];
        // let found = activeTab.url.match("https://pennstate.collegescheduler.com/terms/Spring%202018/courses/add");
        let url = `https://pennstate.collegescheduler.com/accessible/terms/${$('#semester').val().replace(" ", "%20")}/courses/add`
        // if(found[0]){
            chrome.storage.local.get('savedCourseTitles', function (result) {
                let titles = result['savedCourseTitles'];
                let codeToRun = runitboi(titles, 0);
                console.log(codeToRun);
                chrome.tabs.executeScript(activeTab.id, {code: `window.location = '${url}';`});
                setTimeout(() => {
                    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs2) {
                        activeTab2 = arrayOfTabs2[0];
                        chrome.tabs.executeScript(activeTab2.id, {code: codeToRun});
                    })
                }, 3000)
                console.log(titles);
            })
        // }
    })
})

function waitWrap(str){
    return `
    setTimeout(() => {
        ${str}
    }, 500);
        `
}

function nestGuy(saveThese, i){


}

function runitboi(saveThese, i){
    let guy = ""
    console.log('recurse');
    let outercode = 
    `
    // window.location = 'https://pennstate.collegescheduler.com/accessible/terms/Fall%202018/courses/add';
    console.log('running');
    // setTimeout(function(){
    `
    let subj = saveThese[i].split(" ")[0];
    let num = saveThese[i].split(" ")[1];
    console.log(subj);
    console.log(num);
    return waitWrap(
            `
            document.getElementById("subject-selector").value = '${subj}';
            console.log('${subj}');
            document.getElementsByClassName('btn-selectSubject')[0].click();

            ${
                waitWrap(`
                    document.getElementById('course-selector').value = '${saveThese[i].split(" ").join('|')}';
                    console.log('${saveThese[i].split(" ").join('|')}');
                    document.getElementsByClassName('btn-selectCourse')[0].click();
                    ${
                        waitWrap(`
                            document.getElementsByClassName('btn-add')[0].click();
                            ${
                                waitWrap(`
                                    document.querySelector('.modal-footer > .btn-primary').click();
                                    ${
                                        i + 1 < saveThese.length ? waitWrap(runitboi(saveThese, i+1)) : ""
                                    }
                                `)
                            }
                        `)
                    }
                `)
            }
            `
        )

        
   
    // console.log(guy);
    // return guy;
}