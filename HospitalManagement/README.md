# Sistem de Gestiune Spital

Proiect universitar realizat în **C++**, cu interfață web în **HTML, CSS și JavaScript**, destinat gestionării activităților principale dintr-un spital: pacienți, medici, programări, internări, rețete, facturi și farmacie.

Aplicația are o parte de logică în C++, unde sunt definite clasele principale și principiile de programare orientată pe obiecte, iar partea web este folosită pentru prezentarea vizuală și administrarea datelor printr-o interfață mai intuitivă.

---

## 1. Scopul proiectului

Scopul proiectului este de a crea un sistem informatic simplu pentru evidența activităților medicale dintr-un spital. Sistemul permite administrarea pacienților, medicilor, programărilor, internărilor, rețetelor, facturilor și medicamentelor din farmacie.

Proiectul evidențiază folosirea conceptelor POO, precum:

- clase și obiecte;
- moștenire;
- încapsulare;
- asocierea dintre clase;
- separarea logicii aplicației pe module;
- salvarea și citirea datelor din fișiere JSON.

---

## 2. Tehnologii utilizate

- **C++** – logica principală a aplicației;
- **HTML** – structura paginilor web;
- **CSS** – designul interfeței;
- **JavaScript** – funcționalitățile din browser;
- **JSON** – stocarea datelor;
- **CSV** – export simplu pentru unele date;
- **Makefile** – compilarea proiectului C++.

---

## 3. Roluri și conturi de logare

Aplicația are mai multe roluri, fiecare cu drepturi diferite.

| Rol | Username | Parolă | Acces |
|---|---|---|---|
| Administrator | `admin` | `admin123` | Acces complet la toate modulele |
| Recepție | `receptie` | `receptie123` | Pacienți, programări, internări, facturi |
| Farmacie | `farmacie` | `farmacie123` | Doar modulul Farmacie |
| Medic 1 | `medic1` | `medic123` | Pacienții și datele asociate medicului |
| Medic 2 | `medic2` | `medic123` | Pacienții și datele asociate medicului |
| Medic 3 | `medic3` | `medic123` | Pacienții și datele asociate medicului |
| Medic 4 | `medic4` | `medic123` | Pacienții și datele asociate medicului |
| Medic 5 | `medic5` | `medic123` | Pacienții și datele asociate medicului |

---

## 4. Funcționalități principale

### 4.1. Administrator

Administratorul are acces complet la sistem. Acesta poate:

- vizualiza dashboard-ul general;
- adăuga, edita și șterge medici;
- vizualiza pacienții;
- administra programări;
- gestiona internări;
- vizualiza rețete și facturi;
- accesa pagina „Despre”;
- controla datele generale ale aplicației.

### 4.2. Recepție

Rolul de recepție este destinat operatorului care se ocupă de pacienți la intrarea în spital. Acesta poate:

- adăuga pacienți noi;
- crea programări;
- înregistra internări;
- completa date despre modul în care pacientul a ajuns în spital;
- crea sau consulta facturi.

### 4.3. Medic

Fiecare medic are cont separat. După logare, medicul vede doar informațiile care țin de activitatea sa. Medicul poate:

- vedea pacienții asociați;
- consulta programările sale;
- crea rețete;
- prescrie medicamente;
- introduce observații medicale.

### 4.4. Farmacie

Rolul de farmacie are acces doar la modulul Farmacie. Operatorul de farmacie poate:

- adăuga medicamente;
- edita medicamente existente;
- șterge medicamente;
- vedea stocul disponibil;
- gestiona prețul medicamentelor.

În acest rol nu apare modulul Rețete, deoarece farmacia trebuie să lucreze doar cu lista de medicamente.

---

## 5. Modulele aplicației web

### Dashboard

Pagina principală după logare. Afișează informații generale despre sistem și scurtături rapide către modulele importante.

### Pacienți

Modul pentru evidența pacienților. Se pot vizualiza date precum nume, prenume, vârstă, telefon, diagnostic, grupa sangvină, adresă, alergii și prioritate.

### Medici

Modul pentru administrarea medicilor. Administratorul poate adăuga medici noi și poate crea conturi de logare pentru aceștia.

### Programări

Modul pentru gestionarea consultațiilor. Fiecare programare este asociată unui pacient și unui medic.

### Internări

Modul pentru pacienții internați. Sistemul poate calcula automat costul internării în funcție de durata internării și costul pe zi.

### Rețete

Modul în care medicul poate prescrie medicamente. Medicamentele sunt selectate din lista disponibilă în Farmacie, iar prețul lor se calculează automat.

### Facturi

Modul pentru emiterea facturilor. Totalul facturii se calculează automat pe baza următoarelor componente:

```text
cost consultație + cost internare + cost tratament + cost medicamente - reducere = total final
```

Prețul medicamentelor se preia automat din rețetă, iar costul internării se completează automat pe baza internării pacientului.

### Farmacie

Modul pentru gestiunea medicamentelor. Acesta conține denumirea medicamentului, categoria, stocul, prețul și alte informații necesare.

### Raport

Pagina pentru afișarea unor statistici și rapoarte generale despre activitatea spitalului.

### Despre

Pagina cu descrierea proiectului. Aceasta este vizibilă doar pentru administrator.

---

