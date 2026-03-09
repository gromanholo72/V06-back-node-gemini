/*-----------------------------------------------------------
👔 MÓDULO: CONFIGURAÇÃO DO BANCO DE DADOS (FIREBASE)
----------------------------------------------------------- */
import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

export const inicializarFirebase = () => {

      try {

            if (!admin.apps.length) {

                  const caminhoChave = path.resolve(process.env.FIREBASE_CHAVE_JSON);
                  const serviceAccount = JSON.parse(readFileSync(caminhoChave, "utf8"));

                  admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount),
                        databaseURL: process.env.DATABASE_URL,
                  });

            }

            const app = admin.app();
            const config = app.options;

            // 🏗️ Mestre, aqui está o Relatório Unificado com todas as variáveis possíveis
            return {
                  db: admin.database(),                            // A ferramenta de trabalho
                  status: "✅ Conexão Ativa",                      // Status visual
                  projetoId: config.projectId || "Via JSON",        // ID do Projeto (Google Cloud)
                  databaseURL: config.databaseURL,                 // URL do Banco (.env)
                  clienteEmail: app.options.credential?.client_email || "Conta de Serviço", // E-mail técnico
                  instanciaNome: app.name,                         // Nome da instância ([DEFAULT])
                  idInterno: app.internalId || "Node-SDK",         // ID único da execução
                  bucket: config.storageBucket || "Não Definido",  // Pasta de arquivos (Storage)
                  timestamp: new Date().toLocaleTimeString()       // Hora exata da conexão
            };

      } catch (error) {
            
            return { 
                  db: null, 
                  status: "❌ Erro Crítico", 
                  erroMensagem: error.message 
            };
            
      }

};