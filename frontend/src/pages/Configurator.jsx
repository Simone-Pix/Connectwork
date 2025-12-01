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
    // Trasforma l'array optional in stringa per il backend
    const dataToSend = {
      ...formData,
      optionalInfo: formData.optional.join(", "),
      optional: undefined // Rimuovi il campo array
    };

    const res = await fetch("/api/richieste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    console.log("Dati inviati:", dataToSend);

    //toast di successo
    setShowSuccess(true);

    //dopo 3 secondi, nascondi toast e torna alla homepage
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
        return <ComponentStep1 data={formData} updateField={updateField} next={handleNext} />;
      case 2:
        return <ComponentStep2 data={formData} updateField={updateField} next={handleNext} back={handleBack} />;
      case 3:
        return <ComponentStep3 data={formData} updateField={updateField} next={handleNext} back={handleBack} />;
      case 4:
        return <ComponentStep4 data={formData} updateField={updateField} next={handleNext} back={handleBack} />;
      case 5:
        return <ComponentStep5 data={formData} updateField={updateField} next={handleNext} back={handleBack} />;
      case 6:
        return <ComponentStep6 data={formData} updateField={updateField} back={handleBack} next={handleNext} />;
      case 7:
  return (
    <ComponentSummary
      data={formData}
      back={handleBack}
      submit={handleSubmit}
      showSuccess={showSuccess}
    />
  );
      default:
        return null;
    }
  };

  return (
    <section className="hero">
      <div className="heroContent">
        <div className="configurator">
          <div className="step-wrapper">{renderStep()}</div>
        </div>
      </div>
    </section>
  );
}

export default Configurator;


