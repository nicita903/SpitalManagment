#include "Asistent.h"

Asistent::Asistent(int id, const std::string& nume, double salariu,
                   const std::string& sectie, int aniExperienta)
    : Angajat(id, nume, salariu),
      sectie(sectie),
      aniExperienta(aniExperienta) {}

std::string Asistent::getSectie() const {
    return sectie;
}

int Asistent::getAniExperienta() const {
    return aniExperienta;
}

std::string Asistent::getRol() const {
    return "Asistent";
}

std::string Asistent::getTipPersoana() const {
    return "Asistent";
}

double Asistent::calculeazaBonus() const {
    return salariu * 0.10 + aniExperienta * 75.0;
}
