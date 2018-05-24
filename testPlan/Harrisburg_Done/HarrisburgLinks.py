from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json


planUrl = "http://harrisburg.psu.edu/academics/recommended-academic-plans"
planPage = urlopen(planUrl)
planSoup = BeautifulSoup(planPage, "html.parser")
links = planSoup.find_all('a', href=True)

count = 0
open("PSUHarrisburg_Plan_Links", "w").close()

with open("PSUHarrisburg_Plan_Links", 'a') as outfile:
    for i in links:
        if 'Recommended Academic Plan' in i.text:
            count += 1                     
            if count == 1:                  #this is just to get rid of the first garbage link, will need to change
                pass
            else:
                #print(i['href'])
                outfile.write(i['href'])
                outfile.write('\n')
            
outfile.close()


