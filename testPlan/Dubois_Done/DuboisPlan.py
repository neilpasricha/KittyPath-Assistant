from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json

planUrl = "http://dubois.psu.edu/recommended-academic-plans"
planPage = urlopen(planUrl)
planSoup = BeautifulSoup(planPage, "html.parser")
links = planSoup.find_all('div', {'class': 'field-item even'})
count = 0
open("Dubois_Plan_Links.txt", "w").close()
with open("Dubois_Plan_Links.txt", 'a') as outfile:
	for i in links:
		j = i.find_all('a', href = True)
		for k in j:
			if count == 21:
				break
			outfile.write(k['href'])
			outfile.write('\n')
			count+=1

		#print(j)
		#print(i.text)

outfile.close()
