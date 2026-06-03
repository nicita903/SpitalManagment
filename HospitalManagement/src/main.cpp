#include "Asistent.h"
#include "AuthService.h"
#include "CsvExporter.h"
#include "DataManager.h"
#include "Exceptions.h"
#include "FacturaFactory.h"
#include "HtmlExporter.h"
#include "IstoricMedical.h"
#include "Internare.h"
#include "Logger.h"
#include "Medic.h"
#include "Pacient.h"
#include "PrioritateUtils.h"
#include "Programare.h"
#include "RaportSpital.h"
#include "Reteta.h"
#include "Sectie.h"
#include "StatisticiSpital.h"

#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

static std::vector<Pacient> pacienti;
static std::vector<Medic> medici;
static std::vector<Programare> programari;
static std::vector<Internare> internari;
static std::vector<Factura> facturi;
static std::vector<IstoricMedical> istoricMedical;
static std::vector<Reteta> retete;
static std::vector<Sectie> sectii;
static AuthService authService;
static std::string rolCurent = "admin";

static int citesteInt(const std::string& mesaj) {
    int valoare;
    std::cout << mesaj;
    std::cin >> valoare;
    std::cin.ignore();
    return valoare;
}

static double citesteDouble(const std::string& mesaj) {
    double valoare;
    std::cout << mesaj;
    std::cin >> valoare;
    std::cin.ignore();
    return valoare;
}

static std::string citesteText(const std::string& mesaj) {
    std::string text;
    std::cout << mesaj;
    std::getline(std::cin, text);
    return text;
}

static bool arePermisiune(const std::string& actiune) {
    if (actiune == "admin") {
        return authService.hasPermission(rolCurent, "administrare");
    }
    if (actiune == "pacienti") {
        return authService.hasPermission(rolCurent, "adauga_pacient");
    }
    if (actiune == "programari") {
        return authService.hasPermission(rolCurent, "creeaza_programare");
    }
    if (actiune == "vizualizare") {
        return authService.hasPermission(rolCurent, "afiseaza_pacienti");
    }
    if (actiune == "diagnostic") {
        return authService.hasPermission(rolCurent, "actualizeaza_diagnostic");
    }
    return authService.hasPermission(rolCurent, actiune);
}

static bool login() {
    std::string username = citesteText("Username: ");
    std::string parola = citesteText("Parola: ");
    std::string rol = authService.login(username, parola);

    if (!rol.empty()) {
        rolCurent = rol;
        std::cout << "Autentificare reusita. Rol: " << rolCurent << "\n";
        return true;
    }

    std::cout << "Date de autentificare gresite.\n";
    return false;
}

static Pacient* gasestePacient(int id) {
    for (auto& pacient : pacienti) {
        if (pacient.getId() == id) {
            return &pacient;
        }
    }
    return nullptr;
}

static Medic* gasesteMedic(int id) {
    for (auto& medic : medici) {
        if (medic.getId() == id) {
            return &medic;
        }
    }
    return nullptr;
}

static Sectie* gasesteSectieDupaDenumire(const std::string& denumire) {
    for (auto& sectie : sectii) {
        if (sectie.getDenumire() == denumire) {
            return &sectie;
        }
    }
    return nullptr;
}

template <typename T, typename Getter>
static int urmatorulId(const std::vector<T>& elemente, Getter getter) {
    int maxim = 0;
    for (const auto& element : elemente) {
        maxim = std::max(maxim, getter(element));
    }
    return maxim + 1;
}

static void salveazaDateAplicatie() {
    DataManager::salveazaTot(pacienti, medici, programari, internari, facturi);
    IstoricMedical::exportIstoricJson(istoricMedical, "data/istoric_medical.json");
    Reteta::exportReteteJson(retete, "data/retete.json");
    RaportSpital::genereazaRaportJson(pacienti, medici, programari, facturi, "data/raport_spital.json");
}

