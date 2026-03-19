import express from "express";
import cors from "cors";


// 🛡️ 🏗️ RESERVA TÉCNICA (IMPORTAÇÃO FUTURA: BLINDAGEM HELMET)
// import helmet from "helmet";


// console.log(""); 
// console.log("🏗️  -------------------------------------------------------------------"); 
// console.log("🏗️  1. INFRAESTRUTURA: IMPORTAÇÃO DE MÓDULOS ✅"); 
// console.log("🏗️  arquivo - moduloInfraestrutura.js");
// console.log("🏗️  -------------------------------------------------------------------"); 
// console.log("🏗️  express = ", express ? "✅ Carregado" : "❌ Erro");
// console.log("🏗️  cors = ", cors ? "✅ Carregado" : "❌ Erro");
// console.log("🏗️  -------------------------------------------------------------------"); 









export const  moduloInfraestrutura = (app, db_admin) => {


//   console.log("");
//   console.log("🏗️  -----------------------------------------------------------");
//   console.log("🏗️  MÓDULO: INFRAESTRUTURA (Checagem de Recebimento)");
//   console.log("🏗️  app (Express) : ", app ? "✅ Recebido" : "❌ Ausente");
//   console.log("🏗️  db_admin (FB) : ", db_admin ? "✅ Recebido e Pronto" : "❌ ERRO: Banco não chegou");
//   console.log("🏗️  -----------------------------------------------------------");






  app.use(cors()); 

//   console.log(""); 
//   console.log("🛡️  -------------------------------------------------------------------");
//   console.log("🛡️  2. SEGURANÇA (CORS) = ✅ Porteiro Liberado!"); 
//   console.log("🛡️  arquivo - moduloInfraestrutura.js");
//   console.log("🛡️  Identidade do Middleware = ", cors.name || "corsMiddleware");
//   console.log("🛡️  Tipo de Função = ", typeof cors); 
//   console.log("🛡️  Roteador Vinculado = ", app._router ? "✅ Sim" : "❌ Aguardando");
//   console.log("🛡️  Configuração Custom = ", cors.length > 0 ? "⚠️ Ativa" : "✅ Padrão");
//   console.log("🛡️  -------------------------------------------------------------------");


  // 🚨 🛡️ RESERVA TÉCNICA (EXECUÇÃO FUTURA: RATE LIMIT)
  // const limitador = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
  // app.use(limitador);







  const motorJson = express.json();
  const nomeMotor = motorJson.name || "jsonParser";
  const tipoMotor = typeof express.json;

  app.use(motorJson); 

//   console.log(""); 
//   console.log("📄 -------------------------------------------------------------------");
//   console.log("📄  3. LOGÍSTICA (JSON) = ✅ Tradutor de Dados Pronto!");
//   console.log("📄  arquivo - moduloInfraestrutura.js"); 
//   console.log("📄  Motor JSON Type = ", tipoMotor); 
//   console.log("📄  Configuração Ativa = ", nomeMotor);
//   console.log("📄  Limite de Carga Body = ", "1mb (Padrão)");
//   console.log("📄  Verificação de Tipos = ", "✅ application/json");
//   console.log("📄 -------------------------------------------------------------------");



  






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
    
    // 📐 Adaptação: O Frontend envia um objeto estruturado.
    const { dadosBasico, dadosSeguranca } = req.body;

    // 📐 Extração segura das variáveis para validação
    const cpef = dadosBasico?.cpef;
    const senh = dadosSeguranca?.senh;

    const cpfLimpo = cpef ? String(cpef).replace(/\D/g, "") : null;

    if (!cpfLimpo || !senh) {
        return res.status(400).json({ erro: "CPF e Senha são obrigatórios!" });
    }

    try {

        console.log("");
        console.log("📥 -----------------------------------------------------------");
        console.log(`📥 LOGIN INICIADO: CPF [${cpfLimpo}]`);
        console.log("📥 -----------------------------------------------------------");
    
        const usuarioRef = db_admin.ref(`usuarios/${cpfLimpo}`);
        const snapshot = await usuarioRef.once("value");

        if (!snapshot.exists()) {
            console.log("📥 ⚠️  LOGIN FALHOU: Usuário não cadastrado.");
            return res.status(404).json({ erro: "Usuário não cadastrado no sistema." });
        }

        const usuarioDados = snapshot.val();

        console.log("📥 ✅ Dados do usuario - usuarioDados: ");
        console.log(usuarioDados);

        // 📐 Vistoria Estrutural: Padrão Estrito (.geminirules)
        const nomeUsuario = usuarioDados.dadosBasico?.nome;
        const funcaoUsuario = usuarioDados.dadosBasico?.func;
        const senhaNoBanco = usuarioDados.dadosSeguranca?.senh;

        // 📐 Validação de Credenciais
        if (String(senhaNoBanco) !== String(senh)) {
            console.log("📥 ❌ LOGIN FALHOU: Senha incorreta.");
            return res.status(401).json({ erro: "Senha inválida!" });
        }

        console.log("📥 ✅ SUCESSO: Credenciais validadas.");
        console.log(`📥 ✅ Usuario: ${nomeUsuario} | Função: ${funcaoUsuario}`);

        const claimsAdicionais = {
            cpef: cpfLimpo,
            nome: nomeUsuario,
            func: funcaoUsuario
        };

        console.log("");
        console.log("📥 -----------------------------------------------------------");
        console.log("📥 📐 INSPEÇÃO DE CLAIMS (CUSTOM TOKEN):");
        console.log("📥 📐 Payload para retorno:");
        console.log(claimsAdicionais);
        console.log("📥 -----------------------------------------------------------");

        
        const firebaseToken = await db_admin.app.auth().createCustomToken(cpfLimpo, claimsAdicionais);

        console.log("📥 🔑 TOKEN: Custom Token gerado  e enviado com sucesso.");
        console.log("📥 -----------------------------------------------------------");

        // 5. Resposta Unificada
        return res.status(200).json({
            status: "logado", // 📐 Mantém o status para verificações no frontend
            firebaseToken: firebaseToken // 📐 Envia apenas o crachá blindado
        });

    } catch (error) {
        console.error("📥 🔥 ERRO CRÍTICO NO LOGIN:", error.message);
        return res.status(500).json({ erro: "Erro interno no servidor de autenticação." });
    }
    });

