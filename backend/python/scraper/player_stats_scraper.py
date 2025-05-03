import sys

from mwrogue.esports_client import EsportsClient
import json
import time

site = EsportsClient('lol')


def get_stats():
    batch_size = 500
    filename = sys.argv[1]

    with open(filename, "r") as f:
        payload = json.loads(f.read())["playerEventMap"]

    # Essentially delete the file before writing.
    outfile = 'temp_player_stats.json'
    with open(outfile, 'w') as f:
        f.write("[\n")
        first_entry = True

    with open(outfile, 'a') as f:

        for player, events in payload.items():
            results = {
                f"{player}": {
                    "Kills": 0,
                    "Deaths": 0,
                    "Assists": 0,
                    "CS": 0,
                    "Win": 0,
                    "Loss": 0,
                    "Gamelength Number": 0
                }
            }
            for event in events:
                offset = 0
                while True:
                    try:
                        time.sleep(1.5)
                        batch = site.cargo_client.query(
                            limit=batch_size,
                            offset=offset,
                            tables="ScoreboardPlayers=SP, ScoreboardGames=SG",
                            fields="SP.OverviewPage, SP.Link, SP.Kills, SP.Deaths, SP.Assists, SP.CS, SP.PlayerWin, SP.GameId, "
                                   "SG.Gamelength_Number",
                            where=f"SP.OverviewPage='{event}' "
                                  f"AND SP.Link='{player}'",
                            join_on="SP.GameId=SG.GameId",
                        )
                        # Reach end of API Lookup
                        if not batch:
                            break

                        for row in batch:
                            kills = row.get("Kills")
                            deaths = row.get("Deaths")
                            assists = row.get("Assists")
                            cs = row.get("CS")
                            player_win = row.get("PlayerWin")
                            gamelength = row.get("Gamelength Number")

                            results[player]["Kills"] += int(kills) if kills is not None else 0
                            results[player]["Deaths"] += int(deaths) if deaths is not None else 0
                            results[player]["Assists"] += int(assists) if assists is not None else 0
                            results[player]["CS"] += int(cs) if cs is not None else 0
                            if player_win == "Yes":
                                results[player]["Win"] += 1
                            else:
                                results[player]["Loss"] += 1

                            results[player]["Gamelength Number"] += float(gamelength) if gamelength is not None else 0
                        offset += batch_size

                    except Exception as e:
                        print(f"{e}", flush=True)

            if not first_entry:
                f.write(',\n')
            json.dump(results, f, indent=4)
            first_entry = False
            print(json.dumps(results, indent=4), flush=True)
        f.write("\n]")


if __name__ == '__main__':
    get_stats()
