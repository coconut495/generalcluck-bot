const DISCORD = require('discord.js');
const BOT = new DISCORD.Client;
const EMBED = DISCORD.RichEmbed;

const HYPIXELAPI = require('hypixel-api');
const HYPIXEL = new HYPIXELAPI(process.env.HTOKEN);

BOT.on('ready', () => {
    BOT.user.setActivity('!s (user)', {type: 'STREAMING'});
});

BOT.on('message', MSG => {
    if (MSG.channel.id == '616680405407498247') {
        if (MSG.content.toUpperCase().startsWith('!S')) {
            NAME = MSG.content.split(' ')[1];
            HYPIXEL.getPlayer('name', NAME).then(PLAYER => {
                PLAYER = PLAYER['player'];
                MSG.channel.send(new EMBED()
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setAuthor('Smash Heroes Stats ', 'http://visage.surgeplay.com/face/'+PLAYER['uuid'])
                    .setTitle(PLAYER['displayname']).setURL('http://hypixel.net/player/'+PLAYER['displayname'])
                    .setImage('http://gen.plancke.io/supersmash/'+PLAYER['displayname']+'/3.png')
                    .addField('Smash Level', '`'+IntForm(PLAYER['stats']['SuperSmash']['smashLevel'])+'`', true)
                    .addField('Coins', '`'+IntForm(PLAYER['stats']['SuperSmash']['coins'])+'`', true)
                    .addField('Kills', '`'+IntForm(PLAYER['stats']['SuperSmash']['kills'])+'`', true)
                    .addField('Deaths', '`'+IntForm(PLAYER['stats']['SuperSmash']['deaths'])+'`', true)
                    .addBlankField()
                    .addField('Wins', '`'+IntForm(PLAYER['stats']['SuperSmash']['wins'])+'`', true)
                    .addField('Losses', '`'+IntForm(PLAYER['stats']['SuperSmash']['losses'])+'`', true)
                    .addField('K/D | W/L', '`'+(PLAYER['stats']['SuperSmash']['kills'] / PLAYER['stats']['SuperSmash']['deaths']).toFixed(2)+'` | `'+(PLAYER['stats']['SuperSmash']['wins'] / PLAYER['stats']['SuperSmash']['losses']).toFixed(2)+'`', true)
                    .addField('Active Class', '`'+PLAYER['stats']['SuperSmash']['active_class']+'`', true)
                );
            }).catch(() => {
                MSG.channel.send(new EMBED()
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .addField('Error', 'Player `'+NAME+'` not found')
                );
            });
        }
    }
});

BOT.login(process.env.BTOKEN);

function IntForm(num) {
    return new Intl.NumberFormat().format(num);
}