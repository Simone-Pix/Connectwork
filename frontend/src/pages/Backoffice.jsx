import { useEffect, useState } from "react";

function Backoffice() {
  const [section, setSection] = useState("valutazioni"); 
  const [richieste, setRichieste] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openItem, setOpenItem] = useState(null); 
  const [mobileOpen, setMobileOpen] = useState(false);
  const [valuationInput, setValuationInput] = useState("");

  useEffect(() => {
    async function loadRichieste() {
      if (section !== "valutazioni") return;
      try {
        setLoading(true);
        const res = await fetch("/api/richieste");
        const data = await res.json();
        setRichieste(data);
      } catch (err) {
        console.error("Failed to fetch valutazioni", err);
        setRichieste([]);
      } finally {
        setLoading(false);
      }
    }
    loadRichieste();
  }, [section]);

  function toggleItem(id) {
    setOpenItem((prev) => (prev === id ? null : id));
  }

  async function sendValutazione(id, email) {
    try {
      await fetch(`/api/valutazione-placeholder/${id}`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          valutazione: valuationInput,
        }),
      });
      setOpenItem(null);
    } catch (err) {
      console.error("Failed to send", err);
    }
  }

  return (
    <div className="backoffice-wrapper-backoffice pt-28 pb-10 min-h-screen">

      {/* Mobile header */}
      <div className="backoffice-mobileToggle-backoffice lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
        Backoffice pages
      </div>

      <div className={`backoffice-layout-backoffice ${mobileOpen ? "open" : ""}`}>
        
        {/* Sidebar */}
        <aside className="backoffice-sidebar-backoffice">
          <button
            className={`backoffice-sidebarItem-backoffice ${section === "add" ? "active" : ""}`}
            onClick={() => setSection("add")}
          >
            Aggiungi immobile
          </button>

          <button
            className={`backoffice-sidebarItem-backoffice ${section === "valutazioni" ? "active" : ""}`}
            onClick={() => setSection("valutazioni")}
          >
            Richieste valutazioni
          </button>

          <button
            className={`backoffice-sidebarItem-backoffice ${section === "visite" ? "active" : ""}`}
            onClick={() => setSection("visite")}
          >
            Richieste visite
          </button>
        </aside>

        {/* Main content */}
        <main className="backoffice-main-backoffice">

          {/* SEZIONE: Richieste Valutazioni */}
          {section === "valutazioni" && (
            <div>
              <h2 className="backoffice-title-backoffice">Richieste di valutazione</h2>

              {loading ? (
                <div className="backoffice-loading-backoffice">
                  Loading...
                </div>
              ) : (
                <div className="space-y-4">
                  {richieste.map((r) => {
                    const isOpen = openItem === r.id;
                    const isEvaluated = false; // Placeholder, aggiornerai tu

                    return (
                      <div
                        key={r.id}
                        className="backoffice-item-backoffice"
                      >
                        {/* RIGA COMPATTA */}
                        <div
                          className="backoffice-itemHeader-backoffice"
                          onClick={() => toggleItem(r.id)}
                        >
                          <span>ID: {r.id}</span>
                          <span>{r.email}</span>
                          <span className={`backoffice-statusDot-backoffice ${isEvaluated ? "green" : "red"}`}></span>
                        </div>

                        {/* CONTENUTO ESTESO */}
                        {isOpen && (
                          <div className="backoffice-itemBody-backoffice">
                            <div className="backoffice-grid-backoffice">
                              <p><strong>Nome:</strong> {r.nome}</p>
                              <p><strong>Cognome:</strong> {r.cognome}</p>
                              <p><strong>Telefono:</strong> {r.telefono}</p>
                              <p><strong>Indirizzo:</strong> {r.indirizzo}</p>
                              <p><strong>Stanze:</strong> {r.stanze}</p>
                              <p><strong>Bagni:</strong> {r.bagni}</p>
                              <p><strong>Superficie:</strong> {r.superficie}</p>
                              <p><strong>Piano:</strong> {r.piano}</p>
                              <p><strong>Tempi:</strong> {r.tempistica}</p>
                              <p><strong>Tipo:</strong> {r.tipo_operazione}</p>
                              <p><strong>Data:</strong> {r.data_creazione}</p>
                              <p><strong>Note:</strong> {r.optional_info}</p>
                            </div>

                            {/* Input valutazione */}
                            <div className="backoffice-valutazioneBox-backoffice">
                              <input
                                type="number"
                                value={valuationInput}
                                onChange={(e) => setValuationInput(e.target.value)}
                                placeholder="Inserisci valutazione (€)"
                                className="backoffice-inputValutazione-backoffice"
                              />

                              <button
                                className="backoffice-sendButton-backoffice"
                                onClick={() => sendValutazione(r.id, r.email)}
                              >
                                Invia
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SEZIONE: Aggiungi immobile */}
          {section === "add" && (
            <div>
              <h2 className="backoffice-title-backoffice">Aggiungi immobile</h2>

              <form className="backoffice-addForm-backoffice">
                <input
                  className="backoffice-formInput-backoffice"
                  placeholder="Titolo immobile"
                />

                <input
                  className="backoffice-formInput-backoffice"
                  placeholder="Indirizzo"
                />

                <input
                  className="backoffice-formInput-backoffice"
                  placeholder="Superficie (m²)"
                />

                <button className="backoffice-formSubmit-backoffice">
                  Invia
                </button>
              </form>
            </div>
          )}

          {/* SEZIONE: Richieste Visite */}
          {section === "visite" && (
            <div>
              <h2 className="backoffice-title-backoffice">Richieste visite</h2>
              <p className="text-gray-700">Placeholder...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Backoffice;
