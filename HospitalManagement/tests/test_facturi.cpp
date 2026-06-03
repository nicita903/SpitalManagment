#include "../src/FacturaFactory.h"
#include "../src/Exceptions.h"
#include "../src/ServiciuMedical.h"

#include <cassert>
#include <cmath>
#include <iostream>

static bool aproapeEgal(double a, double b) {
    return std::fabs(a - b) < 0.001;
}

int main() {
    Factura simpla = FacturaFactory::facturaSimpla(1, 1, "2026-06-02", 200.0);
    assert(aproapeEgal(simpla.getTotal(), 200.0));

    Factura completa = FacturaFactory::facturaCompleta(2, 1, "2026-06-02", 200.0, 500.0, 300.0, 100.0);
    assert(aproapeEgal(completa.getTotal(), 900.0));

    Factura cuMedicamente(5, 1, "2026-06-02", 100.0, 0.0, 50.0, 20.0, 80.0);
    assert(aproapeEgal(cuMedicamente.getCostMedicamente(), 80.0));
    assert(aproapeEgal(cuMedicamente.getTotal(), 210.0));

    bool costNegativ = false;
    try {
        Factura invalida(3, 1, "2026-06-02", -10.0, 0.0, 0.0, 0.0);
        (void)invalida;
    } catch (const FacturaInvalidaException&) {
        costNegativ = true;
    }
    assert(costNegativ);

    bool reducerePreaMare = false;
    try {
        Factura invalida(4, 1, "2026-06-02", 100.0, 0.0, 0.0, 150.0);
        (void)invalida;
    } catch (const FacturaInvalidaException&) {
        reducerePreaMare = true;
    }
    assert(reducerePreaMare);

    Consultatie consultatie(150.0);
    Analize analize(3);
    InternareServiciu internare(4, 250.0);
    Operatie operatie(1000.0, true);

    assert(aproapeEgal(consultatie.calculeazaCost(), 150.0));
    assert(aproapeEgal(analize.calculeazaCost(), 165.0));
    assert(aproapeEgal(internare.calculeazaCost(), 1000.0));
    assert(aproapeEgal(operatie.calculeazaCost(), 1300.0));

    std::cout << "Testele pentru facturi au trecut.\n";
    return 0;
}
