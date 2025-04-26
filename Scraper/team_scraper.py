from mwrogue.esports_client import EsportsClient

site = EsportsClient('lol')

teams = {"LCK":[]}

for tournament_result_row in site.cargo_client.query(
        limit="max",
        tables="Tournaments=T, TournamentResults=TR",
        fields="T.Name, TR.Event, TR.Team",
        where="T.League = 'LoL Champions Korea' "
              "AND T.Name != 'None' "
              "AND TR.Team IS NOT NULL "
              "AND T.Name NOT LIKE '%Promotion%'",
        join_on="T.Name = TR.Event"
):
    if (tournament_result_row["Team"] in teams["LCK"]):
        continue
    teams["LCK"].append(tournament_result_row["Team"])
print(teams)
