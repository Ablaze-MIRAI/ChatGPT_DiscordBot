import { Client, GatewayIntentBits, Events, EmbedBuilder } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import slashcommands from "./slashcommands";
import utils from "./utils";
import chatgpt from "./chatgpt";
import env from "./env";

const configuration = new Configuration({ apiKey: env.OPENAI_API_TOKEN });
const openai = new OpenAIApi(configuration);

const client: Client = new Client({
    intents: [ GatewayIntentBits.Guilds ]
});

process.on("uncaughtException", async (e: any) =>{
    utils.Logger.error(e);
})

client.once(Events.ClientReady, async () =>{
    // Slashcommands Registr
    await client.application?.commands.set(slashcommands, env.DEBUG_SERVER?env.DEBUG_SERVER:"");

    // Status Setting
    setInterval(() =>{
        if(env.DEBUG_SERVER) return client.user?.setActivity({ name: `⚡開発モードが有効 | ${client.ws.ping}ms/${Number(client.uptime)/1000}s ` });
        client.user?.setActivity({ name: `/help | ${client.guilds.cache.size}ｻｰﾊﾞｰ ` });
    }, env.PROFILE_STATUS_UPDATE_RATE);

    // Log output
    !env.DEBUG_SERVER?
    utils.Logger.info(`Connected (${client.ws.ping}ms)`):
    utils.Logger.info(`Connected (${client.ws.ping}ms / DEBUG MODE)`);
});

client.on(Events.InteractionCreate, async (interaction) =>{
    if(!interaction.isChatInputCommand()) return;

    switch(interaction.commandName){
        case "help":
            await interaction.reply({ embeds: [new EmbedBuilder().setTitle("ChatGPT").setDescription("OpenAIのAPIを利用しChatGPTを使えるようにしたものです。\n`/chatgpt`と入力するとプロンプトの入力モーダルが出るのでプロンプトを打ち込んで送信してください。")] })
            .catch((e: any) =>{
                throw new Error("Reply Error");
            })
            break;
        case "chatgpt":
            await chatgpt.modal(interaction);
            break;
    }
});

client.on(Events.InteractionCreate, async (interaction) =>{
    if(!interaction.isModalSubmit()) return;
    try{
        await chatgpt.modalSubmit(interaction, openai);
    }catch(e: any){
        utils.Logger.error(e);
    }
});

client.login(env.DISCORD_API_TOKEN).catch((e) =>{
    utils.Logger.error(`Faild login\n${e}`);
});