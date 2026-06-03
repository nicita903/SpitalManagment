#ifndef FACTURA_FACTORY_H
#define FACTURA_FACTORY_H

#include "Factura.h"
#include <string>

class FacturaFactory {
public:
    static Factura creeazaFacturaStandard(int id, const std::string& cnpPacient);
    static Factura creeazaFacturaUrgenta(int id, const std::string& cnpPacient);
    static Factura creeazaFacturaStudent(int id, const std::string& cnpPacient);
};

#endif
