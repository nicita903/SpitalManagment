#ifndef INTERNARE_H
#define INTERNARE_H

#include <string>

class Internare {
private:
    int id;
    std::string cnpPacient;
    std::string sectie;
    std::string dataInternare;
    int numarZile;

public:
    Internare(int id, const std::string& cnpPacient, const std::string& sectie,
              const std::string& dataInternare, int numarZile);

    int getId() const;
    std::string getCnpPacient() const;
    std::string getSectie() const;
    std::string getDataInternare() const;
    int getNumarZile() const;
    double calculeazaCostInternare() const;
};

#endif
