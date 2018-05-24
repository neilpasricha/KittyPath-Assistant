from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json

planUrl = "http://newkensington.psu.edu/recommended-academic-plans"
planPage = urlopen(planUrl)
planSoup = BeautifulSoup(planPage, "html.parser")
links = planSoup.find_all('div', {'class': 'field-item even'})
count = 0
open("New_Kensington_Plan_Links.txt", "w").close()

with open("New_Kensington_Plan_Links.txt", 'a') as outfile:
	for i in links:
		tabs=i#.find_all('ul')
		for j in tabs.find_all(href=True):
			if(count == 18):
				break
			outfile.write(j['href'])
			outfile.write('\n')
			#print(j['href'])
			count= count+1
			#print(j.text)
outfile.close()
