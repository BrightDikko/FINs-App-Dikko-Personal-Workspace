# Import libraries.
import os
import csv
import json
import geocoder

import requests
from dotenv import load_dotenv

# Load env variables.
load_dotenv()

# env variables
WALMART_CONSUMER_ID = os.getenv('WALMART_CONSUMER_ID')
WALMART_API_PRIVATE_KEY = os.getenv('WALMART_API_PRIVATE_KEY')
WALMART_PROD_KEY_VERSION = os.getenv('WALMART_PROD_KEY_VERSION')

# request header
HEADER = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0'}

# file paths
PRODUCTS_CSV_FILEPATH = './data/products.csv'
QUERY_RESULTS_FILEPATH = './data/query_results.json'


def get_lat_long():
    """
    Get the latitude and longitude of the current user.
    :return: list
    """

    geo = geocoder.ip('me')
    return geo.latlng


def get_nearest_qualifying_walmart_store():
    """
    Get the store ID of the nearest walmart store depending on the user's location.
    :return: int
    """

    url = 'https://search.mobile.walmart.com/v1/stores/locate'
    user_lat_long = get_lat_long()

    params = {
        'lat': user_lat_long[0],
        'long': user_lat_long[1],
        'offset': 0,
        'count': 10
    }

    response = requests.get(url=url, params=params, headers=HEADER)
    if response.status_code != 200:
        raise requests.RequestException('store locator http request failed')

    for store in response.json():
        store_id = store.get("iD")
        store_address = store.get("address")
        address_str = f'{store_address.get("street1")}, {store_address.get("city")} ' \
                      f'{store_address.get("state")}-{store_address.get("zip")}, {store_address.get("country")}'

        store_services = store.get("storeServices")
        is_allowing_grocery_pickup_and_delivery = False
        for service in store_services:
            if service.get("name") == "Grocery Pickup and Delivery" and\
                    service.get("serviceStatus") == "SERVICE_ONLINE":
                is_allowing_grocery_pickup_and_delivery = True

        if is_allowing_grocery_pickup_and_delivery:
            print(f"Using store at: {address_str}")
            print(f"Store ID: {store_id}")
            return store_id

    # No qualifying walmart store found nearby.
    return -1


def query_product(product, store_id, fetch_limit=50):
    """
    Query a given product on the Walmart API and return fetch_limit max results.
    :param product: product to query.
    :param store_id: ID of the closest Walmart store.
    :param fetch_limit: number of items to fetch for the product.
    :return: list
    """

    url = 'https://search.mobile.walmart.com/search'

    default_offset = 50
    params = {
        'query': product,
        'store': store_id,
        'size': default_offset,
        'offset': 0
    }

    response = requests.get(url=url, params=params, headers=HEADER)
    if response.status_code != 200:
        raise requests.RequestException('product search http request failed')
    response_json = response.json()

    query_results = []

    product_total_count = response_json.get("totalCount")

    while product_total_count > 0:
        search_results = response_json.get("results")
        for result in search_results:
            if len(query_results) >= fetch_limit:
                break

            query_results.append({
                "name": result.get("name"),
                "score": result.get("score"),
                "upc": result.get("productId").get("upc"),
                "location": result.get("location"),
                "inventory": result.get("inventory")
            })

        product_total_count -= response_json.get("count")
        if product_total_count <= 0:
            continue

        params["offset"] += default_offset
        response = requests.get(url=url, params=params, headers=HEADER)
        if response.status_code != 200:
            raise requests.RequestException(
                'product search http request failed')
        response_json = response.json()

    return query_results


def get_walmart_products(products_csv_filepath):
    """
    Given a csv containing product names and the number of items to fetch per product,
    get_walmart_products queries the walmart catalog and returns the most relevant matching products.
    :param products_csv_filepath: filepath of the csv containing product names.
    :return: none
    """

    products = []
    query_results = {}

    # get all products from the products csv file.
    with open(products_csv_filepath, 'r') as product_file:
        reader = csv.reader(product_file)
        for row in reader:
            products.extend(row)

    closest_store_id = get_nearest_qualifying_walmart_store()

    for product in products:
        print(f"Fetched: {product}")
        query_results[product] = query_product(product, closest_store_id)

    print("Attempting to store queried results")
    with open(QUERY_RESULTS_FILEPATH, 'w') as json_file:
        json.dump(query_results, json_file, indent=4, sort_keys=True)
    print(f"Query results saved in: {QUERY_RESULTS_FILEPATH}")


get_walmart_products(PRODUCTS_CSV_FILEPATH)
