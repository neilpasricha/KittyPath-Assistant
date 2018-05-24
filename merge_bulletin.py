import json

data2 = json.load(open('data2.js'))
data3 = json.load(open('data3.js'))
new = {}
for bclass in data3:
    if(bclass in data2):
        prereqs = data2[bclass]
        new[bclass] = {"url": data3[bclass]["url"], "prereqs": prereqs}
        # print(bclass)
with open('bulletin.js', 'w') as outfile:
    json.dump(new, outfile)