import { useState } from "react";
import ComponentStep1 from "../components/ComponentStep1";
import ComponentStep2 from "../components/ComponentStep2";
import ComponentStep3 from "../components/ComponentStep3";
import ComponentStep4 from "../components/ComponentStep4";
import ComponentStep5 from "../components/ComponentStep5";
import ComponentStep6 from "../components/ComponentStep6";
import ComponentSummary from "../components/ComponentSummary";

function Configurator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoImmobile: "",
    indirizzo: "",
    superficie: "",
    stanze: "",
    bagni: "",
    piano: "",
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
    switch (step) {
      case 1:
        return (
          <ComponentStep1
            data={formData}
            updateField={updateField}
            next={handleNext}
          />
        );
      case 2:
        return (
          <ComponentStep2
            data={formData}
            updateField={updateField}
            next={handleNext}
            back={handleBack}
          />
        );
      case 3:
        return (
          <ComponentStep3
            data={formData}
            updateField={updateField}
            next={handleNext}
            back={handleBack}
          />
        );
      case 4:
        return (
          <ComponentStep4
            data={formData}
            updateField={updateField}
            next={handleNext}
            back={handleBack}
          />
        );
      case 5:
        return (
          <ComponentStep5
            data={formData}
            updateField={updateField}
            next={handleNext}
            back={handleBack}
          />
        );
      case 6:
        return (
          <ComponentStep6
            data={formData}
            updateField={updateField}
            next={handleNext}
            back={handleBack}
          />
        );
      case 7:
        return (
          <ComponentSummary
            data={formData}
            back={handleBack}
            submit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #004E98 0%, #3A6EA5 50%, #5B8DB8 100%)'
      }}
    >
      {/* Pattern decorativo di sfondo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl" 
          style={{ backgroundColor: '#FF6700' }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl" 
          style={{ backgroundColor: '#EBEBEB' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full blur-3xl" 
          style={{ backgroundColor: '#FF6700' }}
        ></div>
      </div>
      
      {/* Modale configuratore */}
      <div 
        className="relative w-full max-w-3xl rounded-2xl shadow-2xl p-8 md:p-10 z-10 flex flex-col"
        style={{ 
          backgroundColor: '#F8F9FA',
          minHeight: '550px',
          maxHeight: '85vh'
        }}
      >
        {renderStep()}
      </div>

      {/* Toast di successo */}
      {showSuccess && (
        <div 
          className="fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-slide-in"
          style={{ backgroundColor: '#004E98', color: 'white' }}
        >
          <p className="font-semibold">✓ Richiesta inviata con successo!</p>
        </div>
      )}
    </div>
  );
}

export default Configurator;