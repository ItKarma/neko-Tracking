/*
  essa api você pode ter acesso entrando em contato com https://api.linketrack.com/
  por favor se for clonar o projeto deixe sua estrela e deixe os créditos.
*/

const { proto, getContentType,MessageType, MessageOptions, Mimetype , generateWAMessageFromContent} = require('@adiwajshing/baileys');
require('dotenv').config()
const { fetchJson } = require('../function/fetch');
const fs = require('fs');
const api = process.env.URL_API;

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


const buttons = [
  {buttonId:  `${prefix}menu` , buttonText: {displayText: 'Todos os Registros da encomenda'
  }, type: 1}]
  
const templateButtons = [
  {index: 1, urlButton: {displayText:'🧙‍♂️ Desenvolvedor', url: 'https://wa.me/5591984155848'}},
  {index: 2, urlButton: {displayText: '👨‍💻 Código fonte' ,url: 'https://github.com/danzok/catRastreio'}}
]
//const img = 
//console.log(img)
const buttonMessage = {
   image :  fs.readFileSync( __dirname + '/img/cat.jpg') ,
    caption : `Ola @${pushname}, eu lhe ajudarei a rastrear suas encomendas, é so mandar o código !

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
  try{
      
    if (dn === '' || undefined )
        reply('Por favor me envie um código válido')
    else{
        
 let  res = await fetchJson(`${api}${dn}`);
 let status = res.eventos[0].status;
 let  local = res.eventos[0].local;
 let  data = res.eventos[0].data;
 let  hora = res.eventos[0].hora;
const mess =  `*📦Encomenda Encontrada📦*
 
*📌 status atual* : ${status}
*📍 local atual* : ${local}
*📅 data* : ${data}
*⌛ hora* : ${hora}
 `  

const buttonMessage = {
    text: mess,
    footer: 'catRastreio beta ✓',
    buttons: buttons,
    headerType: 1
}

cat.sendMessage(from,buttonMessage, { quoted : msg })
    }
}catch (err){
    console.log(err)
    reply('encomenda não encontrada, por favor entre em contato com meu desenvolvedor ou tente novamente mais tarde..')
}
break ;
 case 'allStatus':
 reply('tudo ok')

break ;

default:
     }
    }catch(e){
        console.log(e)
    }
}