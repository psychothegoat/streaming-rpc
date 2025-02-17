import os
import discord
from flask import Flask, send_file

TOKEN = os.getenv("DISCORD_TOKEN")  # Token del bot
STREAM_URL = "https://www.twitch.tv/psycho_bs_"  # URL dello streaming
LOGO_PATH = "stream_logo.png"  # Percorso del logo della stream
HOST = "0.0.0.0"
PORT = int(os.getenv("PORT", 5000))

intents = discord.Intents.default()
client = discord.Client(intents=intents)

app = Flask(__name__)

@app.route('/')
def home():
    return "Bot Discord in esecuzione"

@app.route('/logo')
def logo():
    return send_file(LOGO_PATH, mimetype='image/png')

@client.event
async def on_ready():
    print(f'Bot connesso come {client.user}')
    activity = discord.Streaming(name="Live su Twitch!", url=STREAM_URL)
    await client.change_presence(activity=activity)

if __name__ == "__main__":
    from threading import Thread
    Thread(target=lambda: app.run(host=HOST, port=PORT)).start()
    client.run(TOKEN)
