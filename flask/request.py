import requests

url = 'http://localhost:5000/api'

exp = 1
while exp > 0 :
    r = requests.post(url,json={'exp':exp,})
    print(r.json())
    print(exp)
    exp = exp - 0.1