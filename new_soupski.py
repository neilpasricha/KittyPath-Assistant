from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urljoin
import string
import re
import json
def seperate_prereqs(extra):
    string = extra.getText().replace(u'\xa0', u' ')
    if len(re.findall("[A-Z]{2,}[0-9]{1,}", string.replace("Prerequisite:", "").replace(" ", ""))):
        string = string.replace("Prerequisite:", "").replace(" ", "")
        return re.findall("[A-Z]{2,}[0-9]{1,}", string)
    else:
        return list(set(map(lambda x: ''.join(x.split(' ')).upper(), re.findall("[A-Za-z]{2,} [0-9]{1,}", string))))
    
def seperate_attrs(extra):
    lines = extra.find_all('p')
    attrs = []
    for line in lines:
        attrs.append(white_out(line.getText()))
    return attrs

def white_out(s):
    return re.sub('[\s]{2,}', ' ', s).strip().replace(u'\xa0', u' ')

def extract_credits(s):
    return re.search("[0-9]{1,}-[0-9]{1,}|([0-9]{1,})", s).group()

jason = {}
main_url = 'http://undergraduate.bulletins.psu.edu/university-course-descriptions/undergraduate/'
soupski = BeautifulSoup(urlopen(main_url), "html.parser")
nav_list = soupski.find(id="sidebar").find_all('a')
for subject in nav_list:
    print(subject["href"])
    subject_url = urljoin(main_url, subject["href"])
    subject_soupski = BeautifulSoup(urlopen(subject_url), "html.parser")
    bclasses = subject_soupski.find_all('div', {'class': 'courseblock'})
    for bclass in bclasses:
        class_sep = bclass.find('div', {'class': 'course_codetitle'}).getText().split(':')[0].split(' ')
        title = ''.join(class_sep)
        # print(class_sep)
        creds = extract_credits(bclass.find('div', {'class': 'course_credits'}).getText())
        # can be multiple extra blocks
        extras = bclass.find_all('div', {'class': 'courseblockextra'})
        prereqs = []
        attr = []
        url = "http://undergraduate.bulletins.psu.edu/search/?scontext=courses&search=" + '+'.join(class_sep)
        for extra in extras:
            if extra.find('strong'):
                prereqs = seperate_prereqs(extra)
            else:
                attr = seperate_attrs(extra)
        jason[title] = {'url': url, 'prerequisites': prereqs, 'attributes': attr, 'credits': creds}

    
with open('new_bulletin.js', 'w') as outfile:
    json.dump(jason, outfile)

