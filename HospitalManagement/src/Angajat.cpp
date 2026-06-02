#include "Angajat.h"

Angajat::Angajat() : salariu(0.0) {}

Angajat::Angajat(int id, const std::string& nume, const std::string& prenume, int varsta,
                 const std::string& telefon, double salariu,
                 const std::string& sectie, const std::string& functie)
    : Persoana(id, nume, prenume, varsta, telefon),
      salariu(salariu), sectie(sectie), functie(functie) {}

double Angajat::getSalariu() const { return salariu; }
std::string Angajat::getSectie() const { return sectie; }
std::string Angajat::getFunctie() const { return functie; }

void Angajat::setSalariu(double salariuNou) { salariu = salariuNou; }
void Angajat::setSectie(const std::string& sectieNoua) { sectie = sectieNoua; }
void Angajat::setFunctie(const std::string& functieNoua) { functie = functieNoua; }

void Angajat::afisare() const {
    Persoana::afisare();
    std::cout << ", Sectie: " << sectie << ", Functie: " << functie
              << ", Salariu: " << salariu << ", Bonus: " << calculeazaBonus();
}
