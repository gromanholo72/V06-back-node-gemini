

// ---------------------------------------------------------
// 🏗️ 👔 1. LOGÍSTICA E SUPRIMENTOS (Importações)
// ---------------------------------------------------------

import { ipLocalRede, portaServidor, nomeSistema} from "./dotenv_Info.js";

// NÚCLEO DE DADOS (CONFIGURAÇÃO GOOGLE)
import { inicializarFirebase } from "./FirebaseConfig.js";

// MOTORES DO SISTEMA (DEPENDÊNCIAS EXTERNAS)
import express from "express";
import { createServer } from "http";

// MÓDULOS DE NEGÓCIO (ENGENHARIA CUSTOMIZADA)
import { moduloSocketIo } from "./moduloSocketIo.js";
import { moduloInfraestrutura } from "./moduloInfraestrutura.js";




// console.log(""); 
// console.log("-----------------------------------------------"); 
// console.log("🔵 1. IMPORTAÇÃO DOS MÓDULOS ✅"); 
// console.log("🔵 arquivo - server.js");
// console.log("🔵 -----------------------------------------------"); 
// console.log("🔵 express        = ", typeof express === 'function' ? "✅ Pronto" : "❌ Erro");
// console.log("🔵 socket/http    = ", typeof createServer === 'function' ? "✅ Pronto" : "❌ Erro");
// console.log("🔵 firebase_init  = ", typeof inicializarFirebase === 'function' ? "✅ Pronto" : "❌ Erro");
// console.log("🔵 modulo_socket  = ", typeof moduloSocketIo === 'function' ? "✅ Pronto" : "❌ Erro");
// console.log("🔵 modulo_infra   = ", typeof moduloInfraestrutura === 'function' ? "✅ Pronto" : "❌ Erro");
// console.log("-----------------------------------------------");
// console.log(""); 
// console.log("📐 -----------------------------------------------------------"); 
// console.log("📐 2. CONFIGURAÇÃO: CARGA DO DOTENV ✅"); 
// console.log("📐 arquivo - server.js");
// console.log("📐 Sistema     = ", nomeSistema);
// console.log("📐 IP de Rede  = ", ipLocalRede);
// console.log("📐 Porta Ativa = ", portaServidor);
// console.log("📐 -----------------------------------------------------------");









const app = express();

// console.log(""); 
// console.log("🔵 -----------------------------------------------"); 
// console.log("🔵 2. CONFIGURAÇÃO: LOGÍSTICA E INFRAESTRUTURA ✅"); 
// console.log("🔵 arquivo - server.js");
// console.log("🔵 app (express) = ", app ? "✅ Instância Pronta" : "❌ Erro");
// console.log("🔵 -----------------------------------------------");












const httpServer = createServer(app);
const io = moduloSocketIo(httpServer);

const totalDeConexoes = io.engine?.clientsCount || 0; // Quantos aparelhos estão ligados agora
const pathConfigurado = io.opts?.path || "/socket.io"; // Onde o rádio está sintonizado
const servindoEstáticos = io._serveClient ? "✅ Sim" : "❌ Não"; // Se ele entrega o arquivo JS automático
const namespacePrincipal = io.sockets?.name || "/"; // O canal principal de comunicação

// console.log(""); 
// console.log("🔵 ---------------------------------------------------------"); 
// console.log("🔵 3. COMUNICAÇÃO: ENGINE DE TEMPO REAL (socketIo) ✅"); 
// console.log("🔵 arquivo - server.js");
// console.log("🔵 httpServer = ", httpServer ? "✅ Servidor HTTP Pronto" : "❌ Erro");
// console.log("🔵 io (Socket.io) = ", io ? "✅ Canal Aberto" : "❌ Erro");
// console.log("🔵 Clientes Online  = ", totalDeConexoes);
// console.log("🔵 Rota de Escuta   = ", pathConfigurado);
// console.log("🔵 Servir Cliente   = ", servindoEstáticos);
// console.log("🔵 Namespace Base   = ", namespacePrincipal);
// console.log("🔵 Protocolos Adm   = ", "WebSocket + Polling");
// console.log("🔵 infra (CORS/JSON) = ✅ Infraestrutura Liberada");
// console.log("🔵 ---------------------------------------------------------");
















// 🔥 Inicialização do Motor Firebase
const firebase = inicializarFirebase(); 

// console.log(""); 
// console.log("🔥 ---------------------------------------------------------"); 
// console.log("🔥 4. BANCO DE DADOS FIREBASE"); 
// console.log("🔥 arquivo - server.js");

