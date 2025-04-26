from mwrogue.esports_client import EsportsClient
from rich import print
import time

site = EsportsClient('lol')

teams = {
    "Europe League Championship Series": [],
    "League of Legends Championship Series": [],
    "LoL Champions Korea": [],
    "League of Legends Championship of The Americas North": [],
    "League of Legends Championship of The Americas South": [],
    "North America League Championship Series": [],
    "Tencent LoL Pro League": [],
}

print("[blue]Getting Teams")

for league in teams:
    print("[yellow]Waiting 3 seconds to avoid rate limit")
    time.sleep(3)

    for tournament_result_row in site.cargo_client.query(
            limit="max",
            tables="Tournaments=T, TournamentResults=TR",
            fields="T.Name, TR.Event, TR.Team",
            where=f"T.League = '{league}'"
                  "AND T.Name != 'None' "
                  "AND TR.Team IS NOT NULL "
                  "AND T.Name NOT LIKE '%Promotion%'",
            join_on="T.Name = TR.Event"
    ):
        if (tournament_result_row["Team"] in teams[league]):
            continue
        teams[league].append(tournament_result_row["Team"])

    print(f"[green]Finished {league}")

print(teams)
