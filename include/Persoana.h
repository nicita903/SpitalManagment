#ifndef PERSOANA_H
#define PERSOANA_H

#include <string>

class Persoana {
protected:
    std::string identificator;
    std::string nume;

public:
    Persoana(const std::string& identificator, const std::string& nume);
    virtual ~Persoana() = default;

    std::string getIdentificator() const;
    std::string getNume() const;

    virtual std::string getTipPersoana() const = 0;
};

#endif
