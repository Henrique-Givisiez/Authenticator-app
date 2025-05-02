from flask import Flask, jsonify, request
from flask_cors import CORS
import pyotp
import qrcode
import io
import base64

app = Flask(__name__)
CORS(app)

# Simples armazenamento em memória
users = {}

@app.route('/generate', methods=['POST'])
def generate():
    username = request.json.get('username')
    secret = pyotp.random_base32()
    users[username] = secret

    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(name=username, issuer_name="ReactAuthenticator")

    # Gera QR Code em base64
    img = qrcode.make(uri)
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    qr_b64 = base64.b64encode(buffer.getvalue()).decode()

    return jsonify({'secret': secret, 'qrCode': qr_b64})

@app.route('/verify', methods=['POST'])
def verify():
    username = request.json.get('username')
    code = request.json.get('code')
    secret = users.get(username)

    if not secret:
        return jsonify({'valid': False, 'error': 'Usuário não encontrado'}), 404

    totp = pyotp.TOTP(secret)
    return jsonify({'valid': totp.verify(code)})

if __name__ == '__main__':
    app.run(debug=True)
