import { useState } from "react";
import axios from "axios";

export default function App() {
  const [semanticText, setSemanticText] = useState("");
  const [semanticTags, setSemanticTags] = useState([]);

  const [riskResult, setRiskResult] = useState(null);

  const [cipherText, setCipherText] = useState("");
  const [cipherResult, setCipherResult] = useState(null);
  const [decipherResult, setDecipherResult] = useState(null);

  const [logs, setLogs] = useState([]);

  const API = "http://localhost:4000";

  /* ---------------- VALIDACIONES + try/catch ---------------- */

  const analizarSemantica = async () => {
    if (semanticText.trim() === "") {
      alert("⚠ Debes escribir un texto antes de analizar.");
      return;
    }

    try {
      const r = await axios.post(`${API}/api/analyze`, { text: semanticText });
      setSemanticTags(r.data.tags);
    } catch (error) {
      alert("❌ Error al conectar con el Analizador Semántico.");
      console.error(error);
    }
  };

  const evaluarRiesgo = async () => {
    if (semanticTags.length === 0) {
      alert("⚠ Primero genera etiquetas con el análisis semántico.");
      return;
    }

    try {
      const r = await axios.post(`${API}/api/assess`, { tags: semanticTags });
      setRiskResult(r.data);
    } catch (error) {
      alert("❌ Error al conectar con el servicio de Riesgo.");
      console.error(error);
    }
  };

  const cifrar = async () => {
    if (cipherText.trim() === "") {
      alert("⚠ Debes escribir un texto para cifrar.");
      return;
    }

    try {
      const r = await axios.post(`${API}/api/encrypt`, {
        filename: "archivo.txt",
        content: cipherText,
        key: "clave123",
      });

      setCipherResult(r.data);
    } catch (error) {
      alert("❌ Error al conectar con el módulo de cifrado.");
      console.error(error);
    }
  };

  const descifrar = async () => {
    if (!cipherResult) {
      alert("⚠ Primero debes cifrar un texto.");
      return;
    }

    try {
      const r = await axios.post(`${API}/api/decrypt`, {
        id: cipherResult.id,
        key: "clave123",
      });

      setDecipherResult(r.data);
    } catch (error) {
      alert("❌ Error al conectar con el módulo de descifrado.");
      console.error(error);
    }
  };

  const cargarLogs = async () => {
    try {
      const r = await axios.get(`${API}/api/logs`);
      setLogs(r.data);
    } catch (error) {
      alert("❌ No se pudieron cargar los logs.");
      console.error(error);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* NAVBAR */}
      <nav className="bg-white shadow-lg border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700 tracking-wide">
          Plataforma de Análisis — Microservicios + MongoDB
        </h1>

        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition font-medium shadow-md">
          Panel
        </button>
      </nav>

      {/* CONTENIDO */}
      <main className="flex-1 flex justify-center py-12 px-4">
        <div className="w-full max-w-4xl">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Centro de Procesamiento Inteligente
          </h2>

          <div className="space-y-10">

            {/* 1. ANALIZADOR */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Analizador Semántico</h3>

              <textarea
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                rows="4"
                placeholder="Escribe tu texto aquí..."
                value={semanticText}
                onChange={(e) => setSemanticText(e.target.value)}
              />

              <button
                onClick={analizarSemantica}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition shadow-md font-semibold"
              >
                Analizar Texto
              </button>

              <p className="mt-4 text-lg text-gray-700">
                <strong>Etiquetas detectadas:</strong>{" "}
                {semanticTags.length > 0 ? semanticTags.join(", ") : "—"}
              </p>
            </section>

            {/* 2. RIESGO */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Evaluación de Riesgo</h3>

              <button
                onClick={evaluarRiesgo}
                className="w-full bg-orange-600 text-white py-3 rounded-xl text-lg hover:bg-orange-700 transition shadow-md font-semibold"
              >
                Evaluar riesgo basado en etiquetas
              </button>

              <p className="mt-4 text-lg text-gray-700">
                <strong>Resultado:</strong>{" "}
                {riskResult ? `${riskResult.level} (puntaje: ${riskResult.score})` : "—"}
              </p>
            </section>

            {/* 3. CIFRADO */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Cifrar y Descifrar</h3>

              <textarea
                className="w-full p-4 border rounded-xl"
                rows="2"
                placeholder="Texto a cifrar..."
                value={cipherText}
                onChange={(e) => setCipherText(e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <button
                  onClick={cifrar}
                  className="bg-green-600 text-white py-3 rounded-xl text-lg hover:bg-green-700 transition shadow-md font-semibold"
                >
                  Cifrar
                </button>

                <button
                  onClick={descifrar}
                  className="bg-red-600 text-white py-3 rounded-xl text-lg hover:bg-red-700 transition shadow-md font-semibold"
                >
                  Descifrar
                </button>
              </div>

              {cipherResult && (
                <p className="mt-4 text-sm break-all text-gray-800">
                  <strong>Texto cifrado:</strong> {cipherResult.encrypted}
                </p>
              )}

              {decipherResult && (
                <p className="mt-4 text-sm break-all text-gray-800">
                  <strong>Texto descifrado:</strong> {decipherResult.decrypted}
                </p>
              )}
            </section>

            {/* 4. LOGS */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Registros (Logs)</h3>

              <button
                onClick={cargarLogs}
                className="w-full bg-gray-800 text-white py-3 rounded-xl text-lg hover:bg-black transition shadow-md font-semibold"
              >
                Cargar Logs
              </button>

              <div className="mt-4 max-h-60 overflow-y-auto bg-gray-50 p-4 rounded-xl border">
                {logs.length === 0 ? (
                  <p className="text-gray-500">Sin registros todavía.</p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {logs.map((log) => (
                      <li key={log._id} className="border-b pb-2 text-gray-700">
                        {log.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 mt-6">
        © 2025 Plataforma AI — Microservicios con MongoDB.
      </footer>
    </div>
  );
}
