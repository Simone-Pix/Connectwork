import { useState } from "react";

function ComponentStep6({ data, updateField, back, next }) {

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  const phoneRegex = /^[0-9]{7,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isNameValid = nameRegex.test(data.nome);
  const isSurnameValid = nameRegex.test(data.cognome);
  const isEmailValid = emailRegex.test(data.email);
  const isPhoneValid = phoneRegex.test(data.telefono);

  const allFilled =
    data.nome && data.cognome && data.email && data.telefono;

  const formValid =
    allFilled && isNameValid && isSurnameValid && isEmailValid && isPhoneValid;

  return (
    <div className="relative">
      <div className="progress-container mb-6">
        <span>Passo 6 di 6</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: "100%" }}></div>
        </div>
      </div>

      <h3 className="section-title mb-4">I tuoi dati</h3>

      <div className="form-grid-step6 grid gap-4">
        <input
          type="text"
          placeholder="Nome"
          value={data.nome}
          onChange={(e) => updateField("nome", e.target.value)}
          className={`p-3 border rounded-lg ${
            data.nome && !isNameValid ? "border-red-500" : "border-gray-300"
          }`}
        />

        <input
          type="text"
          placeholder="Cognome"
          value={data.cognome}
          onChange={(e) => updateField("cognome", e.target.value)}
          className={`p-3 border rounded-lg ${
            data.cognome && !isSurnameValid ? "border-red-500" : "border-gray-300"
          }`}
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={`p-3 border rounded-lg ${
            data.email && !isEmailValid ? "border-red-500" : "border-gray-300"
          }`}
        />

        <input
          type="tel"
          placeholder="Telefono"
          value={data.telefono}
          onChange={(e) => updateField("telefono", e.target.value)}
          className={`p-3 border rounded-lg ${
            data.telefono && !isPhoneValid ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>

      <div className="button-group flex mt-6 gap-4">
        <button className="back-btn" onClick={back}>Indietro</button>

        <button
          className={`next-btn bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition 
            ${!formValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={formValid ? next : undefined}
          disabled={!formValid}
        >
          Avanti
        </button>
      </div>
    </div>
  );
}

export default ComponentStep6;
