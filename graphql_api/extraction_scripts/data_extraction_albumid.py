import requests

url = "https://spotify23.p.rapidapi.com/search/"

headers = {
    "X-RapidAPI-Key": "8fdc060475msh59dca9a6d7cef8cp109777jsn3485d134fba7",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
}

album_names = [
    "Midnights (The Late Night Edition) - Taylor Swift",
    "La Divina Commedia - Tedua",
    "a Gift & a Curse - Gunna",
    "METRO BOOMIN PRESENTS SPIDER-MAN: ACROSS THE SPIDER-VERSE (SOUNDTRACK FROM AND INSPIRED BY THE MOTION PICTURE) - Metro Boomin",
    "Stick Season (We’ll All Be Here Forever) - Noah Kahan",
    "BUSINESS IS BUSINESS - Young Thug",
    "Split Decision - Dave & Central Cee",
    "Midnights (3am Edition) - Taylor Swift",
    "★★★★★ (5-STAR) - Stray Kids",
    "The Beginning: Cupid - FIFTY FIFTY (피프티피프티)",
    "Almost Healed - Lil Durk",
    "The Show - Niall Horan",
    "Did you know that there’s a tunnel under Ocean Blvd - Lana Del Rey",
    "GÉNESIS - Peso Pluma",
    "DC4* - Doja Cat",
    "Life Is But a Dream… - Avenged Sevenfold",
    "1989 (Deluxe) - Taylor Swift",
    "Lover (Target Exclusive/Japanese Edition) - Taylor Swift",
    "folklore - Taylor Swift",
    "The Marshall Mathers LP - Eminem",
    "The Idol, Vol. 1 (Music from the HBO Original Series) - The Weeknd",
    "Stray Kids - ★★★★★ (5-STAR) (Romanized) - Genius Romanizations",
    "The Little Mermaid (Original Motion Picture Soundtrack) - Alan Menken, Howard Ashman, Walt Disney & Lin-Manuel Miranda",
    "Barbie: The Album - Various Artists",
    "evermore - Taylor Swift",
    "eerietimes* - Baby Keem",
    "Hotel Maffija 3 - SB Maffija",
    "Stray Kids - ★★★★★ (5-STAR) (English Translation) - Genius English Translations",
    "Hamilton: An American Musical (Original Broadway Cast Recording) - Lin-Manuel Miranda",
    "D3* - Dave",
    "The Eminem Show - Eminem",
    "Red (Taylor’s Version) - Taylor Swift",
    "Me Muevo Con Dios - Cruz Cafuné",
    "SOS - SZA",
    "reputation - Taylor Swift",
    "Dr. Seuss’ The Lorax (Original Motion Picture Soundtrack) - Illumination Entertainment",
    "the record - ​boygenius",
    "L3* - Latto",
    "ROMANTİK - Motive",
    "The Good Witch - Maisie Peters",
    "Mr. Morale & The Big Steppers - Kendrick Lamar",
    "AM - Arctic Monkeys",
    "good kid, m.A.A.d city (Deluxe Version) - Kendrick Lamar",
    "HABITAT - Nayt",
    "RENAISSANCE - Beyoncé",
    "The Little Mermaid (Original Motion Picture Soundtrack) - Walt Disney Records",
    "PORTALS (Apple Music Edition) - Melanie Martinez",
    "PAGTATAG! - artist: SB19",
    "But Here We Are - Foo Fighters",
    "Rave & Roses - Rema",
]

for album_name in album_names:
    querystring = {
        "q": album_name,
        "type": "albums",
        "offset": "0",
        "limit": "10",
        "numberOfTopResults": "5",
    }

    response = requests.get(url, headers=headers, params=querystring)
    data = response.json()

    if "albums" in data:
        album_data = data["albums"]["items"][0]["data"]
        album_uri = album_data["uri"].split(":")[
            -1
        ]  # Extract the last part after the colon
        print("{ album_id:", album_uri, "}")
