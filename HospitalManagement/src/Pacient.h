#ifndef PACIENT_H
#define PACIENT_H

#include "Persoana.h"
#include <string>

class Pacient : public Persoana {
private:
    std::string diagnostic;
    std::string grupaSange;
    std::string adresa;
    bool internat;
    std::string alergii;
    std::string prioritate;

public:
    Pacient();
    Pacient(int id, const std::string& nume, const std::string& prenume, int varsta,
            const std::string& telefon, const std::string& diagnostic,
            const std::string& grupaSange, const std::string& adresa,
            bool internat, const std::string& alergii,
            const std::string& prioritate = "medie");

    std::string getDiagnostic() const;
    std::string getGrupaSange() const;
    std::string getAdresa() const;
    bool esteInternat() const;
    std::string getAlergii() const;
    std::string getPrioritate() const;

    void setDiagnostic(const std::string& diagnosticNou);
    void setGrupaSange(const std::string& grupaSangeNoua);
    void setAdresa(const std::string& adresaNoua);
    void setInternat(bool internatNou);
    void setAlergii(const std::string& alergiiNoi);
    void seteazaPrioritate(const std::string& prioritateNoua);

    void afisare() const override;
};

#endif
