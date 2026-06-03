#include "Internare.h"

#include "Logger.h"

Internare::Internare(int id, const std::string& cnpPacient, const std::string& sectie,
                     const std::string& dataInternare, int numarZile)
    : id(id), cnpPacient(cnpPacient), sectie(sectie),
      dataInternare(dataInternare), numarZile(numarZile) {
    Logger::instanta().log("Internare inregistrata: pacient CNP " + cnpPacient +
                           ", sectie " + sectie +
                           ", zile " + std::to_string(numarZile));
}

int Internare::getId() const {
    return id;
}

std::string Internare::getCnpPacient() const {
    return cnpPacient;
}

std::string Internare::getSectie() const {
    return sectie;
}

std::string Internare::getDataInternare() const {
    return dataInternare;
}

int Internare::getNumarZile() const {
    return numarZile;
}

double Internare::calculeazaCostInternare() const {
    return 250.0 * numarZile;
}
