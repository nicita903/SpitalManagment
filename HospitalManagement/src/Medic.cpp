#include "Medic.h"

Medic::Medic() : numarConsultatii(0) {}

Medic::Medic(int id, const std::string& nume, const std::string& prenume, int varsta,
             const std::string& telefon, double salariu, const std::string& sectie,
             const std::string& specializare, const std::string& codParafa,
             int numarConsultatii)
    : Angajat(id, nume, prenume, varsta, telefon, salariu, sectie, "Medic"),
      specializare(specializare), codParafa(codParafa),
      numarConsultatii(numarConsultatii) {}

std::string Medic::getSpecializare() const { return specializare; }
std::string Medic::getCodParafa() const { return codParafa; }
int Medic::getNumarConsultatii() const { return numarConsultatii; }

void Medic::setSpecializare(const std::string& specializareNoua) { specializare = specializareNoua; }
void Medic::setCodParafa(const std::string& codParafaNou) { codParafa = codParafaNou; }
void Medic::setNumarConsultatii(int numarConsultatiiNou) { numarConsultatii = numarConsultatiiNou; }

double Medic::calculeazaBonus() const {
    return salariu * 0.15 + numarConsultatii * 25.0;
}

void Medic::afisare() const {
    Angajat::afisare();
    std::cout << ", Specializare: " << specializare
              << ", Cod parafa: " << codParafa
              << ", Consultatii: " << numarConsultatii << "\n";
}
