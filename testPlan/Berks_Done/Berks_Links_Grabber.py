from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json

planUrl = "http://berks.psu.edu/recommended-academic-plans"
planPage = urlopen(planUrl)
planSoup = BeautifulSoup(planPage, "html.parser")

fieldItems = planSoup.find_all("div", {"class" : "field-item even"})

open("Berks_Links.txt", "w").close()

with open("Berks_Links.txt", 'a') as outfile:
    for i in fieldItems:
        links = i.find_all('a', href = True)
        for p in links:
            if("College" not in p.text):
                if("View Program" not in p.text):
                    outfile.write(p['href'])
                    outfile.write('\n')
            
outfile.close()


