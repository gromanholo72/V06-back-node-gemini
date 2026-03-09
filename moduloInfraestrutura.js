import express from "express";
import cors from "cors";

// 🛡️ 🏗️ RESERVA TÉCNICA (IMPORTAÇÃO FUTURA: BLINDAGEM HELMET)
// import helmet from "helmet";


console.log(""); 
console.log("🏗️  -------------------------------------------------------------------"); 
console.log("🏗️  1. INFRAESTRUTURA: IMPORTAÇÃO DE MÓDULOS ✅"); 
console.log("🏗️  arquivo - moduloInfraestrutura.js");
console.log("🏗️  -------------------------------------------------------------------"); 
console.log("🏗️  express = ", express ? "✅ Carregado" : "❌ Erro");
console.log("🏗️  cors = ", cors ? "✅ Carregado" : "❌ Erro");
console.log("🏗️  -------------------------------------------------------------------"); 


















export const  moduloInfraestrutura = (app, db_admin) => {



  // Agora o console.log vai funcionar porque o db_admin existe como parâmetro
  console.log("");
  console.log("🏗️  -----------------------------------------------------------");
  console.log("🏗️  MÓDULO: INFRAESTRUTURA (Checagem de Recebimento)");
  console.log("🏗️  app (Express) : ", app ? "✅ Recebido" : "❌ Ausente");
  console.log("🏗️  db_admin (FB) : ", db_admin ? "✅ Recebido e Pronto" : "❌ ERRO: Banco não chegou");
  console.log("🏗️  -----------------------------------------------------------");






  app.use(cors()); 

  console.log(""); 
  console.log("🛡️  -------------------------------------------------------------------");
  console.log("🛡️  2. SEGURANÇA (CORS) = ✅ Porteiro Liberado!"); 
  console.log("🛡️  arquivo - moduloInfraestrutura.js");
  console.log("🛡️  -------------------------------------------------------------------");
  console.log("🛡️  Identidade do Middleware = ", cors.name || "corsMiddleware");
  console.log("🛡️  Tipo de Função = ", typeof cors); 
  console.log("🛡️  Roteador Vinculado = ", app._router ? "✅ Sim" : "❌ Aguardando");
  console.log("🛡️  Configuração Custom = ", cors.length > 0 ? "⚠️ Ativa" : "✅ Padrão");
  console.log("🛡️  -------------------------------------------------------------------");


  // 🚨 🛡️ RESERVA TÉCNICA (EXECUÇÃO FUTURA: RATE LIMIT)
  // const limitador = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
  // app.use(limitador);







  const motorJson = express.json();
  const nomeMotor = motorJson.name || "jsonParser";
  const tipoMotor = typeof express.json;

  app.use(motorJson); 

  console.log(""); 
  console.log("📄 -------------------------------------------------------------------");
  console.log("📄  3. LOGÍSTICA (JSON) = ✅ Tradutor de Dados Pronto!");
  console.log("📄  arquivo - moduloInfraestrutura.js"); 
  console.log("📄 -------------------------------------------------------------------");
  console.log("📄  Motor JSON Type = ", tipoMotor); 
  console.log("📄  Configuração Ativa = ", nomeMotor);
  console.log("📄  Limite de Carga Body = ", "1mb (Padrão)");
  console.log("📄  Verificação de Tipos = ", "✅ application/json");
  console.log("📄 -------------------------------------------------------------------");



  






// --------------------------
// INICIO - TESTANDO CONEXAO
// --------------------------

  app.get("/", (req, res) => {

    console.log(""); 
    console.log("📟 -------------------------------------------------------------------"); 
    console.log("📟 4. MONITOR DE TRÁFEGO: PORTARIA PRINCIPAL 🚀"); 
    console.log("📟 arquivo - moduloInfraestrutura.js");
    console.log("📟 -------------------------------------------------------------------"); 
    console.log("📟 método = ", req?.method);
    console.log("📟 url = ", req?.url);
    console.log("📟 status = ", res?.statusCode || 200);
    console.log("📟 IP Origem = ", req?.ip || "127.0.0.1");
    console.log("-------------------------------------------------------------------"); 

    res.send("📟 Portaria do Maestro v02: Operando com Sucesso!");

  });

// --------------------------
// FIM - TESTANDO CONEXAO
// --------------------------










// -------------------------------
// INICIO - SOLICITACAO DE LOGIN
// -------------------------------

  app.post('/login', async (req, res) => {
    // 1. Extração e Limpeza (Escudo antecipado)
    const { cpef, senh } = req.body;
    const cpfLimpo = cpef ? String(cpef).replace(/\D/g, "") : null;

    if (!cpfLimpo || !senh) {
        return res.status(400).json({ erro: "CPF e Senha são obrigatórios!" });
    }

    console.log("");
    console.log("📥 -----------------------------------------------------------");
    console.log(`📥 LOGIN INICIADO: CPF [${cpfLimpo}]`);
    console.log("📥 -----------------------------------------------------------");

    try {
        // 2. Busca de Dados no Realtime Database
        const usuarioRef = db_admin.ref(`usuarios/${cpfLimpo}`);
        const snapshot = await usuarioRef.once("value");

        if (!snapshot.exists()) {
            console.log("⚠️  LOGIN FALHOU: Usuário não cadastrado.");
            return res.status(404).json({ erro: "Usuário não cadastrado no sistema." });
        }

        const usuarioDados = snapshot.val();

        // 3. Validação de Senha (Segurança básica)
        // No Firebase, se a senha for um número, transformamos em String para comparar
        if (String(usuarioDados.senh) !== String(senh)) {
            console.log("❌ LOGIN FALHOU: Senha incorreta.");
            return res.status(401).json({ erro: "Senha inválida!" });
        }

        console.log("✅ SUCESSO: Credenciais validadas.");
        console.log(`✅ Sujeito: ${usuarioDados.nome} | Função: ${usuarioDados.func}`);

        // 4. Geração de Custom Token (A Chave Mestra para o Front-end)
        // 'admin' deve vir do import "firebase-admin"
        const claimsAdicionais = {
            cpef: cpfLimpo,
            nome: usuarioDados.nome,
            func: usuarioDados.func
        };

        const firebaseToken = await db_admin.app.auth().createCustomToken(cpfLimpo, claimsAdicionais);

        console.log("🔑 TOKEN: Custom Token gerado com sucesso.");
        console.log("-----------------------------------------------------------");

        // 5. Resposta Unificada
        return res.status(200).json({
            status: "logado",
            firebaseToken: firebaseToken,
            usuario: {
                nome: usuarioDados.nome,
                funcao: usuarioDados.func
            }
        });

    } catch (error) {
        console.error("🔥 ERRO CRÍTICO NO LOGIN:", error.message);
        return res.status(500).json({ erro: "Erro interno no servidor de autenticação." });
    }
});

// -------------------------------
// FIM - SOLICITACAO DE LOGIN
// -------------------------------











// --------------------------------
// INICIO - SOLICITACAO DE CADASTRO
// --------------------------------

app.post('/cadastrar', async (req, res) => {
    // 1. Extração e Limpeza (Escudo antecipado)
    // Recebendo os dados exatamente como o Front envia no JSON.stringify(novoUsuario)
    const { cpef, nome, mail, fone, func, datc, senh } = req.body;
    const cpfLimpo = cpef ? String(cpef).replace(/\D/g, "") : null;

    if (!cpfLimpo || !senh || !nome) {
        return res.status(400).json({ erro: "CPF, Nome e Senha são obrigatórios para a fundação!" });
    }

    console.log("");
    console.log("📥 -----------------------------------------------------------");
    console.log(`📥 CADASTRO INICIADO: [${nome}] - CPF [${cpfLimpo}]`);
    console.log("📥 -----------------------------------------------------------");

    try {
        // 2. Verificação de Duplicidade no Realtime Database
        const usuarioRef = db_admin.ref(`usuarios/${cpfLimpo}`);
        const snapshot = await usuarioRef.once("value");

        if (snapshot.exists()) {
            console.log("⚠️  CADASTRO FALHOU: CPF já registrado no sistema.");
            return res.status(409).json({ erro: "Este CPF já possui um cadastro ativo." });
        }

        // 3. Persistência de Dados (Construção da Fundação)
        const novoCadastro = {
            cpef: cpfLimpo,
            nome: nome,
            mail: mail || "",
            fone: fone || "",
            func: func || "visitente", // Função padrão caso venha vazio
            datc: datc || new Date().toISOString(),
            senh: senh // Em produção futura, recomenda-se criptografia (hash)
        };

        await usuarioRef.set(novoCadastro);

        console.log("✅ SUCESSO: Sujeito registrado com êxito.");
        console.log(`✅ Registro: ${nome} | Destino: usuarios/${cpfLimpo}`);
        console.log("-----------------------------------------------------------");

        // 4. Resposta Unificada
        return res.status(201).json({
            status: "cadastrado",
            mensagem: "Protocolo de cadastro concluído com sucesso!",
            usuario: {
                nome: nome,
                funcao: novoCadastro.func
            }
        });

    } catch (error) {
        console.error("🔥 ERRO CRÍTICO NO CADASTRO:", error.message);
        return res.status(500).json({ erro: "Erro interno ao processar cadastro na fundação." });
    }
});

// --------------------------------
// FIM - SOLICITACAO DE CADASTRO
// --------------------------------














app.get('/dados-dos-cards-aberto', async (req, res) => {
    
    console.log("");
    console.log("🔍 -----------------------------------------------------------");
    console.log("🔍 SOLICITAÇÃO: Varredura de Cards em Aberto");

    try {
        // 1. Apontamos a antena para o nó de usuários (ou atendimentos, ajuste se necessário)
        const usuariosRef = db_admin.ref('usuarios');
        
        // 2. Buscamos os dados uma única vez
        const snapshot = await usuariosRef.once('value');
        const dadosBrutos = snapshot.val();

        // 3. Verificamos se há dados. Se não houver, enviamos um array vazio para o front não quebrar.
        if (!dadosBrutos) {
            console.log("⚠️  AVISO: Nenhum card localizado na base de dados.");
            return res.status(200).json([]);
        }

        // 4. TRANSFORMADOR: Converte o Objeto do Firebase em um Array
        // O Firebase retorna { "cpf1": {dados}, "cpf2": {dados} }
        // Nós queremos [ {dados}, {dados} ]
        const listaCards = Object.keys(dadosBrutos).map(chave => {
            return {
                id: chave, // Mantemos a chave (CPF) como ID caso precise deletar/editar
                ...dadosBrutos[chave]
            };
        });

        // 5. FILTRO (Opcional): Se você quiser enviar apenas quem tem status 'pendente' ou 'aberto'
        // const cardsFiltrados = listaCards.filter(card => card.situ === 'aberto');

        console.log(`✅ SUCESSO: ${listaCards.length} cards extraídos e despachados.`);
        console.log("🔍 -----------------------------------------------------------");

        // 6. Resposta Final (Sempre em Array como o seu Front exige)
        return res.status(200).json(listaCards);

    } catch (error) {
        console.error("🔥 ERRO CRÍTICO NA VARREDURA DE CARDS:", error.message);
        
        // 🧱 Fallback de Segurança: Mesmo no erro, enviamos um array vazio para o .map do React não fritar
        return res.status(500).json([]);
    }
});


























console.log(""); 
console.log("📢 -------------------------------------------------------------------"); 
console.log("📢 5. STATUS: CONFERÊNCIA FINAL DA ESTRUTURA ✅"); 
console.log("📢 arquivo - moduloInfraestrutura.js");
console.log("📢 -------------------------------------------------------------------"); 
console.log("📢 Middlewares Ativos = ", app._router?.stack?.length || "⚠️ Analisando...");
console.log("📢 Modo de Operação = ", app.get('env') || "development");
console.log("📢 Handover da Instância = ✅ Operacional");
console.log("📢 -------------------------------------------------------------------");  


};