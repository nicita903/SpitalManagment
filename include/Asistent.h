#ifndef ASISTENT_H
#define ASISTENT_H

#include "Angajat.h"
#include <string>

class Asistent : public Angajat {
private:
    std::string sectie;
    int aniExperienta;

public:
    Asistent(int id, const std::string& nume, double salariu,
             const std::string& sectie, int aniExperienta);

    std::string getSectie() const;
    int getAniExperienta() const;

    std::string getRol() const override;
    std::string getTipPersoana() const override;
    double calculeazaBonus() const override;
};

#endif
