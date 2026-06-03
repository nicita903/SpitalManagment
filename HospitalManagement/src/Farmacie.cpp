#include "Farmacie.h"

#include "Exceptions.h"
#include "Logger.h"
#include <filesystem>
#include <fstream>
#include <iomanip>

static std::string escapeJsonFarmacie(const std::string& text) {
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

static void pregatesteFisierFarmacie(const std::string& cale) {
    std::filesystem::path path(cale);
    if (path.has_parent_path()) {
        std::filesystem::create_directories(path.parent_path());
    }
}

void Farmacie::adaugaMedicament(std::vector<Medicament>& medicamente, const Medicament& medicament) {
    medicamente.push_back(medicament);
    Logger::log("adaugare medicament ID " + std::to_string(medicament.getIdMedicament()));
}

Medicament* Farmacie::cautaMedicament(std::vector<Medicament>& medicamente, int idMedicament) {
    for (auto& medicament : medicamente) {
        if (medicament.getIdMedicament() == idMedicament) {
            return &medicament;
        }
    }
    return nullptr;
}

AchizitieMedicamente Farmacie::vindeMedicament(std::vector<Medicament>& medicamente,
                                               int idAchizitie, int idPacient, int idMedicament,
                                               int cantitate, const std::string& dataAchizitie,
                                               int idReteta) {
    Medicament* medicament = cautaMedicament(medicamente, idMedicament);
    if (!medicament) {
        throw DateInvalideException("Medicamentul nu exista in farmacie.");
    }

    const double pretTotal = medicament->calculeazaCost(cantitate);
    medicament->scadeStoc(cantitate);
    Logger::log("achizitie medicamente pentru pacient ID " + std::to_string(idPacient));
    return AchizitieMedicamente(idAchizitie, idPacient, idMedicament, cantitate, pretTotal, dataAchizitie, idReteta);
}

double Farmacie::calculeazaValoareStoc(const std::vector<Medicament>& medicamente) {
    double total = 0.0;
    for (const auto& medicament : medicamente) {
        total += medicament.getPretUnitar() * medicament.getStoc();
    }
    return total;
}

void Farmacie::exportMedicamenteJson(const std::vector<Medicament>& medicamente, const std::string& cale) {
    pregatesteFisierFarmacie(cale);
    std::ofstream out(cale);
    out << std::fixed << std::setprecision(2) << "[\n";
    for (size_t i = 0; i < medicamente.size(); ++i) {
        const auto& medicament = medicamente[i];
        out << "  {"
            << "\"idMedicament\":" << medicament.getIdMedicament() << ","
            << "\"denumire\":\"" << escapeJsonFarmacie(medicament.getDenumire()) << "\","
            << "\"substantaActiva\":\"" << escapeJsonFarmacie(medicament.getSubstantaActiva()) << "\","
            << "\"pretUnitar\":" << medicament.getPretUnitar() << ","
            << "\"stoc\":" << medicament.getStoc() << ","
            << "\"necesitaReteta\":\"" << escapeJsonFarmacie(medicament.getNecesitaReteta()) << "\""
            << "}" << (i + 1 < medicamente.size() ? "," : "") << "\n";
    }
    out << "]\n";
    Logger::log("export medicamente JSON");
}

void Farmacie::exportAchizitiiJson(const std::vector<AchizitieMedicamente>& achizitii, const std::string& cale) {
    pregatesteFisierFarmacie(cale);
    std::ofstream out(cale);
    out << std::fixed << std::setprecision(2) << "[\n";
    for (size_t i = 0; i < achizitii.size(); ++i) {
        const auto& achizitie = achizitii[i];
        out << "  {"
            << "\"idAchizitie\":" << achizitie.getIdAchizitie() << ","
            << "\"idPacient\":" << achizitie.getIdPacient() << ","
            << "\"idMedicament\":" << achizitie.getIdMedicament() << ","
            << "\"cantitate\":" << achizitie.getCantitate() << ","
            << "\"pretTotal\":" << achizitie.getPretTotal() << ","
            << "\"dataAchizitie\":\"" << escapeJsonFarmacie(achizitie.getDataAchizitie()) << "\","
            << "\"idReteta\":" << achizitie.getIdReteta()
            << "}" << (i + 1 < achizitii.size() ? "," : "") << "\n";
    }
    out << "]\n";
    Logger::log("export achizitii medicamente JSON");
}
