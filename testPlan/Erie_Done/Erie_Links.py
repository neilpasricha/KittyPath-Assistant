#There are three nursing degree links you must find i just did it by hand
#it was simplier it was the school of nursing in Erie

from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json
import urllib.request

planUrl = "http://behrend.psu.edu/academics/academic-services/acpc/acpc-services/academic-advising-and-planning/recommended-academic-plans"
planPage = urlopen(planUrl)
planSoup = BeautifulSoup(planPage, "html.parser")

links = planSoup.find_all('div', {'class': 'field-item even'})

open("Erie_Links.txt", "w").close()

with open("Erie_Links.txt", 'a') as outfile:
	for i in links:
		subpages = i.find_all('a', href=True)
		print("!!!" + str(len(subpages)) + "!!!!")

		for page in subpages:
			if("Nursing" not in page.text):
				url = page['href']
				collegePage = urlopen("http://behrend.psu.edu" + url)
				collegeSoup = BeautifulSoup(collegePage, "html.parser")
				majors = collegeSoup.find_all('div', {"class" : "field field-name-body field-type-text-with-summary field-label-hidden"})
				#print("!!!!!!!!!!!!!!!!!")
				#print(len(majors))
				for major in majors:
					linkPages = major.find_all('a', href = True)
					for finalLink in linkPages:
						outfile.write(finalLink['href'])
						outfile.write("\n")
    	
outfile.close()