// require('dotenv').config();
// const { Client, GatewayIntentBits } = require('discord.js');
// const axios = require('axios');
// const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';
// const SPACE_FACTS = [
//     "A day on Venus is longer than a year on Venus!",
//     "Jupiter has 79 moons!",
//     "The Sun makes up 99.86% of the mass in our solar system.",
//     "A neutron star is so dense that a sugar-cube-sized amount of material would weigh about a billion tons on Earth.",
//     "Mars has the tallest volcano in the solar system, Olympus Mons, which is about three times the height of Mount Everest!"
// ];

// client.once('ready', () => {
//     console.log('Space Explorer Bot is online!');
// });

// client.on('messageCreate', async message => {
//     if (message.content === '!spacefact') {
//         const fact = SPACE_FACTS[Math.floor(Math.random() * SPACE_FACTS.length)];
//         message.channel.send(`🚀 **Space Fact:** ${fact}`);
//     }

//     if (message.content === '!nasapic') {
//         try {
//             const response = await axios.get(NASA_API_URL, {
//                 params: {
//                     api_key: process.env.NASA_API_KEY,
//                 }
//             });
//             const imageUrl = response.data.url;
//             const title = response.data.title;
//             const explanation = response.data.explanation;

//             message.channel.send({
//                 embeds: [{
//                     color: 0x0099ff,
//                     title: `🌌 **${title}**`,
//                     description: explanation,
//                     image: {
//                         url: imageUrl,
//                     }
//                 }]
//             });
//         } catch (error) {
//             console.error('Error fetching NASA APOD:', error);
//             message.channel.send('Sorry, I couldn\'t fetch the NASA image of the day.');
//         }
//     }

//     if (message.content === '!spacenews') {
//         try {
//             const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles', {
//                 params: { _limit: 5 }
//             });
    
//             // Log the response to understand its structure
//             console.log(response.data);
    
//             // Adjust this line based on the actual structure of the response
//             const articles = response.data; // Change this if the articles are nested inside another object
    
//             if (Array.isArray(articles)) {
//                 const articlesText = articles.map(article => `🔭 [${article.title}](${article.url})`).join('\n');
//                 message.channel.send({
//                     embeds: [{
//                         color: 0x1e90ff,
//                         title: '📰 **Latest Space News**',
//                         description: articlesText,
//                     }]
//                 });
//             } else {
//                 message.channel.send('No articles found.');
//             }
//         } catch (error) {
//             console.error('Error fetching space news:', error);
//             message.channel.send('Sorry, I couldn\'t fetch the latest space news.');
//         }
//     }
    
// });

// client.login(process.env.DISCORD_TOKEN);

require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = '!space';

//const spaceFactsAPI = 'http://numbersapi.com/random/year?json';
const nasaAPODAPI = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

client.once('ready', () => {
    console.log('Space Explorer Bot is ready for liftoff! 🚀');
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'fact':
            const spaceFacts = [
                "The Sun accounts for 99.86% of the mass in the solar system.",
                "One day on Venus is longer than one year on Earth.",
                "The hottest planet in our solar system is Venus.",
                "The Milky Way galaxy is estimated to contain 100-400 billion stars.",
                "There are more trees on Earth than stars in the Milky Way.",
                "The footprints on the Moon will be there for 100 million years.",
                "The Great Red Spot on Jupiter has been raging for over 300 years.",
                "Saturn's rings are made mostly of water ice.",
                "Light from the Sun takes about 8 minutes to reach Earth.",
                "The largest known asteroid is Ceres, which is about 952 km in diameter."
            ];
            const fact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
            message.channel.send(`🌠 Space Fact: ${fact}`);
            break;

        case 'apod':
            try {
                const response = await axios.get(nasaAPODAPI);
                const embed = new EmbedBuilder()
                    .setTitle(`🔭 NASA Astronomy Picture of the Day: ${response.data.title}`)
                    .setImage(response.data.url)
                    .setDescription(response.data.explanation)
                    .setFooter({ text: `Date: ${response.data.date}` });
                message.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error('Error fetching NASA APOD:', error);
                message.channel.send('The satellite connection is weak. Unable to fetch the Astronomy Picture of the Day!');
            }
            break;

        case 'explore':
            const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
            const planet = planets[Math.floor(Math.random() * planets.length)];
            const activities = ['land on', 'orbit', 'study', 'photograph', 'search for life on'];
            const activity = activities[Math.floor(Math.random() * activities.length)];
            message.channel.send(`🚀 Initiating space exploration mission! Your task is to ${activity} ${planet}. Good luck, astronaut!`);
            break;

        case 'quiz':
            const questions = [
                { q: 'What is the largest planet in our solar system?', a: 'Jupiter' },
                { q: 'What is the name of the galaxy we live in?', a: 'Milky Way' },
                { q: 'Who was the first human to walk on the moon?', a: 'Neil Armstrong' },
                { q: 'What is the name of the force that pulls objects towards each other?', a: 'Gravity' },
                { q: 'What is the closest star to Earth?', a: 'Sun' }
            ];
            const question = questions[Math.floor(Math.random() * questions.length)];
            message.channel.send(`🌌 Space Quiz: ${question.q}`);
            
            const filter = m => m.author.id === message.author.id;
            const collector = message.channel.createMessageCollector({ filter, time: 15000, max: 1 });

            collector.on('collect', m => {
                if (m.content.toLowerCase() === question.a.toLowerCase()) {
                    message.channel.send('🎉 Correct! You\'re a true space expert!');
                } else {
                    message.channel.send(`❌ Sorry, that's incorrect. The correct answer is ${question.a}.`);
                }
            });

            collector.on('end', collected => {
                if (collected.size === 0) {
                    message.channel.send(`⏱️ Time's up! The correct answer was ${question.a}.`);
                }
            });
            break;

        default:
            message.channel.send('Invalid command. Use !space fact, !space apod, !space explore, or !space quiz.');
    }
});

client.login(process.env.DISCORD_TOKEN);
