from sre_parse import CATEGORIES
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

# # Request for a certain item using item id
# desired_api_url = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items/10818466'
# parameters = {
#     # 'zip': 46556
#     # these will be used in the future, but this product lookup doesn't have any required parameters
# }
# request = requests.get(desired_api_url, params=parameters, headers=headers)
# print(request.json())



# Request for a certain item
desired_api_url = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/taxonomy'
parameters = {}
# dictionary with key: the names of walmart departments as appearing on walmart.com, and value: associated id to use in other api calls
departments = dict()
# dictionary with key: the names of walmart food subdepartments as appearing on walmart.com, and value: associated id to use in other api calls
food_departments = dict()
pantry_subcategories = dict()
snacks_cookies_chips_subcategories = dict()
deli_subcategories = dict()
fresh_produce_subcategories = dict()
dairy_eggs_subcategories = dict()
beverages_subcategories = dict()
candy_subcategories = dict()
international_food_subcategories = dict()
organic_shop_subcategories = dict()
condiments_sauces_spices_subcategories = dict()
dietary_lifestyle_subcategories = dict()
from_our_brands_subcategories = dict()
all_food_subcategories = dict()
game_time_food_subcategories = dict()
weekly_trips_subcategories = dict()
food_workpage_subcategories = dict()
bakery_bread_subcategories = dict()
breakfast_cereal_subcategories = dict()
baking_subcategories = dict()
coffee_subcategories = dict()
specialty_shops_subcategories = dict()
meal_delivery_services_subcategories = dict()
seasonal_grocery_subcategories = dict()
pringles_cheezit_subcategories = dict()
alcohol_subcategories = dict()
grab_and_go_subcategories = dict()
comfort_food_subcategories = dict()
healthy_food_benefits_subcategories = dict()
fresh_food_subcategories = dict()
frozen_foods_subcategories = dict()
meat_seafood_subcategories = dict()
food_gifts_flowers_shop_subcategories = dict()
testing_season_subcategories = dict()
new_food_items_subcategories = dict()
taxonomy_response = requests.get(desired_api_url, params=parameters, headers=headers)
if taxonomy_response:
    taxonomy_json = taxonomy_response.json()
    categories_list = taxonomy_json["categories"]
    for dep in categories_list:
        # should id be saved instead or some sort of dict?
        departments[dep["name"]] = dep["id"]
        if(dep["name"] == "Food"):
            # for subdep in dep["food"]:
            for subdep in dep["children"]:
                food_departments[subdep["name"]] = subdep["id"]
                if (subdep["name"] == "Pantry"):
                    for category in subdep["children"]:
                        pantry_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Snacks, Cookies & Chips"):
                    for category in subdep["children"]:
                        snacks_cookies_chips_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Deli"):
                    for category in subdep["children"]:
                        deli_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Fresh Produce"):
                    for category in subdep["children"]:
                        fresh_produce_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Dairy & Eggs"):
                    for category in subdep["children"]:
                        dairy_eggs_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Beverages"):
                    for category in subdep["children"]:
                        beverages_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Candy"):
                    for category in subdep["children"]:
                        candy_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "International Food"):
                    for category in subdep["children"]:
                        international_food_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Organic Shop"):
                    for category in subdep["children"]:
                        organic_shop_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Condiments, Sauces & Spices"):
                    for category in subdep["children"]:
                        condiments_sauces_spices_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Dietary & Lifestyle Shop"):
                    for category in subdep["children"]:
                        dietary_lifestyle_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "From Our Brands"):
                    for category in subdep["children"]:
                        from_our_brands_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Bakery & Bread"):
                    for category in subdep["children"]:
                        bakery_bread_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Breakfast & Cereal"):
                    for category in subdep["children"]:
                        breakfast_cereal_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Baking"):
                    for category in subdep["children"]:
                        baking_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Coffee"):
                    for category in subdep["children"]:
                        coffee_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Specialty Shops"):
                    for category in subdep["children"]:
                        specialty_shops_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Meal Delivery Services"):
                    for category in subdep["children"]:
                        meal_delivery_services_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Seasonal Grocery"):
                    for category in subdep["children"]:
                        seasonal_grocery_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Pringles & Cheez-It"):
                    for category in subdep["children"]:
                        pringles_cheezit_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Alcohol"):
                    for category in subdep["children"]:
                        alcohol_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Grab & Go"):
                    for category in subdep["children"]:
                        grab_and_go_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Comfort food"):
                    for category in subdep["children"]:
                        comfort_food_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Healthy Food Benefits"):
                    for category in subdep["children"]:
                        healthy_food_benefits_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Fresh Food"):
                    for category in subdep["children"]:
                        fresh_food_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Frozen Foods"):
                    for category in subdep["children"]:
                        frozen_foods_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Meat & Seafood"):
                    for category in subdep["children"]:
                        meat_seafood_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Food Gifts & Flowers Shop"):
                    for category in subdep["children"]:
                        food_gifts_flowers_shop_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "Testing Season"):
                    for category in subdep["children"]:
                        testing_season_subcategories[category["name"]] = category["id"]
                if (subdep["name"] == "New Food Items"):
                    for category in subdep["children"]:
                        new_food_items_subcategories[category["name"]] = category["id"]
else:
    print("There has been error retreiving the data")

# print(departments)
# print(food_departments)
# print(pantry_subcategories)
# print(snacks_cookies_chips_subcategories)
# print(deli_subcategories)
print(food_gifts_flowers_shop_subcategories)

# get the subcategories of a category:
# def get_subcategory_taxonomy(parent):
#     parent_id = departments[parent]
