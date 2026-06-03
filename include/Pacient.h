#ifndef PACIENT_H
#define PACIENT_H

#include "Persoana.h"

class Pacient : public Persoana {
private:
    std::string cnp;
    int varsta;
    std::string diagnostic;
    bool internat;

public:
    Pacient(const std::string& cnp, const std::string& nume,
            int varsta, const std::string& diagnostic);

    std::string getCnp() const;
    int getVarsta() const;
    std::string getDiagnostic() const;
    bool esteInternat() const;
    std::string getTipPersoana() const override;

    void setDiagnostic(const std::string& diagnosticNou);
    void setInternat(bool valoare);
};

#endif
