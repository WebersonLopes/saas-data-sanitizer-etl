# 📊 Automação de ETL para Onboarding e Migração de Clientes SaaS

> **Plataforma Serverless de ETL** desenvolvida para automatizar a validação, sanitização, transformação e preparação de bases de dados de clientes destinadas à migração entre sistemas SaaS, CRM e ERP.

A aplicação processa arquivos **CSV, XLS e XLSX**, garantindo maior qualidade dos dados, reduzindo atividades manuais e aumentando a eficiência operacional durante processos de onboarding e migração de clientes.

---

# 🚀 O Problema de Negócio

Durante processos de onboarding e migração de clientes, a equipe operacional precisava revisar manualmente cada planilha antes da importação para o sistema de destino.

Cada arquivo exigia aproximadamente **30 minutos** de trabalho manual, criando gargalos operacionais e aumentando o risco de falhas durante a importação dos dados.

Os principais problemas encontrados eram:

* Telefones com quantidade incorreta de dígitos;
* CPF/CNPJ em formato inválido;
* Endereços de e-mail inconsistentes;
* Caracteres invisíveis (Unicode/BOM) que impediam a importação dos dados;
* Nomes de clientes sem padronização;
* Campos obrigatórios ausentes.

Além do tempo gasto, essas inconsistências impactavam diretamente a qualidade do onboarding e a experiência dos clientes.

---

# 💡 A Solução

Para eliminar esse processo manual, desenvolvi uma **Plataforma Serverless de ETL** capaz de processar automaticamente planilhas de clientes antes da importação para sistemas SaaS, CRM e ERP.

A aplicação executa todo o fluxo de preparação dos dados, desde a leitura do arquivo até sua validação, sanitização, classificação e geração dos arquivos finais prontos para importação.

---

# ✨ Principais Funcionalidades

## 📂 Processamento Client-side

* Leitura de arquivos CSV, XLS e XLSX diretamente no navegador utilizando **SheetJS**;
* Redução da carga de processamento no servidor;
* Eliminação da necessidade de upload dos arquivos para processamento.

---

## 🔍 Mapeamento Inteligente de Colunas

A aplicação identifica automaticamente as principais colunas da planilha utilizando correspondência por palavras-chave (*keyword matching*).

São reconhecidos automaticamente campos como:

* Nome
* Razão Social
* CPF/CNPJ
* E-mail
* Telefone

Isso permite processar arquivos provenientes de diferentes clientes sem necessidade de configuração manual.

---

## 🧹 Sanitização e Validação dos Dados

O pipeline executa automaticamente:

* Remoção de caracteres Unicode/BOM invisíveis;
* Normalização de espaços em branco;
* Validação estrutural de e-mails;
* Validação de telefones;
* Padronização de nomes próprios;
* Sanitização dos campos;
* Verificação de consistência dos dados.

---

## 📋 Classificação Automática dos Registros

Após a validação, os dados são separados automaticamente em dois conjuntos.

### ✅ Registros Válidos

Dados limpos, padronizados e prontos para importação.

### ⚠️ Registros para Revisão

Registros com inconsistências são exportados em um arquivo separado contendo a coluna **"Motivo da Revisão"**, indicando exatamente quais informações precisam ser corrigidas.

Essa abordagem reduz significativamente o tempo gasto com conferências manuais.

---

## 📈 Auditoria da Operação

Cada processamento gera automaticamente um registro contendo:

* Data e hora da execução;
* Tipo de processamento;
* Total de registros processados;
* Quantidade de registros válidos;
* Quantidade de registros para revisão;
* Estatísticas gerais da execução.

Essas informações permitem acompanhar o histórico das importações e monitorar indicadores operacionais.

---

# 📊 Impacto no Negócio

A solução proporcionou ganhos mensuráveis para a operação:

* ⚡ Redução aproximada de **97%** no tempo de processamento (de cerca de **30 minutos para menos de 1 minuto** por arquivo);
* 📉 Redução significativa de erros de validação antes da importação;
* 🚀 Aumento da escalabilidade operacional por meio da automação de atividades repetitivas;
* 👥 Liberação da equipe de Customer Success para atividades de maior valor agregado, como relacionamento com clientes e retenção.

---

# 🏗️ Destaques Técnicos

* Arquitetura Serverless
* Pipeline ETL
* Validação de Qualidade dos Dados
* Detecção Dinâmica de Colunas
* Processamento Client-side
* Sanitização de Dados
* Validação por Expressões Regulares (Regex)
* Classificação Automática de Registros
* Auditoria de Processamento
* JavaScript Assíncrono
* Implantação sem necessidade de instalação

---

# 🛠️ Tecnologias Utilizadas

| Camada                     | Tecnologias                    |
| -------------------------- | ------------------------------ |
| **Frontend**               | HTML5, CSS3, JavaScript (ES6+) |
| **Backend**                | Google Apps Script             |
| **Processamento de Dados** | ETL, Regex, Base64 Stream      |
| **Bibliotecas**            | SheetJS (xlsx)                 |
| **Formatos de Arquivo**    | CSV, XLS e XLSX                |

---

# 🔄 Fluxo da Aplicação

```text
Arquivo CSV / XLS / XLSX
            │
            ▼
Leitura da Planilha (SheetJS)
            │
            ▼
Mapeamento Inteligente das Colunas
            │
            ▼
Sanitização dos Dados
            │
            ▼
Validação das Regras de Negócio
            │
            ▼
Classificação dos Registros
            │
      ┌─────┴─────┐
      ▼           ▼
Dados Válidos   Dados para Revisão
      │           │
      └─────┬─────┘
            ▼
Registro de Auditoria
            │
            ▼
Arquivo Final Pronto para Importação
```

---

# 🎯 Competências Demonstradas

* Desenvolvimento de Pipelines ETL
* Automação de Processos
* Qualidade de Dados (*Data Quality*)
* Processamento de Arquivos
* Customer Success Operations
* Data Analytics
* Desenvolvimento Serverless
* JavaScript
* Google Apps Script
* Otimização de Processos
* Operações SaaS
* Workflow Automation

---

# 👨‍💻 Autor

**Weberson Lopes**

**Senior Customer Success Analyst | Customer Success Operations | Process Automation | Data Analytics**

**Stack:** Python • SQL • Google Apps Script • JavaScript • Power BI • ETL • SaaS
