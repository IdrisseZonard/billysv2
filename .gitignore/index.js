const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("-!")

bot.on('ready', function() {
    bot.user.setActivity('-!help', { type: 'PLAYING' });
    console.log("Connectedç");
});

bot.login("NDkwMzE1NzU3NzI1NDE3NDcz.DoAQrw.gMlY5Z0rfjy3ASXzp9zDuLyNCtg");


bot.on('message', message => {
    if (message.content === prefix + "help") {

        var help_embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setFooter("Billy's BOT V2")
        .setTimestamp()
        .setColor("E26302") //http://www.code-couleur.com
        .addField(":cop: Modération \n \n - Ban | Usage -!ban @user \n - Kick | Usage -!kick @user \n - Mute | ( EN DEV ) \n - Clear | Usage -!clear <nombre> \n", ".")
        .addField(":bust_in_silhouette: Joueur \n \n- Aide | Usage -!help \n- Informations Discord | Usage -!infodiscord \n- Server List | Usage -!serverlist \n- Ping | Usage -!ping \n- Communauté  | Usage -!communaute", ".")
        message.channel.send(help_embed)
          }

    if (message.content === "fdp"){
        message.delete()
        message.reply("Insulte interdit ! Le Staff te surveilles");
        console.log("Insulte FDP");
    }
});


bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.lenght).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === prefix + "kick") {
        let modRole = message.guild.roles.find("name", "🎮 Staff 🎮");
        if(!message.member.roles.has(modRole.id)) {
    var kickperm_embed = new Discord.RichEmbed()
    .addField("Tu n'as pas la permission de faire cette commande.", "Tu as besoin de la permission KICK_MEMBERS")
        return message.channel.send(kickperm_embed);
        }
        if(message.mentions.users.size  === 0) {
    var kickuser_embed = new Discord.RichEmbed()
    .addField("Merci de mentionner l'utiliseur a éjécter", ":hammer_pick:")
        return message.channel.send(kickuser_embed);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
    var kickintrouvable_embed = new Discord.RichEmbed()
    .addField("Cet utilisateur est introuvable ou impossible à expulser.")
        return message.channel.send(kickitrouvable_embed);
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.guild.channels.find("name", "sanctions").send(`**${member.user.username} a été expulsé du discord par **${message.author.username}`)
        }).catch(console.error)    
    }});

    bot.on('message', message => {
        let command = message.content.split(" ")[0];
        const args = message.content.slice(prefix.lenght).split(/ +/);
        command = args.shift().toLowerCase();

        if (command === prefix + "ban") {
            let modRole = message.guild.roles.find("name", "🎮 Staff 🎮");
            if(!message.member.roles.has(modRole.id)) {
    var banperm_embed = new Discord.RichEmbed()
    .addField("Tu n'as pas la permission de faire cette commande.", "Tu as besoin de la permission BAN_MEMBERS")
        return message.channel.send(banperm_embed);
            }  
            const member = message.mentions.members.first();
            if (!member)
    var banperm_embed = new Discord.RichEmbed()
    .setColor("E26302")
    .addField("Merci de mentionner l'utilisateur à bannir.", "b!ban @user")
        return message.channel.send(banperm_embed);
            member.ban().then(member => {
    var banuser_embed = new Discord.RichEmbed()
    .setColor("E26302")
    .addField(`**${member.user.username}**`, `A été banni du discord par **${message.author.username}**`)
        return message.channel.send(banuser_embed);
                message.guild.channels.find("name", "sanctions").send(`**${member.user.username} a été banni du discord par **${message.author.username}`)
            }).catch(console.error)
        }});

    bot.on('message', message => {

        if(message.content === prefix + "infodiscord")
            var embed = new Discord.RichEmbed()
            .setDescription(":hammer_pick: Information du Discord")
            .addField("Nom du Discord", message.guild.name)
            .addField("Crée le", message.guild.createdAt)
            .addField("Tu as rejoin le", message.member.joinedAt)
            .addField("Membre Total", message.guild.memberCount)
            .setColor("00FBDA")
        message.channel.sendEmbed(embed)
    });

    bot.on("guildMemberAdd", member => {
        member.guild.channels.find("name", "nouveaux").send(`Bienvenue ${member}`);
    });

    bot.on('message', message => {

        if(message.content === prefix + "serverlist")
            message.channel.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** membres`))
    });

    bot.on('message', message => {

        if(message.content === prefix + "ping")
            message.channel.sendMessage('Temps de latence avec le serveur: `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
    });

    bot.on('message', message => {

        if(message.content.startsWith(prefix + "clear")) {
            if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission !");
    
            let args = message.content.split(" ").slice(1);
    
            if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer !")
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`${args[0]} message ont été supprimés !`);
        })
      }
    });

    bot.on('guildMemberAdd', member => {
        var role = member.guild.roles.find('name', '🔊 Membre Communauté 🔊');
        member.addRole(role)
    });

    bot.on('message', message => {

        if(message.content === prefix + "communaute")
            var embed = new Discord.RichEmbed()
            .setAuthor("🛠️ Notre communauté")
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp()
            .addField("Le dicord BillyRP", "https://discord.gg/QuvxPrf")
            .addField("Le dicord Billy's Pub", "https://discord.gg/78txJyR")
            .setColor("00FBDA")
        message.channel.sendEmbed(embed)
    });
