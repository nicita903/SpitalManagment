#include "StatisticiSpital.h"

#include <map>

StatisticiSpital::StatisticiSpital(const std::vector<Pacient>& pacienti,
                                   const std::vector<Medic>& medici,
                                   const std::vector<Programare>& programari,
                                   const std::vector<Factura>& facturi)
    : pacienti(pacienti), medici(medici), programari(programari), facturi(facturi) {}

int StatisticiSpital::calculeazaTotalPacienti() const {
    return static_cast<int>(pacienti.size());
}

int StatisticiSpital::calculeazaPacientiInternati() const {
    int total = 0;
    for (const auto& pacient : pacienti) {
        if (pacient.esteInternat()) {
            ++total;
        }
    }
    return total;
}

int StatisticiSpital::calculeazaTotalMedici() const {
    return static_cast<int>(medici.size());
}

int StatisticiSpital::calculeazaProgramariActive() const {
    int total = 0;
    for (const auto& programare : programari) {
        if (programare.getStatus() != "anulata" && programare.getStatus() != "finalizata") {
            ++total;
        }
    }
    return total;
}

int StatisticiSpital::calculeazaTotalFacturi() const {
    return static_cast<int>(facturi.size());
}

double StatisticiSpital::calculeazaVenitTotal() const {
    double total = 0.0;
    for (const auto& factura : facturi) {
        total += factura.getTotal();
    }
    return total;
}

std::string StatisticiSpital::gasesteDiagnosticFrecvent() const {
    std::map<std::string, int> frecventa;
    for (const auto& pacient : pacienti) {
        if (!pacient.getDiagnostic().empty()) {
            ++frecventa[pacient.getDiagnostic()];
        }
    }

    std::string diagnostic = "N/A";
    int maxim = 0;
    for (const auto& pereche : frecventa) {
        if (pereche.second > maxim) {
            maxim = pereche.second;
            diagnostic = pereche.first;
        }
    }
    return diagnostic;
}
