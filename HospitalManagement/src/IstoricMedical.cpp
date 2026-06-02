#include "IstoricMedical.h"

#include "Logger.h"
#include <fstream>
#include <iostream>

static std::string escapeJsonIstoric(const std::string& text) {
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

IstoricMedical::IstoricMedical() : idIstoric(0), idPacient(0) {}

IstoricMedical::IstoricMedical(int idIstoric, int idPacient, const std::string& diagnosticAnterior,
                               const std::string& tratament, const std::string& dataConsultatie,
                               const std::string& observatiiMedic)
    : idIstoric(idIstoric), idPacient(idPacient), diagnosticAnterior(diagnosticAnterior),
      tratament(tratament), dataConsultatie(dataConsultatie), observatiiMedic(observatiiMedic) {}

int IstoricMedical::getIdIstoric() const { return idIstoric; }
int IstoricMedical::getIdPacient() const { return idPacient; }
std::string IstoricMedical::getDiagnosticAnterior() const { return diagnosticAnterior; }
std::string IstoricMedical::getTratament() const { return tratament; }
std::string IstoricMedical::getDataConsultatie() const { return dataConsultatie; }
std::string IstoricMedical::getObservatiiMedic() const { return observatiiMedic; }

void IstoricMedical::afisare() const {
    std::cout << "Istoric #" << idIstoric << " | Pacient: " << idPacient
              << " | Diagnostic: " << diagnosticAnterior
              << " | Tratament: " << tratament
              << " | Data: " << dataConsultatie
              << " | Observatii: " << observatiiMedic << "\n";
}

void IstoricMedical::adaugaIstoric(std::vector<IstoricMedical>& istoric, const IstoricMedical& intrare) {
    istoric.push_back(intrare);
    Logger::log("adaugare istoric medical pentru pacient ID " + std::to_string(intrare.getIdPacient()));
}

void IstoricMedical::afiseazaIstoricPacient(const std::vector<IstoricMedical>& istoric, int idPacient) {
    for (const auto& intrare : istoric) {
        if (intrare.getIdPacient() == idPacient) {
            intrare.afisare();
        }
    }
}

void IstoricMedical::exportIstoricJson(const std::vector<IstoricMedical>& istoric, const std::string& cale) {
    std::ofstream out(cale);
    out << "[\n";
    for (size_t i = 0; i < istoric.size(); ++i) {
        const auto& intrare = istoric[i];
        out << "  {"
            << "\"idIstoric\":" << intrare.getIdIstoric() << ","
            << "\"idPacient\":" << intrare.getIdPacient() << ","
            << "\"diagnosticAnterior\":\"" << escapeJsonIstoric(intrare.getDiagnosticAnterior()) << "\","
            << "\"tratament\":\"" << escapeJsonIstoric(intrare.getTratament()) << "\","
            << "\"dataConsultatie\":\"" << escapeJsonIstoric(intrare.getDataConsultatie()) << "\","
            << "\"observatiiMedic\":\"" << escapeJsonIstoric(intrare.getObservatiiMedic()) << "\""
            << "}" << (i + 1 < istoric.size() ? "," : "") << "\n";
    }
    out << "]\n";
}
