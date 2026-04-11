/*-----------------------------------------------------------
👔 MÓDULO: CONFIGURAÇÃO DO BANCO DE DADOS (FIREBASE)
----------------------------------------------------------- */

import fs from 'fs';

import admin from "firebase-admin";

// 📦 Importamos os suprimentos já validados pela Coroa 👑
import { DATABASE_URL_FIREBASE, DATABASE_CHAVE_ADMIN_FIREBASE } from "./dotenv_Info.js";

export const inicializarFirebase = () => {

    // Fora do IF para o return alcançá-la sempre
    let serviceAccount; 

    try {

      console.log("");
      console.log("🔍 -----------------------------------------------------------");
      console.log("🔍 INSPEÇÃO DE SUPRIMENTOS PARA O BANCO DE DADOS");
      console.log("🔍 arquivo - FirebaseConfig.js");
      console.log("🔍 -----------------------------------------------------------");
      console.log("🔍 DATABASE_URL_FIREBASE:", DATABASE_URL_FIREBASE);
      console.log("🔍 DATABASE_CHAVE_ADMIN_FIREBASE  :", DATABASE_CHAVE_ADMIN_FIREBASE ? "✅ Recebida" : "❌ Vazia");
      console.log("🔍 -----------------------------------------------------------");

        if (!admin.apps.length) {
            
            // 🕵️ Lógica Híbrida Inteligente
            if (DATABASE_CHAVE_ADMIN_FIREBASE.trim().startsWith('{')) {

                // MODO NUVEM: O dado já é o JSON em texto
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

            // Se já estiver inicializado, tenta recuperar a conta do app existente
            serviceAccount = admin.app().options.credential; 
            
        }

        const app = admin.app();
        const config = app.options;

        // 🏛️ Relatório Unificado para o seu server.js
        return {

            db_admin: admin.database(), 
            
            // 🕵️ PAINEL DE DIAGNÓSTICO (Para salvar sua pele em 10 segundos)
            diagnostico: {
                status: "✅ Conexão Ativa",
                databaseURL: DATABASE_URL_FIREBASE,
                projetoId: serviceAccount.project_id || config.projectId,
                
                // 🚨 SENSOR DE CREDENCIAIS
                clienteEmail: app.options.credential?.client_email || "Sem e-mail",
                chaveId: serviceAccount?.private_key_id ? "🛡️ " + serviceAccount.private_key_id.substring(0, 8) + "..." : "❌ Indisponível",
                
                // 🌍 TERRENO DE OPERAÇÃO
                ambiente: process.env.NODE_ENV || "development",
                local: process.cwd(),
                
                // ⏱️ MARCADORES
                timestamp: new Date().toLocaleString('pt-BR'),
                versaoSDK: admin.SDK_VERSION
            }

        };

    } catch (error) {

       // 🏛️ RELATÓRIO DE DANOS (Estrutura idêntica ao Sucesso para evitar bugs)
        return {

            db_admin: null, 
            
            diagnostico: {
                status: "❌ Erro Crítico FireBase",
                databaseURL: DATABASE_URL_FIREBASE || "Não definida",
                projetoId: "Falha no Carregamento",
                
                // 🚨 SENSOR DE CREDENCIAIS (Onde o erro costuma estar)
                clienteEmail: "Erro de Autenticação",
                chaveId: "❌ Bloqueada/Inexistente",
                
                // 🌍 TERRENO DE OPERAÇÃO
                ambiente: process.env.NODE_ENV || "development",
                local: process.cwd(),
                
                // ⏱️ MARCADORES DE FALHA
                timestamp: new Date().toLocaleString('pt-BR'),
                versaoSDK: admin.SDK_VERSION || "Desconhecida",
                detalheTecnico: error.message // 👈 O "DNA" do erro para o mestre consertar
            }

        };

    }

};