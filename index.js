const { Client, GatewayIntentBits } = require('discord.js-selfbot-v13');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Token del tuo account Discord (NON CONDIVIDERLO CON NESSUNO)
const token = process.env.TOKEN;

// Crea un client Discord
const client = new Client({
  checkUpdate: false,
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences],
});

// Quando il client è pronto
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Imposta la presenza con streaming e logo
  client.user.setPresence({
    activities: [{
      name: 'Streaming',
      type: 'STREAMING',
      url: 'https://www.twitch.tv/psycho_bs_', // Sostituisci con il tuo link
      details: 'Check out my stream!', // Descrizione opzionale
      state: 'Live on Twitch', // Stato opzionale
      assets: {
        large_image: 'stream_logo', // Nome dell'immagine caricata su Discord
        large_text: 'Stream Logo', // Testo alternativo per l'immagine
      },
    }],
    status: 'online',
  });
});

// Avvia il client Discord
client.login(token);

// Avvia il server web
app.get('/', (req, res) => {
  res.send('Discord Streaming Presence is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
