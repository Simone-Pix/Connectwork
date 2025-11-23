import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export default function PersonalArea() {
  const { user, isAuthenticated, loading } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [emailValue, setEmailValue] = useState(user?.email || "");
  //per la parte di fetch delle richieste
  const [richieste, setRichieste] = useState([]);
  const [loadingRichieste, setLoadingRichieste] = useState(true);

  // Fetch richieste dell’utente loggato
  useEffect(() => {
    if (!user?.email) return;

    const fetchRichieste = async () => {
      try {
        const res = await fetch(`/api/richieste/email/${user.email}`);
        const data = await res.json();
        setRichieste(data);
      } catch (e) {
        console.error("Errore nel caricamento delle richieste:", e);
      } finally {
        setLoadingRichieste(false);
      }
    };

    fetchRichieste();
  }, [user]);

  if (loading) {
    return (
      <div className="hero-personal">
        <div className="heroContent-personal text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="hero-personal">
        <div className="heroContent-personal text-white text-center">
          <h1 className="text-3xl font-bold mb-4">Not Logged In</h1>
          <p className="text-gray-300">Please login to access your personal area.</p>
        </div>
      </div>
    );
  }


  // Rotta update per email non ancora settata placeholder per mail
  const handleSaveEmail = async () => {
    try {
      console.log("Email salvata:", emailValue);

      // qui dovrai inserire la fetch reale:
      // await fetch("/api/users/update-email", { ... })

      setIsEditing(false);
    } catch (e) {
      console.error("Errore salvataggio email:", e);
    }
  };

  return (
    <main className="hero-personal">
      <div className="heroContent-personal">
        <div className="configurator-personal text-black">
          <h2 className="section-title-personal">Personal Area</h2>
          <p className="section-subtitle-personal">Manage your profile information</p>

          <div className="wrapper-1-step-personal">

            {/* --- ID --- */}
            <div className="mb-6">
              <label className="block text-orange-500 mb-2 font-semibold">
                User ID
              </label>
              <input
                type="text"
                value={user.id}
                disabled
                className="input-step2-personal bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* --- ROLE --- */}
            <div className="mb-6">
              <label className="block text-orange-500 mb-2 font-semibold">
                Role
              </label>
              <input
                type="text"
                value={user.role}
                disabled
                className="input-step2-personal bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* --- EMAIL (modificabile) --- */}
            <div className="mb-6">
              <label className="block text-orange-500 mb-2 font-semibold">
                Email
              </label>

              <div className="flex items-center gap-4">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  disabled={!isEditing}
                  className={`
                    input-step2-personal
                    ${isEditing ? "" : "bg-gray-200 cursor-not-allowed"}
                  `}
                />

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-change-personal"
                  >
                    Change
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveEmail}
                      className="btn-save-personal"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEmailValue(user.email);
                        setIsEditing(false);
                      }}
                      className="btn-cancel-personal"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ===== CARD LISTA RICHIESTE ===== */}
        <div className="configurator-personal-requests text-black">
          <h2 className="section-title-personal">Le tue Valutazioni:</h2>
          <p className="section-subtitle-personal">Tutte le richieste di valutazione associate alla tua email</p>

          {loadingRichieste ? (
            <p className="text-center text-gray-300">Loading configurations...</p>
          ) : richieste.length === 0 ? (
            <p className="text-center text-gray-300">No configurations found.</p>
          ) : (
            <div className="lista-richieste-grid">
              {richieste.map((r) => (
                <div key={r.id} className="richiesta-card">
                  <p className="richiesta-title">{r.tipoOperazione}</p>
                  <p><strong>Nome:</strong> {r.nome} {r.cognome}</p>
                  <p><strong>Indirizzo:</strong> {r.indirizzo}</p>
                  <p><strong>Stanze:</strong> {r.stanze}</p>
                  <p><strong>Bagni:</strong> {r.bagni}</p>
                  <p><strong>Superfice:</strong> {r.superficie} m²</p>
                  <p><strong>Telefono:</strong> {r.telefono}</p>
                  <p><strong>Tempistiche:</strong> {r.tempistica}</p>
                  <p className="text-xs mt-2 text-gray-500">
                    {new Date(r.dataCreazione).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
