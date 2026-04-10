import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    login(email || "usuario@institucion.gov");
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-sinfal-page px-5 py-8">
      <div
        className="pointer-events-none fixed top-0 right-0 z-0 h-[45vh] w-[55%]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 100% 0%, rgba(180,220,230,0.45) 0%, rgba(200,235,220,0.2) 40%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex w-full max-w-[420px] flex-col">
        <div className="rounded-2xl bg-white px-9 pt-10 pb-7 shadow-[0_4px_24px_rgba(0,18,51,0.08),0_1px_3px_rgba(0,18,51,0.06)]">
          <header className="mb-7 flex flex-col items-center text-center">
            <div
              className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-sinfal-navy"
              aria-hidden
            >
              <span className="material-symbols-outlined text-[28px] text-white">account_balance</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-sinfal-navy">SINFAL</h1>
            <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-sinfal-grey">
              Institutional Authority
            </p>
          </header>

          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="mb-[18px]">
              <label
                htmlFor="email"
                className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-sinfal-grey"
              >
                Email de institución
              </label>
              <div className="flex h-12 items-center gap-2.5 rounded-[10px] border border-transparent bg-sinfal-input px-3.5 focus-within:border-[rgba(0,18,51,0.15)]">
                <span className="material-symbols-outlined text-xl text-sinfal-grey">mail</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@institucion.gov"
                  required
                  className="min-w-0 flex-1 border-0 bg-transparent text-[0.95rem] text-sinfal-navy outline-none placeholder:text-[#9e9e9e]"
                />
              </div>
            </div>

            <div className="mb-[18px]">
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <label
                  htmlFor="password"
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-sinfal-grey"
                >
                  Contraseña
                </label>
                <a
                  href="#"
                  className="whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.06em] text-sinfal-navy hover:underline"
                >
                  ¿Olvidó su clave?
                </a>
              </div>
              <div className="flex h-12 items-center gap-2.5 rounded-[10px] border border-transparent bg-sinfal-input px-3.5 focus-within:border-[rgba(0,18,51,0.15)]">
                <span className="material-symbols-outlined text-xl text-sinfal-grey">lock</span>
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="min-w-0 flex-1 border-0 bg-transparent text-[0.95rem] text-sinfal-navy outline-none placeholder:text-[#9e9e9e]"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="flex rounded-md p-1 text-sinfal-grey hover:bg-[rgba(0,18,51,0.06)] hover:text-sinfal-navy"
                  aria-label="Mostrar u ocultar contraseña"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPw ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <label className="mb-[22px] mt-1.5 flex cursor-pointer select-none items-center gap-2.5">
              <input type="checkbox" name="remember" className="h-4 w-4 cursor-pointer accent-sinfal-navy" />
              <span className="text-sm text-sinfal-grey">Recordar sesión en este dispositivo</span>
            </label>

            <button
              type="submit"
              className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-[10px] border-0 bg-sinfal-navy font-semibold text-white shadow-[0_4px_14px_rgba(0,18,51,0.22)] transition hover:shadow-[0_6px_20px_rgba(0,18,51,0.28)] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#1976d2]"
            >
              Acceder al Portal
              <span className="material-symbols-outlined text-xl" aria-hidden>
                arrow_forward
              </span>
            </button>
          </form>

          <p className="mx-2 mt-[22px] text-center text-[0.72rem] leading-snug text-sinfal-grey">
            Acceso restringido únicamente para personal autorizado.
          </p>
          <div className="mt-[18px] flex items-center justify-center gap-5 pt-1" aria-hidden>
            <span className="material-symbols-outlined text-[22px] text-[#bdbdbd]">shield</span>
            <div
              className="h-7 w-7 rounded-md border border-[#ccc] bg-gradient-to-br from-[#e8e8e8] to-[#d0d0d0]"
              title="Marca institucional"
            />
          </div>
        </div>

        <footer className="mt-7 flex w-full max-w-[420px] items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4CAF50] shadow-[0_0_0_2px_rgba(76,175,80,0.25)]" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-sinfal-grey">
              Servidores activos
            </span>
          </div>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-sinfal-grey">
            V4.2.0-STABLE
          </span>
        </footer>
      </div>
    </div>
  );
}
