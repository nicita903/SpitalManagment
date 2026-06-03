#ifndef ANGAJAT_H
#define ANGAJAT_H

#include "Persoana.h"

class Angajat : public Persoana {
protected:
    int id;
    double salariu;

public:
    Angajat(int id, const std::string& nume, double salariu);
    virtual ~Angajat() = default;

    int getId() const;
    double getSalariu() const;

    virtual std::string getRol() const = 0;
    virtual double calculeazaBonus() const = 0;
    std::string getTipPersoana() const override;
};

#endif