## 6. Date de test incluse

Proiectul include date inițiale pentru testare:

- 5 medici diferiți;
- 10 pacienți diferiți;
- medicamente în farmacie;
- programări;
- internări;
- rețete;
- facturi;
- utilizatori pentru logare.

Aceste date se află în folderul `data/`.

---

## 7. Structura proiectului

```text
HospitalManagement/
│
├── data/
│   ├── medici.json
│   ├── pacienti.json
│   ├── programari.json
│   ├── internari.json
│   ├── retete.json
│   ├── facturi.json
│   ├── medicamente.json
│   ├── users.json
│   └── export/
│
├── docs/
│   └── documentatie.md
│
├── src/
│   ├── Pacient.cpp / Pacient.h
│   ├── Medic.cpp / Medic.h
│   ├── Internare.cpp / Internare.h
│   ├── Reteta.cpp / Reteta.h
│   ├── Factura.cpp / Factura.h
│   ├── Farmacie.cpp / Farmacie.h
│   ├── Medicament.cpp / Medicament.h
│   ├── AuthService.cpp / AuthService.h
│   ├── DataManager.cpp / DataManager.h
│   └── main.cpp
│
├── web/
│   ├── login.html
│   ├── dashboard.html
│   ├── pacienti.html
│   ├── medici.html
│   ├── programari.html
│   ├── internari.html
│   ├── retete.html
│   ├── facturi.html
│   ├── farmacie.html
│   ├── raport.html
│   ├── about.html
│   ├── style.css
│   └── script.js
│
├── Makefile
└── README.md
```

---

## 8. Rularea interfeței web

Pentru rularea simplă a interfeței web:

1. Descarcă și dezarhivează proiectul.
2. Intră în folderul:

```text
HospitalManagement/web
```

3. Deschide fișierul:

```text
login.html
```

4. Loghează-te cu unul dintre conturile disponibile.

Dacă datele nu apar corect în browser, se poate curăța memoria locală:

```javascript
localStorage.clear()
```

După aceea, pagina trebuie reîncărcată cu:

```text
Ctrl + F5
```

---

## 9. Rularea proiectului C++

Pe Linux sau WSL:

```bash
make clean
make
make run
```

Pe Windows, proiectul poate fi rulat și prin fișierul executabil, dacă acesta există în folder:

```text
hospital_app.exe
```

---

## 10. Salvarea datelor

În varianta actuală, aplicația web salvează modificările în browser, folosind `localStorage`.

Fișierele JSON din folderul `data/` sunt folosite pentru datele inițiale. Dacă se adaugă un medic sau un pacient direct din interfața web, modificarea apare în aplicație, dar nu se scrie automat în fișierul JSON.

Pentru salvarea permanentă direct în JSON este necesar un backend, de exemplu:

```text
Node.js + Express
```

---

## 11. Clase importante C++

Proiectul conține mai multe clase, printre care:

- `Persoana` – clasă de bază pentru persoane;
- `Pacient` – gestionează informațiile pacientului;
- `Angajat` – clasă de bază pentru angajați;
- `Medic` – gestionează informațiile medicului;
- `Asistent` – reprezintă personalul auxiliar;
- `Programare` – gestionează consultațiile;
- `Internare` – gestionează internările pacienților;
- `Reteta` – gestionează medicamentele prescrise;
- `Factura` – calculează costurile pacientului;
- `Medicament` – descrie un medicament din farmacie;
- `Farmacie` – gestionează stocul de medicamente;
- `AuthService` – gestionează autentificarea;
- `DataManager` – gestionează citirea și salvarea datelor.

---

## 12. Diagrama UML

Diagrama UML a proiectului poate fi introdusă în documentație după prezentarea claselor C++.

Loc recomandat în documentație:

```text
Capitolul: Clasele C++ și principiile POO
Subcapitol: Diagrama UML a sistemului
```

---

## 13. Capturi de ecran recomandate pentru documentație

Pentru o documentație completă, se recomandă introducerea următoarelor capturi de ecran:

| Nr. | Captură de ecran | Unde se introduce |
|---|---|---|
| 1 | Pagina de logare | La descrierea autentificării |
| 2 | Dashboard admin | La prezentarea paginii principale |
| 3 | Lista pacienților | La modulul Pacienți |
| 4 | Lista medicilor | La modulul Medici |
| 5 | Programări | La modulul Programări |
| 6 | Internări | La modulul Internări |
| 7 | Rețete | La modulul Rețete |
| 8 | Facturi | La modulul Facturi |
| 9 | Farmacie | La modulul Farmacie |
| 10 | Raport | La modulul Raport |
| 11 | Pagina Despre | La descrierea proiectului, doar pentru admin |
| 12 | Diagrama UML | La capitolul despre POO |

---

## 14. Observații

Proiectul este realizat cu scop didactic și poate fi extins prin adăugarea unui server backend, astfel încât datele introduse în interfața web să fie salvate direct în fișiere JSON sau într-o bază de date.

Posibile îmbunătățiri viitoare:

- conectarea la o bază de date;
- salvarea permanentă a datelor din web;
- generarea automată a facturilor în PDF;
- filtrare avansată pentru pacienți și medici;
- rapoarte statistice mai detaliate;
- sistem de notificări pentru programări și internări.
