#include "DataManager.h"

#include <filesystem>
#include <fstream>
#include <iomanip>

static void pregatesteFisier(const std::string& cale) {
    std::filesystem::path path(cale);
    if (path.has_parent_path()) {
        std::filesystem::create_directories(path.parent_path());
    }
}

std::string DataManager::escapeJson(const std::string& text) {
    std::string rezultat;
    for (char c : text) {
        if (c == '"') {
            rezultat += "\\\"";
        } else if (c == '\\') {
            rezultat += "\\\\";
        } else {
            rezultat += c;
        }
    }
    return rezultat;
}

void DataManager::salveazaPacienti(const std::vector<Pacient>& pacienti, const std::string& cale) {
    pregatesteFisier(cale);
    std::ofstream out(cale);
    out << std::fixed << std::setprecision(2) << "[\n";
    for (size_t i = 0; i < pacienti.size(); ++i) {
        const Pacient& p = pacienti[i];
        out << "  {"
            << "\"id\":" << p.getId() << ","
            << "\"nume\":\"" << escapeJson(p.getNume()) << "\","
            << "\"prenume\":\"" << escapeJson(p.getPrenume()) << "\","
            << "\"varsta\":" << p.getVarsta() << ","
            << "\"telefon\":\"" << escapeJson(p.getTelefon()) << "\","
            << "\"diagnostic\":\"" << escapeJson(p.getDiagnostic()) << "\","
            << "\"grupaSange\":\"" << escapeJson(p.getGrupaSange()) << "\","
            << "\"adresa\":\"" << escapeJson(p.getAdresa()) << "\","
            << "\"internat\":" << (p.esteInternat() ? "true" : "false") << ","
            << "\"alergii\":\"" << escapeJson(p.getAlergii()) << "\","
            << "\"prioritate\":\"" << escapeJson(p.getPrioritate()) << "\""
            << "}" << (i + 1 < pacienti.size() ? "," : "") << "\n";
    }
    out << "]\n";
}

void DataManager::salveazaMedici(const std::vector<Medic>& medici, const std::string& cale) {
    pregatesteFisier(cale);
    std::ofstream out(cale);
    out << std::fixed << std::setprecision(2) << "[\n";
    for (size_t i = 0; i < medici.size(); ++i) {
        const Medic& m = medici[i];
        out << "  {"
            << "\"id\":" << m.getId() << ","
            << "\"nume\":\"" << escapeJson(m.getNume()) << "\","
            << "\"prenume\":\"" << escapeJson(m.getPrenume()) << "\","
            << "\"telefon\":\"" << escapeJson(m.getTelefon()) << "\","
            << "\"sectie\":\"" << escapeJson(m.getSectie()) << "\","
            << "\"specializare\":\"" << escapeJson(m.getSpecializare()) << "\","
            << "\"codParafa\":\"" << escapeJson(m.getCodParafa()) << "\","
            << "\"numarConsultatii\":" << m.getNumarConsultatii()
            << "}" << (i + 1 < medici.size() ? "," : "") << "\n";
    }
    out << "]\n";
}

void DataManager::salveazaProgramari(const std::vector<Programare>& programari, const std::string& cale) {
    pregatesteFisier(cale);
    std::ofstream out(cale);
    out << "[\n";
    for (size_t i = 0; i < programari.size(); ++i) {
        const Programare& p = programari[i];
        out << "  {"
            << "\"idProgramare\":" << p.getIdProgramare() << ","
            << "\"idPacient\":" << p.getIdPacient() << ","
            << "\"idMedic\":" << p.getIdMedic() << ","
            << "\"data\":\"" << escapeJson(p.getData()) << "\","
            << "\"ora\":\"" << escapeJson(p.getOra()) << "\","
            << "\"tipConsultatie\":\"" << escapeJson(p.getTipConsultatie()) << "\","
            << "\"status\":\"" << escapeJson(p.getStatus()) << "\""
            << "}" << (i + 1 < programari.size() ? "," : "") << "\n";
    }
    out << "]\n";
}

