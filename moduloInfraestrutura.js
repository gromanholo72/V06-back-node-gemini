import express from "express";
import cors from "cors";



console.log(""); 
console.log("🏗️  -------------------------------------------------------------------"); 
console.log("🏗️  1. INFRAESTRUTURA: IMPORTAÇÃO DE MÓDULOS ✅"); 
console.log("🏗️  arquivo - moduloInfraestrutura.js");
console.log("🏗️  -------------------------------------------------------------------"); 
console.log("🏗️  express = ", express ? "✅ Carregado" : "❌ Erro");
console.log("🏗️  cors = ", cors ? "✅ Carregado" : "❌ Erro");
console.log("🏗️  -------------------------------------------------------------------"); 









export const  moduloInfraestrutura = (app, db_admin) => {


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
  console.log("🛡️  Identidade do Middleware = ", cors.name || "corsMiddleware");
  console.log("🛡️  Tipo de Função = ", typeof cors); 
  console.log("🛡️  Roteador Vinculado = ", app._router ? "✅ Sim" : "❌ Aguardando");
  console.log("🛡️  Configuração Custom = ", cors.length > 0 ? "⚠️ Ativa" : "✅ Padrão");
  console.log("🛡️  -------------------------------------------------------------------");


  






  const motorJson = express.json();
  const nomeMotor = motorJson.name || "jsonParser";
  const tipoMotor = typeof express.json;

  app.use(motorJson); 

  console.log(""); 
  console.log("📄 -------------------------------------------------------------------");
  console.log("📄  3. LOGÍSTICA (JSON) = ✅ Tradutor de Dados Pronto!");
  console.log("📄  arquivo - moduloInfraestrutura.js"); 
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
        console.log("📥 📍 ✅ Dados gravados:",dadosEndereco);
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





// 🏢 ROTA NA VPS PARA ATUALIZAR EMPRESA
app.post('/atualizar-empresa', async (req, res) => {
    
    const { cpef, dadosEmpresa } = req.body;

    console.log("");
    console.log("📥 🏢 -----------------------------------------------------------");
    console.log("📥 🏢 REQUISIÇÃO RECEBIDA NA VPS: POST /atualizar-empresa");
    console.log(`📥 🏢 Origem: Componente 🏢 Cnpj.jsx`);
   

    // 🛡️ Validação de Segurança Básica: CPF é obrigatório
    if (!cpef) {
        console.warn("📥 🛑 ⚠️ ALERTA VPS: Tentativa de atualização sem CPF barrada.");
        return res.status(400).json({ erro: "CPF não identificado na requisição." });
    }

    // 🛡️ Validação de Integridade: CNPJ é obrigatório no dadosEmpresa
    if (!dadosEmpresa || !dadosEmpresa.cnpj) {
        console.warn(`📥 🛑 ⚠️ ALERTA VPS [CPF: ${cpef}]: Dados obrigatórios de empresa (CNPJ) ausentes.`);
        return res.status(400).json({ erro: "⚠️ O CNPJ é obrigatório!" });
    }

    try {
       
        console.log(`📥 🏢 VPS: Processando atualização de dados da empresa do CPF [${cpef}]`);
    
        const usuarioRef = db_admin.ref(`usuarios/${cpef}`);
        
        await usuarioRef.update({
            dadosEmpresa: dadosEmpresa 
        });

        console.log("📥 🏢 ✅ Gravação de Dados da Empresa concluída com sucesso na Antena Central.");
        console.log("📥 🏢 ✅ Dados gravados:", dadosEmpresa);
        console.log("📥 🏢 -----------------------------------------------------------");
        
        // 📥 Resposta de Sucesso (Padrão Maestro)
        return res.status(200).json({ 
            status: "sucesso",
            mensagem: "✅ Dados da Empresa sincronizados na Antena Central."
        });

    } catch (error) {
        // 📥 🔥 TRATAMENTO DE ERRO CRÍTICO NA VPS
        console.log("📥 🔥 -----------------------------------------------------------");
        console.error("📥 🔥 ERRO CRÍTICO NA VPS (Processamento de Empresa):");
        console.error(`📥 🔥 CPF Alvo: ${cpef}`);
        console.error("📥 🔥 Detalhes:", error.message);
        console.log("📥 🔥 -----------------------------------------------------------");

        // Retorna erro 500 para o front-end
        return res.status(500).json({ 
            erro: "Erro interno no servidor VPS ao processar a atualização." 
        });
    }
});




// 🎓 ROTA NA VPS PARA ATUALIZAR FORMACAO
// Recebe POST do componente UsuarioFormacao.jsx
app.post('/atualizar-formacao', async (req, res) => {
    
    // A - Desestruturação do Pacote (Payload) recebido
    const { cpef, dadosFormacao } = req.body;

    console.log("");
    console.log("📥 🎓 -----------------------------------------------------------");
    console.log("📥 🎓 REQUISIÇÃO RECEBIDA NA VPS: POST /atualizar-formacao");
    console.log("📥 🎓 Origem: Componente 🎓 UsuarioFormacao.jsx");
   

    // B - 🛡️ Validação de Segurança Básica: CPF é obrigatório
    if (!cpef) {
        console.warn("📥 🛑 ⚠️ ALERTA VPS: Tentativa de atualização sem CPF barrada.");
        return res.status(400).json({ erro: "CPF não identificado na requisição." });
    }

    // C - 🛡️ Validação de Integridade: Nível é obrigatório
    if (!dadosFormacao || !dadosFormacao.nivel) {
        console.warn(`📥 🛑 ⚠️ ALERTA VPS [CPF: ${cpef}]: Dados obrigatórios de Formação (Nível) ausentes.`);
        return res.status(400).json({ erro: "⚠️ O Nível de formação é obrigatório!" });
    }

    try {
        // D - Log de Processamento
        console.log(`📥 🎓 VPS: Processando atualização de dados de Formação do CPF [${cpef}]`);
    
        // E - Conexão Admin SDK (Poder Total)
        const usuarioRef = db_admin.ref(`usuarios/${cpef}`);
        
        // F - Gravação com update() (Preserva nós vizinhos)
        await usuarioRef.update({
            dadosFormacao: dadosFormacao 
        });

        // G - Logs de Sucesso na VPS
        console.log("📥 🎓 ✅ Gravação de Dados de Formação concluída com sucesso na Antena Central.");
        console.log("📥 🎓 ✅ Dados gravados:", dadosFormacao);
        console.log("📥 🎓 -----------------------------------------------------------");
        
        // H - Resposta de Sucesso (Padrão Maestro)
        return res.status(200).json({ 
            status: "sucesso",
            mensagem: "✅ Dados de Formação sincronizados na Antena Central."
        });

    } catch (error) {
        // I - 🔥 TRATAMENTO DE ERRO CRÍTICO NA VPS
        console.log("📥 🔥 -----------------------------------------------------------");
        console.error("📥 🔥 ERRO CRÍTICO NA VPS (Processamento de Formação):");
        console.error(`📥 🔥 CPF Alvo: ${cpef}`);
        console.error("📥 🔥 Detalhes:", error.message);
        console.log("📥 🔥 -----------------------------------------------------------");

        // Retorna erro 500 padronizado para o front-end
        return res.status(500).json({ 
            erro: "Erro interno no servidor VPS ao processar a atualização." 
        });
    }
});
















// 💊 ROTA: ATUALIZAR REMÉDIO DO PACIENTE
// 🏗️ Recebe o Payload Sagrado: { cpef, dadosPaciente: { remedio: { nome, hora } } }
app.post('/atualizar-paciente-remedio', async (req, res) => {
    const { cpef, dadosPaciente } = req.body;

    console.log("");
    console.log("📥 💊 -----------------------------------------------------------");
    console.log("📥 💊 REQUISIÇÃO RECEBIDA (Infra): POST /atualizar-paciente-remedio");

    if (!cpef) {
        return res.status(400).json({ erro: "CPF não identificado." });
    }

    const dadosRemedio = dadosPaciente?.remedio;

    if (!dadosRemedio || !dadosRemedio.nome || !dadosRemedio.dose || !dadosRemedio.hora) {
        return res.status(400).json({ erro: "⚠️ Dados de Remédio incompletos." });
    }

    try {
        // 📐 No moduloInfraestrutura, usamos 'db_admin' diretamente (parâmetro da função)
        const usuarioRef = db_admin.ref(`usuarios/${cpef}/dadosPaciente`);
        
        // 🧱 MUDANÇA PARA LISTA: Usa push() para adicionar novo item à coleção 'remedios'
        // O front envia 'remedio' (singular) dentro de dadosPaciente, mas gravamos em 'remedios' (plural/lista)
        const novoRemedioRef = usuarioRef.child('remedios').push();
        await novoRemedioRef.set(dadosRemedio);

        console.log(`📥 💊 ✅ Novo Remédio incluído na lista para CPF ${cpef}:`, dadosRemedio);
        return res.status(200).json({ status: "sucesso", mensagem: "✅ Remédio incluído com sucesso." });

    } catch (error) {
        console.error(`📥 🔥 ERRO CRÍTICO AO SALVAR REMÉDIO:`, error.message);
        return res.status(500).json({ erro: "Erro interno ao salvar remédio." });
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