# Folder date

Aici se salvează datele aplicației Hospital Management.

Fișiere principale:
- `pacienti.json` – lista pacienților; conține deja 10 pacienți inițiali.
- `medici.json` – lista medicilor.
- `programari.json` – programările.
- `internari.json` – internările.
- `facturi.json` – facturile.
- `istoric_medical.json` – istoricul medical.
- `retete.json` – rețetele.
- `statistici.json` și `raport_spital.json` – valori calculate pentru dashboard/raport.

Dashboard-ul web citește datele din acest folder. În browser, modificările temporare se păstrează și în `localStorage` până la resetarea datelor.
