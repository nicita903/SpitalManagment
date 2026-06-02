#include "Reteta.h"

#include "Logger.h"
#include <fstream>
#include <iostream>

static std::string escapeJsonReteta(const std::string& text) {
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

Reteta::Reteta() : idReteta(0), idPacient(0), idMedic(0) {}

Reteta::Reteta(int idReteta, int idPacient, int idMedic, const std::string& medicamente,
               const std::string& dozaj, const std::string& durataTratament,
               const std::string& dataEmitere)
    : idReteta(idReteta), idPacient(idPacient), idMedic(idMedic),
      medicamente(medicamente), dozaj(dozaj), durataTratament(durataTratament),
      dataEmitere(dataEmitere) {}

int Reteta::getIdReteta() const { return idReteta; }
int Reteta::getIdPacient() const { return idPacient; }
int Reteta::getIdMedic() const { return idMedic; }
std::string Reteta::getMedicamente() const { return medicamente; }
std::string Reteta::getDozaj() const { return dozaj; }
std::string Reteta::getDurataTratament() const { return durataTratament; }
std::string Reteta::getDataEmitere() const { return dataEmitere; }

void Reteta::afisare() const {
    std::cout << "Reteta #" << idReteta << " | Pacient: " << idPacient
              << " | Medic: " << idMedic
              << " | Medicamente: " << medicamente
              << " | Dozaj: " << dozaj
              << " | Durata: " << durataTratament
              << " | Data: " << dataEmitere << "\n";
}

void Reteta::emiteReteta(std::vector<Reteta>& retete, const Reteta& reteta) {
    retete.push_back(reteta);
    Logger::log("emitere reteta ID " + std::to_string(reteta.getIdReteta()) +
                " pentru pacient ID " + std::to_string(reteta.getIdPacient()));
}

void Reteta::afiseazaRetete(const std::vector<Reteta>& retete) {
    for (const auto& reteta : retete) {
        reteta.afisare();
    }
}

void Reteta::cautaRetetaDupaPacient(const std::vector<Reteta>& retete, int idPacient) {
    for (const auto& reteta : retete) {
        if (reteta.getIdPacient() == idPacient) {
            reteta.afisare();
        }
    }
}

void Reteta::exportReteteJson(const std::vector<Reteta>& retete, const std::string& cale) {
    std::ofstream out(cale);
    out << "[\n";
    for (size_t i = 0; i < retete.size(); ++i) {
        const auto& reteta = retete[i];
        out << "  {"
            << "\"idReteta\":" << reteta.getIdReteta() << ","
            << "\"idPacient\":" << reteta.getIdPacient() << ","
            << "\"idMedic\":" << reteta.getIdMedic() << ","
            << "\"medicamente\":\"" << escapeJsonReteta(reteta.getMedicamente()) << "\","
            << "\"dozaj\":\"" << escapeJsonReteta(reteta.getDozaj()) << "\","
            << "\"durataTratament\":\"" << escapeJsonReteta(reteta.getDurataTratament()) << "\","
            << "\"dataEmitere\":\"" << escapeJsonReteta(reteta.getDataEmitere()) << "\""
            << "}" << (i + 1 < retete.size() ? "," : "") << "\n";
    }
    out << "]\n";
}
