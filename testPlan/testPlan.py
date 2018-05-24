from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json

'''
def regExCheck(stringTest):
    #could do a fatty regEx with or but I figured for readability just do a few
    [A-Z]{1,5}" "[0-9]{1,4}                         # CMPSC 360/ACCTG 100/AG 100
    [A-Z]{1}" "[A-Z]{1}" "[A-Z]{1}" "[0-9]{1,4}     # A S M 217
    [A-Z]{1,4}(" "|"&"|" & ")[A-Z]{1,4}" "[0-9]{1,4}       
    # AG BM 101/A E 202/ A&A 110/H&SS 097 / C & S 298

    #[A-Z]{1,3}"&"[A-Z]{1,3}" "[0-9]{1,4}        
    #[A-Z]{1,3}" & "[A-Z]{1,3}" "[0-9]{1,4}   

    # if it isnt one of these then it is a gen ed course and it will use this regEx
    [A-Za-z]+" ("[A-Z]+")"
'''





def jayBoyToJSON(classArray, creditArray, semester, planUrl):

    planUrlArr = planUrl.split("\n")

    #print("creds:" + str(creditArray) )
    jsonBoy = {
        'semester' : semester,
        'classes'  : [],
        'website'  : planUrlArr[0]
    }

    for i in range(0,len(classArray)):
        jsonBoy['classes'].append(classArray[i])
        jsonBoy['classes'].append(creditArray[i])

    #print(jsonBoy)
    
    data.append(jsonBoy)
    
    #print(jsonBoy['classes'])
    


main_url = "https://dus.psu.edu/recommended-academic-plans"
main_page = urlopen(main_url)
soup = BeautifulSoup(main_page, "html.parser")


#planUrl = "https://rap.psu.edu/computer-science-comp-recommended-academic-plan"
planUrl = "https://rap.psu.edu/computer-science-22-comp-recommended-academic-plan"



with open("Shenango_Plan_Links.txt", 'r') as readFile:
    planLinks = readFile.readlines()

titles = []

for i in planLinks:

    data = []

    planUrl = i

    planPage = urlopen(planUrl)
    planSoup = BeautifulSoup(planPage, "html.parser")
    semesters = planSoup.find_all("div", {"class": "rap-field-collection"})

    textFileName = ""

    for a in planSoup.find_all("h1", {"class": "title"}):
        titles.append(a.text)
        textFileName = a.text + ".json"
        textFileName = textFileName.replace("/", "-")
        print(textFileName)

        #mess with file path directories about here to place file in the right place
        if("2+2" in textFileName):
            print("This one!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")


        open(textFileName,'w').close()

        jasonString = ""



        for i in planSoup.find_all("div", {"class": "rap-field-collection"}):
            #print(i.contents)

            #semester += 1
            semClasses = []
            semCreds = []


            semRap = i.find_all("h3")
            semester = semRap[0].text
            #print(semRap[0].text)





            for line in i.find_all("tr", {"class": "field_collection_item"}):
                #print("!!" + line.text + "!!")

                textList = []

                basePrint = line.find_all("div", {"class": "printfloat"})

                if len(basePrint) == 0:
                    pass
                else:

                    showPrints = basePrint[0].find_all("h4", {"class": "hideprint"})
                    noShowPrints = basePrint[0].find_all("a", href=True)

                    if(len(showPrints) > 0):
                        textList.append(showPrints[0].text)
                    elif (len(noShowPrints) > 0):
                        textList.append(noShowPrints[0].text)
                    else:
                        textList.append(basePrint[0].text)

                
                    if len(basePrint) == 1 and len(showPrints) == 1 and len(noShowPrints) == 0:
                        textList[len(textList) - 1] = line.text

                    if textList[0] == ' ':
                        textList[len(textList) - 1] = line.text



                orPrints = line.find_all("div", {"class": "orcourse"})

                for course in orPrints:

                    showPrints = course.find_all("h4", {"class": "hideprint"})
                    noShowPrints = course.find_all("a", href=True)


                    if(len(showPrints) > 0):
                        textList.append("or " + showPrints[0].text)
                    elif (len(noShowPrints) > 0):
                        textList.append("or " + noShowPrints[0].text)
                    else:
                        textList.append(course.text)
                


                #print(textList)



                credits = line.find_all("td", {"class" : "field_credits"})
                if(len(credits) != 0):
                    creditsText = credits[0].text
                    #print(creditsText)
                    semCreds.append(creditsText)
                else:
                    semCreds.append("DNF")

            # print("!!!" + str(textList) + "!!!")

                for line in textList:
                    iArr = line.split('\n')
                    iArr = iArr[0].split(" - ")
                    iArr = iArr[0].split('Requirements')
                    iArr = iArr[0].split('^')
                    iArr = iArr[0].split('\r')
                    iArr = iArr[0].split(' in consultation')

                    line = iArr[0]

                    #print("HeRE:!" + str(iArr[0]) + "!end")

                    iArr[0] = iArr[0].strip(' ')
                    #print("Semester: " + str(semester))
                    course = iArr[0]

                    if course[0] == 'o':
                        semClasses[len(semClasses)-1] = semClasses[len(semClasses)-1] + " " + course
                    else:
                        semClasses.append(str(iArr[0]))

            #print("Semester: " + str(semester))
            #print(semClasses)

            jayBoyToJSON(semClasses, semCreds, semester, planUrl)


    with open(textFileName, 'a') as outfile:
            json.dump(data, outfile)

with open("arrayGuy.json", 'w') as outfile:
    outfile.write(str(titles))

