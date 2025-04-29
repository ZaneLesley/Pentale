from mwrogue.esports_client import EsportsClient
import json
import sys
import time
import urllib.request
import os


# This code is mostly gotten from the tutorial at https://lol.fandom.com/wiki/Help:Leaguepedia_API
def get_image(width=None):
    site = EsportsClient('lol')

    payload = sys.argv[2]
    data = json.loads(payload)
    results = []

    for row in data:
        for name, file_location in row.items():
            player = row[name]
            try:
                time.sleep(1)
                response = site.cargo_client.query(
                    limit=1,
                    tables="PlayerImages=PI, Tournaments=T",
                    fields="PI.FileName",
                    join_on="PI.Tournament=T.OverviewPage",
                    where=f"Link='{player}'",
                    order_by="PI.SortDate DESC, T.DateStart DESC",
                )
                if not response:
                    print(f"no image for {player}")
                    results.append({player: None})
                    continue
                url = response[0]['FileName']

                response = site.client.api(
                    action="query",
                    format="json",
                    titles=f"File:{url}",
                    prop="imageinfo",
                    iiprop="url",
                    iiurlwidth=width,
                )

                image_info = next(iter(response["query"]["pages"].values()))["imageinfo"][0]

                if width:
                    url = image_info["thumburl"]
                else:
                    url = image_info["url"]

                file_path = f"img/player/{player}.png"
                urllib.request.urlretrieve(url, file_path)
                results.append({player: file_path})
                print(f"{player} written at -> {file_path}", flush=True)
            except Exception as e:
                print(e, flush=True)

    with open('player_image.json', 'w') as file:
        json.dump(results, file, indent=4)


os.makedirs("img/player", exist_ok=True)
get_image()
