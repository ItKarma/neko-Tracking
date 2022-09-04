const 
{ default: catZapConnect,
DisconnectReason,
useSingleFileAuthState,
} = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const {state , saveState} = useSingleFileAuthState('./src/cache/session.json');
const pino = require('pino');
const fs = require('fs')

async function startCat(){
    const cat = catZapConnect({
        logger: pino({ level: 'silent' }),
        auth: state,
        printQRInTerminal: true,
        browser: ['@Lopezs','Safari','1.0.0']
    });

    cat.ev.on('connection.update', (update) => {
    require('./events/connection') (catConnection);
    cat.ev.on('creds.update', saveState)
    console.log(update)
    })
    
    cat.ev.on('messages.upsert', async catChat => {
        if (!catChat.messages) return
        msg = catChat.messages[0]
        console.log(msg)
        require("./chat/chat")(cat,catChat, msg)})
        
    }
startCat()