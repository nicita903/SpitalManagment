#include "Persoana.h"

Persoana::Persoana(const std::string& identificator, const std::string& nume)
    : identificator(identificator), nume(nume) {}

std::string Persoana::getIdentificator() const {
    return identificator;
}

std::string Persoana::getNume() const {
    return nume;
}
