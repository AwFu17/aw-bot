const {
    Telegraf,
    Markup
} = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}`))
bot.help((ctx) => ctx.reply(text.commands))
bot.command('sheet', async (ctx) => {
    
    try {await ctx.replyWithHTML('<b> buttons </b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('button', 'btn_1.3'), Markup.button.callback('button', 'btn_2.3'), Markup.button.callback('button', 'btn_3.3')], 
        ]
    ))}
    catch(error){
        console.error(error);
    }
})
bot.hears((ctx) => {console.log(ctx.message);})


function addActionBot(name, src, text){
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src !== false){
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (error) {
            console.error(error);
        }
    })
}
addActionBot('btn_1.1', './img/doggy.jpg', text.text)
addActionBot('btn_1.1', './img/doggy.jpg', text.text)
addActionBot('btn_1.2', false, text.text)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

