#include "../src/CsvExporter.h"
#include "../src/Exceptions.h"
#include "../src/Farmacie.h"
#include "../src/FacturaFactory.h"
#include "../src/IstoricMedical.h"
#include "../src/Pacient.h"
#include "../src/PrioritateUtils.h"
#include "../src/Reteta.h"
#include "../src/StatisticiSpital.h"

#include <cassert>
#include <cmath>
#include <fstream>
#include <iostream>
#include <vector>

static bool aproapeEgal(double a, double b) {
    return std::fabs(a - b) < 0.001;
}

int main() {
    std::vector<IstoricMedical> istoric;
    IstoricMedical::adaugaIstoric(istoric, IstoricMedical(1, 1, "Gripa", "Paracetamol", "2026-06-01", "Stare buna"));
    assert(istoric.size() == 1);
    assert(istoric[0].getIdPacient() == 1);

    std::vector<Reteta> retete;
    Reteta::emiteReteta(retete, Reteta(1, 1, 1, "Paracetamol", "1 comprimat", "5 zile", "2026-06-02"));
    assert(retete.size() == 1);
    assert(retete[0].getIdMedic() == 1);

    std::vector<Pacient> pacienti;
    pacienti.emplace_back(1, "Popescu", "Ana", 25, "0711111111", "Gripa", "A+", "Chisinau", false, "fara", "medie");
    pacienti.emplace_back(2, "Ionescu", "Mihai", 39, "0722222222", "Fractura", "B+", "Balti", true, "penicilina", "critica");
    pacienti.emplace_back(3, "Marin", "Elena", 31, "0733333333", "Diabet", "O+", "Cahul", false, "fara", "urgenta");

    sorteazaPacientiDupaPrioritate(pacienti);
    assert(pacienti[0].getPrioritate() == "critica");
    assert(pacienti[1].getPrioritate() == "urgenta");

    bool varstaInvalida = false;
    try {
        Pacient invalid(4, "Test", "Invalid", 150, "0700000000", "N/A", "A+", "N/A", false, "fara");
        (void)invalid;
    } catch (const DateInvalideException&) {
        varstaInvalida = true;
    }
    assert(varstaInvalida);

    std::vector<Medic> medici;
    medici.emplace_back(1, "Radu", "Pavel", 45, "0733333333", 9000, "Cardiologie", "Cardiolog", "CP123", 12);
    std::vector<Programare> programari;
    programari.emplace_back(1, 1, 1, "2026-06-10", "09:30", "Consultatie");
    std::vector<Factura> facturi;
    facturi.push_back(FacturaFactory::facturaCompleta(1, 1, "2026-06-02", 200, 0, 120, 32));
    facturi.push_back(FacturaFactory::facturaCuMedicamente(2, 1, "2026-06-03", 100, 0, 0, 0, 50));

    StatisticiSpital statistici(pacienti, medici, programari, facturi);
    assert(aproapeEgal(statistici.calculeazaVenitTotal(), 438.0));

    std::vector<Medicament> medicamente;
    Farmacie::adaugaMedicament(medicamente, Medicament(1, "Paracetamol", "Paracetamol", 10.0, 20, "nu"));
    assert(medicamente.size() == 1);
    AchizitieMedicamente achizitie = Farmacie::vindeMedicament(medicamente, 1, 1, 1, 2, "2026-06-03");
    assert(aproapeEgal(achizitie.getPretTotal(), 20.0));
    assert(medicamente[0].getStoc() == 18);
    assert(aproapeEgal(Farmacie::calculeazaValoareStoc(medicamente), 180.0));

    CsvExporter::exportTot(pacienti, programari, facturi);
    std::ifstream csv("data/export/pacienti.csv");
    assert(csv.good());

    std::cout << "Testele pentru extensii au trecut.\n";
    return 0;
}
