import json
import os

os.system("py vast.py show machines > ../vast.json")

f = open("../vast.json", "r")
vast = json.loads(f.read())

for i in vast:
   print("ID:",vast[i]["id"]),
   print("Hourly Earnings:",vast[i]["earn_hour"])
   print("Daily Earnings:",vast[i]["earn_day"])
   print("Reliability:",vast[i]["reliability2"])
   if vast[i]["clients"]:
      print("Job Status: Active job")
   else:
      print("Job Status: No job")
   print('\n')
f.close()

os.system("py reader.py > ../vast.txt")