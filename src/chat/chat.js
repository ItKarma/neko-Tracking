const { proto, getContentType,MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
//const { rastrearEncomendas } = require('correios-brasil');
//let codRastreio = ['NL034770970BR']; // array de códigos de rastreios

const fs = require('fs');
module.exports = async (cat, Catchat, msg) => {
    try{
if (msg.key && msg.key.remoteJid === 'status@broadcast') return
const pushname = msg.pushName || 'sem nome'
const type = getContentType(msg.message)
const from = msg.key.remoteJid
const quoted = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const dn = args.join(' ')
const isGroup = from.endsWith('@g.us')
const botNumber = cat.user.id.split(':')[0]
const sender = msg.key.fromMe ? (cat.user.id.split(':')[0]+'@s.whatsapp.net' || cat.user.id) : (msg.key.participant || msg.key.remoteJid)
const reply = async(teks) => {await cat.sendMessage(from,{text: teks},{quoted:msg})}

const templateButtons = [
  {index: 1, urlButton: {displayText:'🧙‍♂️ developer', url: 'https://wa.me/5591984155848'}},
  {index: 2, urlButton: {displayText: '👨‍💻 Código fonte' ,url: 'https://github.com/danzok/catRastreio'}},
  {index: 3, quickReplyButton: {displayText: 'Rastrear', id: 'id-like-buttons-message'}},
]
const buttonMessage = {
    text: `Ola @${pushname}, esse bot lhe ajudar a rastrear 
    suas encomendas, é so mandar o código !.`,
    footer: 'version beta ✓',
    templateButtons: templateButtons,
}

switch (command) {
    
case 'menu':
  //  console.log(from)
    cat.sendMessage(from, buttonMessage)
break

case 'ei':
    cat.sendMessage(from, { text: "a"} )
break

default:
     }
    }catch(e){
        console.log(e)
    }
}