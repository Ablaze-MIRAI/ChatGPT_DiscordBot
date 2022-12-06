import { ApplicationCommandDataResolvable, ApplicationCommandType } from "discord.js";

const commands: ApplicationCommandDataResolvable[] = [
    {
        name: "help",
        description: "このBOTのヘルプを表示します",
        type: ApplicationCommandType.ChatInput
    },
    {
        name: "chatgpt",
        description: "ChatGPTを利用できます",
        type: ApplicationCommandType.ChatInput
    }
];

export default commands;