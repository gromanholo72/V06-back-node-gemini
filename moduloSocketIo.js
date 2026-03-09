
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

      /* 🚀 CONSOLE DE INSPEÇÃO MAESTRO - BACKEND */
      console.log("");
      console.log("🔍 -----------------------------------------------------------");
      console.log("🔍 INSPEÇÃO DE INFRAESTRUTURA (Socket.io Server)");
      console.log("🔍 Status do Servidor : ✅ Inicializado com Sucesso");
      console.log("🔍 Política de CORS   : 🌐 Liberada (origin: *)");
      console.log("🔍 Métodos Permitidos : [GET, POST]");
      console.log("🔍 -----------------------------------------------------------");

      /* Monitorando Conexões em Tempo Real */
      io.on("connection", (socket) => {
            console.log(`🔌 Novo dispositivo conectado: ID [${socket.id}]`);
            
            socket.on("disconnect", () => {
                  console.log(`❌ Dispositivo desconectado: ID [${socket.id}]`);
            });
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

 