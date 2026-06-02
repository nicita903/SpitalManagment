#ifndef SECTIE_H
#define SECTIE_H

#include <string>

class Sectie {
private:
    int idSectie;
    std::string denumire;
    int etaj;
    int numarPaturiTotal;
    int numarPaturiOcupate;

public:
    Sectie();
    Sectie(int idSectie, const std::string& denumire, int etaj,
           int numarPaturiTotal, int numarPaturiOcupate = 0);

    int getIdSectie() const;
    std::string getDenumire() const;
    int getEtaj() const;
    int getNumarPaturiTotal() const;
    int getNumarPaturiOcupate() const;

    bool arePaturiDisponibile() const;
    void ocupaPat();
    void elibereazaPat();
    void afisareSectie() const;
};

#endif
