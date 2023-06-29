import requests
import json


url = "https://genius-song-lyrics1.p.rapidapi.com/chart/songs/"

querystring = {"time_period":"month","per_page":"50","page":"1"}

headers = {
	"X-RapidAPI-Key": "8fdc060475msh59dca9a6d7cef8cp109777jsn3485d134fba7",
	"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())

if response.status_code == 200:
    data = response.json()
    chart_items = data.get('chart_items', [])
    extracted_data = []

    for item in chart_items:
        item_data = item.get('item', {})
        artist_data = item_data.get('artist', {})

        extracted_item = {
            'song-id': item_data.get('id'),
            'name': item_data.get('title_with_featured'),
            'artist': item_data.get('artist_names'),
            'release_date_for_display': item_data.get('release_date_for_display'),
            'cover_art_url': item_data.get('song_art_image_url')
        }
        extracted_data.append(extracted_item)

    # Step 7: Process the extracted data
    for item in extracted_data:
        print(item)  # Print the extracted data to the console or perform additional operations

else:
    print('Error:', response.status_code)
