from mwrogue.esports_client import EsportsClient
import json
import time

site = EsportsClient('lol')

leagues = {
    "Europe League Championship Series": [],
    "League of Legends Championship Series": [],
    "LoL EMEA Championship": [],
    "LoL Champions Korea": [],
    "LoL The Champions": [],
    "League of Legends Championship of The Americas North": [],
    "League of Legends Championship of The Americas South": [],
    "North America League Championship Series": [],
    "Tencent LoL Pro League": [],
    "Mid-Season Invitational": [],
    "Esports World Cup": [],
    "World Championship": []
}

for league in leagues:
    batch_size = 500
    offset = 0
    while True:
        time.sleep(1.5)
        batch = site.cargo_client.query(
            limit=batch_size,
            offset=offset,
            tables="Tournaments=T, TournamentResults=TR",
            fields="T.Name, TR.Event, TR.Team",
            where=f"T.League = '{league}' "
                  "AND T.Name != 'None' "
                  "AND TR.Team IS NOT NULL "
                  "AND T.TournamentLevel='Primary' "
                  "AND T.IsQualifier='No'",
            join_on="T.Name = TR.Event",
        )
        if not batch:
            break

        for tournament_result_row in batch:
            if tournament_result_row["Team"] in leagues[league]:
                continue
            leagues[league].append(tournament_result_row["Team"])
        offset += batch_size

with open("team_scraper.json", "w") as json_file:
    json.dump(leagues, json_file, indent=4)
