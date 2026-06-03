#include "Exceptions.h"
#include "FacturaFactory.h"
#include "ServiciuMedical.h"

#include <cassert>
#include <cmath>
#include <iostream>

static bool aproapeEgal(double a, double b) {
    return std::fabs(a - b) < 0.001;
}

static void testCalculFacturaCuReducere() {
    Factura factura = FacturaFactory::creeazaFacturaStudent(1, "5010101223344");
    Consultatie consultatie("Cardiologie", 200.0);
    AnalizaLaborator analiza("Sange", 4);

    factura.adaugaServiciu(consultatie);
    factura.adaugaServiciu(analiza);

    assert(aproapeEgal(factura.calculeazaTotal(), 289.0));
}

static void testInterventieUrgenta() {
    Factura factura = FacturaFactory::creeazaFacturaUrgenta(2, "1850505123456");
    Interventie interventie("Reducere fractura", 1000.0, true);

    factura.adaugaServiciu(interventie);

    assert(aproapeEgal(factura.calculeazaTotal(), 1350.0));
}

static void testFacturaEmisaNuAcceptaServiciiNoi() {
    Factura factura = FacturaFactory::creeazaFacturaStandard(3, "2921010334455");
    Consultatie consultatie("Dermatologie", 180.0);
    AnalizaLaborator analiza("Urina", 2);

    factura.adaugaServiciu(consultatie);
    factura.emite();

    bool exceptieAruncata = false;
    try {
        factura.adaugaServiciu(analiza);
    } catch (const FacturaInvalidaException&) {
        exceptieAruncata = true;
    }
    assert(exceptieAruncata);
}

int main() {
    testCalculFacturaCuReducere();
    testInterventieUrgenta();
    testFacturaEmisaNuAcceptaServiciiNoi();

    std::cout << "Testele pentru facturi au trecut.\n";
    return 0;
}
