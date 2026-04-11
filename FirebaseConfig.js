/*-----------------------------------------------------------
👔 MÓDULO: CONFIGURAÇÃO DO BANCO DE DADOS (FIREBASE)
----------------------------------------------------------- */

import fs from 'fs';
import admin from "firebase-admin";

// 📦 Importamos os suprimentos já validados pela Coroa 👑
import { DATABASE_URL_FIREBASE, DATABASE_CHAVE_ADMIN_FIREBASE } from "./dotenv_Info.js";

export const inicializarFirebase = () => {
    let serviceAccount; 

    try {
        console.log("");
        console.log("🔍 -----------------------------------------------------------");
        console.log("🔍 INSPEÇÃO DE SUPRIMENTOS PARA O BANCO DE DADOS");
        console.log("🔍 arquivo - FirebaseConfig.js");
        console.log("🔍 -----------------------------------------------------------");
        console.log("🔍 DATABASE_URL_FIREBASE:", DATABASE_URL_FIREBASE);
        
        // Verificação de integridade da variável
        const chaveValida = DATABASE_CHAVE_ADMIN_FIREBASE && !DATABASE_CHAVE_ADMIN_FIREBASE.includes("Arquivo Ausente");
        console.log("🔍 DATABASE_CHAVE_ADMIN_FIREBASE :", chaveValida ? "✅ Recebida" : "❌ INVÁLIDA/AUSENTE");
        console.log("🔍 -----------------------------------------------------------");

        if (!admin.apps.length) {
            
            // 🚨 TRAVA DE SEGURANÇA: Se não tem chave e não é JSON, interrompe antes do crash
            if (!chaveValida && !DATABASE_CHAVE_ADMIN_FIREBASE?.trim().startsWith('{')) {
                throw new Error("As credenciais do Firebase não foram encontradas ou são inválidas (ENOENT preventivo).");
            }

            // 🕵️ Lógica Híbrida Inteligente
            if (DATABASE_CHAVE_ADMIN_FIREBASE.trim().startsWith('{')) {
                // MODO NUVEM: O dado já é o próprio JSON (ideal para Render/Railway)
                serviceAccount = JSON.parse(DATABASE_CHAVE_ADMIN_FIREBASE);
            } else {
                // MODO LOCAL: Contém o caminho físico do arquivo (ex: ./chave.json)
                const conteudo = fs.readFileSync(DATABASE_CHAVE_ADMIN_FIREBASE, 'utf8');
                serviceAccount = JSON.parse(conteudo);
            }

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: DATABASE_URL_FIREBASE,
            });

        } else {
            // Se já estiver inicializado, recupera as credenciais existentes
            serviceAccount = admin.app().options.credential || {}; 
        }

        const app = admin.app();
        const config = app.options;

        return {
            db_admin: admin.database(), 
            diagnostico: {
                status: "✅ Conexão Ativa",
                databaseURL: DATABASE_URL_FIREBASE,
                projetoId: serviceAccount.project_id || config.projectId,
                clienteEmail: app.options.credential?.client_email || "Sem e-mail",
                chaveId: serviceAccount?.private_key_id ? "🛡️ " + serviceAccount.private_key_id.substring(0, 8) + "..." : "❌ Indisponível",
                ambiente: process.env.NODE_ENV || "development",
                local: process.cwd(),
                timestamp: new Date().toLocaleString('pt-BR'),
                versaoSDK: admin.SDK_VERSION
            }
        };

    } catch (error) {
        return {
            db_admin: null, 
            diagnostico: {
                status: "❌ Erro Crítico FireBase",
                databaseURL: DATABASE_URL_FIREBASE || "Não definida",
                projetoId: "Falha no Carregamento",
                clienteEmail: "Erro de Autenticação",
                chaveId: "❌ Bloqueada/Inexistente",
                ambiente: process.env.NODE_ENV || "development",
                local: process.cwd(),
                timestamp: new Date().toLocaleString('pt-BR'),
                versaoSDK: admin.SDK_VERSION || "Desconhecida",
                detalheTecnico: error.message // Aqui pegaremos o aviso de que o JSON é inválido
            }
        };
    }
};