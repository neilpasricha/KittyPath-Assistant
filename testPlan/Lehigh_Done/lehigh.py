from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json


planUrl = "http://lehighvalley.psu.edu/degrees"
planPage = urlopen(planUrl)
planSoup = BeautifulSoup(planPage, "html.parser")
links = planSoup.find_all('div', {'class': 'item-list'})
count = 0

url1 = "http://lehighvalley.psu.edu/arts-administration"
planPage1 = urlopen(url1)
planSoup1 = BeautifulSoup(planPage1, "html.parser")
links1 = planSoup1.find_all('div', {'class': 'field-item even'})
count1 = 0

url2 = "http://lehighvalley.psu.edu/business"
planPage2 = urlopen(url2)
planSoup2 = BeautifulSoup(planPage2, "html.parser")
links2 = planSoup2.find_all('div', {'class': 'field-item even'})
count2 = 0

url3 = "http://lehighvalley.psu.edu/corporate-communication"
planPage3 = urlopen(url3)
planSoup3 = BeautifulSoup(planPage3, "html.parser")
links3 = planSoup3.find_all('div', {'class': 'field-item even'})
count3 = 0

url4 = "http://lehighvalley.psu.edu/health-policy-and-administration"
planPage4 = urlopen(url4)
planSoup4 = BeautifulSoup(planPage4, "html.parser")
links4 = planSoup4.find_all('div', {'class': 'field-item even'})
count4 = 0

url5 = "http://lehighvalley.psu.edu/information-sciences-and-technology"
planPage5 = urlopen(url5)
planSoup5 = BeautifulSoup(planPage5, "html.parser")
links5 = planSoup5.find_all('div', {'class': 'field-item even'})
count5 = 0

url6 = "http://lehighvalley.psu.edu/psychology"
planPage6 = urlopen(url6)
planSoup6 = BeautifulSoup(planPage6, "html.parser")
links6 = planSoup6.find_all('div', {'class': 'field-item even'})
count6 = 0

url7 = "http://lehighvalley.psu.edu/rehabilitation-and-human-services"
planPage7 = urlopen(url7)
planSoup7 = BeautifulSoup(planPage7, "html.parser")
links7 = planSoup7.find_all('div', {'class': 'field-item even'})
count7 = 0

url8 = "http://lehighvalley.psu.edu/project-supply-chain-management"
planPage8 = urlopen(url8)
planSoup8 = BeautifulSoup(planPage8, "html.parser")
links8 = planSoup8.find_all('div', {'class': 'field-item even'})
count8 = 0

open("Lehigh_Plan_Links.txt", "w").close()
with open("Lehigh_Plan_Links.txt", 'a') as outfile:
	for i in links:
		#j = i.find_all('a', href = True)
		#for k in j:
		#outfile.write(i.text)
		#outfile.write('\n')
		count+=1
		for k in i:
			if count == 1:
				pass
			if count > 9:
				break
			if count == 2:
				for k in links1:
					j = k.find_all('a', href = True)
					for b in j:
						count1 +=1
						if count1 == 1:
							pass
						if count1 == 2:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
							count+=1
							break
			if count == 3:
				for k in links2:
					j = k.find_all('a', href = True)
					for b in j:
						count2 +=1
						if count2 == 1:
							pass
						if count2 == 2:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
						if count2 == 3:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
							count+=1
							break
			if count == 4:
				for k in links3:
					j = k.find_all('a', href = True)
					for b in j:
						#outfile.write(b.text)
						#outfile.write(b['href'])
						count3 +=1
						if count3 == 1:
							#outfile.write(b.text)
							pass
						if count3 == 2:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
							count+=1
							break
			if count == 5:
				for k in links4:
					j = k.find_all('a', href = True)
					for b in j:
						#outfile.write(b.text)
						#outfile.write(b['href'])
						count4 +=1
						if count4 == 1:
							#outfile.write(b.text)
							pass
						if count4 == 2:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
							count+=1
							break
			if count == 6:
				for k in links5:
					j = k.find_all('a', href = True)
					for b in j:
						count5 +=1
						if count5 == 1:
							pass
						if count5 == 2:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
						if count5 == 3:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
							count+=1
							break
			if count == 7:
				for k in links6:
					j = k.find_all('a', href = True)
					for b in j:
						count6 +=1
						if count6 == 1:
							pass
						if count6 == 2:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
						if count6 == 3:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
						if count6 == 4:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
							count+=1
							break
			if count == 8:
				for k in links7:
					j = k.find_all('a', href = True)
					for b in j:
						count7 +=1
						if count7 == 1:
							pass
						if count7 == 2:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
						if count7 == 3:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
							count+=1
							break	
			if count == 9:
				for k in links8:
					j = k.find_all('a', href = True)
					for b in j:
						count8 +=1
						if count8 == 1:
							pass
						if count8 == 2:
							#outfile.write(b.text)
							#outfile.write('\n')
							outfile.write(b['href'])
							outfile.write('\n')
							count+=1
							break

outfile.close()