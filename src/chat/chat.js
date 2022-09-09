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
  {buttonId:  `${prefix}all ${dn}` , buttonText: {displayText: '*📥 TODOS OS REGISTROS*'
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
function react(id, text1 = {}){
const reactionMessage = {react: {text: text1,key: msg.key}}
cat.sendMessage(id, reactionMessage)}

switch (command) {
 case `all`:
 try {
  const cod = msg.message.buttonsResponseMessage.selectedButtonId;
  const filterCod = cod.split(' ');
  const Cod = filterCod[1]
    
 let  res = await fetchJson(`${api}${Cod}`);
 let events = res.eventos ;
 let mess = ''
for(evennt of events){
     mess = mess +  `
     *📌 STATUS* : ${evennt.status}
     *📍 LOCAL* : ${evennt.local}
     *📅 DATA* : ${evennt.data}
     *⌛ HORA* : ${evennt.hora}
     
     `
 }
 
 react(from, '📋')
 cat.sendMessage(from, { text : mess }, { quoted : msg })
} catch(err){
    reply('ouve um error interno tente novamente.');
}
break ;

case 'menu':
    
    cat.sendMessage(from, buttonMessage)
    react(from, '📄')
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
react(from, '🔍')

    }
}catch (err){
    console.log(err)
    reply('encomenda não encontrada, por favor entre em contato com meu desenvolvedor ou tente novamente mais tarde..')
}
break ;

default:
     }
    }catch(e){
        console.log(e)
    }
}