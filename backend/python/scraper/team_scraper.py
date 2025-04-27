from mwrogue.esports_client import EsportsClient
import json
import time

site = EsportsClient('lol')

leagues = {
    "Europe League Championship Series": [],
    "League of Legends Championship Series": [],
    "LoL Champions Korea": [],
    "League of Legends Championship of The Americas North": [],
    "League of Legends Championship of The Americas South": [],
    "North America League Championship Series": [],
    "Tencent LoL Pro League": [],
}

for league in leagues:
    time.sleep(3)

    for tournament_result_row in site.cargo_client.query(
            limit=500,
            tables="Tournaments=T, TournamentResults=TR",
            fields="T.Name, TR.Event, TR.Team",
            where=f"T.League = '{league}'"
                  "AND T.Name != 'None' "
                  "AND TR.Team IS NOT NULL "
                  "AND T.Name NOT LIKE '%Promotion%'",
            join_on="T.Name = TR.Event"
    ):
        if tournament_result_row["Team"] in leagues[league]:
            continue
        leagues[league].append(tournament_result_row["Team"])

with open("team_scraper.json", "w") as json_file:
    json.dump(leagues, json_file, indent=4)