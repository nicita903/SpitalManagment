#include "Medic.h"

Medic::Medic(int id, const std::string& nume, double salariu,
             const std::string& specializare, double tarifConsultatie)
    : Angajat(id, nume, salariu),
      specializare(specializare),
      tarifConsultatie(tarifConsultatie) {}

std::string Medic::getSpecializare() const {
    return specializare;
}

double Medic::getTarifConsultatie() const {
    return tarifConsultatie;
}

std::string Medic::getRol() const {
    return "Medic";
}

std::string Medic::getTipPersoana() const {
    return "Medic";
}

double Medic::calculeazaBonus() const {
    return salariu * 0.18 + tarifConsultatie * 2.0;
}
