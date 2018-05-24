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
        class_listy = next_doc_soup.find("div", {"class": "col1"}).find_all("a")
        # print(class_listy)
        for j in range(2, len(class_listy)):
            if class_listy[j].has_attr('href') and len(class_listy[j].text) > 3:
                class_name = class_listy[j].text
                class_link = urljoin(main_url, class_listy[j]["href"].replace(" ", "%20"))
                if class_name not in class_boiz:
                    try:
                        class_page_soup = BeautifulSoup(urlopen(class_link), "html.parser")
                        print(class_name)
                        class_info = class_page_soup.find("div", {"class": "col1"}).find_all("p")
                        if len(class_info) == 3:
                            header = white_out(class_info[0].text)
                            details = white_out(class_info[1].text)
                            note = white_out(class_info[2].text)
                            class_boiz[class_name] = {"header": header, "details": details, "note": note}
                    except:
                        print("bulletin html bug")
            else:
                print("no href m y g u y")

with open('data2.js', 'w') as outfile:
    json.dump(class_boiz, outfile)