#include "RaportSpital.h"

#include "Logger.h"
#include "StatisticiSpital.h"
#include <filesystem>
#include <fstream>
#include <iomanip>

static std::string escapeJsonRaport(const std::string& text) {
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

int RaportSpital::numaraPacientiCriticiUrgenti(const std::vector<Pacient>& pacienti) {
    int total = 0;
    for (const auto& pacient : pacienti) {
        if (pacient.getPrioritate() == "critica" || pacient.getPrioritate() == "urgenta") {
            ++total;
        }
    }
    return total;
}

void RaportSpital::genereazaRaportText(const std::vector<Pacient>& pacienti,
                                       const std::vector<Medic>& medici,
                                       const std::vector<Programare>& programari,
                                       const std::vector<Factura>& facturi,
                                       const std::string& cale) {
    std::filesystem::create_directories("data");
    StatisticiSpital statistici(pacienti, medici, programari, facturi);
    std::ofstream out(cale);
    out << std::fixed << std::setprecision(2)
        << "Raport spital\n"
        << "Numar total pacienti: " << statistici.calculeazaTotalPacienti() << "\n"
        << "Numar pacienti internati: " << statistici.calculeazaPacientiInternati() << "\n"
        << "Numar medici: " << statistici.calculeazaTotalMedici() << "\n"
        << "Numar programari active: " << statistici.calculeazaProgramariActive() << "\n"
        << "Numar facturi: " << statistici.calculeazaTotalFacturi() << "\n"
        << "Venit total: " << statistici.calculeazaVenitTotal() << "\n"
        << "Diagnostic frecvent: " << statistici.gasesteDiagnosticFrecvent() << "\n"
        << "Pacienti critici/urgenti: " << numaraPacientiCriticiUrgenti(pacienti) << "\n";
}

void RaportSpital::genereazaRaportJson(const std::vector<Pacient>& pacienti,
                                       const std::vector<Medic>& medici,
                                       const std::vector<Programare>& programari,
                                       const std::vector<Factura>& facturi,
                                       const std::string& cale) {
    std::filesystem::create_directories("data");
    StatisticiSpital statistici(pacienti, medici, programari, facturi);
    std::ofstream out(cale);
    out << std::fixed << std::setprecision(2)
        << "{\n"
        << "  \"totalPacienti\": " << statistici.calculeazaTotalPacienti() << ",\n"
        << "  \"pacientiInternati\": " << statistici.calculeazaPacientiInternati() << ",\n"
        << "  \"totalMedici\": " << statistici.calculeazaTotalMedici() << ",\n"
        << "  \"programariActive\": " << statistici.calculeazaProgramariActive() << ",\n"
        << "  \"totalFacturi\": " << statistici.calculeazaTotalFacturi() << ",\n"
        << "  \"venitTotal\": " << statistici.calculeazaVenitTotal() << ",\n"
        << "  \"diagnosticFrecvent\": \"" << escapeJsonRaport(statistici.gasesteDiagnosticFrecvent()) << "\",\n"
        << "  \"pacientiCriticiUrgenti\": " << numaraPacientiCriticiUrgenti(pacienti) << "\n"
        << "}\n";
}

void RaportSpital::genereazaRaportComplet(const std::vector<Pacient>& pacienti,
                                          const std::vector<Medic>& medici,
                                          const std::vector<Programare>& programari,
                                          const std::vector<Factura>& facturi) {
    genereazaRaportText(pacienti, medici, programari, facturi, "data/raport_spital.txt");
    genereazaRaportJson(pacienti, medici, programari, facturi, "data/raport_spital.json");
    Logger::log("generare raport spital text si JSON");
}
