const fs = require('fs')
module.exports = catConnection = (update) =>{

 const { connection, lastDisconnect } = update
  //console.log(connection);
 if (connection === 'close '){
   const reconexao = new Boom(lastDisconnect?.error)?.output.statusCode
   //tratamento de error de conexão
   if(reconexao === DisconnectReason.badSession){
     console.log("Error na sesão , exclua a existente e Scaneie novamente por favor !");
     cat.logout();
   }
   if (reconexao === DisconnectReason.connectionClosed || DisconnectReason.connectionLost){
     console.log("Conexão Fechada ou Perdida , Reconectando...");
     startCat();
   }
   if (reconexao === DisconnectReason.connectionReplaced){
     console.log("Conexão substituída, outra nova sessão aberta, feche a sessão atual primeiro");
     cat.logout();
   }
   if (reconexao === DisconnectReason.loggedOut){
     console.log("Dispositivo deslogado , rode e tente novamente.");
     cat.logout();
   }
   if (reconexao === DisconnectReason.restartRequired){
     console.log("Restart pedido , Reiniciando....");
     startCat();
   }
   if (reconexao === DisconnectReason.timedOut){
     console.log("Tempo de conexão esgotado, Reconectando....");
     startCat()
   }
   else  cat.end(`Razão de desconexao desconhecida , motivo ${reconexao} ${conection}`);
  } 
  //console.log("[ STATUS : CONECTADO ]")
}