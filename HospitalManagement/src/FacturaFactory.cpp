#include "FacturaFactory.h"

Factura FacturaFactory::facturaSimpla(int idFactura, int idPacient, const std::string& data, double costConsultatie) {
    return Factura(idFactura, idPacient, data, costConsultatie, 0.0, 0.0, 0.0);
}

Factura FacturaFactory::facturaCuInternare(int idFactura, int idPacient, const std::string& data,
                                           double costConsultatie, double costInternare) {
    return Factura(idFactura, idPacient, data, costConsultatie, costInternare, 0.0, 0.0);
}

Factura FacturaFactory::facturaCompleta(int idFactura, int idPacient, const std::string& data,
                                        double costConsultatie, double costInternare,
                                        double costTratament, double reducere) {
    return Factura(idFactura, idPacient, data, costConsultatie, costInternare, costTratament, reducere);
}
