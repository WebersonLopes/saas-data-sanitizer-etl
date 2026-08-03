# 📊 SaaS Data Sanitizer & Automated ETL Web App

> **Aplicação Web Serverless** para automação de processos ETL (Extract, Transform, Load), sanitização, validação de integridade e triagem de bases de dados de clientes (CSV/XLSX) para migração entre sistemas SaaS/CRM/ERP.

---

## 🎯 O Problema de Negócio

Em rotinas de *onboarding* e migração de sistemas, a equipe operacional gastava cerca de **30 minutos diários por arquivo** realizando a higienização e validação manual de planilhas. 

Esse processo manual gerava gargalos severos de produtividade, além de altos riscos de inconsistência:
* Inserção de telefones com número incorreto de dígitos.
* Documentos (CNPJ/CPF) ou e-mails formatados erroneamente.
* Caracteres invisíveis (BOM/Unicode) que quebravam a carga no banco de dados do CRM.
* Nomes próprios despadronizados.

---

## 🛠️ A Solução Desenvolvida

Desenvolvimento de um **Web App Full-Stack** que automatiza 100% da cadeia de limpeza, validação estrutural e separação dos dados antes da carga no sistema de destino.

### 🌟 Diferenciais Técnicos e Funcionalidades:

1. **Processamento Client-Side de Alta Performance:**
   * Utilização da biblioteca `SheetJS (XLSX)` para conversão e leitura de arquivos `.xlsx` e `.csv` diretamente no navegador, reduzindo a carga no servidor.

2. **Mapeamento Dinâmico de Colunas (*Fuzzy Matching*):**
   * Algoritmo de busca por palavras-chave que identifica dinamicamente colunas como *CNPJ, Razão Social, E-mail, Telefone e Nome*, independentemente da ordem em que aparecem na planilha de origem.

3. **Validação Rígida e Sanitização de Dados:**
   * **Limpeza Unicode:** Remoção automática de caracteres invisíveis (`\uFEFF`, `\u200B`, etc.).
   * **Validação de Documentos e Contatos:** Verificação de estrutura de e-mails (`@`), comprimento de telefones (10 a 13 dígitos).
   * **Formatação Inteligente de Nomes:** Normalização de caixa alta/baixa respeitando exceções da língua portuguesa (`da`, `de`, `do`, `dos`).

4. **Triagem e Separação Automática:**
   * **Dados Válidos:** Arquivo formatado e pronto para importação via API/CSV.
   * **Dados Incompletos:** Gerados em um arquivo separado com a inclusão dinâmica da coluna `"Motivo da Revisão"`, apontando exatamente onde o usuário precisa corrigir.

5. **Auditoria de Operação (Log Pipeline):**
   * Registro automático em banco de dados/planilha central das estatísticas do processamento (Data/Hora, Tipo de Processo, Total Lido, Registros Válidos e Incompletos).

---

## 🚀 Impacto & Resultados de Negócio

* ⚡ **Redução de 97% no tempo de processamento:** O tempo de execução caiu de **30 minutos para menos de 1 minuto**.
* 🎯 **100% de Integridade dos Dados:** Erros manuais e falhas de carga no CRM/ERP zerados.
* 📈 **Ganho de Escala Operacional:** Liberação de horas de trabalho da equipe para foco estratégico em atendimento e retenção de clientes.

---

## 💻 Tecnologias Utilizadas

| Camada | Tecnologia / Biblioteca |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 Moderno (Flexbox, UI Card Pattern, Gradient UI), JavaScript Assíncrono |
| **Backend / ETL** | Google Apps Script (JavaScript ES6), Data Parsing, Regex Validation, Base64 Stream |
| **Bibliotecas** | SheetJS (`xlsx.full.min.js`) |
| **Formato de Dados** | CSV, XLSX, XLS, Base64 Output |

---

## ⚙️ Como Funciona o Fluxo da Aplicação

[ Planilha Bruta (XLSX/CSV) ]
             │
             ▼
[ Parser Client-side (SheetJS) ] ──► Limpeza Unicode & Mapeamento Dinâmico
             │
             ▼
[ Validador Regex & Regras ] ────► Separação Válidos vs Incompletos
             │
             ▼
[ Log de Auditoria & Base64 ] ───► Download do CSV Pronto + Painel de Métricas

Autor
Weberson Lopes

Senior Customer Sucess Analyst | CS Ops | RevOps | Process Automation | Data Analytics
