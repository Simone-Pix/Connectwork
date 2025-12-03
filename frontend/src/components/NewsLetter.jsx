import { useState } from "react";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      alert("Inserisci un'email valida.");
      return;
    }

    setLoading(true);

    try {
      // Simulazione fetch (sostituisci con la tua logica reale)
      const res = await fetch("/api/brevo/newsletter", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message || "Grazie per esserti iscritto!");
        setEmail(""); 
      } else {
        alert(data.message || "Si è verificato un errore durante l'iscrizione.");
      }

    } catch (error) {
      console.error("Errore newsletter:", error);
      // alert("Errore di rete. Riprova più tardi."); 
      // (Opzionale: scommenta se vuoi l'alert anche in catch)
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 flex justify-center bg-[#527597]">
      {/* Uso la classe .configurator per lo stile (bianco, ombra, rounded), 
         ma sovrascrivo altezza e padding perché questo non è un wizard a step 
      */}
      <div className="configurator  bg-[#3a6ea5] h-auto min-h-0 p-8 flex flex-col items-center justify-center text-center">
        
        <div className="w-full max-w-md flex flex-col items-center">
          
          {/* Titoli aggiornati con le nuove classi */}
          <h2 className="section-title">Resta aggiornato</h2>
          <p className="section-subtitle text-white !mb-6">
            Iscriviti alla newsletter per ricevere in anteprima le nuove proprietà 
            e le migliori offerte direttamente nella tua casella di posta.
          </p>

          <div className="flex flex-col w-full gap-4">
            
            {/* Input aggiornato con .input-standard */}
            <div className="input-group">
              <input
                type="email"
                placeholder="nome@esempio.com"
                className="input-standard text-white" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Bottone aggiornato con .next-btn */}
            <button 
              className="next-btn w-full justify-center text-sm py-3 mt-1"
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Invio in corso..." : "Iscriviti Ora"}
            </button>

          </div>

          <p className="text-xs text-white mt-4">
            Non inviamo spam. Puoi disiscriverti in qualsiasi momento.
          </p>
        </div>

      </div>
    </section>
  );
}

export default NewsletterSection;