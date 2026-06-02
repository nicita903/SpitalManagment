#ifndef ANGAJAT_H
#define ANGAJAT_H

#include "Persoana.h"
#include <string>

class Angajat : public Persoana {
protected:
    double salariu;
    std::string sectie;
    std::string functie;

public:
    Angajat();
    Angajat(int id, const std::string& nume, const std::string& prenume, int varsta,
            const std::string& telefon, double salariu,
            const std::string& sectie, const std::string& functie);
    virtual ~Angajat() = default;

    double getSalariu() const;
    std::string getSectie() const;
    std::string getFunctie() const;

    void setSalariu(double salariuNou);
    void setSectie(const std::string& sectieNoua);
    void setFunctie(const std::string& functieNoua);

    virtual double calculeazaBonus() const = 0;
    void afisare() const override;
};

#endif
