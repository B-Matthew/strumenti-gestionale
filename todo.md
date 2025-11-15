# 📋 TODO – Gestionale strumenti a noleggio

## 🔧 Fase 1 – Setup progetto

- [x] Creazione repository GitHub
- [x] Inizializzazione progetto Vue 3 con Vite
- [x] Collegamento repository locale a GitHub
- [x] Installazione e configurazione Firebase (`firebase.js`)
- [x] Verifica connessione Firestore e Auth

---

## 🔐 Fase 2 – Autenticazione

- [x] Creazione pagina login
- [x] Implementazione Firebase Auth (email/password)
- [x] Gestione sessione utente (login/logout)
- [x] Protezione delle rotte (solo utente autenticato può accedere)

---

## 🛠️ Fase 3 – Gestione strumenti

- [x] Definizione struttura collezione `strumenti` su Firestore
- [x] Pagina lista strumenti (con data scadenza, codice, stato)
- [x] Funzionalità: Aggiungi / Modifica / Elimina strumento
- [x] Evidenzia strumenti in scadenza o scaduti
- [x] Allineare reports strumenti
- [x] Revisione stati in base ai collegamenti con i operatori

---

## 👷‍♂️ Fase 4 – Gestione operatori

- [x] Definizione struttura collezione `operatori`
- [x] CRUD operatori (nome, ruolo, email...)
- [x] Funzionalità: Aggiungi / Modifica / Elimina operatore
- [x] Pagina lista operatori

---

## 🔗 Fase 5 – Assegnazione strumenti

- [x] Collegamento strumento ⇄ operatore
- [x] Visualizzazione strumenti assegnati a ogni operatore
- [x] Visualizzazione operatore associato a ogni strumento

---

## 📊 Fase 6 – Dashboard e filtri

- [x] Filtro strumenti per: assegnato / libero / scaduto
- [x] Pannello riepilogativo: n° strumenti attivi, assegnati, scaduti
- [x] Ricerca per nome, codice, operatore

---

## ☁️ Fase 7 – Deploy e ottimizzazione

- [x] Configurazione Firebase Hosting
- [x] Deploy progetto
- [x] Testing finale su desktop e mobile
- [x] Scrittura documentazione progetto

---

## 🧪 Extra (Opzionali)

- [ ] Sistema ruoli - eventuale aggiunta utenti dall'admin
- [ ] Storico assegnazioni strumenti
- [ ] Import/Export dati CSV
