# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json
main_url = "http://bulletins.psu.edu/undergrad/courses/"
letters = list(string.ascii_uppercase)

def white_out(s):
    return re.sub('[\s]{2,}', ' ', s)

class_boiz = {}
for letter in letters:
    main_page = urlopen(main_url + letter)
    soupski = BeautifulSoup(main_page, "html.parser")
    nav_list = soupski.find(id="leftNavListing")
    hrefs = nav_list.find_all('a')
    # get all links for that letter
    for i in range(0, len(hrefs)):
        next_link = urljoin(main_url, hrefs[i]["href"]).replace(" ", "%20")
        next_doc_soup = BeautifulSoup(urlopen(next_link), "html.parser")
        classes = next_doc_soup.find("div", {"class": "col1"}).find_all("p")
        for c in classes:
            text = white_out(c.text)
            details=text.split(".")[0]
                  
            print(details)
            alltags=c.find_all("a")
            index=1
            prerequesites=[]
            for a in alltags:
                if index==2:
                    print("prereqs:")
                                
                if index<2:
                    print("class:")
                    header=a.text
                    print(header)
                else:  
                    prerequesites.append(a.text)
                    print(a.text)
                index=index+1
            class_boiz[header] = {"prerequesites": prerequesites, "details": details}
                            



with open('bulletin.js', 'w') as outfile:
    json.dump(class_boiz, outfile)