#include "Medicament.h"

#include "Exceptions.h"
#include <iostream>

Medicament::Medicament()
    : idMedicament(0), pretUnitar(0.0), stoc(0), necesitaReteta("nu") {}

Medicament::Medicament(int idMedicament, const std::string& denumire,
                       const std::string& substantaActiva, double pretUnitar,
                       int stoc, const std::string& necesitaReteta)
    : idMedicament(idMedicament), denumire(denumire), substantaActiva(substantaActiva),
      pretUnitar(pretUnitar), stoc(stoc), necesitaReteta(necesitaReteta) {
    if (idMedicament <= 0 || denumire.empty() || pretUnitar < 0.0 || stoc < 0) {
        throw DateInvalideException("Date invalide pentru medicament.");
    }
}

int Medicament::getIdMedicament() const { return idMedicament; }
std::string Medicament::getDenumire() const { return denumire; }
std::string Medicament::getSubstantaActiva() const { return substantaActiva; }
double Medicament::getPretUnitar() const { return pretUnitar; }
int Medicament::getStoc() const { return stoc; }
std::string Medicament::getNecesitaReteta() const { return necesitaReteta; }

void Medicament::adaugaStoc(int cantitate) {
    if (cantitate <= 0) {
        throw DateInvalideException("Cantitatea adaugata trebuie sa fie pozitiva.");
    }
    stoc += cantitate;
}

void Medicament::scadeStoc(int cantitate) {
    if (cantitate <= 0 || cantitate > stoc) {
        throw DateInvalideException("Stoc insuficient sau cantitate invalida.");
    }
    stoc -= cantitate;
}

double Medicament::calculeazaCost(int cantitate) const {
    if (cantitate <= 0) {
        throw DateInvalideException("Cantitatea trebuie sa fie pozitiva.");
    }
    return pretUnitar * cantitate;
}

void Medicament::afisare() const {
    std::cout << "Medicament #" << idMedicament << " | " << denumire
              << " | Stoc: " << stoc << " | Pret: " << pretUnitar << " lei\n";
}
