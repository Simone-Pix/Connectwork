import { useEffect, useState } from "react";

function Backoffice() {
  const [section, setSection] = useState("valutazioni");
  const [richieste, setRichieste] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openItem, setOpenItem] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [valuationInput, setValuationInput] = useState("");

  // ----- state per "Add immobile" -----
  const [form, setForm] = useState({
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
    stato: "", // es: "in_vendita", "bozza"
    statoConservazione: "",
    superficie: "",
    tipoImmobile: "",
    proprietarioId: ""
    // dataInserimento la creo all'invio
  });

  const [imageFiles, setImageFiles] = useState([]); // File[] immagini
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

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

  // Generic form change handler
  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleFilesChange(e) {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
  }

  // Convert numeric-like fields before sending
  function preparePayload(dataNotControlled) {
    return {
      titolo: dataNotControlled.titolo || "",
      annoCostruzione: dataNotControlled.annoCostruzione ? parseInt(dataNotControlled.annoCostruzione, 10) : null,
      cap: dataNotControlled.cap || "",
      citta: dataNotControlled.citta || "",
      classeEnergetica: dataNotControlled.classeEnergetica || "",
      dataInserimento: new Date().toISOString(), // server may override
      descrizione: dataNotControlled.descrizione || "",
      disponibileEsclusiva: !!dataNotControlled.disponibileEsclusiva,
      indirizzo: dataNotControlled.indirizzo || "",
      numBagni: dataNotControlled.numBagni ? parseInt(dataNotControlled.numBagni, 10) : null,
      numLocali: dataNotControlled.numLocali ? parseInt(dataNotControlled.numLocali, 10) : null,
      piano: dataNotControlled.piano || "",
      prezzoRichiesto: dataNotControlled.prezzoRichiesto ? parseFloat(dataNotControlled.prezzoRichiesto) : null,
      provincia: dataNotControlled.provincia || "",
      stato: dataNotControlled.stato || "",
      statoConservazione: dataNotControlled.statoConservazione || "",
      superficie: dataNotControlled.superficie ? parseFloat(dataNotControlled.superficie) : null,
      tipoImmobile: dataNotControlled.tipoImmobile || "",
      proprietarioId: dataNotControlled.proprietarioId ? parseInt(dataNotControlled.proprietarioId, 10) : null
    };
  }

  // Submit form: create immobile, then upload images
  async function handleSubmit() {
    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const payload = preparePayload(form);

      // 1) Create immobile
      const res = await fetch("/api/immobili", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to create immobile: ${res.status} ${text}`);
      }

      const created = await res.json();
      // Expect created to contain the new immobile and its id
      const immobileId = created && (created.id || created.immoId || created.immobileId || created.ID) ? (
        created.id || created.immoId || created.immobileId || created.ID
      ) : null;

      // If backend returns the entity without id in those fields, try common fallbacks:
      const idFallback = created && created.id ? created.id : immobileId;

      if (!immobileId && !idFallback) {
        // Try to read created.id anyway
        if (created && created.id) {
          // nothing
        } else {
          console.warn("Created immobile response did not include an id. Response:", created);
        }
      }

      const finalId = immobileId || idFallback || (created && created.id);

      // 2) Upload images (if any)
      if (imageFiles.length > 0 && finalId) {
        const uploadResults = [];
        for (const file of imageFiles) {
          const formData = new FormData();
          formData.append("file", file);
          // endpoint: POST /api/immagini/upload/{immobileId}
          const upRes = await fetch(`/api/immagini/upload/${finalId}`, {
            method: "POST",
            body: formData
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
        setSubmitMessage({
          success: true,
          immobile: created,
          uploads: uploadResults
        });
      } else {
        setSubmitMessage({ success: true, immobile: created, uploads: [] });
      }

      // Reset form (if desired)
      setForm({
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
        proprietarioId: ""
      });
      setImageFiles([]);
    } catch (err) {
      console.error(err);
      setSubmitMessage({ success: false, message: err.message || "Unknown error" });
    } finally {
      setSubmitting(false);
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

                <form
                  className="backoffice-addForm-backoffice"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >

                <input
                  name="titolo"
                  value={form.titolo}
                  onChange={handleChange}
                  className="backoffice-formInput-backoffice"
                  placeholder="Titolo immobile"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <input
                    name="annoCostruzione"
                    value={form.annoCostruzione}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Anno costruzione (YYYY)"
                    type="number"
                  />

                  <input
                    name="cap"
                    value={form.cap}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="CAP"
                  />

                  <input
                    name="citta"
                    value={form.citta}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Città"
                  />

                  <input
                    name="provincia"
                    value={form.provincia}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Provincia"
                  />

                  <input
                    name="classeEnergetica"
                    value={form.classeEnergetica}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Classe energetica"
                  />

                  <input
                    name="tipoImmobile"
                    value={form.tipoImmobile}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Tipo immobile (es. appartamento, casa)"
                  />

                  <input
                    name="indirizzo"
                    value={form.indirizzo}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Indirizzo"
                  />

                  <input
                    name="superficie"
                    value={form.superficie}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Superficie (m²)"
                    type="number"
                    step="0.01"
                  />

                  <input
                    name="numLocali"
                    value={form.numLocali}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Numero locali"
                    type="number"
                  />

                  <input
                    name="numBagni"
                    value={form.numBagni}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Numero bagni"
                    type="number"
                  />

                  <input
                    name="piano"
                    value={form.piano}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Piano"
                  />

                  <input
                    name="prezzoRichiesto"
                    value={form.prezzoRichiesto}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Prezzo richiesto (€)"
                    type="number"
                    step="0.01"
                  />

                  <input
                    name="stato"
                    value={form.stato}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Stato (es. bozza, pubblicato)"
                  />

                  <input
                    name="statoConservazione"
                    value={form.statoConservazione}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Stato di conservazione"
                  />

                  <input
                    name="proprietarioId"
                    value={form.proprietarioId}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice"
                    placeholder="Proprietario ID"
                    type="number"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      id="disponibileEsclusiva"
                      name="disponibileEsclusiva"
                      type="checkbox"
                      checked={form.disponibileEsclusiva}
                      onChange={handleChange}
                      className="backoffice-checkbox-backoffice"
                    />
                    <label htmlFor="disponibileEsclusiva">Disponibile in esclusiva</label>
                  </div>

                  <textarea
                    name="descrizione"
                    value={form.descrizione}
                    onChange={handleChange}
                    className="backoffice-formInput-backoffice col-span-full"
                    placeholder="Descrizione"
                    rows={4}
                  />
                </div>

                {/* Images upload */}
                <div className="mt-3">
                  <label className="block mb-1">Upload immagini (puoi selezionare più file)</label>
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
                          <li key={idx}>{f.name} ({Math.round(f.size / 1024)} KB)</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="submit"
                    className="backoffice-formSubmit-backoffice"
                    disabled={submitting}
                  >
                    {submitting ? "Invio..." : "Invia immobile"}
                  </button>

                  <button
                    type="button"
                    className="backoffice-formSubmit-backoffice bg-gray-200"
                    onClick={() =>
                      setForm({
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
                        proprietarioId: ""
                      })
                    }
                  >
                    Reset
                  </button>
                </div>

                {/* Submission result */}
                {submitMessage && (
                  <div className="mt-4 p-3 border rounded">
                    {submitMessage.success ? (
                      <div>
                        <strong>Immobile creato con successo.</strong>
                        <pre className="mt-2 text-sm overflow-auto">
                          {JSON.stringify(submitMessage.immobile, null, 2)}
                        </pre>
                        {submitMessage.uploads && submitMessage.uploads.length > 0 && (
                          <div className="mt-2">
                            <strong>Upload results:</strong>
                            <ul className="list-disc ml-5">
                              {submitMessage.uploads.map((u, i) => (
                                <li key={i}>
                                  {u.file} - {u.ok ? "OK" : `FAILED (${u.status})`}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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
