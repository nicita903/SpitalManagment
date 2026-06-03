#ifndef FACTURA_H
#define FACTURA_H

#include "ServiciuMedical.h"
#include <memory>
#include <string>
#include <vector>

class Factura {
private:
    int id;
    std::string cnpPacient;
    std::vector<std::shared_ptr<ServiciuMedical>> servicii;
    double reducere;
    bool emisa;

public:
    Factura(int id, const std::string& cnpPacient, double reducere = 0.0);

    int getId() const;
    std::string getCnpPacient() const;
    double getReducere() const;
    bool esteEmisa() const;
    const std::vector<std::shared_ptr<ServiciuMedical>>& getServicii() const;

    void adaugaServiciu(const ServiciuMedical& serviciu);
    double calculeazaTotal() const;
    void emite();
};

#endif
