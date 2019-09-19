const DISCORD = require('discord.js');
const BOT = new DISCORD.Client;
const EMBED = DISCORD.RichEmbed;
const RM = require('discord.js-reaction-menu');

const HYPIXELAPI = require('hypixel-api');
const HYPIXEL = new HYPIXELAPI(process.env.HTOKEN);

BOT.on('ready', () => {
    BOT.user.setActivity('!s help', {type: 'STREAMING'});
});

BOT.on('message', MSG => {
    ARGS = MSG.content.split(' ');
    if (String(ARGS[0]).toUpperCase() == '!S') {
        switch (String(ARGS[1]).toUpperCase()) {
            case 'HELP':
                MSG.channel.send(new EMBED()
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setAuthor(BOT.user.username, BOT.user.avatarURL)
                    .addBlankField()
                    .addField('To get player`s smash heroes stats:', 'Use `!s (user)`')
                    .addBlankField()
                    .addField('To get guild stats:', 'Use `!s guild (guild)`')
                    .addBlankField()
                    .addField('If you have any questions:', "You can ask us on this server\nhttp://invite.gg/SmashCommunity")
                    .setFooter('Made by coconutto & _Auto1t')
                );
            break;
            case 'EVAL$':
                if (MSG.author.id == '246898837581463552') {
                    EVALUATE = MSG.content.split('$ ')[1];
                    try {
                        OUTPUT = eval(EVALUATE);
                        MSG.channel.send(new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .addField('Code', EVALUATE)
                            .addField('Output', OUTPUT)
                        );
                    } catch (ERR) {
                        MSG.channel.send(new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .addField('Code', EVALUATE)
                            .addField('Error', ERR)
                        );
                    }
                } else {
                    MSG.channel.send(new EMBED()
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .addField('Error', 'You are not allowed to do this')
                    );
                }
            break;
            case 'GUILD':
                HYPIXEL.findGuild('name', MSG.content.slice(9)).then(GUILDID => {
                    HYPIXEL.getGuild(GUILDID['guild']).then(GUILD => {
                        GUILD = GUILD['guild'];
                        MSG.channel.send(new EMBED ()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor('Guild Stats')
                            .setTitle(GUILD['name'])
                            .addField('Name', '`'+GUILD['name']+'`', true)
                            .addField('Members', '`'+Object.keys(GUILD['members']).length+'/125`', true)
                            .addField('Total EXP', '`'+IntForm(GUILD['exp'])+'`', true)
                            .addBlankField()
                            .addField('TAG', '`'+GUILD['tag']+'`', true).addField('TAG Color', '`'+GUILD['tagColor']+'`', true)
                            .addField('Smashed EXP', '`'+IntForm(GUILD['guildExpByGameType']['SUPER_SMASH'])+'`', true)
                            .addBlankField()
                            .addField('Description:', GUILD['description'], true)
                        );
                    }).catch(() => {
                        MSG.channel.send(new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .addField('Error', 'Guild `'+MSG.content.slice(9)+'` not found')
                        );
                    });
                });
            break;
            default:
                HYPIXEL.getPlayer('name', ARGS[1]).then(PLAYER => {
                    PLAYER = PLAYER['player'];
                    let MSGS = [
                        new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor('Smash Heroes Stats · Overall', 'http://visage.surgeplay.com/face/'+PLAYER['uuid'])
                            .setImage('http://gen.plancke.io/supersmash/'+PLAYER['displayname']+'/3.png')
                            .setTitle(PLAYER['displayname']).setURL('https://plancke.io/hypixel/player/stats/'+PLAYER['displayname'])
                            .addField('Smash Level', '`'+IntForm(PLAYER['stats']['SuperSmash']['smashLevel'])+'`', true)
                            .addField('Coins', '`'+IntForm(PLAYER['stats']['SuperSmash']['coins'])+'`', true)
                            .addField('Kills', '`'+IntForm(PLAYER['stats']['SuperSmash']['kills'])+'`', true)
                            .addField('Deaths', '`'+IntForm(PLAYER['stats']['SuperSmash']['deaths'])+'`', true)
                            .addField('Wins', '`'+IntForm(PLAYER['stats']['SuperSmash']['wins'])+'`', true)
                            .addField('Losses', '`'+IntForm(PLAYER['stats']['SuperSmash']['losses'])+'`', true)
                            .addField('K/D | W/L', '`'+(PLAYER['stats']['SuperSmash']['kills'] / PLAYER['stats']['SuperSmash']['deaths']).toFixed(2)+'` | `'+(PLAYER['stats']['SuperSmash']['wins'] / PLAYER['stats']['SuperSmash']['losses']).toFixed(2)+'`', true)
                            .addField('Active Class', '`'+PLAYER['stats']['SuperSmash']['active_class']+'`', true)
                            .setThumbnail('https://hypixel.net/styles/hypixel-uix/hypixel/game-icons/SmashHeroes-64.png')
                            .setFooter('Page 1/3 | Use reactions to switch pages'),
                        new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor('Smash Heroes Stats · Gamemodes', 'http://visage.surgeplay.com/face/'+PLAYER['uuid'])
                            .setTitle(PLAYER['displayname']).setURL('https://plancke.io/hypixel/player/stats/'+PLAYER['displayname'])
                            .addField('Solo Kills', '`'+IntForm(PLAYER['stats']['SuperSmash']['kills_normal'])+'`', true)
                            .addField('Solo Deaths', '`'+IntForm(PLAYER['stats']['SuperSmash']['deaths_normal'])+'`', true)
                            .addField('Solo Wins', '`'+IntForm(PLAYER['stats']['SuperSmash']['wins_normal'])+'`', true)
                            .addField('Solo Losses', '`'+IntForm(PLAYER['stats']['SuperSmash']['losses_normal'])+'`', true)
                            .addField('Solo K/D | W/L', '`'+(PLAYER['stats']['SuperSmash']['kills_normal'] / PLAYER['stats']['SuperSmash']['deaths_normal']).toFixed(2)+'` | `'+(PLAYER['stats']['SuperSmash']['wins_normal'] / PLAYER['stats']['SuperSmash']['losses_normal']).toFixed(2)+'`', true)
                            .addBlankField()                        
                            .addField('2v2 Kills', '`'+IntForm(PLAYER['stats']['SuperSmash']['kills_2v2'])+'`', true)
                            .addField('2v2 Deaths', '`'+IntForm(PLAYER['stats']['SuperSmash']['deaths_2v2'])+'`', true)
                            .addField('2v2 Wins', '`'+IntForm(PLAYER['stats']['SuperSmash']['wins_2v2'])+'`', true)
                            .addField('2v2 Losses', '`'+IntForm(PLAYER['stats']['SuperSmash']['losses_2v2'])+'`', true)
                            .addField('2v2 K/D | W/L', '`'+(PLAYER['stats']['SuperSmash']['kills_2v2'] / PLAYER['stats']['SuperSmash']['deaths_2v2']).toFixed(2)+'` | `'+(PLAYER['stats']['SuperSmash']['wins_2v2'] / PLAYER['stats']['SuperSmash']['losses_2v2']).toFixed(2)+'`', true)
                            .addBlankField()                     
                            .addField('2v2v2 Kills', '`'+IntForm(PLAYER['stats']['SuperSmash']['kills'] - PLAYER['stats']['SuperSmash']['kills_normal'] - PLAYER['stats']['SuperSmash']['kills_2v2'])+'`', true)
                            .addField('2v2v2 Deaths', '`'+IntForm(PLAYER['stats']['SuperSmash']['deaths'] - PLAYER['stats']['SuperSmash']['deaths_normal'] - PLAYER['stats']['SuperSmash']['deaths_2v2'])+'`', true)
                            .addField('2v2v2 Wins', '`'+IntForm(PLAYER['stats']['SuperSmash']['wins'] - PLAYER['stats']['SuperSmash']['wins_normal'] - PLAYER['stats']['SuperSmash']['wins_2v2'])+'`', true)
                            .addField('2v2v2 Losses', '`'+IntForm(PLAYER['stats']['SuperSmash']['losses'] - PLAYER['stats']['SuperSmash']['losses_normal'] - PLAYER['stats']['SuperSmash']['losses_2v2'])+'`', true)
                            .addField('2v2v2 K/D | W/L', '`'+((PLAYER['stats']['SuperSmash']['kills'] - PLAYER['stats']['SuperSmash']['kills_normal'] - PLAYER['stats']['SuperSmash']['kills_2v2']) / (PLAYER['stats']['SuperSmash']['deaths'] - PLAYER['stats']['SuperSmash']['deaths_normal'] - PLAYER['stats']['SuperSmash']['deaths_2v2'])).toFixed(2)+'` | `'+((PLAYER['stats']['SuperSmash']['wins'] - PLAYER['stats']['SuperSmash']['wins_normal'] - PLAYER['stats']['SuperSmash']['wins_2v2']) / (PLAYER['stats']['SuperSmash']['losses'] - PLAYER['stats']['SuperSmash']['losses_normal'] - PLAYER['stats']['SuperSmash']['losses_2v2'])).toFixed(2)+'`', true)                        
                            .setThumbnail('https://hypixel.net/styles/hypixel-uix/hypixel/game-icons/SmashHeroes-64.png')
                            .setFooter('Page 2/3 | Use reactions to switch pages')
                        ];
                        try {
                            MSGS[2] = new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .setAuthor('Smash Heroes Stats · Characters', 'http://visage.surgeplay.com/face/'+PLAYER['uuid'])
                            .setTitle(PLAYER['displayname']).setURL('https://plancke.io/hypixel/player/stats/'+PLAYER['displayname'])
                            .addField('Bulk', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_THE_BULK'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_THE_BULK'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['THE_BULK']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['THE_BULK']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['THE_BULK']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['THE_BULK']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['THE_BULK']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['THE_BULK']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['THE_BULK']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['THE_BULK']['losses']).toFixed(2)+'`', true)
                            .addField('General Cluck', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_GENERAL_CLUCK'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_GENERAL_CLUCK'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GENERAL_CLUCK']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GENERAL_CLUCK']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GENERAL_CLUCK']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GENERAL_CLUCK']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['GENERAL_CLUCK']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['GENERAL_CLUCK']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['GENERAL_CLUCK']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['GENERAL_CLUCK']['losses']).toFixed(2)+'`', true)
                            .addField('Cake Monster', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_CAKE_MONSTER'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_CAKE_MONSTER'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['CAKE_MONSTER']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['CAKE_MONSTER']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['CAKE_MONSTER']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['CAKE_MONSTER']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['CAKE_MONSTER']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['CAKE_MONSTER']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['CAKE_MONSTER']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['CAKE_MONSTER']['losses']).toFixed(2)+'`', true)
                            .addField('Botmon', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_BOTMUN'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_BOTMUN'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['BOTMUN']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['BOTMUN']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['BOTMUN']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['BOTMUN']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['BOTMUN']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['BOTMUN']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['BOTMUN']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['BOTMUN']['losses']).toFixed(2)+'`', true)
                            .addField('Tinman', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_TINMAN'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_TINMAN'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['TINMAN']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['TINMAN']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['TINMAN']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['TINMAN']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['TINMAN']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['TINMAN']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['TINMAN']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['TINMAN']['losses']).toFixed(2)+'`', true)                        
                            .addField('Marauder', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_MARAUDER'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_MARAUDER'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['MARAUDER']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['MARAUDER']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['MARAUDER']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['MARAUDER']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['MARAUDER']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['MARAUDER']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['MARAUDER']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['MARAUDER']['losses']).toFixed(2)+'`', true)                        
                            .addField('Spooderman', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_SPODERMAN'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_SPODERMAN'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SPODERMAN']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SPODERMAN']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SPODERMAN']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SPODERMAN']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['SPODERMAN']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['SPODERMAN']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['SPODERMAN']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['SPODERMAN']['losses']).toFixed(2)+'`', true)                     
                            .addField('Pug', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_PUG'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_PUG'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['PUG']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['PUG']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['PUG']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['PUG']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['PUG']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['PUG']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['PUG']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['PUG']['losses']).toFixed(2)+'`', true)                                      
                            .addField('Cryomancer', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_FROSTY'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_FROSTY'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['FROSTY']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['FROSTY']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['FROSTY']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['FROSTY']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['FROSTY']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['FROSTY']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['FROSTY']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['FROSTY']['losses']).toFixed(2)+'`', true)                                    
                            .addField('Sgt. Shield', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_SERGEANT_SHIELD'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_SERGEANT_SHIELD'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SERGEANT_SHIELD']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SERGEANT_SHIELD']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SERGEANT_SHIELD']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SERGEANT_SHIELD']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['SERGEANT_SHIELD']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['SERGEANT_SHIELD']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['SERGEANT_SHIELD']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['SERGEANT_SHIELD']['losses']).toFixed(2)+'`', true)                                    
                            .addField('Karakot', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_GOKU'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_GOKU'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GOKU']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GOKU']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GOKU']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GOKU']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['GOKU']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['GOKU']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['GOKU']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['GOKU']['losses']).toFixed(2)+'`', true)                                    
                            .addField('Skullfire', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_SKULLFIRE'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_SKULLFIRE'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SKULLFIRE']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SKULLFIRE']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SKULLFIRE']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SKULLFIRE']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['SKULLFIRE']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['SKULLFIRE']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['SKULLFIRE']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['SKULLFIRE']['losses']).toFixed(2)+'`', true)  
                            .addField('Sanic', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_SANIC'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_SANIC'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SANIC']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SANIC']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SANIC']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SANIC']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['SANIC']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['SANIC']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['SANIC']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['SANIC']['losses']).toFixed(2)+'`', true)                                     
                            .addField('Void Crawler', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_DUSK_CRAWLER'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_DUSK_CRAWLER'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['DUSK_CRAWLER']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['DUSK_CRAWLER']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['DUSK_CRAWLER']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['DUSK_CRAWLER']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['DUSK_CRAWLER']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['DUSK_CRAWLER']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['DUSK_CRAWLER']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['DUSK_CRAWLER']['losses']).toFixed(2)+'`', true)
                            .addField('Shoop', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_SHOOP_DA_WHOOP'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_SHOOP_DA_WHOOP'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SHOOP_DA_WHOOP']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SHOOP_DA_WHOOP']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SHOOP_DA_WHOOP']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['SHOOP_DA_WHOOP']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['SHOOP_DA_WHOOP']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['SHOOP_DA_WHOOP']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['SHOOP_DA_WHOOP']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['SHOOP_DA_WHOOP']['losses']).toFixed(2)+'`', true)
                            .addField('Green Hood', 'Prestige: `' +IntForm(PLAYER['stats']['SuperSmash']['pg_GREEN_HOOD'])+ '` Level: `' +IntForm(PLAYER['stats']['SuperSmash']['lastLevel_GREEN_HOOD'])+ '` \n Kills: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GREEN_HOOD']['kills'])+ '` Deaths: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GREEN_HOOD']['deaths'])+ '` \n Wins: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GREEN_HOOD']['wins'])+ '` Losses: `' +IntForm(PLAYER['stats']['SuperSmash']['class_stats']['GREEN_HOOD']['losses'])+ '` \n K/D: `' +(PLAYER['stats']['SuperSmash']['class_stats']['GREEN_HOOD']['kills'] / PLAYER['stats']['SuperSmash']['class_stats']['GREEN_HOOD']['deaths']).toFixed(2)+'` W/L: `'+(PLAYER['stats']['SuperSmash']['class_stats']['GREEN_HOOD']['wins'] / PLAYER['stats']['SuperSmash']['class_stats']['GREEN_HOOD']['losses']).toFixed(2)+'`', true)
                            .setThumbnail('https://hypixel.net/styles/hypixel-uix/hypixel/game-icons/SmashHeroes-64.png')
                            .setFooter('Page 3/3 | Use reactions to switch pages')
                        } catch {
                            MSGS[2] = null;
                        }
                    PLAYER = PLAYER['player'];
                    if (MSGS[2] !== null) {
                        new RM.menu(MSG.channel, MSG.author.id, MSGS, 60000);
                    } else {
                        new RM.menu(MSG.channel, MSG.author.id, [MSGS[0].setFooter('Page 1/2 | Use reactions to switch pages'), MSGS[1].setFooter('Page 2/2 | Use reactions to switch pages')], 60000);
                    }
                }).catch(ERR => {
                    MSG.channel.send(new EMBED()
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .addField('Error', 'Player `'+ARGS[1]+'` not found')
                    );
                    console.error(ERR);
                });
            break;
        }
    }
});

BOT.login(process.env.BTOKEN);

function IntForm(num) {
    if (isNaN(num)) {
        return 0
    } else {
        return new Intl.NumberFormat().format(num);
    }
}