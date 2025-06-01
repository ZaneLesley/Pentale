from mwrogue.esports_client import EsportsClient
import json
import time

site = EsportsClient('lol')

leagues = {
    "Europe League Championship Series": {},
    "League of Legends Championship Series": {},
    "LoL EMEA Championship": {},
    "LoL Champions Korea": {},
    "LoL The Champions": {},
    "League of Legends Championship of The Americas North": {},
    "League of Legends Championship of The Americas South": {},
    "North America League Championship Series": {},
    "Tencent LoL Pro League": {},
    "Mid-Season Invitational": {},
    "Esports World Cup": {},
    "World Championship": {},
}

players = []

for league in leagues:
    time.sleep(3)
    for player_tournament_results in site.cargo_client.query(
            tables="Tournaments=T, TournamentPlayers=TP, PlayerRedirects=PR, Players=P",
            fields="T.Name, TP.OverviewPage, TP.Team, TP.Player, TP.Role, TP.Flag, TP.Link, T.Date, PR.OverviewPage=PlayerPage",
            where=f"T.League = '{league}'"
                  "AND TP.Role != 'Coach'"
                  "AND T.TournamentLevel='Primary' "
                  "AND T.IsQualifier='No'",
            join_on="T.OverviewPage=TP.OverviewPage, TP.Player=PR.AllName, PR.OverviewPage=P.OverviewPage",
    ):
        team_name = player_tournament_results["Team"]
        event_name = player_tournament_results["OverviewPage"]
        player_name = player_tournament_results["PlayerPage"]

        if not player_name:
            # If the OverviewPage for the player doesn't exist, use the Tournament Players name instead
            player_tournament_results["PlayerPage"] = player_tournament_results["Player"]
            player_name = player_tournament_results["PlayerPage"]

        if player_name not in players:
            players.append(player_name)
        if event_name not in leagues[league]:
            leagues[league][event_name] = {}

        if team_name not in leagues[league][event_name]:
            leagues[league][event_name][team_name] = {
                "Players": [],
            }

        leagues[league][event_name][team_name]["Players"].append(player_tournament_results)

with open("player_data.json", "w") as json_file:
    json.dump(leagues, json_file, indent=4)

with open("unique_player_data.json", "w") as json_file:
    json.dump(players, json_file, indent=4)
