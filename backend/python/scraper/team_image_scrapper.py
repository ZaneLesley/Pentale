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
            team = row[name]
            print(team, flush=True)
            try:
                time.sleep(1)

                response = site.cargo_client.query(
                    limit=1,
                    tables="Teams=T",
                    fields="T.Image",
                    order_by="T.Name ASC",
                    where=f"T.Name='{team}'",
                )

                if not response:
                    print(f"no image for {team}")
                    results.append({team: None})
                    continue

                url = response[0]['Image']

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

                file_path = f"img/team/{team}.png"
                urllib.request.urlretrieve(url, file_path)
                results.append({team: file_path})
                print(f"{team} written at -> {file_path}", flush=True)
            except Exception as e:
                print(f"Error:{e}", flush=True)

    with open('team_image.json', 'w') as file:
        json.dump(results, file, indent=4)


os.makedirs("img/team", exist_ok=True)
get_image()
