const { Client } = require('discord.js-selfbot-v13');
const client = new Client({checkUpdate: false}); 
const { token_id, channel_id } = require('./config.json');
const prefix = "$";

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
var _ = require('underscore');

client.on('ready', async () => {
    client.user.setStatus('available')
    console.log(`${client.user.username} `);
  })

client.on('ready', async (menu) => {
    var channel = `${channel_id}`
    client.channels.cache.get(channel);
        client.on("messageCreate", msg =>{
            if(channel.includes(msg.channel.id)){
                if (msg.author.id == '') return;//your Bot Id
                
                if (msg.content === 'ping' ) {
                        msg.reply(`Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
                        .then(msg => {
                        setTimeout(() => msg.delete(), 2000)
                        })
                        .catch();
                        }
                 if (msg.content.startsWith(prefix)) {
                    const mulai = async() => {
                        const con = msg.content.replace(/[$]/gi, '');
                        const konteks = con.toLocaleLowerCase()
                        const token = konteks.split(" ")
                        try{
                            var daftar = await CoinGeckoClient.coins.list();
                            var hasil = _.find(daftar.data, function(value) {
                                return value.symbol === token[0];
                            });
                            var data1 = await CoinGeckoClient.coins.fetch(hasil.id, {});
                                if (token[1] == undefined){
                                    msg.reply("``"+"1 "+token[0]+' = '+'$'+data1.data.market_data.current_price.usd+'``')
                                }
                                else{
                                    msg.reply("``"+token[1]+" "+token[0]+' = '+'$'+data1.data.market_data.current_price.usd*token[1]+'``')
                                }
                        }
                        catch(err){ 
                            
                        }
                    }
                    mulai();
                }
            }
        })
    })
client.login(token_id);