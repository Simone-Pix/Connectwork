import { useState } from "react";

import ComponentStep1 from "../components/ComponentStep1";
import ComponentStep2 from "../components/ComponentStep2";
import ComponentStep3 from "../components/ComponentStep3";
import ComponentStep4 from "../components/ComponentStep4";
import ComponentStep5 from "../components/ComponentStep5";
import ComponentStep6 from "../components/ComponentStep6";

function Configurator() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    tipoOperazione: "",
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
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/immobili", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Dati inviati:", formData);

      alert("Richiesta inviata con successo!");
    } catch (error) {
      alert("Errore durante l'invio.");
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
            back={handleBack}
            submit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
  <section className="min-h-screen flex items-center justify-center bg-gray-100 pt-16 pb-16 px-4">
    <div className="w-full max-w-3xl">
      <div className="relative bg-gradient-to-br from-orange-400/30 via-orange-500/20 to-orange-600/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 shadow-xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/10 to-transparent pointer-events-none -z-10 blur-xl opacity-70"></div>
        <div className="relative z-10">
          {renderStep()}
        </div>
      </div>
    </div>
  </section>
);
}

export default Configurator;
