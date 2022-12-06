import { EmbedBuilder } from "@discordjs/builders";

const getNowTime = () =>{
    const dh = new Date();
    const y = dh.getFullYear();
    const m = dh.getMonth()+1;
    const d = dh.getDate();
    const h = dh.getHours();
    const i = dh.getMinutes();
    const s = dh.getSeconds();
    return `${y}/${m}/${d}-${h}:${i}:${s}`;
}

export default {
    Logger: {
        info: (content: string) =>{
            console.log(`${getNowTime()}|[INFO] ${content}`);
        },
        error: (content: string) =>{
            console.error(`\x1b[31m${getNowTime()}\n[ERROR]\n${content}\n======\x1b[0m`);
        } 
    },
    Embed: {
        error: (title: string, reason: string) =>{
            return new EmbedBuilder().setTitle(title).setDescription(reason).setColor(16746889)
        }
    },
    ColorHex: (hex: string) => parseInt(hex.replace("#", ""), 16)
};