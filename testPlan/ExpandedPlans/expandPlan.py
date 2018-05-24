from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json

def cleanString(dirtyString):
    dirtyString = dirtyString.replace("\xa0", " ")
    cleanArr = dirtyString.split("*")
    cleanArr = cleanArr[0].split("#")
    cleanArr = cleanArr[0].split("†")
    cleanBoy = cleanArr[0].split("‡")

    return cleanBoy[0]
    


def jayBoyToJSON(classArray, creditArray, semester, planUrl):

    planUrlArr = planUrl.split("\n")

    #print("creds:" + str(creditArray) )
    jsonBoy = {
        'semester' : semester,
        'classes'  : [],
        'website'  : planUrlArr[0]
    }

    for i in range(0,len(classArray)):

        jsonBoy['classes'].append(cleanString(classArray[i]))

        jsonBoy['classes'].append(creditArray[i])

    #print(jsonBoy)
    
    data.append(jsonBoy)
    
    #print(jsonBoy['classes'])




#planUrl = "http://undergraduate.bulletins.psu.edu/undergraduate/colleges/altoona/biology-bs/#suggestedacademicplantext"
    

with open("links.txt", 'r') as readFile:
    planLinks = readFile.readlines()

titles = []

for link in planLinks:
    planUrl = link
    planPage = urlopen(planUrl)
    planSoup = BeautifulSoup(planPage, "html.parser")
    majors = planSoup.find_all("div", {"id" : "suggestedacademicplantextcontainer"})
    data = []
    semester = 1
    leftSemester = []
    leftCred = []

    rightSemester = []
    rightCred = []

    textFileName = ""


    for major in majors:
        title = major.find_all("h3", {"class" : "toggle"})
        dropDownName = 0
        #for name in title:
        #    print(name.text)
        
        grid = major.find_all("table", {"class" : "sc_plangrid"})
        #print(grid)
        for option in grid:
            textFileName = title[dropDownName].text
            #print(title[dropDownName].text)
            textFileName = textFileName.replace("/", "-")
            dropDownName += 1


            years = option.find_all("tr", {"class" : "plangridyear"})
            #print(years)

            information = option.find_all("tr")
            #print(information)

            for row in information:
                #print(row)
                if "plangridyear" in row['class']:
                    if len(leftSemester) == 0:
                        pass
                    else:
                        jayBoyToJSON(leftSemester, leftCred, semester, planUrl)
                        semester += 1
                        jayBoyToJSON(rightSemester, rightCred, semester, planUrl)
                        semester += 1
                        '''
                        print(leftSemester)
                        print(leftCred)
                        print(rightSemester)
                        print(rightCred)
                        '''
                        leftSemester = []
                        rightSemester = []
                        leftCred = []
                        rightCred = []
                    #print(row.text)
                    #print("New Year:!!!!!!!!!!!!!!!!!!!!!!")
                    #print(data)
                    #print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

                if "even" in row['class'] or "odd" in row['class']:
                    #print(row)
                    courses = row.find_all("td")
                    if len(courses) == 3:
                        if courses[2].has_attr('colspan'):
                            leftSemester.append(cleanString(courses[0].text))
                            leftCred.append(courses[1].text)
                            #then second sem is blank
                        elif courses[0].has_attr('colspan'):
                            #then first sem is blank
                            rightSemester.append(cleanString(courses[1].text))
                            rightCred.append(courses[2].text)

                    elif len(courses) == 4:
                        leftSemester.append(courses[0].text)
                        leftCred.append(courses[1].text)
                        rightSemester.append(courses[2].text)
                        rightCred.append(courses[3].text)
                    #print(leftSemester)
                    #print(rightSemester)
            
                
            jayBoyToJSON(leftSemester, leftCred, semester, planUrl)
            semester += 1
            jayBoyToJSON(rightSemester, rightCred, semester, planUrl)
            semester += 1
            #print(data)
            #print("\n\n\n")

            with open(textFileName + ".json", 'w') as outfile:
                    json.dump(data, outfile)

            titles.append(textFileName)


            data = []
            leftSemester = []
            rightSemester = []
            leftCred = []
            rightCred = []
            semester = 1

        #here data is done for 1 major
        
            

with open("arrayGuy.json", 'w') as outfile:
    outfile.write(str(titles))
