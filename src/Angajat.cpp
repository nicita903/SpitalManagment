#include "Angajat.h"

#include <string>

Angajat::Angajat(int id, const std::string& nume, double salariu)
    : Persoana(std::to_string(id), nume), id(id), salariu(salariu) {}

int Angajat::getId() const {
    return id;
}

double Angajat::getSalariu() const {
    return salariu;
}

std::string Angajat::getTipPersoana() const {
    return "Angajat";
}