static void adaugaPacient() {
    if (!arePermisiune("pacienti")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int id = citesteInt("ID pacient: ");
    std::string nume = citesteText("Nume: ");
    std::string prenume = citesteText("Prenume: ");
    int varsta = citesteInt("Varsta: ");
    std::string telefon = citesteText("Telefon: ");
    std::string diagnostic = citesteText("Diagnostic: ");
    std::string grupaSange = citesteText("Grupa sange: ");
    std::string adresa = citesteText("Adresa: ");
    std::string alergii = citesteText("Alergii: ");
    std::string prioritate = citesteText("Prioritate (scazuta/medie/urgenta/critica): ");

    pacienti.emplace_back(id, nume, prenume, varsta, telefon, diagnostic, grupaSange, adresa, false, alergii, prioritate);
    Logger::log("adaugare pacient ID " + std::to_string(id));
    std::cout << "Pacient adaugat.\n";
}

static void afiseazaPacienti() {
    if (!arePermisiune("afiseaza_pacienti")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    for (const auto& pacient : pacienti) {
        pacient.afisare();
    }
}

static void cautaPacientDupaNume() {
    if (!arePermisiune("cauta_pacienti")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    std::string cautare = citesteText("Nume cautat: ");
    for (const auto& pacient : pacienti) {
        if (pacient.getNume().find(cautare) != std::string::npos ||
            pacient.getPrenume().find(cautare) != std::string::npos) {
            pacient.afisare();
        }
    }
}

static void filtreazaPacientiDupaDiagnostic() {
    if (!arePermisiune("cauta_pacienti")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    std::string diagnostic = citesteText("Diagnostic cautat: ");
    for (const auto& pacient : pacienti) {
        if (pacient.getDiagnostic().find(diagnostic) != std::string::npos) {
            pacient.afisare();
        }
    }
}

static void modificaPacient() {
    if (!arePermisiune("diagnostic")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int id = citesteInt("ID pacient: ");
    Pacient* pacient = gasestePacient(id);
    if (!pacient) {
        throw PacientInexistentException("Pacientul nu exista.");
    }

    std::string diagnostic = citesteText("Diagnostic nou: ");
    pacient->setDiagnostic(diagnostic);
    Logger::log("modificare pacient ID " + std::to_string(id) + " diagnostic nou: " + diagnostic);
    std::cout << "Pacient modificat.\n";
}

static void stergePacient() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int id = citesteInt("ID pacient de sters: ");
    auto it = std::remove_if(pacienti.begin(), pacienti.end(),
                             [id](const Pacient& pacient) { return pacient.getId() == id; });
    if (it == pacienti.end()) {
        throw PacientInexistentException("Pacientul nu exista.");
    }
    pacienti.erase(it, pacienti.end());
    Logger::log("Stergere pacient ID " + std::to_string(id));
    std::cout << "Pacient sters.\n";
}

static void adaugaMedic() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int id = citesteInt("ID medic: ");
    std::string nume = citesteText("Nume: ");
    std::string prenume = citesteText("Prenume: ");
    int varsta = citesteInt("Varsta: ");
    std::string telefon = citesteText("Telefon: ");
    double salariu = citesteDouble("Salariu: ");
    std::string sectie = citesteText("Sectie: ");
    std::string specializare = citesteText("Specializare: ");
    std::string codParafa = citesteText("Cod parafa: ");

    medici.emplace_back(id, nume, prenume, varsta, telefon, salariu, sectie, specializare, codParafa, 0);
    std::cout << "Medic adaugat.\n";
}

static void afiseazaMedici() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    for (const auto& medic : medici) {
        medic.afisare();
    }
}

static void creeazaProgramare() {
    if (!arePermisiune("programari")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int id = urmatorulId(programari, [](const Programare& programare) { return programare.getIdProgramare(); });
    int idPacient = citesteInt("ID pacient: ");
    int idMedic = citesteInt("ID medic: ");
    std::string data = citesteText("Data (YYYY-MM-DD): ");
    std::string ora = citesteText("Ora (HH:MM): ");
    std::string tip = citesteText("Tip consultatie: ");

    if (!gasestePacient(idPacient)) {
        throw PacientInexistentException("Pacientul nu exista.");
    }
    if (!gasesteMedic(idMedic)) {
        throw MedicInexistentException("Medicul nu exista.");
    }
    if (data.empty() || ora.empty() || tip.empty()) {
        throw ProgramareInvalidaException("Data, ora si tipul consultatiei sunt obligatorii.");
    }

    Programare noua(id, idPacient, idMedic, data, ora, tip, "activa");
    for (const auto& programare : programari) {
        if (noua.areConflictOra(programare)) {
            throw ProgramareInvalidaException("Exista deja o programare la aceeasi ora pentru medic.");
        }
    }

    programari.push_back(noua);
    DataManager::salveazaProgramari(programari, "data/programari.json");
    Logger::log("PROGRAMARE: Programare ID " + std::to_string(id) +
                " creata pentru pacientul ID " + std::to_string(idPacient) +
                " la medicul ID " + std::to_string(idMedic) + ".");
    std::cout << "Programare creata cu status activa. ID generat: " << id << "\n";
}

static void afiseazaProgramari() {
    if (!arePermisiune("afiseaza_programari")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    for (const auto& programare : programari) {
        programare.afisare();
    }
}

static Programare* gasesteProgramare(int idProgramare) {
    for (auto& programare : programari) {
        if (programare.getIdProgramare() == idProgramare) {
            return &programare;
        }
    }
    return nullptr;
}

static void anuleazaProgramare() {
    if (!arePermisiune("programari")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int idProgramare = citesteInt("ID programare de anulat: ");
    Programare* programare = gasesteProgramare(idProgramare);
    if (!programare) {
        throw ProgramareInvalidaException("Programarea nu exista.");
    }

    programare->setStatus("anulata");
    DataManager::salveazaProgramari(programari, "data/programari.json");
    Logger::log("PROGRAMARE: Programarea ID " + std::to_string(idProgramare) + " a fost anulata.");
    std::cout << "Programare anulata.\n";
}

static void finalizeazaProgramare() {
    if (!arePermisiune("programari")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int idProgramare = citesteInt("ID programare de finalizat: ");
    Programare* programare = gasesteProgramare(idProgramare);
    if (!programare) {
        throw ProgramareInvalidaException("Programarea nu exista.");
    }

    programare->setStatus("finalizata");
    DataManager::salveazaProgramari(programari, "data/programari.json");
    Logger::log("PROGRAMARE: Programarea ID " + std::to_string(idProgramare) + " a fost finalizata.");
    std::cout << "Programare finalizata.\n";
}

static void interneazaPacient() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int idInternare = urmatorulId(internari, [](const Internare& internare) { return internare.getIdInternare(); });
    int idPacient = citesteInt("ID pacient: ");
    Pacient* pacient = gasestePacient(idPacient);
    if (!pacient) {
        throw PacientInexistentException("Pacientul nu exista.");
    }
    if (pacient->esteInternat()) {
        throw DateInvalideException("Pacientul este deja internat.");
    }

    std::string sectie = citesteText("Sectie: ");
    Sectie* sectieGasita = gasesteSectieDupaDenumire(sectie);
    if (!sectieGasita) {
        throw SectiePlinaException("Sectia nu exista.");
    }

    std::string data = citesteText("Data internare: ");
    int zile = citesteInt("Numar zile: ");
    std::string tipSalon = citesteText("Tip salon: ");
    double costPeZi = citesteDouble("Cost pe zi: ");
    if (data.empty() || sectie.empty() || tipSalon.empty() || zile <= 0 || costPeZi < 0.0) {
        throw DateInvalideException("Date invalide pentru internare.");
    }

    sectieGasita->ocupaPat();
    pacient->setInternat(true);
    internari.emplace_back(idInternare, idPacient, sectie, data, zile, tipSalon, costPeZi, "activa");
    DataManager::salveazaPacienti(pacienti, "data/pacienti.json");
    DataManager::salveazaInternari(internari, "data/internari.json");
    Logger::log("INTERNARE: Pacientul ID " + std::to_string(idPacient) +
                " a fost internat in sectia " + sectie + ".");
    std::cout << "Pacient internat. ID internare generat: " << idInternare << "\n";
}

static void externeazaPacient() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int idPacient = citesteInt("ID pacient: ");
    Pacient* pacient = gasestePacient(idPacient);
    if (!pacient) {
        throw PacientInexistentException("Pacientul nu exista.");
    }
    if (!pacient->esteInternat()) {
        std::cout << "Pacientul nu este internat. Nu s-a modificat nimic.\n";
        return;
    }

    bool internareGasita = false;
    for (auto& internare : internari) {
        if (internare.getIdPacient() == idPacient && internare.esteActiva()) {
            internare.finalizeaza();
            internareGasita = true;
            Sectie* sectie = gasesteSectieDupaDenumire(internare.getSectie());
            if (sectie) {
                sectie->elibereazaPat();
            }
            break;
        }
    }

    if (!internareGasita) {
        std::cout << "Nu exista internare activa pentru acest pacient.\n";
        return;
    }

    pacient->setInternat(false);
    DataManager::salveazaPacienti(pacienti, "data/pacienti.json");
    DataManager::salveazaInternari(internari, "data/internari.json");
    Logger::log("INTERNARE: Pacientul ID " + std::to_string(idPacient) + " a fost externat.");
    std::cout << "Pacient externat.\n";
}

static void afiseazaInternari() {
    if (!arePermisiune("afiseaza_internari")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    for (const auto& internare : internari) {
        internare.afisare();
    }
}

static void afisareInternariActive() {
    if (!arePermisiune("afiseaza_internari")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    for (const auto& internare : internari) {
        if (internare.esteActiva()) {
            internare.afisare();
        }
    }
}

static void afiseazaSectii() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    for (const auto& sectie : sectii) {
        sectie.afisareSectie();
    }
}

static void afiseazaStatistici() {
    if (!arePermisiune("afiseaza_statistici")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    StatisticiSpital statistici(pacienti, medici, programari, facturi);
    std::cout << "Total pacienti: " << statistici.calculeazaTotalPacienti() << "\n"
              << "Pacienti internati: " << statistici.calculeazaPacientiInternati() << "\n"
              << "Total medici: " << statistici.calculeazaTotalMedici() << "\n"
              << "Programari active: " << statistici.calculeazaProgramariActive() << "\n"
              << "Facturi emise: " << statistici.calculeazaTotalFacturi() << "\n"
              << "Venit total: " << statistici.calculeazaVenitTotal() << " lei\n"
              << "Diagnostic frecvent: " << statistici.gasesteDiagnosticFrecvent() << "\n";
}

static void seteazaPrioritatePacient() {
    if (!arePermisiune("actualizeaza_diagnostic")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int id = citesteInt("ID pacient: ");
    Pacient* pacient = gasestePacient(id);
    if (!pacient) {
        throw PacientInexistentException("Pacientul nu exista.");
    }

    std::string prioritate = citesteText("Prioritate (scazuta/medie/urgenta/critica): ");
    pacient->seteazaPrioritate(prioritate);
    Logger::log("actualizare prioritate pacient ID " + std::to_string(id) + " la " + prioritate);
    std::cout << "Prioritate actualizata.\n";
}

static void afiseazaPacientiUrgentiMeniu() {
    if (!arePermisiune("afiseaza_pacienti")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }
    afiseazaPacientiUrgenti(pacienti);
}

static void sorteazaPacientiDupaPrioritateMeniu() {
    if (!arePermisiune("afiseaza_pacienti")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }
    sorteazaPacientiDupaPrioritate(pacienti);
    afiseazaPacienti();
}

static void adaugaIstoricMedical() {
    if (!arePermisiune("adauga_istoric")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int idIstoric = citesteInt("ID istoric: ");
    int idPacient = citesteInt("ID pacient: ");
    if (!gasestePacient(idPacient)) {
        throw PacientInexistentException("Pacientul nu exista.");
    }
    std::string diagnostic = citesteText("Diagnostic anterior: ");
    std::string tratament = citesteText("Tratament: ");
    std::string data = citesteText("Data consultatie: ");
    std::string observatii = citesteText("Observatii medic: ");

    IstoricMedical::adaugaIstoric(istoricMedical, IstoricMedical(idIstoric, idPacient, diagnostic, tratament, data, observatii));
    std::cout << "Istoric medical adaugat.\n";
}

static void afiseazaIstoricPacientMeniu() {
    if (!arePermisiune("afiseaza_pacienti")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }
    int idPacient = citesteInt("ID pacient: ");
    IstoricMedical::afiseazaIstoricPacient(istoricMedical, idPacient);
}

static void emiteRetetaMeniu() {
    if (!arePermisiune("emite_reteta")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int idReteta = citesteInt("ID reteta: ");
    int idPacient = citesteInt("ID pacient: ");
    int idMedic = citesteInt("ID medic: ");
    if (!gasestePacient(idPacient)) {
        throw PacientInexistentException("Pacientul nu exista.");
    }
    if (!gasesteMedic(idMedic)) {
        throw MedicInexistentException("Medicul nu exista.");
    }

    std::string medicamente = citesteText("Medicamente: ");
    std::string dozaj = citesteText("Dozaj: ");
    std::string durata = citesteText("Durata tratament: ");
    std::string data = citesteText("Data emitere: ");

    Reteta::emiteReteta(retete, Reteta(idReteta, idPacient, idMedic, medicamente, dozaj, durata, data));
    std::cout << "Reteta emisa.\n";
}

static void afiseazaReteteMeniu() {
    if (!arePermisiune("afiseaza_pacienti")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }
    Reteta::afiseazaRetete(retete);
}

static void cautaRetetaDupaPacientMeniu() {
    if (!arePermisiune("afiseaza_pacienti")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }
    int idPacient = citesteInt("ID pacient: ");
    Reteta::cautaRetetaDupaPacient(retete, idPacient);
}

static void genereazaRaportSpital() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }
    RaportSpital::genereazaRaportComplet(pacienti, medici, programari, facturi);
    std::cout << "Raport generat in data/raport_spital.txt si data/raport_spital.json.\n";
}

static void exportCsvMeniu() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }
    CsvExporter::exportTot(pacienti, programari, facturi);
    std::cout << "CSV exportat in data/export/.\n";
}

static void emiteFactura() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int idFactura = urmatorulId(facturi, [](const Factura& factura) { return factura.getIdFactura(); });
    int idPacient = citesteInt("ID pacient: ");
    if (!gasestePacient(idPacient)) {
        throw PacientInexistentException("Pacientul nu exista.");
    }

    std::string data = citesteText("Data emitere: ");
    double costConsultatie = citesteDouble("Cost consultatie: ");
    double costInternare = citesteDouble("Cost internare: ");
    double costTratament = citesteDouble("Cost tratament: ");
    double costMedicamente = citesteDouble("Cost medicamente: ");
    double reducere = citesteDouble("Reducere in lei: ");

    Factura factura = FacturaFactory::facturaCuMedicamente(idFactura, idPacient, data,
                                                           costConsultatie, costInternare,
                                                           costTratament, reducere, costMedicamente);
    facturi.push_back(factura);
    DataManager::salveazaFacturi(facturi, "data/facturi.json");
    Logger::log("FACTURA: Factura ID " + std::to_string(idFactura) +
                " a fost emisa pentru pacientul ID " + std::to_string(idPacient) +
                ", total " + std::to_string(factura.getTotal()) + " lei.");
    std::cout << "Factura emisa. ID generat: " << idFactura
              << " | Total: " << factura.getTotal() << " lei\n";
}

static void afiseazaFacturi() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    for (const auto& factura : facturi) {
        factura.afisare();
    }
}

static void cautaFacturiDupaPacient() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    int idPacient = citesteInt("ID pacient: ");
    bool gasit = false;
    for (const auto& factura : facturi) {
        if (factura.getIdPacient() == idPacient) {
            factura.afisare();
            gasit = true;
        }
    }
    if (!gasit) {
        std::cout << "Nu exista facturi pentru pacientul ID " << idPacient << ".\n";
    }
}

static void calculeazaVenitTotalFacturi() {
    if (!arePermisiune("admin")) {
        std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
        return;
    }

    double venitTotal = 0.0;
    for (const auto& factura : facturi) {
        venitTotal += factura.getTotal();
    }
    std::cout << "Venit total din facturi: " << venitTotal << " lei\n";
}

static void incarcaDateInitiale() {
    if (!pacienti.empty()) {
        return;
    }

    sectii.emplace_back(1, "Cardiologie", 2, 10, 0);
    sectii.emplace_back(2, "Ortopedie", 3, 8, 1);
    sectii.emplace_back(3, "Urgente", 1, 12, 0);
    sectii.emplace_back(4, "Medicina interna", 2, 14, 0);
    sectii.emplace_back(5, "Chirurgie", 2, 9, 0);

    pacienti.emplace_back(1, "Popescu", "Ana", 25, "0711111111", "Gripa", "A+", "Chisinau, str. Stefan cel Mare 12", false, "fara", "medie");
    pacienti.emplace_back(2, "Ionescu", "Mihai", 39, "0722222222", "Fractura antebrat", "B+", "Balti, str. Decebal 8", true, "penicilina", "urgenta");
    pacienti.emplace_back(3, "Ceban", "Elena", 58, "0731112233", "Hipertensiune arteriala", "O+", "Chisinau, bd. Dacia 45", false, "fara", "medie");
    pacienti.emplace_back(4, "Rusu", "Victor", 64, "0745556677", "Diabet zaharat tip 2", "AB+", "Orhei, str. Vasile Lupu 21", true, "sulfamide", "critica");
    pacienti.emplace_back(5, "Munteanu", "Irina", 31, "0753334444", "Migrena cronica", "A-", "Ungheni, str. Nationala 17", false, "fara", "scazuta");
    pacienti.emplace_back(6, "Moraru", "Andrei", 47, "0767778888", "Pneumonie", "O-", "Cahul, str. Republicii 5", true, "aspirina", "urgenta");
    pacienti.emplace_back(7, "Lupu", "Maria", 72, "0772223333", "Insuficienta cardiaca", "B-", "Soroca, str. Independentei 30", true, "fara", "critica");
    pacienti.emplace_back(8, "Rotaru", "Dumitru", 18, "0784445555", "Apendicita", "A+", "Edinet, str. Mihai Eminescu 9", true, "fara", "urgenta");
    pacienti.emplace_back(9, "Balan", "Sofia", 43, "0791110000", "Gastrita", "AB-", "Hincesti, str. Alexandru cel Bun 14", false, "lactoza", "medie");
    pacienti.emplace_back(10, "Ciobanu", "Nicolai", 52, "0719998888", "Bronsita acuta", "O+", "Balti, str. Kiev 33", false, "fara", "scazuta");

    medici.emplace_back(1, "Radu", "Pavel", 45, "0733333333", 9000, "Cardiologie", "Cardiolog", "CP123", 18);
    medici.emplace_back(2, "Stan", "Irina", 41, "0744444444", 8500, "Ortopedie", "Ortoped", "OP456", 14);
    medici.emplace_back(3, "Botezatu", "Sergiu", 38, "0755556666", 8800, "Urgente", "Medic urgentist", "UR789", 26);
    medici.emplace_back(4, "Dumitrescu", "Alina", 44, "0766667777", 9200, "Medicina interna", "Internist", "MI234", 21);

    programari.emplace_back(1, 1, 1, "2026-06-10", "09:30", "Consultatie generala");
    programari.emplace_back(2, 3, 1, "2026-06-10", "10:30", "Control tensiune");
    programari.emplace_back(3, 5, 4, "2026-06-11", "13:00", "Consultatie neurologica");
    programari.emplace_back(4, 9, 4, "2026-06-12", "11:15", "Consultatie gastroenterologie");
    programari.emplace_back(5, 10, 3, "2026-06-13", "08:45", "Control respirator");

    internari.emplace_back(1, 2, "Ortopedie", "2026-06-02", 4, "standard", 250.0, "activa");
    internari.emplace_back(2, 4, "Medicina interna", "2026-06-01", 6, "standard", 300.0, "activa");
    internari.emplace_back(3, 6, "Pneumologie", "2026-06-02", 5, "standard", 280.0, "activa");
    internari.emplace_back(4, 7, "Cardiologie", "2026-05-31", 7, "terapie", 450.0, "activa");
    internari.emplace_back(5, 8, "Chirurgie", "2026-06-02", 3, "standard", 320.0, "activa");

    facturi.push_back(FacturaFactory::facturaCuMedicamente(1, 1, "2026-06-02", 200, 0, 120, 32, 40));
    facturi.push_back(FacturaFactory::facturaCompleta(2, 2, "2026-06-02", 220, 1000, 180, 0));
    facturi.push_back(FacturaFactory::facturaCompleta(3, 4, "2026-06-02", 250, 1800, 300, 50));
    facturi.push_back(FacturaFactory::facturaCompleta(4, 6, "2026-06-02", 210, 1400, 240, 0));
    facturi.push_back(FacturaFactory::facturaCompleta(5, 7, "2026-06-02", 260, 3150, 420, 100));

    istoricMedical.emplace_back(1, 1, "Gripa", "Paracetamol", "2026-05-20", "Evolutie buna");
    istoricMedical.emplace_back(2, 3, "Hipertensiune arteriala", "Monitorizare tensiune si dieta hiposodata", "2026-05-28", "Necesita control lunar");
    istoricMedical.emplace_back(3, 6, "Pneumonie", "Antibiotic si repaus", "2026-06-01", "Internare recomandata");

    retete.emplace_back(1, 1, 1, "Paracetamol", "1 comprimat la 8 ore", "5 zile", "2026-06-02");
    retete.emplace_back(2, 3, 1, "Antihipertensiv", "1 comprimat dimineata", "30 zile", "2026-06-02");
    retete.emplace_back(3, 6, 3, "Antibiotic", "1 comprimat la 12 ore", "7 zile", "2026-06-02");
}

static void afiseazaMeniu() {
    std::cout << "\n===== Hospital Management | meniu principal C++ =====\n"
              << "1. Adauga pacient\n"
              << "2. Afiseaza pacienti\n"
              << "3. Adauga medic\n"
              << "4. Afiseaza medici\n"
              << "5. Creeaza programare\n"
              << "6. Afiseaza programari\n"
              << "7. Anuleaza programare\n"
              << "8. Finalizeaza programare\n"
              << "9. Interneaza pacient\n"
              << "10. Externeaza pacient\n"
              << "11. Afiseaza internari\n"
              << "12. Emite factura\n"
              << "13. Afiseaza facturi\n"
              << "14. Cauta facturi dupa pacient\n"
              << "15. Calculeaza venit total\n"
              << "16. Genereaza JSON pentru web\n"
              << "17. Genereaza raport\n"
              << "0. Iesire\n"
              << "Optiune: ";
}

int main() {
    incarcaDateInitiale();
    int optiune = -1;

    while (optiune != 0) {
        try {
            afiseazaMeniu();
            std::cin >> optiune;
            std::cin.ignore();

            switch (optiune) {
            case 1: adaugaPacient(); salveazaDateAplicatie(); break;
            case 2: afiseazaPacienti(); break;
            case 3: adaugaMedic(); salveazaDateAplicatie(); break;
            case 4: afiseazaMedici(); break;
            case 5: creeazaProgramare(); salveazaDateAplicatie(); break;
            case 6: afiseazaProgramari(); break;
            case 7: anuleazaProgramare(); salveazaDateAplicatie(); break;
            case 8: finalizeazaProgramare(); salveazaDateAplicatie(); break;
            case 9: interneazaPacient(); salveazaDateAplicatie(); break;
            case 10: externeazaPacient(); salveazaDateAplicatie(); break;
            case 11: afiseazaInternari(); break;
            case 12: emiteFactura(); salveazaDateAplicatie(); break;
            case 13: afiseazaFacturi(); break;
            case 14: cautaFacturiDupaPacient(); break;
            case 15: calculeazaVenitTotalFacturi(); break;
            case 16:
                if (!arePermisiune("admin")) {
                    std::cout << "Nu ai permisiune pentru aceasta operatie.\n";
                    break;
                }
                salveazaDateAplicatie();
                std::cout << "JSON generat in folderul data/.\n";
                break;
            case 17: genereazaRaportSpital(); break;
            case 0:
                std::cout << "La revedere!\n";
                break;
            default:
                std::cout << "Optiune invalida.\n";
            }
        } catch (const std::exception& ex) {
            std::cout << "Eroare: " << ex.what() << "\n";
        }
    }

    return 0;
}
