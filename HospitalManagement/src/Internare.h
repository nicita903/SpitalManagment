#ifndef INTERNARE_H
#define INTERNARE_H

#include <string>

class Internare {
private:
    int idInternare;
    int idPacient;
    std::string sectie;
    std::string dataInternare;
    int numarZile;
    std::string tipSalon;
    double costPeZi;
    std::string status;

public:
    Internare();
    Internare(int idInternare, int idPacient, const std::string& sectie,
              const std::string& dataInternare, int numarZile,
              const std::string& tipSalon, double costPeZi,
              const std::string& status = "activa");

    int getIdInternare() const;
    int getIdPacient() const;
    std::string getSectie() const;
    std::string getDataInternare() const;
    int getNumarZile() const;
    std::string getTipSalon() const;
    double getCostPeZi() const;
    std::string getStatus() const;

    void finalizeaza();
    bool esteActiva() const;
    double calculeazaCostInternare() const;
    void afisare() const;
};

#endif
