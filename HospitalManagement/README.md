# Sistem de gestiune spital

![C++](https://img.shields.io/badge/C%2B%2B-POO-blue)
![Web](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JS-Interfa%C8%9B%C4%83%20web-orange)
![JSON](https://img.shields.io/badge/JSON-Persisten%C8%9B%C4%83%20date-green)

Proiectul reprezintă o aplicație de tip **Hospital Management System**, realizată pentru gestionarea activităților principale dintr-un spital: pacienți, medici, programări, internări, rețete, facturi și farmacie. Logica principală este construită în **C++**, folosind principiile programării orientate pe obiecte, iar partea vizuală este realizată în **HTML, CSS și JavaScript**.

Aplicația este gândită pe roluri, astfel încât fiecare utilizator să vadă doar modulele necesare activității sale: administrator, medic, recepție și farmacie.

---

## Cuprins

- [Funcționalități principale](#funcționalități-principale)
- [Roluri și acces](#roluri-și-acces)
- [Diagrama UML](#diagrama-uml)
- [Structura proiectului](#structura-proiectului)
- [Clase importante](#clase-importante)
- [Fișiere JSON](#fișiere-json)
- [Date de test](#date-de-test)
- [Rulare aplicație web](#rulare-aplicație-web)
- [Rulare aplicație C++](#rulare-aplicație-c)
- [Observații despre salvarea datelor](#observații-despre-salvarea-datelor)
- [Autor](#autor)

---

## Funcționalități principale

Aplicația permite gestionarea următoarelor module:

| Modul | Descriere |
|---|---|
| Dashboard | Afișează o imagine generală asupra activității spitalului. |
| Pacienți | Permite vizualizarea și adăugarea pacienților. |
| Medici | Permite administrarea medicilor și crearea conturilor de logare pentru medici. |
| Programări | Gestionează consultațiile dintre pacienți și medici. |
| Internări | Evidențiază pacienții internați, secția, perioada și costul internării. |
| Rețete | Permite prescrierea medicamentelor din farmacie și calcularea costului medicamentelor. |
| Facturi | Calculează automat costurile pentru consultație, internare, tratament și medicamente. |
| Farmacie | Permite gestionarea medicamentelor și a stocurilor. |
| Raport | Afișează date statistice și informații sintetice despre activitatea spitalului. |
| Despre | Pagina de prezentare a proiectului, vizibilă doar pentru administrator. |

---

## Roluri și acces

Aplicația are autentificare pe roluri. Fiecare rol are acces doar la paginile necesare.

| Rol | Acces principal |
|---|---|
| Admin | Acces complet la modulele aplicației, inclusiv Medici și Despre. |
| Medic | Vede pacienții și informațiile asociate medicului logat. |
| Recepție | Poate adăuga pacienți, crea programări și gestiona internări. |
| Farmacie | Are acces doar la modulul Farmacie, pentru adăugarea și gestionarea medicamentelor. |

### Conturi de test

```text
admin / admin123
receptie / receptie123
farmacie / farmacie123
medic1 / medic123
medic2 / medic123
medic3 / medic123
medic4 / medic123
medic5 / medic123
```

---

## Diagrama UML

Diagrama UML evidențiază structura principală a proiectului și relațiile dintre clase. Aceasta include clasele pentru persoane, pacienți, angajați, medici, programări, internări, rețete, facturi, farmacie și autentificare.

![Diagrama UML - Sistem de gestiune spital](docs/Diagrama_UML_Gestiune_Spital.png)

> Varianta SVG a diagramei se află în `docs/Diagrama_UML_Gestiune_Spital.svg`.

---

## Structura proiectului

```text
HospitalManagement/
│
├── data/                    # Fișiere JSON și CSV cu datele aplicației
│   ├── medici.json
│   ├── pacienti.json
│   ├── users.json
│   ├── programari.json
│   ├── internari.json
│   ├── retete.json
│   ├── facturi.json
│   ├── medicamente.json
│   └── export/
│
├── docs/                    # Documentație și diagrama UML
│   ├── documentatie.md
│   ├── Diagrama_UML_Gestiune_Spital.png
│   └── Diagrama_UML_Gestiune_Spital.svg
│
├── src/                     # Clasele C++ ale proiectului
│   ├── Pacient.h / Pacient.cpp
│   ├── Medic.h / Medic.cpp
│   ├── Programare.h / Programare.cpp
│   ├── Internare.h / Internare.cpp
│   ├── Reteta.h / Reteta.cpp
│   ├── Factura.h / Factura.cpp
│   ├── Farmacie.h / Farmacie.cpp
│   ├── Medicament.h / Medicament.cpp
│   ├── AuthService.h / AuthService.cpp
│   └── main.cpp
│
├── web/                     # Interfața web
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
│   ├── style.css
│   └── script.js
│
├── tests/                   # Teste C++
├── Makefile                 # Comenzi pentru compilare/rulare
└── README.md                # Prezentarea proiectului
```

---

## Clase importante

### `Persoana`
Clasă de bază pentru entitățile care au date personale, precum nume, prenume, vârstă sau date de contact.

### `Pacient`
Reprezintă pacientul spitalului. Conține date personale, diagnostic, prioritate și statutul internării.

### `Angajat`
Clasă de bază pentru personalul spitalului.

### `Medic`
Moștenește clasa `Angajat` și conține informații despre specializare, experiență și pacienții asociați.

### `Programare`
Gestionează consultațiile dintre pacienți și medici, incluzând data, ora și statusul programării.

### `Internare`
Stochează informații despre secție, perioada internării, tipul salonului și costul internării.

### `Reteta`
Conține medicamentele prescrise pacientului și calculează costul total al medicamentelor.

### `Factura`
Calculează costul final al serviciilor medicale, incluzând consultația, internarea, tratamentul, medicamentele și reducerea.

### `Farmacie`
Gestionează lista de medicamente, stocurile și prețurile.

### `Medicament`
Reprezintă un medicament disponibil în farmacie, cu denumire, preț și stoc.

### `AuthService`
Gestionează autentificarea utilizatorilor și rolurile acestora.

### `DataManager`
Asigură încărcarea și salvarea datelor în fișiere JSON.

---

## Fișiere JSON

Aplicația folosește fișiere JSON pentru stocarea și afișarea datelor în interfața web.

| Fișier | Rol |
|---|---|
| `users.json` | Conturile utilizatorilor și rolurile acestora. |
| `medici.json` | Lista medicilor. |
| `pacienti.json` | Lista pacienților. |
| `programari.json` | Programările pacienților la medici. |
| `internari.json` | Date despre internările pacienților. |
| `retete.json` | Rețetele și medicamentele prescrise. |
| `facturi.json` | Facturile generate pentru pacienți. |
| `medicamente.json` | Medicamentele disponibile în farmacie. |
| `statistici.json` | Date statistice pentru dashboard și raport. |

---

## Date de test

Proiectul conține date inițiale pentru prezentare:

- **5 medici diferiți**;
- **10 pacienți diferiți**;
- conturi separate pentru medicii de test;
- medicamente disponibile în farmacie;
- exemple de programări, internări, rețete și facturi.

Aceste date ajută la demonstrarea funcționalităților aplicației fără a introduce manual toate informațiile de la început.

---

## Rulare aplicație web

Pentru rularea interfeței web:

1. Deschide folderul proiectului.
2. Intră în folderul:

```text
HospitalManagement/web
```

3. Deschide fișierul:

```text
login.html
```

4. Autentifică-te cu unul dintre conturile de test.

### Resetarea datelor salvate în browser

Dacă în aplicație apar date vechi, acestea pot fi salvate în `localStorage`. Pentru resetare:

1. Deschide aplicația în browser.
2. Apasă `F12`.
3. Intră la `Console`.
4. Rulează comanda:

```javascript
localStorage.clear()
```

5. Reîncarcă pagina cu `Ctrl + F5`.

---

## Rulare aplicație C++

Pe Linux/Ubuntu sau WSL:

```bash
sudo apt update
sudo apt install g++ make -y
make clean
make
make run
```

Pentru rularea testelor:

```bash
make test
```

Pe Windows, proiectul poate fi rulat și prin executabilul existent:

```text
hospital_app.exe
```

---

## Observații despre salvarea datelor

În varianta web simplă, datele adăugate din browser pot fi salvate în `localStorage`, adică în memoria browserului. De aceea, dacă se adaugă un medic sau un pacient direct din interfața web, modificarea poate să nu apară automat în fișierul JSON de pe disc.

Pentru salvare permanentă direct în fișierele JSON, proiectul ar avea nevoie de un mic server local, de exemplu cu **Node.js + Express**, care să primească datele din web și să le scrie în fișierele din folderul `data/`.

---

## Caracteristici POO folosite

Proiectul utilizează concepte specifice programării orientate pe obiecte:

- **clase și obiecte**;
- **moștenire**, de exemplu `Medic` derivă din `Angajat`;
- **încapsulare**, prin atribute private și metode publice;
- **asociere între clase**, de exemplu pacient-programare, pacient-rețetă, pacient-factură;
- **separarea responsabilităților**, prin clase dedicate pentru autentificare, date, facturi și farmacie.

---

## Autor

Proiect realizat pentru disciplina **Programare Orientată pe Obiecte**, având ca temă dezvoltarea unei aplicații pentru gestiunea unui spital.

