from mwrogue.esports_client import EsportsClient
import json
import time

site = EsportsClient('lol')

leagues = {
    "Europe League Championship Series": {},
    "League of Legends Championship Series": {},
    "LoL Champions Korea": {},
    "League of Legends Championship of The Americas North": {},
    "League of Legends Championship of The Americas South": {},
    "North America League Championship Series": {},
    "Tencent LoL Pro League": {},
}

players = []

for league in leagues:
    time.sleep(3)
    for player_tournament_results in site.cargo_client.query(
            tables="Tournaments=T, TournamentPlayers=TP",
            fields="T.Name, TP.OverviewPage, TP.Team, TP.Player, TP.Role, TP.Flag, TP.Link",
            where=f"T.League = '{league}'"
                  "AND TP.Role != 'Coach'"
                  "AND T.Name NOT LIKE '%Promotion%'",
            join_on="T.OverviewPage=TP.OverviewPage",
    ):

        team_name = player_tournament_results["Team"]
        event_name = player_tournament_results["OverviewPage"]
        player_name = player_tournament_results["Player"]

        if player_name not in players:
            players.append(player_name)
        if event_name not in leagues[league]:
            leagues[league][event_name] = {}

        if team_name not in leagues[league][event_name]:
            leagues[league][event_name][team_name] = {
                "Players": [],
            }

        leagues[league][event_name][team_name]["Players"].append(player_tournament_results)

with open("data.json", "w") as json_file:
    json.dump(leagues, json_file, indent=4)

with open("unique_player_data.json", "w") as json_file:
    json.dump(players, json_file, indent=4)