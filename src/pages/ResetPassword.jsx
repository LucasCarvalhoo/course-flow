import { useState } from "react";
import { supabase } from "../services/supabase";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setMessage("Verifique seu email para redefinir sua senha");
    } catch (err) {
      setError(err.message || "Erro ao enviar email de recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center mb-12">
            <img
              src="./public/img/logo-gt.png" // Verifique se o caminho para sua logo está correto
              alt="Logo Geração Tech"
              className="w-64 h-auto [filter:drop-shadow(0_0_6px_rgba(255,255,255,0.2))]"
            ></img>
          </div>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#e6e6e6] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-[#4d4d4d] transition-colors"
              placeholder="Digite seu email"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3">
              <p className="text-green-400 text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-[#f2f2f2] text-black font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar email de recuperação"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-[#737373] hover:text-white text-sm">
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
