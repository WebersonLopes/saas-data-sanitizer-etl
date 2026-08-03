// --- INÍCIO DO CÓDIGO ---
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Processador de Base de Dados')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function processCsvData(csvContent) {
  var mensagemErroTutorial = "Parece que a planilha foi anexada de forma inadequada, peço que veja o tutorial: <a href='Coloque_o_Tutorial_Aqui' target='_blank' style='text-decoration: underline;'>Tutorial para exportar a planilha no CRM/ERP</a>";

  csvContent = csvContent.replace(/^\uFEFF/, '');
  csvContent = csvContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '\r\n');
  
  var primeiraLinha = csvContent.split('\r\n')[0] || "";
  var delimiter = primeiraLinha.split(';').length > primeiraLinha.split(',').length ? ';' : ',';
  
  var data;
  try {
    data = Utilities.parseCsv(csvContent, delimiter);
  } catch (e) {
    var lines = csvContent.split('\r\n');
    data = lines.map(function(l) { return l.split(delimiter); });
  }
  
  if (data.length < 2) {
    throw new Error(mensagemErroTutorial);
  }
  
  var headerIndex = 0;
  for (var i = 0; i < Math.min(5, data.length); i++) {
    var rowStr = data[i].join('').toLowerCase();
    if (rowStr.indexOf('cnpj') !== -1 || rowStr.indexOf('nome') !== -1 || rowStr.indexOf('tel') !== -1) {
      headerIndex = i;
      break;
    }
  }
  
  data = data.slice(headerIndex);
  var headers = data[0];
  
  function getIdx(keywords) {
    for (var i = 0; i < keywords.length; i++) {
      for (var j = 0; j < headers.length; j++) {
        var h = headers[j].toString().trim().toLowerCase();
        if (h === keywords[i].trim().toLowerCase()) {
          return j;
        }
      }
    }
    for (var i = 0; i < keywords.length; i++) {
      for (var j = 0; j < headers.length; j++) {
        var h = headers[j].toString().toLowerCase();
        if (h.indexOf(keywords[i].toLowerCase()) !== -1) {
          return j;
        }
      }
    }
    return -1;
  }
  
  var iCnpj = getIdx(['cnpj']);
  var iRazao = getIdx(['razão social', 'razao social', 'raz']);  
  var iEmail = getIdx(['email do contato', 'e-mail', 'email', 'mail']); 
  var iTel = getIdx(['telefone do contato', 'telefone', 'tel', 'fone']);    

  var iNomeContato = getIdx(['nome do contato', 'nome contato']); 
  var iNomePessoa = getIdx(['nome pessoa', 'nome da pessoa']); 
  var iNomeGenerico = -1;
  
  for (var j = 0; j < headers.length; j++) {
    var h = headers[j].toString().trim().toLowerCase();
    if (h === 'nome') {
      iNomeGenerico = j;
      break;
    }
  }
  
  var temNome = (iNomeContato !== -1 || iNomePessoa !== -1 || iNomeGenerico !== -1);
  var temTel = (iTel !== -1);

  if (!temNome || !temTel) {
    throw new Error(mensagemErroTutorial);
  }

  var isPlanilhaReduzida = (iCnpj === -1 || iRazao === -1 || iEmail === -1);
  
  var cabecalhoCompleto = ["Razão Social", "Nome fantasia", "CNPJ", "Nome Pessoa", "CPF", "E-MAIL", "Telefone", "TELEFONE CONTATO", "NOME CONTATO"];
  var cabecalhoReduzido = ["NOME CONTATO", "TELEFONE CONTATO"];
  
  var completas = [cabecalhoCompleto];
  var somenteContatos = [cabecalhoReduzido];
  
  var cabecalhoIncompletas = isPlanilhaReduzida ? cabecalhoReduzido.slice() : cabecalhoCompleto.slice();
  cabecalhoIncompletas.push("Motivo da Revisão");
  var incompletas = [cabecalhoIncompletas];
  
  function limparTexto(val) {
    if (val === undefined || val === null) return "";
    return val.toString().replace(/[\u200B-\u200D\uFEFF\u200E\u200F]/g, '').trim();
  }

  function formatarNome(str) {
    if (!str) return "";
    var excecoes = ['da', 'de', 'di', 'do', 'du', 'das', 'dos', 'e'];
    return str.toLowerCase().split(' ').map(function(word, index) {
      if (excecoes.indexOf(word) !== -1 && index !== 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  function isMissing(val) {
    if (!val) return true;
    var s = val.toLowerCase();
    if (s === "" || s === "-" || s === "0") return true;
    return false;
  }

  function isTelInvalid(val) {
    if (!val) return true;
    var onlyNumbers = val.replace(/\D/g, '');
    if (onlyNumbers.length < 10 || onlyNumbers.length > 13) return true;
    return false;
  }

  function isEmailInvalid(val) {
    if (!val) return true;
    if (val.indexOf('@') === -1) return true; 
    return false;
  }

  function isDocumentoInvalid(val) {
    if (!val) return true;
    var onlyNumbers = val.replace(/\D/g, '');
    if (onlyNumbers.length < 11 || onlyNumbers.length > 14) return true;
    return false;
  }

  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    if (row.join('').trim() === '') continue; 
    
    var vCnpj = iCnpj > -1 && iCnpj < row.length ? limparTexto(row[iCnpj]) : "";
    var vRazao = iRazao > -1 && iRazao < row.length ? limparTexto(row[iRazao]) : "";
    var vEmail = iEmail > -1 && iEmail < row.length ? limparTexto(row[iEmail]).toLowerCase() : "";
    var vTel = iTel > -1 && iTel < row.length ? limparTexto(row[iTel]) : "";
    
    var vNomeContato = iNomeContato > -1 && iNomeContato < row.length ? formatarNome(limparTexto(row[iNomeContato])) : "";
    var vNomePessoa = iNomePessoa > -1 && iNomePessoa < row.length ? formatarNome(limparTexto(row[iNomePessoa])) : "";
    var vNomeGenerico = iNomeGenerico > -1 && iNomeGenerico < row.length ? formatarNome(limparTexto(row[iNomeGenerico])) : "";

    if (vNomeGenerico) {
      if (!vNomeContato) vNomeContato = vNomeGenerico;
      if (!vNomePessoa) vNomePessoa = vNomeGenerico;
    }
    if (vNomePessoa && !vNomeContato) vNomeContato = vNomePessoa;
    if (vNomeContato && !vNomePessoa) vNomePessoa = vNomeContato;
    
    var erros = []; 

    // MENSAGENS DE ERRO SIMPLIFICADAS
    if (isPlanilhaReduzida) {
      if (isMissing(vNomeContato)) erros.push("Falta Nome");
      if (isTelInvalid(vTel)) erros.push("Telefone Inválido");

      var linhaReduzida = [vNomeContato, vTel];
      if (erros.length > 0) {
        linhaReduzida.push(erros.join(" | ")); 
        incompletas.push(linhaReduzida);
      } else {
        somenteContatos.push(linhaReduzida);
      }
    } else {
      if (isMissing(vRazao)) erros.push("Falta Razão Social");
      if (isDocumentoInvalid(vCnpj)) erros.push("CNPJ/CPF Inválido");
      if (isMissing(vNomePessoa)) erros.push("Falta Nome");
      if (isEmailInvalid(vEmail)) erros.push("E-mail Inválido");
      if (isTelInvalid(vTel)) erros.push("Telefone Inválido");

      var linhaCompleta = [vRazao, vRazao, vCnpj, vNomePessoa, "", vEmail, vTel, vTel, vNomeContato];
      if (erros.length > 0) {
        linhaCompleta.push(erros.join(" | ")); 
        incompletas.push(linhaCompleta);
      } else {
        completas.push(linhaCompleta);
      }
    }
  }
  
  function toCsvStr(arr, separador) {
    var csv = arr.map(function(r) {
      return r.map(function(c) {
        var sc = (c || "").toString().replace(/"/g, '""');
        return '"' + sc + '"';
      }).join(separador);
    }).join('\r\n');
    return '\uFEFF' + csv; 
  }

  var qtdCompletas = completas.length - 1;
  var qtdContatos = somenteContatos.length - 1;
  var qtdIncompletas = incompletas.length - 1;
  var totalLido = isPlanilhaReduzida ? (qtdContatos + qtdIncompletas) : (qtdCompletas + qtdIncompletas);
  var qtdValidos = isPlanilhaReduzida ? qtdContatos : qtdCompletas;

  try {
    var ss = SpreadsheetApp.openById('SUA_PLANILHA_DE_LOG_AQUI');
    var sheet = ss.getSheets()[0]; 
    var agora = new Date();
    var tipoProcesso = isPlanilhaReduzida ? "Somente Contatos" : "Planilha Completa";
    sheet.appendRow([agora, tipoProcesso, totalLido, qtdValidos, qtdIncompletas]);
  } catch(e) {
  }
  
  return {
    completas: Utilities.base64Encode(Utilities.newBlob(toCsvStr(completas, ',')).getBytes()),
    incompletas: Utilities.base64Encode(Utilities.newBlob(toCsvStr(incompletas, ';')).getBytes()),
    somenteContatos: Utilities.base64Encode(Utilities.newBlob(toCsvStr(somenteContatos, ',')).getBytes()),
    temIncompletas: incompletas.length > 1,
    qtdCompletas: qtdCompletas,
    qtdContatos: qtdContatos,
    qtdIncompletas: qtdIncompletas,
    isPlanilhaReduzida: isPlanilhaReduzida
  };
}
// --- FIM DO CÓDIGO ---
