import pickle
import sqlite3
import json
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
def create_game_database(dbname):
    try:
        # Connect to a database (or create it if it doesn't exist)
        conn = sqlite3.connect(dbname)

        # Create a cursor object
        cursor = conn.cursor()

        # Create a table
        cursor.execute('''CREATE TABLE IF NOT EXISTS game
                    (id INTEGER PRIMARY KEY, data TEXT)''')

        # Commit the changes and close the connection
        conn.commit()
        conn.close()   
    except Exception as e:
        print(f"Error: {e}")
def add_game(dbname, json):
    try:
        # Insert the JSON string into the database
        conn = sqlite3.connect(dbname)
        cursor = conn.cursor()

        cursor.execute('INSERT INTO game (data) VALUES (?)', (json,))

        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")
def get_game(dbname):
    try:
        # Get the JSON string from the database
        conn = sqlite3.connect(dbname)
        cursor = conn.cursor()
        cursor.execute('SELECT data FROM game')
        data = cursor.fetchall()
        
        for row in data:
            game_data = json.loads(row[0])
        conn.close()
        return game_data
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
    except Exception as e:
        print(f"Error: {e}")
    return None
def process_data(game_data):
    processed_data = []
    # process data here
    # ...
    processed_data.append(game_data)
    return np.array(processed_data)
def split_data(data):
    X = data[:,:-1]
    y = data[:,-1]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
    return X_train, X_test, y_train, y_test
def scale_data(X_train, X_test):
    scaler = StandardScaler()
    scaler.fit(X_train)
    X_train = scaler.transform(X_train)
    X_test = scaler.transform(X_test)
    return X_train, X_test
def save_model(model, filename):
    # Save the model to a file
    with open(filename, 'wb') as f:
        pickle.dump(model, f)
def load_model(filename):
    # Load the model from a file
    with open(filename, 'rb') as f:
        model = pickle.load(f)
    return model