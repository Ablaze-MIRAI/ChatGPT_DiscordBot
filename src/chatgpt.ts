import { ModalBuilder, ActionRowBuilder, ModalActionRowComponentBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } from "discord.js";
import env from "./env";
import utils from "./utils";

export default {
    modal: async (interaction: { showModal: (arg0: ModalBuilder) => any; }) =>{
        const modal = new ModalBuilder().setCustomId("modal-main").setTitle("ChatGPT");
        const PromptInput = new TextInputBuilder().setCustomId("prompt-input").setStyle(TextInputStyle.Paragraph).setLabel("PROMPT (処理には時間がかかります)").setRequired(true).setMaxLength(500).setMinLength(1);
        modal.addComponents(new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(PromptInput));
        await interaction.showModal(modal);
    },
    modalSubmit: async (interaction: any, openai: { createCompletion: (arg0: { model: string; prompt: any; max_tokens: number; }) => any; }) =>{
        utils.Logger.info("Excuting...");
        await interaction.deferReply().catch((e: any) =>{
            interaction.reply({embeds: [utils.Embed.error("ERROR", "送信時に何らかのエラーが発生しました")]});
            throw new Error("DeferReply Error");
        });

        const nowTime = new Date().getTime();
        const prompt = interaction.fields.getTextInputValue("prompt-input");
        const completion = await openai.createCompletion({
            model: env.OPENAI_API_MODEL,
            prompt: prompt,
            max_tokens: env.OPENAI_API_MAX_TOKEN
        });
        const result = completion.data.choices[0].text;

        const processed_time = (new Date().getTime()) - nowTime;
        const embed = new EmbedBuilder().setTitle(prompt).setDescription(result).setFooter({text: `${processed_time/1000}s(${processed_time}ms) | ChatGPT/OpenAI`}).setColor(utils.ColorHex("#c4ff89"));
        utils.Logger.info(`Done (${processed_time}ms)`);
        return interaction.editReply({embeds: [embed]}).catch((e: any) =>{
            interaction.editReply({embeds: [utils.Embed.error("ERROR", "送信時に何らかのエラーが発生しました")]});
            throw new Error("Reply Error");
        });;
    }
}