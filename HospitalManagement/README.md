# Hospital Management System

Proiect universitar POO in C++ pentru tema "Aplicatie de gestiune a unui spital".

Logica principala este in C++. HTML/CSS/JavaScript este folosit doar pentru afisarea datelor generate in fisiere JSON.

## Instalare pe Ubuntu

```bash
sudo apt update
sudo apt install g++ make -y
```

## Compilare si rulare

```bash
make clean
make
make run
make test
```

## Meniu consola C++

Aplicatia C++ porneste direct in meniul demo pentru prezentare. Operatiile reale si persistente se fac din consola:

- `5. Creeaza programare`: introduci ID pacient, ID medic, data, ora si tip consultatie. Programarea primeste automat status `activa`, se verifica existenta pacientului/medicului si conflictul medicului la aceeasi data si ora.
- `7. Anuleaza programare`: introduci ID programare, statusul devine `anulata`.
- `8. Finalizeaza programare`: introduci ID programare, statusul devine `finalizata`.
- `9. Interneaza pacient`: introduci ID pacient, sectie, data, numar zile, tip salon si cost pe zi. Pacientul devine internat si internarea se salveaza cu status `activa`.
- `10. Externeaza pacient`: introduci ID pacient. Internarea activa devine `finalizata`, iar pacientul devine neinternat.
- `12. Emite factura`: introduci ID pacient, data si costurile. Reducerea este suma in lei, iar totalul se calculeaza cu formula `costConsultatie + costInternare + costTratament - reducere`.
- `14. Cauta facturi dupa pacient`: afiseaza facturile pacientului dupa ID.
- `15. Calculeaza venit total`: calculeaza suma tuturor facturilor.
- `16. Genereaza JSON pentru web`: actualizeaza fisierele din `data/`.
- `17. Genereaza raport`: genereaza raportul text si JSON.

Dupa operatiile importante, aplicatia actualizeaza automat fisierele `data/*.json` si scrie in `data/log.txt`.

## Login disponibil

- `admin / admin123`
- `medic / medic123`
- `receptie / receptie123`

## Roluri

- `admin`: poate face toate operatiile.
- `medic`: poate afisa pacienti/programari, cauta pacienti si actualiza diagnosticul.
- `receptie`: poate adauga pacienti, crea programari si afisa pacienti/programari.

## Functionalitati noi

- autentificare C++ prin `AuthService`
- statistici exportate in `data/statistici.json`
- internari cu status `activa` / `finalizata`
- sectii cu paturi disponibile prin clasa `Sectie`
- exceptie `SectiePlinaException`
- export JSON pentru `internari.json` si `statistici.json`
- pagina web `internari.html`
- filtrare vizuala pacienti dupa nume, diagnostic si statut
- istoric medical exportat in `data/istoric_medical.json`
- retete medicale exportate in `data/retete.json`
- prioritate pacient: `scazuta`, `medie`, `urgenta`, `critica`
- raport spital in `data/raport_spital.txt` si `data/raport_spital.json`
- export CSV in `data/export/`

## Interfata web

Ruleaza aplicatia C++ si alege optiunea `16` pentru generarea fisierelor JSON. Pentru raport foloseste optiunea `17`. Logica principala ramane in C++; HTML/CSS/JavaScript doar afiseaza datele din fisierele JSON.

Paginile web au modaluri vizuale pentru programare noua, internare pacient si emitere factura. Acestea sunt doar pentru prezentare; salvarea permanenta se face din aplicatia C++.

Apoi deschide:

```text
web/login.html
```

Login web:

- `admin / admin123`
- `medic / medic123`
- `receptie / receptie123`

## Structura

```text
src/    clasele C++ si meniul principal
tests/  teste simple cu assert
web/    interfata vizuala HTML/CSS/JS
data/   fisiere JSON si log.txt
docs/   documentatie proiect
```
