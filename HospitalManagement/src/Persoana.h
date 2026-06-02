#ifndef PERSOANA_H
#define PERSOANA_H

#include <iostream>
#include <string>

class Persoana {
protected:
    int id;
    std::string nume;
    std::string prenume;
    int varsta;
    std::string telefon;

public:
    Persoana();
    Persoana(int id, const std::string& nume, const std::string& prenume,
             int varsta, const std::string& telefon);
    virtual ~Persoana() = default;

    int getId() const;
    std::string getNume() const;
    std::string getPrenume() const;
    int getVarsta() const;
    std::string getTelefon() const;

    void setId(int idNou);
    void setNume(const std::string& numeNou);
    void setPrenume(const std::string& prenumeNou);
    void setVarsta(int varstaNoua);
    void setTelefon(const std::string& telefonNou);

    virtual void afisare() const;
};

#endif