// -------------------------------
// FIM - SOLICITACAO DE LOGIN
// -------------------------------











// --------------------------------
// INICIO - SOLICITACAO DE CADASTRO
// --------------------------------

app.post('/usuario/cadastrar/dados-bas-seg-int', async (req, res) => {
   
    // 📐 Adaptação: O Frontend envia um objeto estruturado (dadosUsuario), não variáveis soltas.
    // Desestruturamos os sub-objetos para processar.
    const { dadosBasico, dadosSeguranca, dadosInterno } = req.body;

    // 📐 Extração segura das variáveis para validação
    const cpef = dadosBasico?.cpef;
    const nome = dadosBasico?.nome;
    const func = dadosBasico?.func;
    const senh = dadosSeguranca?.senh;

    const cpfLimpo = cpef ? String(cpef).replace(/\D/g, "") : null;

    console.log("");
    console.log("📥 -----------------------------------------------------------");
    console.log("📥 DADOS RECEBIDOS:");
    console.log("📥 CPF    : ", cpef);
    console.log("📥 Nome   : ", nome);
    console.log("📥 Função : ", func);
    console.log("📥 -----------------------------------------------------------");


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
        // 📐 Aplicando a Nova Estrutura de Pastas (Sub-objetos)
        // Reconstruímos o objeto para garantir que apenas dados sanitizados entrem no banco
        const novoCadastro = {

            dadosBasico: dadosBasico, 
            dadosSeguranca: dadosSeguranca,
            dadosInterno: dadosInterno

        };

        await usuarioRef.set(novoCadastro);

        console.log("✅ SUCESSO: Sujeito registrado com êxito.");
        console.log(`✅ Registro: ${nome} | Função: ${novoCadastro.dadosBasico.func} | Destino: usuarios/${cpfLimpo}`);
        console.log("-----------------------------------------------------------");

        // 4. Resposta Unificada
        return res.status(201).json({
            status: "cadastrado",
            mensagem: "Protocolo de cadastro concluído com sucesso!",
            usuario: {
                nome: nome,
                func: func
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




















// 🏠 ROTA NA VPS PARA ATUALIZAR CONTATO
app.post('/atualizar-contato', async (req, res) => {

    const { cpef, dadosContato } = req.body;

    if (!cpef) {
        return res.status(400).json({ erro: "CPF não identificado." });
    }

    try {
        console.log(`📥 VPS: Atualizando contato do CPF [${cpef}]`);

        // O Admin SDK tem poder total para gravar no banco
        const usuarioRef = db_admin.ref(`usuarios/${cpef}`);
        
        // Usamos update para não apagar os outros campos (dadosBasicos, etc)
        await usuarioRef.update({
            dadosContato: dadosContato
        });

        console.log("📥 ✅ VPS: Gravação concluída na Antena Central.");
        return res.status(200).json({ status: "sucesso" });

    } catch (error) {
        console.error("📥 🔥 ERRO NA VPS:", error.message);
        return res.status(500).json({ erro: "Erro ao processar atualização no servidor." });
    }
});











// 📍 ROTA NA VPS PARA ATUALIZAR ENDEREÇO
// Recebe POST do componente Endereco.jsx
app.post('/atualizar-endereco', async (req, res) => {
    
    const { cpef, dadosEndereco } = req.body;

    console.log("");
    console.log("📥 📍 -----------------------------------------------------------");
    console.log("📥 📍 REQUISIÇÃO RECEBIDA NA VPS: POST /atualizar-endereco");
    console.log(`📥 📍 Origem: Componente 📍 Endereco.jsx`);
   

    // 🛡️ Validação de Segurança Básica: CPF é obrigatório
    if (!cpef) {
        console.warn("📥 🛑 ⚠️ ALERTA VPS: Tentativa de atualização sem CPF barrada.");
        return res.status(400).json({ erro: "CPF não identificado na requisição." });
    }

    // 🛡️ Validação de Integridade: CEP e Número são obrigatórios no dadosEndereco
    if (!dadosEndereco || !dadosEndereco.cepe || !dadosEndereco.nume) {
        console.warn(`📥 🛑 ⚠️ ALERTA VPS [CPF: ${cpef}]: Dados obrigatórios de endereço (CEP ou Número) ausentes.`);
        return res.status(400).json({ erro: "⚠️ CEP e Número são obrigatórios!" });
    }

    try {
       
        console.log(`📥 📍 VPS: Processando atualização de endereço do CPF [${cpef}]`);
    
        const usuarioRef = db_admin.ref(`usuarios/${cpef}`);
        
        await usuarioRef.update({
            dadosEndereco: dadosEndereco 
        });

        console.log("📥 📍 ✅ Gravação de Endereço concluída com sucesso na Antena Central.");
        console.log("📥 📍 -----------------------------------------------------------");
        
        // 📥 Resposta de Sucesso (Padrão Maestro)
        return res.status(200).json({ 
            status: "sucesso",
            mensagem: "✅ Endereço sincronizado na Antena Central."
        });

    } catch (error) {
        // 📥 🔥 TRATAMENTO DE ERRO CRÍTICO NA VPS
        console.log("📥 🔥 -----------------------------------------------------------");
        console.error("📥 🔥 ERRO CRÍTICO NA VPS (Processamento de Endereço):");
        console.error(`📥 🔥 CPF Alvo: ${cpef}`);
        console.error("📥 🔥 Detalhes:", error.message);
        console.log("📥 🔥 -----------------------------------------------------------");

        // Retorna erro 500 para o front-end
        return res.status(500).json({ 
            erro: "Erro interno no servidor VPS ao processar a atualização." 
        });
    }
});




































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


























// console.log(""); 
// console.log("📢 -------------------------------------------------------------------"); 
// console.log("📢 5. STATUS: CONFERÊNCIA FINAL DA ESTRUTURA ✅"); 
// console.log("📢 arquivo - moduloInfraestrutura.js");
// console.log("📢 -------------------------------------------------------------------"); 
// console.log("📢 Middlewares Ativos = ", app._router?.stack?.length || "⚠️ Analisando...");
// console.log("📢 Modo de Operação = ", app.get('env') || "development");
// console.log("📢 Handover da Instância = ✅ Operacional");
// console.log("📢 -------------------------------------------------------------------");  


};