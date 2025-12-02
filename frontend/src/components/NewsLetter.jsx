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
      alert("Errore di rete. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 flex justify-center bg-[#527597]">
      <div 
        className="configurator bg-[#3a6ea5] w-full max-w-4xl flex flex-col items-center justify-center text-center"
        style={{ minHeight: "auto", padding: "3rem" }} 
      >
        <div className="w-full max-w-xl flex flex-col items-center">
          <h2 className="section-title mb-4">Resta aggiornato</h2>
          <p className="text-white mb-8 max-w-md">
            Iscriviti alla nostra newsletter per ricevere in anteprima le nuove proprietà immobiliari 
            e le migliori offerte di mercato direttamente nella tua casella di posta.
          </p>

          {/* Container del form: Flex Column per mettere input sopra e bottone sotto */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            
            {/* Input Email */}
            <div className="input-group w-full">
              <input
                type="email"
                placeholder="Inserisci la tua email"
                className="input-step2 bg-white w-full" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Bottone */}
            <button 
              className="next-btn w-full !ml-0 flex items-center justify-center text-base py-3"
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Invio..." : "Iscriviti"}
            </button>
          </div>

          <p className="text-xs text-white mt-6">
            Non inviamo spam. Puoi disiscriverti in qualsiasi momento.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;