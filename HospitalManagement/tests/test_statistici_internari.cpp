#include "../src/FacturaFactory.h"
#include "../src/Exceptions.h"
#include "../src/Internare.h"
#include "../src/Medic.h"
#include "../src/Pacient.h"
#include "../src/Programare.h"
#include "../src/Sectie.h"
#include "../src/StatisticiSpital.h"

#include <cassert>
#include <cmath>
#include <iostream>
#include <vector>

static bool aproapeEgal(double a, double b) {
    return std::fabs(a - b) < 0.001;
}

int main() {
    std::vector<Pacient> pacienti;
    pacienti.emplace_back(1, "Popescu", "Ana", 25, "0711111111", "Gripa", "A+", "Chisinau", false, "fara");
    pacienti.emplace_back(2, "Ionescu", "Mihai", 39, "0722222222", "Fractura", "B+", "Balti", true, "penicilina");

    std::vector<Medic> medici;
    medici.emplace_back(1, "Radu", "Pavel", 45, "0733333333", 9000, "Cardiologie", "Cardiolog", "CP123", 12);

    std::vector<Programare> programari;
    programari.emplace_back(1, 1, 1, "2026-06-10", "09:30", "Consultatie");

    std::vector<Factura> facturi;
    facturi.push_back(FacturaFactory::facturaCompleta(1, 1, "2026-06-02", 200, 0, 120, 32));

    StatisticiSpital statistici(pacienti, medici, programari, facturi);
    assert(statistici.calculeazaTotalPacienti() == 2);
    assert(statistici.calculeazaPacientiInternati() == 1);
    assert(statistici.calculeazaTotalMedici() == 1);
    assert(statistici.calculeazaProgramariActive() == 1);
    assert(statistici.calculeazaTotalFacturi() == 1);
    assert(aproapeEgal(statistici.calculeazaVenitTotal(), 288.0));

    Internare internare(1, 2, "Ortopedie", "2026-06-02", 4, "standard", 250.0);
    assert(internare.esteActiva());
    assert(aproapeEgal(internare.calculeazaCostInternare(), 1000.0));
    internare.finalizeaza();
    assert(!internare.esteActiva());

    bool internareInvalida = false;
    try {
        Internare invalida(2, 2, "Ortopedie", "", 0, "standard", 250.0);
        (void)invalida;
    } catch (const DateInvalideException&) {
        internareInvalida = true;
    }
    assert(internareInvalida);

    Sectie sectie(1, "Ortopedie", 3, 1);
    assert(sectie.arePaturiDisponibile());
    sectie.ocupaPat();
    assert(!sectie.arePaturiDisponibile());
    sectie.elibereazaPat();
    assert(sectie.arePaturiDisponibile());

    std::cout << "Testele pentru statistici si internari au trecut.\n";
    return 0;
}
