import requests

url = "https://172.17.247.225:29444/gappapi"

payload = "{\n\t\"DateFrom\": \"2019-02-21T00:00:00Z\",\n    \"DateTo\": \"2019-02-21T23:59:59Z\",\n    \"OnlyNewest\": false,\n    \"AreaName\": null,\n    \"LayerName\": null,\n    \"DeviceName\": null,\n   \t\"LayerType\": null,\n\t\"DataType\": null,\n\t\"SenderId\": null\n}"
headers = {
    'cache-control': "no-cache",
    'Postman-Token': "17e63bb9-f755-4781-a015-9b32be9797e5"
    }

response = requests.request("POST", url, data=payload, headers=headers)

print response.text