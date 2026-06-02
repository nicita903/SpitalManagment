#include "Asistent.h"

Asistent::Asistent() : aniExperienta(0) {}

Asistent::Asistent(int id, const std::string& nume, const std::string& prenume, int varsta,
                   const std::string& telefon, double salariu, const std::string& sectie,
                   const std::string& tura, int aniExperienta)
    : Angajat(id, nume, prenume, varsta, telefon, salariu, sectie, "Asistent"),
      tura(tura), aniExperienta(aniExperienta) {}

std::string Asistent::getTura() const { return tura; }
int Asistent::getAniExperienta() const { return aniExperienta; }

void Asistent::setTura(const std::string& turaNoua) { tura = turaNoua; }
void Asistent::setAniExperienta(int aniExperientaNoi) { aniExperienta = aniExperientaNoi; }

double Asistent::calculeazaBonus() const {
    return salariu * 0.08 + aniExperienta * 100.0;
}

void Asistent::afisare() const {
    Angajat::afisare();
    std::cout << ", Tura: " << tura
              << ", Ani experienta: " << aniExperienta << "\n";
}
