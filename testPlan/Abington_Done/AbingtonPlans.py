from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json
import urllib.request

planUrl = "http://abington.psu.edu/academic-plans"
planPage = urlopen(planUrl)
planSoup = BeautifulSoup(planPage, "html.parser")
links = planSoup.find_all('div', {'class': 'field-item even'})
count = 0
open("Abington_Plan_Links", "w").close()

with open("Abington_Plan_Links", 'a') as outfile:
    for i in links:
    	for p in i.find_all('ul'):
	    	tabs=p.find_all('a', href=True)
	    	for j in tabs:
	    		if 'Elementary' in j.text:
	    			outfile.write('https://rap.psu.edu/recommended-academic-plan-elementary-early-childhood-education-ceaedeece')
	    			outfile.write('\n')
	    			pass
	    		elif '(IST)' in j.text:
	    			outfile.write('https://rap.psu.edu/recommended-academic-plan-information-sciences-and-technology-istbs-or-issab-integration-and')
	    			outfile.write('\n')
	    			outfile.write('https://rap.psu.edu/recommended-academic-plan-information-sciences-and-technology-istbs-or-isscc-information-systems-0')
	    			outfile.write('\n')
	    			pass
	    		elif 'Integrative' in j.text:
	    			outfile.write('https://rap.psu.edu/recommended-academic-plan-integrative-arts-iarab-abington')
	    			outfile.write('\n')
	    			pass
	    		elif 'Social Sciences' in j.text:
	    			outfile.write('https://rap.psu.edu/recommended-academic-plan-psychological-and-social-sciences-program-pssba-abington')
	    			outfile.write('\n')
	    			outfile.write('https://rap.psu.edu/recommended-academic-plan-psychological-and-social-sciences-program-pssbs-abington')
	    			outfile.write('\n')
	    			pass

	    		else:
		    		url="http://abington.psu.edu"+j['href']+"/academic-information"
		    		#print(url)
		    		page = urlopen(url)
		    		newsoup = BeautifulSoup(page, "html.parser")
		    		finalLink = newsoup.find_all('a', href=True)
		    		for h in finalLink:
	    			#for t in h.find_all('ul'):
	    				#doneyet = t.find_all('a', href=True)
	    				#print(h.text)
	    				#if('Elementary' in h.text):
	    					#pass
	    					#educationurl="https://rap.psu.edu/recommended-academic-plan-elementary-early-childhood-education-ceaedeece"
	    					#urllib.request.urlretrieve(englishurl, "test2")
	    					#outfile.write(educationurl)
	    					#outfile.write('\n')
	    				#else:
	    				if 'RAP' in h.text:
	    					outfile.write(h['href'])
	    					outfile.write('\n')

    	#outfile.write(i['href'])
    	#outfile.write('\n')
    	#print(i)
outfile.close()