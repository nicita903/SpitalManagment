#ifndef MEDIC_H
#define MEDIC_H

#include "Angajat.h"
#include <string>

class Medic : public Angajat {
private:
    std::string specializare;
    double tarifConsultatie;

public:
    Medic(int id, const std::string& nume, double salariu,
          const std::string& specializare, double tarifConsultatie);

    std::string getSpecializare() const;
    double getTarifConsultatie() const;

    std::string getRol() const override;
    std::string getTipPersoana() const override;
    double calculeazaBonus() const override;
};

#endif
