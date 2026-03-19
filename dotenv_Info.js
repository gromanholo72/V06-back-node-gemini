// 📦 0. IMPORTAÇÃO DE FERRAMENTAS NATIVAS
import os from 'os';

// 👔 1. LOGÍSTICA DE AMBIENTE (VARIÁVEIS DE SISTEMA) - package.json executado pelo npm

let ipLocalRede;
let nomeSistema

if (process.env.NODE_ENV !== 'production') {
      
      const dotenv = await import('dotenv');
      dotenv.config();

      nomeSistema = "Versao 02 - Desenvolvimento - meu computador";
      ipLocalRede = "192.168.15.4";

      console.log(""); 
      console.log("👑 -------------------------------------------------------------------"); 
      console.log("👑 📦 0. LOGÍSTICA: CARREGAMENTO DE SUPRIMENTOS (.env) ✅"); 
      console.log("👑  arquivo - dotenv_Info.js");
      console.log("👑 🔵 Gerador Local Ativado: Modo Desenvolvimento");

} else {

      nomeSistema = "Versao 02 - Producao - Servidor externo";
      ipLocalRede = "0.0.0.0";

      console.log(""); 
      console.log("👑 -------------------------------------------------------------------"); 
      console.log("👑 📦 0. LOGÍSTICA: CARREGAMENTO DE SUPRIMENTOS (.env) ✅"); 
      console.log("👑  arquivo - dotenv_Info.js");
      console.log("👑 🔴 Gerador de Nuvem Ativado: Modo Produção");

}



const portaServidor = process.env.PORT || 3001;

// 2. SUPRIMENTOS FIREBASE
const databaseUrlFirebase = "https://react-vite01-644c9-default-rtdb.firebaseio.com/";


const databaseChaveAdminFirebase = process.env.FIREBASE_CHAVE_JSON_ADMIN ? process.env.FIREBASE_CHAVE_JSON_ADMIN : "❌ Arquivo Ausente";

// 3. METADADOS DO PROCESSO (MOTOR)
const versaoNodeMotor = process.version; 
const idProcessoPID = process.pid;
const sistemaOperacional = `${process.platform} (${process.arch})`; // NOVO: Windows ou Linux?
const modeloCPU = os.cpus()[0].model; // NOVO: Qual o motor?
const memoriaConsumida = `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`;
const tempoAtividade = `${Math.round(process.uptime())}s`; // NOVO: Tá ligado há quanto tempo?
const diretorioCanteiro = process.cwd();
const fusoHorarioLocal = Intl.DateTimeFormat().resolvedOptions().timeZone;


console.log("");
console.log("👑 -------------------------------------------------------------------");
console.log("👑 🏷️  nomeSistema          = ", nomeSistema);
console.log("👑 🌐 ipLocalRede          = ", ipLocalRede);
console.log("👑 🔌 portaServidor        = ", portaServidor);
console.log("👑 -------------------------------------------------------------------"); 
console.log("👑 🗄️  databaseUrlFirebase  = ", databaseUrlFirebase);
console.log("👑 🗝️  databaseChaveAdminFirebase    = ", databaseChaveAdminFirebase);
console.log("👑 -------------------------------------------------------------------");
console.log("👑 ⚙️  Motor Node      = ", versaoNodeMotor);
console.log("👑 💻 Plataforma      = ", sistemaOperacional);
console.log("👑 ⚡ CPU             = ", modeloCPU);
console.log("👑 🧠 Memória RAM     = ", memoriaConsumida);
console.log("👑 ⏱️  Uptime          = ", tempoAtividade);
console.log("👑 🆔 Processo PID    = ", idProcessoPID);
console.log("👑 ⏰ Fuso Horário    = ", fusoHorarioLocal);
console.log("👑 📂 Diretório       = ", diretorioCanteiro);
console.log("👑 🏁 Logística       = ✅ Monitoramento Ativo");
console.log("👑 -------------------------------------------------------------------");



export { 
      
      nomeSistema,
      ipLocalRede, 
      portaServidor,
      databaseUrlFirebase,     
      databaseChaveAdminFirebase 

};