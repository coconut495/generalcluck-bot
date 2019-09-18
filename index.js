const DISCORD = require('discord.js');
const BOT = new DISCORD.Client;
const EMBED = DISCORD.RichEmbed;

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
                    .addField('If you have any questions:', "You can ask us on this server\nhttp://invite.gg/SmashStats")
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
                            .setFooter('Made by coconutto & _Auto1t')
                        );
                    } catch (ERR) {
                        MSG.channel.send(new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .addField('Code', EVALUATE)
                            .addField('Error', ERR)
                            .setFooter('Made by coconutto & _Auto1t')
                        );
                    }
                } else {
                    MSG.channel.send(new EMBED()
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .addField('Error', 'You are not allowed to do this')
                        .setFooter('Made by coconutto & _Auto1t')
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
                            .setFooter('Made by coconutto & _Auto1t')
                        );
                    }).catch(() => {
                        MSG.channel.send(new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .addField('Error', 'Guild `'+MSG.content.slice(9)+'` not found')
                            .setFooter('Made by coconutto & _Auto1t')
                        );
                    });
                });
            break;
            default:
                HYPIXEL.getPlayer('name', ARGS[1]).then(PLAYER => {
                    PLAYER = PLAYER['player'];
                    MSG.channel.send(new EMBED()
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setAuthor('Smash Heroes Player Stats', 'http://visage.surgeplay.com/face/'+PLAYER['uuid'])
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
                        .addField('Quits', '`'+IntForm(PLAYER['stats']['SuperSmash']['quits'], true)+'`')
                        .setFooter('Made by coconutto & _Auto1t')
                    );
                }).catch(ERR => {
                    if (ARGS[2] == 'DEBUG') {
                        MSG.channel.send(new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .addField('Error', 'Player `'+ARGS[1]+'` not found')
                            .addField('DEBUG', ERR)
                            .setFooter('Made by coconutto & _Auto1t')
                        );
                    } else {
                        MSG.channel.send(new EMBED()
                            .setColor(Math.floor(Math.random() * 16777214) + 1)
                            .addField('Error', 'Player `'+ARGS[1]+'` not found')
                            .setFooter('Made by coconutto & _Auto1t')
                        );
                    }
                });
            break;
        }
    }
});

BOT.login(process.env.BTOKEN);

function IntForm(num) {
    return new Intl.NumberFormat().format(num);
}
