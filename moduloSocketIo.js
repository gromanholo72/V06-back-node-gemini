
import { Server } from "socket.io";

export const moduloSocketIo = (serverHttp) => {






      

      


      /* 🚀 Inicializando o Servidor de Mensagens (Socket.io) */
      const io = new Server(serverHttp, {
            cors: {
                  // 🌐 Permite que qualquer IP (celular/PC/Firebase) se conecte
                  origin: "*", 
                  methods: ["GET", "POST"]
            }
      });

      
















      

      io.on("connection", (socket) => {

            io.emit('totalConect', { 
                  varTotalConect: io.engine?.clientsCount
            });

            console.log(""); 
            console.log("🪀 🟢 --------------------------------------------------"); 
            console.log("🪀 🟢 CONEXÃO SOCKET ATIVA"); 
            console.log("🪀 🟢 arquivo - moduloSocketIo.js");
            console.log("🪀 🟢 --------------------------------------------------"); 
            console.log(`🪀 🟢 Cliente conectado - socket.id: ${socket.id}`);
            console.log(`🪀 🟢 Total conectados: ${io.engine?.clientsCount}`);
            console.log("🪀 🟢 --------------------------------------------------"); 
            

           






            socket.on("disconnect", (motivo) => {
                  
                  io.emit('totalConect', { 
                        varTotalConect: io.engine?.clientsCount
                  });

                  console.log("");
                  console.log("🪀 🔴 --------------------------------------------------"); 
                  console.log("🪀 🔴 CONEXÃO ENCERRADA"); 
                  console.log("🪀 🔴 arquivo - moduloSocketIo.js");
                  console.log("🪀 🔴 --------------------------------------------------"); 
                  console.log(`🪀 🔴 Cliente desconectado - socket.id: ${socket.id}`);
                  console.log(`🪀 🔴 📝 Motivo: ${motivo}`);
                  console.log(`🪀 🔴 Total conectados após ultima desconexao: ${io.engine?.clientsCount}`);
                  console.log("🪀 🔴 --------------------------------------------------"); 

            });



            


      });


      
      return io;


};

 