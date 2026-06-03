#ifndef MEDICAMENT_H
#define MEDICAMENT_H

#include <string>

class Medicament {
private:
    int idMedicament;
    std::string denumire;
    std::string substantaActiva;
    double pretUnitar;
    int stoc;
    std::string necesitaReteta;

public:
    Medicament();
    Medicament(int idMedicament, const std::string& denumire, const std::string& substantaActiva,
               double pretUnitar, int stoc, const std::string& necesitaReteta);

    int getIdMedicament() const;
    std::string getDenumire() const;
    std::string getSubstantaActiva() const;
    double getPretUnitar() const;
    int getStoc() const;
    std::string getNecesitaReteta() const;

    void adaugaStoc(int cantitate);
    void scadeStoc(int cantitate);
    double calculeazaCost(int cantitate) const;
    void afisare() const;
};

#endif
