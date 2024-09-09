import { useState } from "react";

const Crypto = () => {
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const encryptText = (textToEncrypt, password) => {
    let encryptedText = "";
    for (let i = 0; i < textToEncrypt.length; i++) {
      const charCode = textToEncrypt.charCodeAt(i);
      const encryptedCharCode =
        charCode + password.charCodeAt(i % password.length);
      encryptedText += (encryptedText ? "," : "") + encryptedCharCode;
    }
    return encryptedText;
  };

  const decryptText = (encryptedText, password) => {
    let decryptedText = "";
    const encryptedChars = encryptedText.split(",");
    for (let i = 0; i < encryptedChars.length; i++) {
      const charCode = parseInt(encryptedChars[i], 10);
      const decryptedCharCode =
        charCode - password.charCodeAt(i % password.length);
      decryptedText += String.fromCharCode(decryptedCharCode);
    }
    return decryptedText;
  };

  const handleEncrypt = () => {
    if (!password || !text) {
      alert("Por favor, insira tanto o texto quanto a senha.");
      return;
    }
    const encryptedText = encryptText(text, password);
    setEncrypted(`${encryptedText}-${text.length}`);
  };

  const handleDecrypt = () => {
    // Verificação de campos obrigatórios
    if (!password || (!encrypted && !text)) {
      alert("Por favor, insira tanto o texto criptografado quanto a senha.");
      return;
    }

    const TextEnc = encrypted || text; // Usando uma verificação simplificada
    const encryptedData = TextEnc.split("-");

    if (encryptedData.length === 0 || encryptedData[0].length === 0) {
      alert("O texto criptografado parece estar mal formatado.");
      return;
    }

    const encryptedText = encryptedData[0].split(",");
    let decryptedText = "";

    // Processo de descriptografia
    for (let i = 0; i < encryptedText.length; i++) {
      const charCode = parseInt(encryptedText[i], 10);

      // Verifica se o código é um número válido
      if (isNaN(charCode)) {
        alert("O texto criptografado contém valores inválidos.");
        return;
      }

      const decryptedCharCode =
        charCode - password.charCodeAt(i % password.length);
      decryptedText += String.fromCharCode(decryptedCharCode);
    }

    setDecrypted(decryptedText);
  };

  const handleClear = () => {
    setPassword("");
    setText("");
    setEncrypted("");
    setDecrypted("");
  };

  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Cryptografador de Palavra</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Senha:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-2 ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onMouseDown={handleShowPassword}
          onMouseUp={handleHidePassword}
        >
          Mostrar
        </button>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="text"
        >
          Texto:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleEncrypt}
      >
        Criptografar
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
        onClick={handleDecrypt}
      >
        Descriptografar
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 ml-2"
        onClick={handleClear}
      >
        Limpar
      </button>
      <div className="mt-4">
        <p className="text-gray-700 text-sm font-bold mb-2">
          Texto Criptografado:
        </p>
        <p className="text-gray-600">{encrypted}</p>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 text-sm font-bold mb-2">
          Texto Descriptografado:
        </p>
        <p className="text-gray-600">{decrypted}</p>
      </div>
    </div>
  );
};

export default Crypto;
