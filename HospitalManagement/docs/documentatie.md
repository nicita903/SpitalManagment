# Documentatie - Hospital Management System

## Tema proiectului

Aplicatia gestioneaza pacienti, medici, asistenti, programari, internari si facturi intr-un spital. Logica principala este implementata in C++, iar interfata HTML/CSS/JavaScript afiseaza datele generate in JSON.

## Clase folosite

- `Persoana`: clasa de baza cu id, nume, prenume, varsta si telefon.
- `Pacient`: mosteneste `Persoana` si adauga diagnostic, grupa sanguina, adresa, internare si alergii.
- `Angajat`: mosteneste `Persoana` si adauga salariu, sectie si functie.
- `Medic`: mosteneste `Angajat` si adauga specializare, cod parafa si numar consultatii.
- `Asistent`: mosteneste `Angajat` si adauga tura si ani de experienta.
- `Programare`: gestioneaza programarile, statusurile `activa`, `anulata`, `finalizata` si verifica validitatea/conflictele.
- `Internare`: gestioneaza internarea/externarea, statusurile `activa`, `finalizata` si calculeaza costul internarii.
- `Factura`: calculeaza totalul unei facturi cu reducere fixa in lei.
- `ServiciuMedical`: clasa abstracta pentru calcul polimorfic de cost.
- `DataManager`: salveaza datele in JSON.
- `Logger`: scrie operatiunile critice in `data/log.txt`.
- `Utilizator`: modeleaza un utilizator al aplicatiei.
- `AuthService`: gestioneaza login-ul si permisiunile pe roluri.
- `Sectie`: gestioneaza paturile disponibile.
- `StatisticiSpital`: calculeaza indicatorii pentru dashboard.
- `IstoricMedical`: retine diagnostice si tratamente anterioare pentru pacienti.
- `Reteta`: retine retete emise de medici pentru pacienti.
- `RaportSpital`: genereaza raport text si JSON.
- `CsvExporter`: exporta pacienti, programari si facturi in CSV.

## Mostenire

```text
Persoana
|-- Pacient
`-- Angajat
    |-- Medic
    `-- Asistent
```

## Polimorfism

Clasa abstracta `ServiciuMedical` contine metoda virtuala pura:

```cpp
virtual double calculeazaCost() const = 0;
```

Clasele `Consultatie`, `Analize`, `InternareServiciu` si `Operatie` suprascriu metoda si calculeaza costul diferit.

## Incapsulare

Atributele sunt private sau protected. Accesul se face prin getter/setter, de exemplu `getDiagnostic()`, `setInternat()` si `calculeazaTotal()`.

## Exceptii

Sunt definite exceptii personalizate:

- `ProgramareInvalidaException`
- `PacientInexistentException`
- `FacturaInvalidaException`
- `SectiePlinaException`
- `DateInvalideException`
- `MedicInexistentException`

Acestea sunt folosite la crearea programarilor, internarilor si facturilor pentru cazuri precum pacient inexistent, medic inexistent, conflict de programare, cost negativ sau reducere mai mare decat suma costurilor.

## Programari

Programarea noua se creeaza din meniul C++ prin optiunea `5. Creeaza programare`. Aplicatia verifica:

- pacientul exista;
- medicul exista;
- data si ora nu sunt goale;
- medicul nu are alta programare activa/finalizata la aceeasi data si aceeasi ora.

Statusul initial este `activa`. Optiunile `7` si `8` schimba statusul in `anulata`, respectiv `finalizata`. Dupa modificare se actualizeaza `data/programari.json` si se scrie in `data/log.txt`.

## Internari si externari

Internarea se face din optiunea `9. Interneaza pacient`. Aplicatia verifica pacientul, sectia, numarul de zile, costul pe zi si faptul ca pacientul nu este deja internat. La internare:

- se creeaza o intrare in `Internare` cu status `activa`;
- `Pacient::internat` devine `true`;
- se actualizeaza `data/internari.json` si `data/pacienti.json`.

Externarea se face din optiunea `10. Externeaza pacient`. Daca pacientul nu este internat, aplicatia afiseaza mesaj clar si nu blocheaza rularea. Daca exista internare activa, statusul devine `finalizata`, iar pacientul devine neinternat.

## Facturi

Factura se emite din optiunea `12. Emite factura`. Formula folosita este:

