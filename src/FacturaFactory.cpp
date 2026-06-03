#include "FacturaFactory.h"

Factura FacturaFactory::creeazaFacturaStandard(int id, const std::string& cnpPacient) {
    return Factura(id, cnpPacient, 0.0);
}

Factura FacturaFactory::creeazaFacturaUrgenta(int id, const std::string& cnpPacient) {
    return Factura(id, cnpPacient, 0.0);
}

Factura FacturaFactory::creeazaFacturaStudent(int id, const std::string& cnpPacient) {
    return Factura(id, cnpPacient, 0.15);
}
