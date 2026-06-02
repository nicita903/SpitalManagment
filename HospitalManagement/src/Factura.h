#ifndef FACTURA_H
#define FACTURA_H

#include <string>

class Factura {
private:
    int idFactura;
    int idPacient;
    std::string dataEmitere;
    double costConsultatie;
    double costInternare;
    double costTratament;
    double reducere;
    double total;

public:
    Factura();
    Factura(int idFactura, int idPacient, const std::string& dataEmitere,
            double costConsultatie, double costInternare,
            double costTratament, double reducere);

    int getIdFactura() const;
    int getIdPacient() const;
    std::string getDataEmitere() const;
    double getCostConsultatie() const;
    double getCostInternare() const;
    double getCostTratament() const;
    double getReducere() const;
    double getTotal() const;

    double calculeazaTotal();
    void afisare() const;
};

#endif
