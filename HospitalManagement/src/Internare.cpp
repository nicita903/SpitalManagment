#include "Internare.h"

#include "Exceptions.h"
#include <iostream>

Internare::Internare() : idInternare(0), idPacient(0), numarZile(0), costPeZi(0.0), status("activa") {}

Internare::Internare(int idInternare, int idPacient, const std::string& sectie,
                     const std::string& dataInternare, int numarZile,
                     const std::string& tipSalon, double costPeZi,
                     const std::string& status)
    : idInternare(idInternare), idPacient(idPacient), sectie(sectie),
      dataInternare(dataInternare), numarZile(numarZile),
      tipSalon(tipSalon), costPeZi(costPeZi), status(status) {
    if (idInternare <= 0 || idPacient <= 0 || sectie.empty() || dataInternare.empty() ||
        numarZile <= 0 || tipSalon.empty() || costPeZi < 0.0 ||
        (status != "activa" && status != "finalizata")) {
        throw DateInvalideException("Date invalide pentru internare.");
    }
}

int Internare::getIdInternare() const { return idInternare; }
int Internare::getIdPacient() const { return idPacient; }
std::string Internare::getSectie() const { return sectie; }
std::string Internare::getDataInternare() const { return dataInternare; }
int Internare::getNumarZile() const { return numarZile; }
std::string Internare::getTipSalon() const { return tipSalon; }
double Internare::getCostPeZi() const { return costPeZi; }
std::string Internare::getStatus() const { return status; }

void Internare::finalizeaza() {
    status = "finalizata";
}

bool Internare::esteActiva() const {
    return status == "activa";
}

double Internare::calculeazaCostInternare() const {
    return numarZile * costPeZi;
}

void Internare::afisare() const {
    std::cout << "Internare #" << idInternare << " | Pacient: " << idPacient
              << " | Sectie: " << sectie << " | Zile: " << numarZile
              << " | Salon: " << tipSalon
              << " | Status: " << status
              << " | Cost: " << calculeazaCostInternare() << " lei\n";
}
