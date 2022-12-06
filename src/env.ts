export default {
    DISCORD_API_TOKEN: process.env.DISCORD_API_TOKEN || undefined,
    OPENAI_API_TOKEN: process.env.OPENAI_API_TOKEN || undefined,
    DEBUG_SERVER: process.env.DEBUG_SERVER || undefined,
    OPENAI_API_MAX_TOKEN: 1024,
    OPENAI_API_MODEL: "text-davinci-003",
    PROFILE_STATUS_UPDATE_RATE: 5000
}