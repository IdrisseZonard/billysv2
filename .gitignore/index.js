const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("-!")

bot.on('ready', function() {
    bot.user.setActivity('-!help', { type: 'PLAYING' });
    console.log("Connectedç");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    if (message.content === prefix + "help") {
    message.delete()

        var help_embed = new Discord.RichEmbed()
        .setAuthor("Les commandes")
        .setFooter(message.author.username, message.author.avatarURL)
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
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        if(message.mentions.users.size  === 0) {
            return message.reply("Merci de mentionner l'utilisateur à expulser.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible à expulser.")
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès`).catch(console.error);
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
    var banperm_embed = new Discord.RichEmebd()
    .addField("Tu n'as pas la permission de faire cette commande.", "Tu as besoin de la permission BAN_MEMBERS")
        return message.channel.send(banperm_embed);
            }  
            const member = message.mentions.members.first();
            if (!member) return message.reply("Merci de mentionner l'utilisateur à bannir.");
            member.ban().then(member => {
    var ban_embed = new Discord.RichEmbed()
    .addField(`**${member.user.username}**`, `A été banni du discord par **${message.author.username}**`)
                message.reply(`${member.user.usernme} a été banni avec succès`).catch(console.error);
                message.guild.channels.find("name", "sanctions").send(ban_embed)
            }).catch(console.error)
        }});

    bot.on("guildMemberAdd", member => {
        member.guild.channels.find("name", "nouveaux").send(`Bienvenue ${member}`);
    });

    bot.on('message', message => {

        if(message.content === prefix + "ping")
        message.delete()
        message.author.send('Temps de latence avec le serveur: `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
    });

    bot.on('guildMemberAdd', member => {
        var role = member.guild.roles.find('name', '🔊 Membre Communauté 🔊');
        member.addRole(role)
    });

    bot.on('message', message => {
    
        if(message.content === prefix + "communaute") {
        message.delete()
            var embed = new Discord.RichEmbed()
            .setAuthor("🛠️ Notre communauté")
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp()
            .addField("Le dicord BillyRP", "https://discord.gg/QuvxPrf")
            .addField("Le dicord Billy's Pub", "https://discord.gg/78txJyR")
            .setColor("00FBDA")
        message.channel.sendEmbed(embed)
    });

    bot.on('message', message => {
    
        if(message.content === prefix + "infodiscord") {
        message.delete()
            var embed = new Discord.RichEmbed()
            .setAuthor("🛠️ Notre communauté")
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp()
            .addField("Nom du dicord", message.guild.name)
            .addField("Crée le", message.guild.createdAt)
            .addField("Tu as rejoin le", message.member.joinedAt)
            .addField("Utilisateurs sur le dicord", message.guild.memberCount)
            .setColor("E26302")
        message.channel.sendEmbed(embed)
    }});

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

    bot.on('message', message => {
    
        if(message.content === prefix + "partenaire") {
        message.delete()
            var embed = new Discord.RichEmbed()
            .setAuthor("🛠️ Les Partenariats")
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp()
            .addField(" \n Commande en Développement", " \n Contactez Idrisse")
            .setColor("E26302")
        message.channel.sendEmbed(embed)
    }});
