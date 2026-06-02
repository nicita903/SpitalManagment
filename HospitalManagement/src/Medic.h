#ifndef MEDIC_H
#define MEDIC_H

#include "Angajat.h"
#include <string>

class Medic : public Angajat {
private:
    std::string specializare;
    std::string codParafa;
    int numarConsultatii;

public:
    Medic();
    Medic(int id, const std::string& nume, const std::string& prenume, int varsta,
          const std::string& telefon, double salariu, const std::string& sectie,
          const std::string& specializare, const std::string& codParafa,
          int numarConsultatii);

    std::string getSpecializare() const;
    std::string getCodParafa() const;
    int getNumarConsultatii() const;

    void setSpecializare(const std::string& specializareNoua);
    void setCodParafa(const std::string& codParafaNou);
    void setNumarConsultatii(int numarConsultatiiNou);

    double calculeazaBonus() const override;
    void afisare() const override;
};

#endif
