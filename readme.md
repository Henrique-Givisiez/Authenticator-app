# Authenticator App (TOTP) – Flask + React + Tailwind

Este projeto é uma aplicação web de autenticação baseada em TOTP (Time-based One-Time Password), semelhante ao Google Authenticator, implementada com:

- **Backend**: Python (Flask)
- **Frontend**: React + Tailwind CSS
- **Criptografia**: `pyotp` (RFC 6238)
- **QR Code**: `qrcode[pil]` gerado no backend

---

## Funcionalidades

- Geração de chave secreta TOTP
- Criação de QR Code para configurar no app Authenticator (ou na própria página)
- Verificação de códigos TOTP inseridos manualmente
- Integração total entre frontend e backend

---

## Estrutura do Projeto

authenticator-app/
├── backend/
│ ├── app.py # Backend Flask
│ ├── requirements.txt
│ └── venv/ # (opcional) Ambiente virtual Python
└── frontend/
├── src/
│ ├── App.jsx # Componente principal React
│ ├── index.css # Tailwind CSS
├── tailwind.config.js
├── postcss.config.js
└── package.json

---

## Como executar

### Backend (Flask)

1. Acesse a pasta backend:

```bash
cd backend
```
2. Crie e ative o ambiente virtual:

```bash
python3 -m venv venv
source venv/bin/activate
```
3. Instale as dependências:

```bash
pip install -r requirements.txt
```
4. Execute o servidor:

```bash
python app.py
```
1. Acesse a pasta frontend:
```bash
cd frontend
```
2. Instale as dependências:

```bash
npm install
```
3. Execute o app React:

```bash
npm start
```

## Exemplo de Fluxo
1. Digite um nome de usuário no frontend e clique em "Gerar QR Code"
2. Escaneie o QR com um aplicativo autenticador (Google Authenticator, Authy, etc)
3. Digite o código gerado no app para verificar