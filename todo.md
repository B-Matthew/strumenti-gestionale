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
- [ ] Pagina lista strumenti (con data scadenza, codice, stato)
- [x] Funzionalità: Aggiungi / Modifica / Elimina strumento
- [x] Evidenzia strumenti in scadenza o scaduti
- [x] Allineare reports strumenti

---

## 👷‍♂️ Fase 4 – Gestione dipendenti

- [ ] Definizione struttura collezione `dipendenti`
- [ ] CRUD dipendenti (nome, ruolo, email...)
- [ ] Funzionalità: Aggiungi / Modifica / Elimina dipendente
- [ ] Pagina lista dipendenti

---

## 🔗 Fase 5 – Assegnazione strumenti

- [ ] Collegamento strumento ⇄ dipendente
- [ ] Visualizzazione strumenti assegnati a ogni dipendente
- [ ] Visualizzazione dipendente associato a ogni strumento

---

## 📊 Fase 6 – Dashboard e filtri

- [ ] Filtro strumenti per: assegnato / libero / scaduto
- [ ] Pannello riepilogativo: n° strumenti attivi, assegnati, scaduti
- [ ] Ricerca per nome, codice, dipendente

---

## ☁️ Fase 7 – Deploy e ottimizzazione

- [ ] Configurazione Firebase Hosting
- [ ] Deploy progetto
- [ ] Testing finale su desktop e mobile
- [ ] Scrittura documentazione progetto

---

## 🧪 Extra (Opzionali)

- [ ] Sistema ruoli - eventuale aggiunta utenti dall'admin
- [ ] Storico assegnazioni strumenti
- [ ] Import/Export dati CSV
