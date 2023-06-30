import requests

song_names = [
  "You’re Losing Me",
"Sprinter",
"Cupid (Twin Version)",
"YOASOBI - アイドル (Idol) ",
"FIFTY FIFTY - Cupid (English Translation)",
"Attention",
"The Hillbillies",
"​bread & butter",
"Popular",
"イマセ (imase) - NIGHT DANCER ",
"Area Codes",
"Barbie World (Ft. Aqua)",
"MiMiMaMaMu",
"Stray Kids - 특 (S-Class) ",
"​fukumean",
"Dial Drunk",
"Call Your Mom",
"BTS - Take Two (English Translation)",
"Calm Down",
"Let It Grow",
"FREE SPIRIT",
"The Real Slim Shady",
"Hits Different",
"Style",
"Put It On Da Floor Again (Ft. Cardi B)",
"MATHEMATICAL DISRESPECT",
"Super Bowl",
"Parade on Cleveland (Ft. Drake)",
"Princess Diana",
"All My Life (Ft. J. Cole)",
"You’re Gonna Go Far",
"Part of Your World",
"Annihilate (Spider-Man: Across the Spider-Verse)",
"One of the Girls",
"Take Two",
"What It Is (Solo Version)",
"Am I Dreaming",
"Fly Me to the Moon (Ft. Count Basie)",
"Mahal Pa Rin Kita",
"Calling (Spider-Man: Across the Spider-Verse) (Ft. A Boogie wit da Hoodie)",
"Part of Your World",
"Intro La Divina Commedia",
"Paradiso Artificiale (Ft. Baby Gang & Kid Yugi)",
"Do I Wanna Know?",
"Bad Bunny - WHERE SHE GOES (English Translation)",
"藤井風 (Fujii Kaze) - 死ぬのがいいわ (Shinunoga E-Wa) ",
"Trojan Horse",
"No Complaints",
"Made It This Far (Ft. Vory)",
"All Too Well"
]

url = "https://spotify23.p.rapidapi.com/search/"
headers = {
    "X-RapidAPI-Key": "8fdc060475msh59dca9a6d7cef8cp109777jsn3485d134fba7",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
}

for song_name in song_names:
    querystring = {"q": song_name, "type": "tracks", "offset": "0", "limit": "1", "numberOfTopResults": "1"}
    response = requests.get(url, headers=headers, params=querystring)
    data = response.json()
    if "tracks" in data and "items" in data["tracks"] and len(data["tracks"]["items"]) > 0:
        song_uri = data["tracks"]["items"][0]["data"]["uri"]
        song_uri = song_uri.replace("spotify:track:", "")
        print("{ song_id:", song_uri, "}")
