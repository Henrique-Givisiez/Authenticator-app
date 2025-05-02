import { useState } from "react"
import axios from "axios"

function App() {
  const [username, setUsername] = useState("")
  const [secret, setSecret] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [code, setCode] = useState("")
  const [result, setResult] = useState("")

  const handleGenerate = async () => {
    const res = await axios.post("http://localhost:5000/generate", { username })
    setSecret(res.data.secret)
    setQrCode(res.data.qrCode)
  }

  const handleVerify = async () => {
    const res = await axios.post("http://localhost:5000/verify", { username, code })
    setResult(res.data.valid ? "Código válido" : "Código inválido")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Authenticator Web</h1>

      <input
        className="border p-2 mb-2"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleGenerate} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Gerar QR Code
      </button>

      {qrCode && (
        <>
          <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="mb-4" />
          <p>Chave Secreta: <code className="bg-white p-1 rounded">{secret}</code></p>
        </>
      )}

      <input
        className="border p-2 mt-6 mb-2"
        placeholder="Código TOTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleVerify} className="bg-green-500 text-white px-4 py-2 rounded mb-2">
        Verificar Código
      </button>

      <p className="mt-2 text-lg">{result}</p>
    </div>
  )
}

export default App
