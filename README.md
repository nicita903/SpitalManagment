# Aplicatie de gestiune a unui spital

Proiect C++ pentru tema 3123A. Aplicatia gestioneaza pacienti, medici, asistenti, programari, internari si facturi. Partea vizuala este realizata separat in HTML/CSS/JS si foloseste fisierul JSON generat de aplicatia C++.

## Functionalitati

- clase obligatorii: `Pacient`, `Medic`, `Programare`, `Factura`
- clasa principala `Persoana`
- mostenire: `Persoana -> Pacient`, `Persoana -> Angajat -> Medic`, `Persoana -> Angajat -> Asistent`
- polimorfism: `ServiciuMedical` cu `Consultatie`, `AnalizaLaborator`, `Interventie`
- exceptii personalizate pentru programari si facturi invalide
- logging pentru internari si emiterea facturilor
- teste unitare simple pentru programari si facturi
- persistenta/export JSON in `data/spital.json`
- Factory Pattern pentru facturi
- filtrare pacienti dupa diagnostic
- functionalitate adaugata: clasa `Internare`, dashboard web si filtrare dupa sectie

## Structura

```text
include/   fisiere header C++
src/       implementarea aplicatiei
tests/     teste unitare fara biblioteci externe
web/       interfata HTML/CSS/JS
docs/      documentatie POO si diagrama UML
```

## Build si rulare cu Makefile

```bash
make
make run
make test
```

Aplicatia salveaza datele pentru interfata web in:

```text
data/spital.json
```

## Build si rulare cu CMake

```bash
cmake -S . -B build
cmake --build build
ctest --test-dir build
```

## Interfata web

1. Ruleaza aplicatia C++ ca sa genereze `data/spital.json`.
2. Deschide `web/index.html` in browser sau porneste serverul local:

```powershell
powershell -ExecutionPolicy Bypass -File web/server.ps1
```

Dashboard-ul va fi disponibil la:

```text
http://localhost:8080/web/index.html
```

Interfata are si date demo, deci poate fi deschisa chiar daca snapshot-ul JSON nu exista inca.

## Git

Pentru predare:

```bash
git add .
git commit -m "Finalize hospital management project"
git push
```
