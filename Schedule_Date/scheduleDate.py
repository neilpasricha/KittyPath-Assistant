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


baseUrl = "http://www.registrar.psu.edu/Reg_Timetable/RegTimetable_Main.cfm"
basePage = urlopen(baseUrl)
baseSoup = BeautifulSoup(basePage, "html.parser")

mainDiv = baseSoup.find_all("div", {"id" : "content2"})


links = mainDiv[0].find_all("a", href = True)

for semester in links:
    if "spring" in semester["href"]:
        springString = semester["href"]
    if "fall" in semester["href"]:
        fallString = semester["href"]

baseString = "http://www.registrar.psu.edu/Reg_Timetable/"
springString = baseString + springString
fallString = baseString + fallString

springPage = urlopen(springString)
fallPage = urlopen(fallString)

springSoup = BeautifulSoup(springPage, "html.parser")
fallSoup = BeautifulSoup(fallPage, "html.parser")

data = {}




tables = springSoup.find_all("table", {"class" : "campuses"})

for degreeType in tables:
    if "Spring 2018 registration dates for undergraduate students." in degreeType['summary']:
        underGrad = degreeType

body = underGrad.find_all("tbody")

rows = body[0].find_all("tr")


for row in rows:

    info = row.find_all("td")

    creditString = info[0].text
    dateString = info[1].text

    data[creditString] = {}

    dates = {

        'semester' : "Spring",        #fall/spring
        'credits'  : creditString,        #cred
        'date'     : dateString

    }

    data[creditString]['Spring'] = dates



tables = fallSoup.find_all("table", {"class" : "campuses"})

for degreeType in tables:
    if "Fall 2018 registration dates for undergraduate students." in degreeType['summary']:
        underGrad = degreeType

body = underGrad.find_all("tbody")

rows = body[0].find_all("tr")


for row in rows:

    info = row.find_all("td")

    creditString = info[0].text
    dateString = info[1].text


    dates = {

        'semester' : "Fall",        #fall/spring
        'credits'  : creditString,        #cred
        'date'     : dateString

    }
    
    data[creditString]['Fall'] = dates




with open("dates.json", 'w') as outfile:
    json.dump(data, outfile)



