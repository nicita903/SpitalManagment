#ifndef ASISTENT_H
#define ASISTENT_H

#include "Angajat.h"
#include <string>

class Asistent : public Angajat {
private:
    std::string tura;
    int aniExperienta;

public:
    Asistent();
    Asistent(int id, const std::string& nume, const std::string& prenume, int varsta,
             const std::string& telefon, double salariu, const std::string& sectie,
             const std::string& tura, int aniExperienta);

    std::string getTura() const;
    int getAniExperienta() const;

    void setTura(const std::string& turaNoua);
    void setAniExperienta(int aniExperientaNoi);

    double calculeazaBonus() const override;
    void afisare() const override;
};

#endif
