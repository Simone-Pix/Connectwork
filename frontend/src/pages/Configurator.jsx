import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponentStep1 from "../components/ComponentStep1";
import ComponentStep2 from "../components/ComponentStep2";
import ComponentStep3 from "../components/ComponentStep3";
import ComponentStep4 from "../components/ComponentStep4";
import ComponentStep5 from "../components/ComponentStep5";
import ComponentStep6 from "../components/ComponentStep6";
import ComponentSummary from "../components/ComponentSummary";

function Configurator() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoImmobile: "",
    indirizzo: "",
    citta: "",
    provincia: "",
    cap: "",
    superficie: "",
    stanze: "",
    bagni: "",
    piano: "",
    annoCostruzione: "",
    statoConservazione: "",
    classeEnergetica: "",
    optional: [],
    tempistica: "",
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    tipoOperazione: "vendita"
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
    else if (step === 6) setStep(7);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...formData,
        optionalInfo: formData.optional.join(", "),
        optional: undefined
      };

      const res = await fetch("/api/richieste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      console.log("Dati inviati:", dataToSend);

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = "/";
      }, 3000);

    } catch (error) {
      console.error("Errore durante l'invio:", error);
    }
  };

  const renderStep = () => {
    const props = { data: formData, updateField, next: handleNext, back: handleBack };
    
    switch (step) {
      case 1: return <ComponentStep1 {...props} />;
      case 2: return <ComponentStep2 {...props} />;
      case 3: return <ComponentStep3 {...props} />;
      case 4: return <ComponentStep4 {...props} />;
      case 5: return <ComponentStep5 {...props} />;
      case 6: return <ComponentStep6 {...props} />;
      case 7: return <ComponentSummary data={formData} back={handleBack} submit={handleSubmit} />;
      default: return null;
    }
  };

  return (
    <div 
      className="hero relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #004E98 0%, #3A6EA5 50%, #5B8DB8 100%)' }}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl bg-[#FF6700]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-[#EBEBEB]"></div>
      </div>
      
      {/* Container Modale */}
      <div className="configurator">
          
        {/* Pulsante Chiudi */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 z-50 text-gray-600 transition-colors"
          title="Chiudi"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Step Corrente */}
        {renderStep()}
        
      </div>

      {/* Toast Successo */}
      {showSuccess && (
        <div className="fixed top-6 right-6 p-4 rounded-lg shadow-xl z-50 bg-[#004E98] text-white animate-bounce">
          <p className="font-semibold text-sm">✓ Richiesta inviata!</p>
        </div>
      )}
    </div>
  );
}

export default Configurator;