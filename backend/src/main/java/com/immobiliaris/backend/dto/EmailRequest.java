package com.immobiliaris.backend.dto;

/**
 * DTO per le richieste di invio email al backend.
 *
 * Questo record rappresenta il payload che il controller si aspetta
 * su `POST /api/email/send`.
 *
 * Modalità di utilizzo:
 * - Invio semplice (testo): valorizzare `to`, `subject` e `text`.
 * - Invio via template Brevo: valorizzare `templateId` e `params`.
 *
 * Nota: il campo `params` è un oggetto generico che conterrà le variabili
 * da passare al template (mappa chiave->valore). Il backend non accetta
 * HTML direttamente dal frontend per motivi di sicurezza.
 */
public record EmailRequest(
	/** Indirizzo email del destinatario (es. "utente@example.com") */
	String to,
	/** Nome del destinatario (opzionale, usato nel payload a Brevo) */
	String name,
	/** Oggetto della mail (usato quando si invia testo plain) */
	String subject,
	/** Contenuto testuale della mail (usato quando non si invia un template) */
	String text,
	/** ID numerico del template configurato su Brevo (opzionale) */
	Integer templateId,
	/** Parametri per il template (map di variabili); può essere null */
	Object params,
	/** Lista di ID Brevo a cui iscrivere il contatto (opzionale) */
	java.util.List<Integer> listIds
)
{
}
