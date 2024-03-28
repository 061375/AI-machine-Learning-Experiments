from shared import userErrors
import pyfunctions.data as data
'''
    AJAX FUNCTIONS
'''

def GeneticV1record(json, dbname):
    data.create_game_database(dbname)
    data.add_game(dbname, str(json))
    return str(json)