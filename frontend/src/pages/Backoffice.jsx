import { useEffect, useState } from "react";

// Stato iniziale del form per Aggiungi Immobile
const initialFormState = {
  titolo: "",
  annoCostruzione: "",
  cap: "",
  citta: "",
  classeEnergetica: "",
  descrizione: "",
  disponibileEsclusiva: false,
  indirizzo: "",
  numBagni: "",
  numLocali: "",
  piano: "",
  prezzoRichiesto: "",
  provincia: "",
  stato: "",
  statoConservazione: "",
  superficie: "",
  tipoImmobile: "",
  proprietarioId: "",
};

function Backoffice() {
  // Stati di controllo UI e dati principali
  const [section, setSection] = useState("aggiungi");
  const [openItem, setOpenItem] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dati delle sezioni
  const [richieste, setRichieste] = useState([]);
  const [immobili, setImmobili] = useState([]);

  // Stato per la valutazione
  const [valutate, setValutate] = useState({});

  // Stato per "aggiungi immobile"
  const [addForm, setAddForm] = useState(initialFormState);
  const [imageFiles, setImageFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  // Gestione del Modal di Successo
  const [successModal, setSuccessModal] = useState({ show: false, message: "" });

  // NUOVO STATO: Gestione del Modal di Conferma (Custom Confirm)
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    message: "",
    onConfirm: null, // Funzione da eseguire se si clicca "Conferma"
  });

  // Funzione helper per mostrare il successo
  const showSuccess = (message) => {
    setSuccessModal({ show: true, message });
    setTimeout(() => {
      setSuccessModal({ show: false, message: "" });
    }, 3000); 
  };

  // Funzione helper per chiudere il confirm
  const closeConfirm = () => {
    setConfirmModal({ show: false, message: "", onConfirm: null });
  };

  // Effetto per caricare richieste/valutazioni
  useEffect(() => {
    async function loadRichieste() {
      if (section !== "valutazioni") return;
      setLoading(true);
      try {
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

  // Effetto per caricare immobili per la modifica
  useEffect(() => {
    async function loadImmobili() {
      if (section !== "modifica") return;
      setLoading(true);
      try {
        const res = await fetch("/api/immobili");
        const data = await res.json();
        setImmobili(data);
      } catch (err) {
        console.error("Failed to fetch immobili", err);
        setImmobili([]);
      } finally {
        setLoading(false);
      }
    }
    loadImmobili();
  }, [section]);

  function handleSectionChange(newSection) {
    setSection(newSection);
    setOpenItem(null);
    setMobileOpen(false);
  }

  function toggleItem(id) {
    setOpenItem((prev) => (prev === id ? null : id));
  }

  async function sendAutomaticValutazione(id) {
    try {
      const res = await fetch(`/api/richieste/${id}/valuta-automatica`, {
        method: "POST",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Errore valutazione automatica");
      }

      const data = await res.json();

      setRichieste((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, valutata: true } : r
        )
      );

      showSuccess(`Valutazione: ${data.valoreStimatoMin}€ - ${data.valoreStimatoMax}€`);
      
    } catch (err) {
      alert(err.message); 
    }
  }

  // --- LOGICA ELIMINAZIONE RICHIESTA (Modificata per usare il Modal Custom) ---

  // 1. Funzione che apre il modal
  const openDeleteRichiestaModal = (id) => {
    setConfirmModal({
      show: true,
      message: "Vuoi davvero eliminare questa richiesta?",
      onConfirm: () => executeDeleteRichiesta(id),
    });
  };

  // 2. Funzione che esegue effettivamente l'eliminazione
  async function executeDeleteRichiesta(id) {
    try {
      const res = await fetch(`/api/richieste/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Errore eliminazione richiesta");

      setRichieste((prev) => prev.filter((r) => r.id !== id));
      showSuccess("Richiesta eliminata con successo!");
    } catch (err) {
      alert(err.message || "Errore durante l'eliminazione.");
    }
  }


  function getStatusColor(r) {
    if (r?.valutata) return "green";
    if (!r.cap || r.cap.trim() === "") return "yellow";
    return "red";
  }

  function handleAddFormChange(e) {
    const { name, type, value, checked } = e.target;
    setAddForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleFilesChange(e) {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
  }

  function preparePayload(data) {
    return {
      titolo: data.titolo || "",
      annoCostruzione: data.annoCostruzione ? parseInt(data.annoCostruzione, 10) : null,
      cap: data.cap || "",
      citta: data.citta || "",
      classeEnergetica: data.classeEnergetica || "",
      dataInserimento: new Date().toISOString(),
      descrizione: data.descrizione || "",
      disponibileEsclusiva: !!data.disponibileEsclusiva,
      indirizzo: data.indirizzo || "",
      numBagni: data.numBagni ? parseInt(data.numBagni, 10) : null,
      numLocali: data.numLocali ? parseInt(data.numLocali, 10) : null,
      piano: data.piano || "",
      prezzoRichiesto: data.prezzoRichiesto ? parseFloat(data.prezzoRichiesto) : null,
      provincia: data.provincia || "",
      stato: data.stato || "",
      statoConservazione: data.statoConservazione || "",
      superficie: data.superficie ? parseFloat(data.superficie) : null,
      tipoImmobile: data.tipoImmobile || "",
      proprietarioId: data.proprietarioId ? parseInt(data.proprietarioId, 10) : null,
    };
  }

  async function handleAddSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const payload = preparePayload(addForm);

      const res = await fetch("/api/immobili", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Creazione immobile fallita: ${res.status} ${text}`);
      }

      const created = await res.json();
      const finalId = created?.id || created?.immoId || created?.immobileId || created?.ID || null;

      if (!finalId) {
        console.warn("L'immobile creato non ha restituito un ID riconosciuto.", created);
      }

      let uploadResults = [];
      if (imageFiles.length > 0 && finalId) {
        for (const file of imageFiles) {
          const formData = new FormData();
          formData.append("file", file);
          const upRes = await fetch(`/api/immagini/upload/${finalId}`, {
            method: "POST",
            body: formData,
          });

          if (!upRes.ok) {
            const txt = await upRes.text();
            console.error("Image upload failed for", file.name, txt);
            uploadResults.push({ file: file.name, ok: false, status: upRes.status, message: txt });
          } else {
            const upJson = await upRes.json();
            uploadResults.push({ file: file.name, ok: true, response: upJson });
          }
        }
      }

      setSubmitMessage({ success: true, immobile: created, uploads: uploadResults });
      setAddForm(initialFormState);
      setImageFiles([]);
      showSuccess("Immobile creato con successo!");

    } catch (err) {
      console.error("Errore nel submit:", err);
      setSubmitMessage({ success: false, message: err.message || "Errore sconosciuto" });
    } finally {
      setSubmitting(false);
    }
  }

  function resetAddForm() {
    setAddForm(initialFormState);
    setImageFiles([]);
    setSubmitMessage(null);
  }

  // --- LOGICA ELIMINAZIONE IMMOBILE (Modificata per usare il Modal Custom) ---

  // 1. Funzione che apre il modal
  const openDeleteImmobileModal = (id) => {
    setConfirmModal({
      show: true,
      message: "Vuoi davvero eliminare questo immobile?",
      onConfirm: () => executeDeleteImmobile(id),
    });
  };

  // 2. Funzione che esegue effettivamente l'eliminazione
  async function executeDeleteImmobile(id) {
    try {
      const res = await fetch(`/api/immobili/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Eliminazione fallita: ${res.status} ${text}`);
      }

      showSuccess("Immobile eliminato con successo.");
      
      setImmobili((prev) => prev.filter((i) => i.id !== id));
      setOpenItem(null); 
    } catch (err) {
      console.error("Errore nell'eliminazione dell'immobile", err);
      window.alert(err.message || "Errore sconosciuto durante l'eliminazione.");
    }
  }

  async function updateImmobile(e, id) {
    e.preventDefault();
    const formEl = e.target;
    const formData = new FormData(formEl);
    const rawObj = Object.fromEntries(formData.entries());
    const payload = preparePayload(rawObj);

    delete payload.dataInserimento;

    try {
      const res = await fetch(`/api/immobili/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Aggiornamento fallito: ${res.status} ${text}`);
      }

      const updatedImmobile = await res.json();
      setImmobili((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...updatedImmobile } : i))
      );
      
      showSuccess("Immobile aggiornato con successo.");

    } catch (err) {
      console.error("Errore nell'aggiornamento dell'immobile", err);
      window.alert(err.message || "Errore sconosciuto durante l'aggiornamento.");
    }
  }

  return (
    <div className="backoffice-wrapper-backoffice pt-28 pb-10 min-h-screen relative">
      
      {/* --- MODAL DI SUCCESSO CENTRATO --- */}
      {successModal.show && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-xl shadow-2xl z-50 bg-[#004E98] text-white text-center min-w-[300px]">
          <div className="mb-2 flex justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p className="font-semibold text-lg">{successModal.message}</p>
        </div>
      )}

      {/* --- MODAL DI CONFERMA (Custom Confirm) --- */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[#004E98] p-8 rounded-xl shadow-2xl text-white text-center max-w-sm w-full mx-4 relative animate-fade-in">
             
             {/* Icona Warning */}
             <div className="mb-4 flex justify-center">
                <svg className="w-10 h-10 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
             </div>

             <p className="font-semibold text-lg mb-8">{confirmModal.message}</p>
             
             <div className="flex justify-center gap-4">
                {/* Pulsante ANNULLA (Stile Reset/Grigio chiaro per contrasto su sfondo blu) */}
                <button 
                  onClick={closeConfirm} 
                  className="px-6 py-2 rounded-lg bg-gray-100 text-[#004E98] font-bold shadow hover:bg-white transition-colors"
                >
                  Annulla
                </button>

                {/* Pulsante CONFERMA (Stile Elimina/Rosso) */}
                <button 
                  onClick={() => {
                    if (confirmModal.onConfirm) confirmModal.onConfirm();
                    closeConfirm();
                  }} 
                  className="px-6 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-colors"
                >
                  Conferma
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Mobile header */}
      <div
        className="backoffice-mobileToggle-backoffice lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span>{mobileOpen ? "Chiudi Menu" : "Backoffice Pages"}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className={`w-5 h-5 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <div className={`backoffice-layout-backoffice ${mobileOpen ? "open" : ""}`}>
        {/* Sidebar */}
        <aside className="backoffice-sidebar-backoffice">
          <button
            className={`backoffice-sidebarItem-backoffice ${section === "aggiungi" ? "active" : ""}`}
            onClick={() => handleSectionChange("aggiungi")}
          >
            Aggiungi immobile
          </button>

          <button
            className={`backoffice-sidebarItem-backoffice ${section === "valutazioni" ? "active" : ""}`}
            onClick={() => handleSectionChange("valutazioni")}
          >
            Richieste valutazioni
          </button>

          <button
            className={`backoffice-sidebarItem-backoffice ${section === "modifica" ? "active" : ""}`}
            onClick={() => handleSectionChange("modifica")}
          >
            Modifica immobili
          </button>
        </aside>

        {/* Main content */}
        <main className="backoffice-main-backoffice">
          {/* SEZIONE: Richieste Valutazioni */}
          {section === "valutazioni" && (
            <div>
              <h2 className="backoffice-title-backoffice">Richieste di valutazione</h2>

              {loading ? (
                <div className="backoffice-loading-backoffice">Loading...</div>
              ) : (
                <div className="space-y-4">
                  {richieste.map((r) => {
                    const isOpen = openItem === r.id;
                    const statusClass = getStatusColor(r);
                    const isValutata = valutate[r.id];

                    return (
                      <div key={r.id} className="backoffice-item-backoffice">
                        {/* HEADER COMPATTO */}
                        <div
                          className={`backoffice-itemHeader-backoffice ${isValutata ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                          onClick={() => toggleItem(r.id)}
                        >
                          <span>ID: {r.id}</span>
                          <span>{r.email}</span>

                          <span className={`backoffice-statusDot-backoffice ${statusClass}`}></span>
                        </div>

                        {/* CONTENUTO ESPANSO */}
                        {isOpen && !isValutata && (
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
                              <p><strong>Tipo:</strong> {r.tipoImmobile}</p>
                              <p><strong>Data:</strong> {r.dataCreazione}</p>
                              <p><strong>Note:</strong> {r.optionalInfo}</p>
                            </div>

                            {/* BOTTONI AZIONI */}
                            <div className="backoffice-actions-backoffice">
                              {/* Modificato per usare il Modal Custom */}
                              <button
                                className="backoffice-deleteButton-backoffice"
                                onClick={() => openDeleteRichiestaModal(r.id)}
                              >
                                Elimina
                              </button>

                              <button
                                className="backoffice-sendButton-backoffice"
                                onClick={() => sendAutomaticValutazione(r.id)}
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
          {section === "aggiungi" && (
            <div>
              <h2 className="backoffice-title-backoffice">Aggiungi immobile</h2>

              <form
                className="backoffice-addForm-backoffice"
                onSubmit={handleAddSubmit}
              >
                <div className="grid grid-cols-1 gap-3">
                  <div className="input-group">
                    <label className="mb-1">Anno costruzione</label>
                    <input
                      name="annoCostruzione"
                      value={addForm.annoCostruzione}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Anno costruzione (YYYY)"
                      type="number"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">CAP</label>
                    <input
                      name="cap"
                      value={addForm.cap}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="CAP"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Città</label>
                    <input
                      name="citta"
                      value={addForm.citta}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Città"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Provincia</label>
                    <input
                      name="provincia"
                      value={addForm.provincia}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Provincia"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Classe energetica</label>
                    <input
                      name="classeEnergetica"
                      value={addForm.classeEnergetica}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Classe energetica"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Tipo immobile</label>
                    <input
                      name="tipoImmobile"
                      value={addForm.tipoImmobile}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Tipo immobile"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Indirizzo</label>
                    <input
                      name="indirizzo"
                      value={addForm.indirizzo}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Indirizzo"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Superficie (m²)</label>
                    <input
                      name="superficie"
                      value={addForm.superficie}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Superficie (m²)"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Numero locali</label>
                    <input
                      name="numLocali"
                      value={addForm.numLocali}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Numero locali"
                      type="number"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Numero bagni</label>
                    <input
                      name="numBagni"
                      value={addForm.numBagni}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Numero bagni"
                      type="number"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Piano</label>
                    <input
                      name="piano"
                      value={addForm.piano}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Piano"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Prezzo richiesto (€)</label>
                    <input
                      name="prezzoRichiesto"
                      value={addForm.prezzoRichiesto}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Prezzo richiesto (€)"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Stato</label>
                    <input
                      name="stato"
                      value={addForm.stato}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Stato"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Stato di conservazione</label>
                    <input
                      name="statoConservazione"
                      value={addForm.statoConservazione}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Stato di conservazione"
                    />
                  </div>
                  <div className="input-group">
                    <label className="mb-1">Proprietario ID</label>
                    <input
                      name="proprietarioId"
                      value={addForm.proprietarioId}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Proprietario ID"
                      type="number"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="disponibileEsclusiva"
                      name="disponibileEsclusiva"
                      type="checkbox"
                      checked={addForm.disponibileEsclusiva}
                      onChange={handleAddFormChange}
                      className="backoffice-checkbox-backoffice"
                    />
                    <label htmlFor="disponibileEsclusiva">Disponibile in esclusiva</label>
                  </div>
                  <div className="input-group col-span-full">
                    <label className="mb-1">Descrizione</label>
                    <textarea
                      name="descrizione"
                      value={addForm.descrizione}
                      onChange={handleAddFormChange}
                      className="backoffice-formInput-backoffice"
                      placeholder="Descrizione"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Images upload */}
                <div className="mt-3">
                  <label className="block mb-1">
                    Upload immagini (puoi selezionare più file)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFilesChange}
                    className="backoffice-formInput-backoffice"
                  />
                  {imageFiles.length > 0 && (
                    <div className="mt-2">
                      <strong>Files selezionati:</strong>
                      <ul className="list-disc ml-5">
                        {imageFiles.map((f, idx) => (
                          <li key={idx}>
                            {f.name} ({Math.round(f.size / 1024)} KB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-row gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="backoffice-sendButton-backoffice"
                  >
                    {submitting ? "Invio in corso..." : "Invia Immobile"}
                  </button>
                  <button
                    type="button"
                    onClick={resetAddForm}
                    className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {/* Submission result (debug) */}
                {submitMessage && (
                  <div className="mt-4 p-3 border rounded">
                    {submitMessage.success ? (
                      <div>
                        <strong>Immobile creato con successo (Debug Info).</strong>
                        {/* Il Modal di successo viene mostrato sopra */}
                      </div>
                    ) : (
                      <div>
                        <strong>Errore:</strong> {submitMessage.message}
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          )}

          {/* SEZIONE: Modifica Immobili */}
          {section === "modifica" && (
            <div>
              <h2 className="backoffice-title-backoffice">Modifica immobili</h2>

              {loading ? (
                <div className="backoffice-loading-backoffice">Loading...</div>
              ) : (
                <div className="space-y-4">
                  {immobili.map((immobile) => {
                    const isOpen = openItem === immobile.id;

                    return (
                      <div key={immobile.id} className="backoffice-item-backoffice">
                        {/* HEADER */}
                        <div
                          className="backoffice-itemHeader-backoffice"
                          onClick={() => toggleItem(immobile.id)}
                        >
                          <span>ID: {immobile.id}</span>
                          <span>{immobile.tipoImmobile}</span>

                          {/* PULSANTE ELIMINA (Modificato per usare Modal Custom) */}
                          <button
                            className="backoffice-deleteButton-backoffice"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteImmobileModal(immobile.id);
                            }}
                          >
                            Elimina
                          </button>
                        </div>

                        {/* BODY */}
                        {isOpen && (
                          <div className="backoffice-itemBody-backoffice">
                            <form
                              onSubmit={(e) => updateImmobile(e, immobile.id)}
                              className="grid grid-cols-1 gap-3"
                            >
                              <div className="grid grid-cols-1 gap-3">
                                <div className="input-group">
                                  <label className="mb-1">Anno costruzione</label>
                                  <input
                                    name="annoCostruzione"
                                    defaultValue={immobile.annoCostruzione ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="YYYY"
                                    type="number"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">CAP</label>
                                  <input
                                    name="cap"
                                    defaultValue={immobile.cap ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="CAP"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Città</label>
                                  <input
                                    name="citta"
                                    defaultValue={immobile.citta ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Città"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Provincia</label>
                                  <input
                                    name="provincia"
                                    defaultValue={immobile.provincia ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Provincia"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Classe energetica</label>
                                  <input
                                    name="classeEnergetica"
                                    defaultValue={immobile.classeEnergetica ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Classe energetica"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Tipo immobile</label>
                                  <input
                                    name="tipoImmobile"
                                    defaultValue={immobile.tipoImmobile ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Tipo immobile"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Indirizzo</label>
                                  <input
                                    name="indirizzo"
                                    defaultValue={immobile.indirizzo ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Indirizzo"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Superficie (m²)</label>
                                  <input
                                    name="superficie"
                                    defaultValue={immobile.superficie ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Superficie"
                                    type="number"
                                    step="0.01"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Numero locali</label>
                                  <input
                                    name="numLocali"
                                    defaultValue={immobile.numLocali ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Locali"
                                    type="number"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Numero bagni</label>
                                  <input
                                    name="numBagni"
                                    defaultValue={immobile.numBagni ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Bagni"
                                    type="number"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Piano</label>
                                  <input
                                    name="piano"
                                    defaultValue={immobile.piano ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Piano"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Prezzo richiesto (€)</label>
                                  <input
                                    name="prezzoRichiesto"
                                    defaultValue={immobile.prezzoRichiesto ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Prezzo"
                                    type="number"
                                    step="0.01"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Stato</label>
                                  <input
                                    name="stato"
                                    defaultValue={immobile.stato ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Stato"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Stato di conservazione</label>
                                  <input
                                    name="statoConservazione"
                                    defaultValue={immobile.statoConservazione ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Stato conservazione"
                                  />
                                </div>
                                <div className="input-group">
                                  <label className="mb-1">Proprietario ID</label>
                                  <input
                                    name="proprietarioId"
                                    defaultValue={immobile.proprietarioId ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="ID proprietario"
                                    type="number"
                                  />
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <input
                                    id="disponibileEsclusiva"
                                    name="disponibileEsclusiva"
                                    type="checkbox"
                                    defaultChecked={!!immobile.disponibileEsclusiva}
                                    className="backoffice-checkbox-backoffice"
                                  />
                                  <label htmlFor="disponibileEsclusiva">Disponibile in esclusiva</label>
                                </div>
                                <div className="input-group col-span-full">
                                  <label className="mb-1">Descrizione</label>
                                  <textarea
                                    name="descrizione"
                                    defaultValue={immobile.descrizione ?? ""}
                                    className="backoffice-formInput-backoffice"
                                    placeholder="Descrizione"
                                    rows={4}
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="backoffice-formSubmit-backoffice col-span-full"
                              >
                                Aggiorna
                              </button>
                            </form>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Backoffice;