#include "IntrareSpital.h"

#include "Exceptions.h"
#include "Logger.h"
#include <filesystem>
#include <fstream>
#include <iostream>

static bool intrareValida(const std::string& valoare, const std::vector<std::string>& valori) {
    for (const auto& v : valori) {
        if (valoare == v) return true;
    }
    return false;
}

static std::string escapeJsonIntrare(const std::string& text) {
    std::string rezultat;
    for (char c : text) {
        if (c == '"') rezultat += "\\\"";
        else if (c == '\\') rezultat += "\\\\";
        else rezultat += c;
    }
    return rezultat;
}

IntrareSpital::IntrareSpital()
    : idIntrare(0), idPacient(0), status("inregistrat") {}

IntrareSpital::IntrareSpital(int idIntrare, int idPacient, const std::string& dataIntrare,
                             const std::string& oraIntrare, const std::string& modIntrare,
                             const std::string& motivPrezentare, const std::string& nivelUrgenta,
                             const std::string& insotitor, const std::string& observatiiInitiale,
                             const std::string& status)
    : idIntrare(idIntrare), idPacient(idPacient), dataIntrare(dataIntrare), oraIntrare(oraIntrare),
      modIntrare(modIntrare), motivPrezentare(motivPrezentare), nivelUrgenta(nivelUrgenta),
      insotitor(insotitor), observatiiInitiale(observatiiInitiale), status(status) {
    if (idIntrare <= 0 || idPacient <= 0 || dataIntrare.empty() || oraIntrare.empty()) {
        throw DateInvalideException("Date invalide pentru intrarea in spital.");
    }
    if (!intrareValida(modIntrare, {"ambulanta", "prezentare_directa", "trimitere_medic_familie", "transfer_alt_spital", "programare", "urgenta"})) {
        throw DateInvalideException("Mod de intrare invalid.");
    }
    if (!intrareValida(nivelUrgenta, {"scazut", "mediu", "urgent", "critic"})) {
        throw DateInvalideException("Nivel de urgenta invalid.");
    }
    if (!intrareValida(status, {"inregistrat", "directionat_la_consultatie", "internat", "externat"})) {
        throw DateInvalideException("Status intrare invalid.");
    }
}

int IntrareSpital::getIdIntrare() const { return idIntrare; }
int IntrareSpital::getIdPacient() const { return idPacient; }
std::string IntrareSpital::getDataIntrare() const { return dataIntrare; }
std::string IntrareSpital::getOraIntrare() const { return oraIntrare; }
std::string IntrareSpital::getModIntrare() const { return modIntrare; }
std::string IntrareSpital::getMotivPrezentare() const { return motivPrezentare; }
std::string IntrareSpital::getNivelUrgenta() const { return nivelUrgenta; }
std::string IntrareSpital::getInsotitor() const { return insotitor; }
std::string IntrareSpital::getObservatiiInitiale() const { return observatiiInitiale; }
std::string IntrareSpital::getStatus() const { return status; }

void IntrareSpital::actualizeazaStatusIntrare(const std::string& statusNou) {
    if (!intrareValida(statusNou, {"inregistrat", "directionat_la_consultatie", "internat", "externat"})) {
        throw DateInvalideException("Status intrare invalid.");
    }
    status = statusNou;
}

void IntrareSpital::afisare() const {
    std::cout << "Intrare #" << idIntrare << " | Pacient: " << idPacient
              << " | " << dataIntrare << " " << oraIntrare
              << " | Mod: " << modIntrare << " | Urgenta: " << nivelUrgenta
              << " | Status: " << status << "\n";
}

void IntrareSpital::inregistreazaIntrare(std::vector<IntrareSpital>& intrari, const IntrareSpital& intrare) {
    intrari.push_back(intrare);
    Logger::log("INTRARE: Pacient ID " + std::to_string(intrare.getIdPacient()) +
                " inregistrat cu mod " + intrare.getModIntrare() + ".");
}

void IntrareSpital::afiseazaIntrari(const std::vector<IntrareSpital>& intrari) {
    for (const auto& intrare : intrari) intrare.afisare();
}

void IntrareSpital::cautaIntrareDupaPacient(const std::vector<IntrareSpital>& intrari, int idPacient) {
    for (const auto& intrare : intrari) {
        if (intrare.getIdPacient() == idPacient) intrare.afisare();
    }
}

void IntrareSpital::exportIntrariJson(const std::vector<IntrareSpital>& intrari, const std::string& cale) {
    std::filesystem::path path(cale);
    if (path.has_parent_path()) std::filesystem::create_directories(path.parent_path());
    std::ofstream out(cale);
    out << "[\n";
    for (size_t i = 0; i < intrari.size(); ++i) {
        const auto& intrare = intrari[i];
        out << "  {"
            << "\"idIntrare\":" << intrare.getIdIntrare() << ","
            << "\"idPacient\":" << intrare.getIdPacient() << ","
            << "\"dataIntrare\":\"" << escapeJsonIntrare(intrare.getDataIntrare()) << "\","
            << "\"oraIntrare\":\"" << escapeJsonIntrare(intrare.getOraIntrare()) << "\","
            << "\"modIntrare\":\"" << escapeJsonIntrare(intrare.getModIntrare()) << "\","
            << "\"motivPrezentare\":\"" << escapeJsonIntrare(intrare.getMotivPrezentare()) << "\","
            << "\"nivelUrgenta\":\"" << escapeJsonIntrare(intrare.getNivelUrgenta()) << "\","
            << "\"insotitor\":\"" << escapeJsonIntrare(intrare.getInsotitor()) << "\","
            << "\"observatiiInitiale\":\"" << escapeJsonIntrare(intrare.getObservatiiInitiale()) << "\","
            << "\"status\":\"" << escapeJsonIntrare(intrare.getStatus()) << "\""
            << "}" << (i + 1 < intrari.size() ? "," : "") << "\n";
    }
    out << "]\n";
}