```text
total = costConsultatie + costInternare + costTratament - reducere
```

Reducerea este suma fixa in lei, nu procent. Aplicatia valideaza costurile negative, reducerea negativa, reducerea mai mare decat suma costurilor si pacientul inexistent. Facturile se pot afisa, cauta dupa pacient si folosi pentru calculul venitului total.

## Logging

Operatiunile critice sunt salvate in `data/log.txt`:

- login reusit sau esuat
- adaugarea/modificarea/stergerea unui pacient
- internarea unui pacient
- externarea unui pacient
- emiterea unei facturi
- crearea unei programari
- anularea unei programari
- finalizarea unei programari
- emiterea unei retete
- adaugarea unui istoric medical
- generarea raportului
- exportul CSV

Formatul logului:

```text
[YYYY-MM-DD HH:MM:SS] OPERATIUNE: mesaj
```

## Roluri

- `admin`: poate face toate operatiile.
- `medic`: poate afisa pacienti, afisa programari, cauta pacienti si actualiza diagnosticul.
- `receptie`: poate adauga pacienti, crea programari si afisa pacienti/programari.

## Statistici

Clasa `StatisticiSpital` calculeaza:

- total pacienti
- pacienti internati
- total medici
- programari active
- facturi emise
- venit total
- cel mai frecvent diagnostic

Rezultatul este exportat in `data/statistici.json`.

## Prioritate pacient

Clasa `Pacient` are campul `prioritate`, cu valorile:

- `scazuta`
- `medie`
- `urgenta`
- `critica`

Functiile din `PrioritateUtils` permit sortarea pacientilor dupa prioritate si afisarea pacientilor urgenti/critici.

## Istoric medical si retete

`IstoricMedical` salveaza consultatiile anterioare in `data/istoric_medical.json`.

`Reteta` salveaza retetele medicale in `data/retete.json`.

## Rapoarte si CSV

`RaportSpital` genereaza:

- `data/raport_spital.txt`
- `data/raport_spital.json`

`CsvExporter` genereaza:

- `data/export/pacienti.csv`
- `data/export/programari.csv`
- `data/export/facturi.csv`

## Interfata web

HTML/CSS/JavaScript este folosit doar pentru design si afisare. Operatiile reale, precum adaugarea pacientilor, internarea, externarea si emiterea facturilor, se fac in aplicatia C++ din consola.

Pentru prezentare, paginile `programari.html`, `internari.html` si `facturi.html` au modaluri vizuale. La salvare, datele sunt actualizate doar demonstrativ in browser si apare mesajul ca salvarea permanenta se face din aplicatia C++.

Paginile web citesc fisierele:

- `data/pacienti.json`
- `data/medici.json`
- `data/programari.json`
- `data/internari.json`
- `data/facturi.json`
- `data/statistici.json`
- `data/istoric_medical.json`
- `data/retete.json`
- `data/raport_spital.json`

## Structura proiectului

```text
HospitalManagement/
|-- src/
|-- tests/
|-- web/
|-- data/
|-- docs/
|-- Makefile
|-- README.md
`-- .gitignore
```

## UML simplu

```text
Persoana(id, nume, prenume, varsta, telefon)
  |
  |-- Pacient(diagnostic, grupaSange, adresa, internat, alergii)
  |
  `-- Angajat(salariu, sectie, functie)
        |
        |-- Medic(specializare, codParafa, numarConsultatii)
        |
        `-- Asistent(tura, aniExperienta)

Programare(idProgramare, idPacient, idMedic, data, ora, tipConsultatie, status)
Internare(idInternare, idPacient, sectie, dataInternare, numarZile, tipSalon, costPeZi, status)
Factura(idFactura, idPacient, dataEmitere, costuri, reducere, total)
Sectie(idSectie, denumire, etaj, numarPaturiTotal, numarPaturiOcupate)
IstoricMedical(idIstoric, idPacient, diagnosticAnterior, tratament, dataConsultatie, observatiiMedic)
Reteta(idReteta, idPacient, idMedic, medicamente, dozaj, durataTratament, dataEmitere)
ServiciuMedical <|-- Consultatie, Analize, InternareServiciu, Operatie
AuthService --> Utilizator
StatisticiSpital --> Pacient, Medic, Programare, Factura
RaportSpital --> StatisticiSpital
CsvExporter --> Pacient, Programare, Factura
```
