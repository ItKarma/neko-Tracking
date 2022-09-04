/*
  essa api você pode ter acesso entrando em contato com https://api.linketrack.com/
  por favor se for clonar o projeto deixe sua estrela e deixe os créditos.
*/

const { proto, getContentType,MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
require('dotenv').config()
const { fetchJson } = require('../function/fetch');
const fs = require('fs');
const api = process.env.URL_API;
//console.log(api)
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
const botNumber = cat.user.id.split(':')[0]
const sender = msg.key.fromMe ? (cat.user.id.split(':')[0]+'@s.whatsapp.net' || cat.user.id) : (msg.key.participant || msg.key.remoteJid)
const reply = async(teks) => {await cat.sendMessage(from,{text: teks},{quoted:msg})}

const templateButtons = [
  {index: 1, urlButton: {displayText:'🧙‍♂️ developer', url: 'https://wa.me/5591984155848'}},
  {index: 2, urlButton: {displayText: '👨‍💻 Código fonte' ,url: 'https://github.com/danzok/catRastreio'}},
  /*{index: 3, quickReplyButton: {displayText: 'Rastrear', id: 'id-like-buttons-message'}}*/
]
const buttonMessage = {
    text: `Ola @${pushname}, Esse bot lhe ajudara a rastrear suaencomendas, é so mandar o código !
    
    Para rastreiar , use o comando "cod"
    ex :
    cod LB857214362S6 `,
    footer: '@catRastreio beta ✓',
    templateButtons: templateButtons,
}


switch (command) {
    
case 'menu':
    cat.sendMessage(from, buttonMessage)
break

case 'cod':
 let  res = await fetchJson(`${api}${dn}`);
 let status = res.eventos[0].status;
 let  local = res.eventos[0].local;
 let  data = res.eventos[0].data;
 let  hora = res.eventos[0].hora;
await cat.sendMessage(from, {text: `*📦Encomenda Encontrada📦*
 
*📌 status atual* : ${status}
*📍 local atual* : ${local}
*📅 data* : ${data}
*⌛ hora* : ${hora}
 `})
   break

default:
     }
    }catch(e){
        console.log(e)
    }
}