// ✅ O CAMINHO DO SUCESSO (ESTRUTURA LIMPA E PROFISSIONAL)
if (firebase && firebase.db_admin) {

    // Extraímos o diagnóstico para um código mais limpo
    const { diagnostico } = firebase;

    // console.log("🔥 Status       : ", diagnostico.status);
    // console.log("🔥 Database URL : ", diagnostico.databaseURL);
    // console.log("🔥 Projeto ID   : ", diagnostico.projetoId);
    // console.log("🔥 E-mail Técn  : ", diagnostico.clienteEmail);
    // console.log("🔥 Chave ID     : ", diagnostico.chaveId);
    // console.log("🔥 Ambiente     : ", diagnostico.ambiente);
    // console.log("🔥 Localização  : ", diagnostico.local);
    // console.log("🔥 Conexão em   : ", diagnostico.timestamp);
    // console.log("🔥 SDK Versão   : ", diagnostico.versaoSDK);
    // console.log("🔥 ---------------------------------------------------------");

} 
// ❌ O CAMINHO DO ERRO (DIAGNÓSTICO PRECISO)
else {

    // Proteção: Só tenta ler o detalhe se o objeto diagnóstico existir
    const erroDna = firebase.diagnostico?.detalheTecnico || "Erro desconhecido na inicialização";
    
    // console.log("🔥 ❌ Erro Crítico: Verifique as Credenciais no .env!");
    // console.log("🔥 ⚠️ Detalhe    : ", erroDna);
    // console.log("🔥 ---------------------------------------------------------");

}


















// ---------------------------------------------------------
// INICIO - 🚨 4. INCLUIR PROGRAMADOR RAIZ (Auto-Cura do Sistema)
// ---------------------------------------------------------

const garantirProgramadorRaiz = async () => {

    if (!firebase.db_admin) return;

    const meuCpf = "121.149.148-01";
    const cpfLimpo = meuCpf.replace(/\D/g, "");
    const caminhoAdmin = firebase.db_admin.ref(`usuarios/${cpfLimpo}`);

    try {

        const snapshot = await caminhoAdmin.once("value");

        if (!snapshot.exists()) {



        await caminhoAdmin.set({

            // 👤 Dados Básicos
            dadosBasico: {
                nome: "GIULIANO APARECIDO ROMANHOLO",
                cpef: meuCpf,
                func: "programador"
            },

            // 🔐 Dados Segurança
            dadosSeguranca: {
                senh: "Olhoquetudove@7"
            },

            // ⚙️ Dados Internos 
            dadosInterno: {
                perm: "total",
                situ: "ativo",
                datc: new Date().toLocaleString('pt-BR'),
                timestamp: Date.now()
            }

        });

            // console.log("");
            // console.log("🚨 -----------------------------------------------------------");
            // console.log("🚨 4. INSPEÇÃO: INCLUIR PROGRAMADOR RAIZ ✅");
            // console.log("🚨 arquivo - server.js");
            // console.log("🚨 🏗️  Usuario programador criado no banco de dados! ✅");
            // console.log("🚨 -----------------------------------------------------------");

        } else {

            // console.log("");
            // console.log("🚨 -----------------------------------------------------------");
            // console.log("🚨 4. INSPEÇÃO: INCLUIR PROGRAMADOR RAIZ ✅");
            // console.log("🚨 arquivo - server.js");
            // console.log("🚨 🏗️ ✅ O programador ja existe na base de dados!");
            // console.log("🚨 -----------------------------------------------------------");

        }

    } catch (error) {

        // console.error("");
        // console.error("🚨 -----------------------------------------------------------");
        // console.error("🚨 4. INSPEÇÃO: INCLUIR PROGRAMADOR RAIZ ✅");
        // console.error("🚨 arquivo - server.js");
        // console.error("🚨 🏗️ ❌ Erro na criacao do programador: ", error.message);
        // console.error("🚨 -----------------------------------------------------------");

    }

};

garantirProgramadorRaiz();

// ---------------------------------------------------------
// FIM - 🚨 4. INCLUIR PROGRAMADOR RAIZ (Auto-Cura do Sistema)
// ---------------------------------------------------------



















moduloInfraestrutura(app, firebase.db_admin);




















// ---------------------------------------------------------
// 🚀 👔 5. STATUS DO SERVIDOR: OPERACIONAL ✅
// ---------------------------------------------------------
httpServer.listen(portaServidor, () => {
    
    const urlFinal = `http://${ipLocalRede}:${portaServidor}`;

    console.log(""); 
    console.log("🌐 -----------------------------------------------------------"); 
    console.log("🌐 5. STATUS DO SERVIDOR: OPERACIONAL ✅"); 
    console.log("🌐 arquivo - server.js");
    console.log(`🌐 🏷️  SISTEMA = ${nomeSistema}`);
    console.log(`🌐 👑  REDE    = ${urlFinal}`);
    console.log("🌐 -----------------------------------------------------------");

});