void DataManager::salveazaFacturi(const std::vector<Factura>& facturi, const std::string& cale) {
    pregatesteFisier(cale);
    std::ofstream out(cale);
    out << std::fixed << std::setprecision(2) << "[\n";
    for (size_t i = 0; i < facturi.size(); ++i) {
        const Factura& f = facturi[i];
        out << "  {"
            << "\"idFactura\":" << f.getIdFactura() << ","
            << "\"idPacient\":" << f.getIdPacient() << ","
            << "\"dataEmitere\":\"" << escapeJson(f.getDataEmitere()) << "\","
            << "\"costConsultatie\":" << f.getCostConsultatie() << ","
            << "\"costInternare\":" << f.getCostInternare() << ","
            << "\"costTratament\":" << f.getCostTratament() << ","
            << "\"costMedicamente\":" << f.getCostMedicamente() << ","
            << "\"reducere\":" << f.getReducere() << ","
            << "\"total\":" << f.getTotal()
            << "}" << (i + 1 < facturi.size() ? "," : "") << "\n";
    }
    out << "]\n";
}

void DataManager::salveazaInternari(const std::vector<Internare>& internari, const std::string& cale) {
    pregatesteFisier(cale);
    std::ofstream out(cale);
    out << std::fixed << std::setprecision(2) << "[\n";
    for (size_t i = 0; i < internari.size(); ++i) {
        const Internare& internare = internari[i];
        out << "  {"
            << "\"idInternare\":" << internare.getIdInternare() << ","
            << "\"idPacient\":" << internare.getIdPacient() << ","
            << "\"sectie\":\"" << escapeJson(internare.getSectie()) << "\","
            << "\"dataInternare\":\"" << escapeJson(internare.getDataInternare()) << "\","
            << "\"numarZile\":" << internare.getNumarZile() << ","
            << "\"tipSalon\":\"" << escapeJson(internare.getTipSalon()) << "\","
            << "\"costPeZi\":" << internare.getCostPeZi() << ","
            << "\"status\":\"" << escapeJson(internare.getStatus()) << "\","
            << "\"costTotal\":" << internare.calculeazaCostInternare()
            << "}" << (i + 1 < internari.size() ? "," : "") << "\n";
    }
    out << "]\n";
}

void DataManager::salveazaStatistici(const StatisticiSpital& statistici, const std::string& cale) {
    pregatesteFisier(cale);
    std::ofstream out(cale);
    out << std::fixed << std::setprecision(2)
        << "{\n"
        << "  \"totalPacienti\": " << statistici.calculeazaTotalPacienti() << ",\n"
        << "  \"pacientiInternati\": " << statistici.calculeazaPacientiInternati() << ",\n"
        << "  \"totalMedici\": " << statistici.calculeazaTotalMedici() << ",\n"
        << "  \"programariActive\": " << statistici.calculeazaProgramariActive() << ",\n"
        << "  \"totalFacturi\": " << statistici.calculeazaTotalFacturi() << ",\n"
        << "  \"venitTotal\": " << statistici.calculeazaVenitTotal() << ",\n"
        << "  \"diagnosticFrecvent\": \"" << escapeJson(statistici.gasesteDiagnosticFrecvent()) << "\"\n"
        << "}\n";
}

void DataManager::salveazaTot(const std::vector<Pacient>& pacienti,
                              const std::vector<Medic>& medici,
                              const std::vector<Programare>& programari,
                              const std::vector<Internare>& internari,
                              const std::vector<Factura>& facturi) {
    salveazaPacienti(pacienti, "data/pacienti.json");
    salveazaMedici(medici, "data/medici.json");
    salveazaProgramari(programari, "data/programari.json");
    salveazaInternari(internari, "data/internari.json");
    salveazaFacturi(facturi, "data/facturi.json");
    StatisticiSpital statistici(pacienti, medici, programari, facturi);
    salveazaStatistici(statistici, "data/statistici.json");
}
