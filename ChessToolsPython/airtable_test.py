from airtable import Airtable

airtable = Airtable("appRmpy8EhT0DInrt", "StatTable", "key7Y4dh7XQsHo8VB")

print(airtable.get_all()[1]['fields']['Player2Time'])
