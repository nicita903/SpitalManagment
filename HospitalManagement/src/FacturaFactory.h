#ifndef FACTURA_FACTORY_H
#define FACTURA_FACTORY_H

#include "Factura.h"
#include <string>

class FacturaFactory {
public:
    static Factura facturaSimpla(int idFactura, int idPacient, const std::string& data, double costConsultatie);
    static Factura facturaCuInternare(int idFactura, int idPacient, const std::string& data,
                                      double costConsultatie, double costInternare);
    static Factura facturaCompleta(int idFactura, int idPacient, const std::string& data,
                                   double costConsultatie, double costInternare,
                                   double costTratament, double reducere);
};

#endif
