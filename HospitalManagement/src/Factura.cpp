#include "Factura.h"

#include "Exceptions.h"
#include <iostream>

Factura::Factura()
    : idFactura(0), idPacient(0), costConsultatie(0.0), costInternare(0.0),
      costTratament(0.0), reducere(0.0), total(0.0) {}

Factura::Factura(int idFactura, int idPacient, const std::string& dataEmitere,
                 double costConsultatie, double costInternare,
                 double costTratament, double reducere)
    : idFactura(idFactura), idPacient(idPacient), dataEmitere(dataEmitere),
      costConsultatie(costConsultatie), costInternare(costInternare),
      costTratament(costTratament), reducere(reducere), total(0.0) {
    double sumaCosturi = costConsultatie + costInternare + costTratament;
    if (idFactura <= 0 || idPacient <= 0 || dataEmitere.empty() || reducere < 0.0 ||
        costConsultatie < 0.0 || costInternare < 0.0 || costTratament < 0.0) {
        throw FacturaInvalidaException("Date invalide pentru factura.");
    }
    if (reducere > sumaCosturi) {
        throw FacturaInvalidaException("Reducerea nu poate fi mai mare decat suma costurilor.");
    }
    calculeazaTotal();
    if (total < 0.0) {
        throw FacturaInvalidaException("Totalul facturii nu poate fi negativ.");
    }
}

int Factura::getIdFactura() const { return idFactura; }
int Factura::getIdPacient() const { return idPacient; }
std::string Factura::getDataEmitere() const { return dataEmitere; }
double Factura::getCostConsultatie() const { return costConsultatie; }
double Factura::getCostInternare() const { return costInternare; }
double Factura::getCostTratament() const { return costTratament; }
double Factura::getReducere() const { return reducere; }
double Factura::getTotal() const { return total; }

double Factura::calculeazaTotal() {
    total = costConsultatie + costInternare + costTratament - reducere;
    return total;
}

void Factura::afisare() const {
    std::cout << "Factura #" << idFactura << " | Pacient: " << idPacient
              << " | Data: " << dataEmitere << " | Total: " << total << " lei\n";
}
