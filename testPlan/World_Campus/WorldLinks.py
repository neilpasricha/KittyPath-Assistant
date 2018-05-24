from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
from urllib.request import Request, urlopen
import string
import re
import json



planUrl = Request("https://student.worldcampus.psu.edu/courses/recommended-academic-plans", headers={'User-Agent':'Mozilla/5.0'})
planPage = urlopen(planUrl).read()
planSoup = BeautifulSoup(planPage, "html.parser")
links = planSoup.find_all('div', {"class" : "field-item even"})

count = 0
open("WorldLinks.txt", "w").close()

with open("WorldLinks.txt", 'a') as outfile:
    for i in links:

        finals = i.find_all("a", href = True)

        for final in finals:
            count += 1
            #print(final['href'])
            outfile.write(final['href'] + "\n")

    print(count)
outfile.close()


