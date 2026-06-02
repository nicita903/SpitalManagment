#include "Sectie.h"

#include "Exceptions.h"
#include <iostream>

Sectie::Sectie() : idSectie(0), etaj(0), numarPaturiTotal(0), numarPaturiOcupate(0) {}

Sectie::Sectie(int idSectie, const std::string& denumire, int etaj,
               int numarPaturiTotal, int numarPaturiOcupate)
    : idSectie(idSectie), denumire(denumire), etaj(etaj),
      numarPaturiTotal(numarPaturiTotal), numarPaturiOcupate(numarPaturiOcupate) {}

int Sectie::getIdSectie() const { return idSectie; }
std::string Sectie::getDenumire() const { return denumire; }
int Sectie::getEtaj() const { return etaj; }
int Sectie::getNumarPaturiTotal() const { return numarPaturiTotal; }
int Sectie::getNumarPaturiOcupate() const { return numarPaturiOcupate; }

bool Sectie::arePaturiDisponibile() const {
    return numarPaturiOcupate < numarPaturiTotal;
}

void Sectie::ocupaPat() {
    if (!arePaturiDisponibile()) {
        throw SectiePlinaException("Sectia " + denumire + " nu are paturi disponibile.");
    }
    ++numarPaturiOcupate;
}

void Sectie::elibereazaPat() {
    if (numarPaturiOcupate > 0) {
        --numarPaturiOcupate;
    }
}

void Sectie::afisareSectie() const {
    std::cout << "Sectie #" << idSectie << " | " << denumire
              << " | Etaj: " << etaj
              << " | Paturi: " << numarPaturiOcupate << "/" << numarPaturiTotal << "\n";
}
