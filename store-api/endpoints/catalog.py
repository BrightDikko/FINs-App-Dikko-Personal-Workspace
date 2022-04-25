import time
import os
from dotenv import load_dotenv
import base64
import requests
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
import json

# Load env variables.
load_dotenv()

consumer_id = os.getenv('WALMART_CONSUMER_ID') #read your consumer id from .env
key_version = os.getenv('WALMART_PROD_KEY_VERSION') # read your key version from .env
time_in_ms = str(int(time.time() * 1000))

dict_for_hashing = {
    'WM_CONSUMER.ID' : consumer_id,
    'WM_CONSUMER.INTIMESTAMP' : time_in_ms,
    'WM_SEC.KEY_VERSION' : key_version
}

# Encode the dict_for_hashing into a hash string - must be in the order below
hash_str = dict_for_hashing['WM_CONSUMER.ID'] + '\n' + \
                   dict_for_hashing['WM_CONSUMER.INTIMESTAMP'] + '\n' + \
                   dict_for_hashing['WM_SEC.KEY_VERSION'] + '\n'
encodedHashString = hash_str.encode()

# Read the private key from ./WM_IO_private_key.pem, or wherever you stored it
try:
    with open('./WM_IO_private_key.pem', 'r') as f:
        key = RSA.importKey(f.read())
except IOError as err:
    print("Could not read private key AAAGH!!", err)

# Get the auth signature required for request header
hasher = SHA256.new(encodedHashString)
signer = PKCS1_v1_5.new(key) # use key we created with private key here
signature = signer.sign(hasher)
encoded_signature = str(base64.b64encode(signature), 'utf-8')

# Headers for the request to use.
# This should remain the same for any request to WM IO - Affiliate APIs.
headers = {
    'Content-Type' : 'application/json',
    'WM_CONSUMER.ID' : consumer_id,
    'WM_CONSUMER.INTIMESTAMP' : time_in_ms,
    'WM_SEC.AUTH_SIGNATURE' : encoded_signature,
    'WM_SEC.KEY_VERSION' : key_version,
    'WM_QOS.CORRELATION_ID' : 'afjksldkfj4r8ojfns',
    'WM_IFX.CLIENT_TYPE' : 'INTERNAL',
    'WM_PREVIEW' : 'false',
    'WM_SHOW_REASON_CODES' : 'ALL',
}

# RUN A CATALOG SEARCH ON WALMART FOOD CATEGORY

# Request for a certain item using item id
desired_api_url = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/paginated/items'
parameters = {
    'category': 976759 # food department id
    # these will be used in the future, but this product lookup doesn't have any required parameters
}
request = requests.get(desired_api_url, params=parameters, headers=headers)
pageResponse = request.json() # dictionary of the first page of the catalog
for item in pageResponse["items"]:
    if "upc" in item:
        print(item["upc"]) # can access all fields of information for items, but make sure to check key is in there because not always included in every item; itemId and name will always be included


# this loop continues making api calls to read through paginated catalog retrun
while pageResponse["nextPageExist"]:
    desired_api_url = 'https://developer.api.walmart.com' + pageResponse["nextPage"]
    request = requests.get(desired_api_url, params=parameters, headers=headers)
    pageResponse = request.json() # dictionary of new page of catalog
    if not pageResponse["items"]: # terminate if the list is empty- sort of a walmart bug to include next page with empty list
        continue
    else:
        for item in pageResponse["items"]:
            print(item["itemId"])
