#include "Persoana.h"

Persoana::Persoana() : id(0), varsta(0) {}

Persoana::Persoana(int id, const std::string& nume, const std::string& prenume,
                   int varsta, const std::string& telefon)
    : id(id), nume(nume), prenume(prenume), varsta(varsta), telefon(telefon) {}

int Persoana::getId() const { return id; }
std::string Persoana::getNume() const { return nume; }
std::string Persoana::getPrenume() const { return prenume; }
int Persoana::getVarsta() const { return varsta; }
std::string Persoana::getTelefon() const { return telefon; }

void Persoana::setId(int idNou) { id = idNou; }
void Persoana::setNume(const std::string& numeNou) { nume = numeNou; }
void Persoana::setPrenume(const std::string& prenumeNou) { prenume = prenumeNou; }
void Persoana::setVarsta(int varstaNoua) { varsta = varstaNoua; }
void Persoana::setTelefon(const std::string& telefonNou) { telefon = telefonNou; }

void Persoana::afisare() const {
    std::cout << "ID: " << id << ", Nume: " << nume << " " << prenume
              << ", Varsta: " << varsta << ", Telefon: " << telefon;
}
