#include "Pacient.h"

Pacient::Pacient(const std::string& cnp, const std::string& nume,
                 int varsta, const std::string& diagnostic)
    : Persoana(cnp, nume), cnp(cnp), varsta(varsta), diagnostic(diagnostic), internat(false) {}

std::string Pacient::getCnp() const {
    return cnp;
}

int Pacient::getVarsta() const {
    return varsta;
}

std::string Pacient::getDiagnostic() const {
    return diagnostic;
}

bool Pacient::esteInternat() const {
    return internat;
}

std::string Pacient::getTipPersoana() const {
    return "Pacient";
}

void Pacient::setDiagnostic(const std::string& diagnosticNou) {
    diagnostic = diagnosticNou;
}

void Pacient::setInternat(bool valoare) {
    internat = valoare;
}
