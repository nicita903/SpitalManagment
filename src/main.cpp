#include "Asistent.h"
#include "FacturaFactory.h"
#include "Internare.h"
#include "JsonStorage.h"
#include "Medic.h"
#include "Pacient.h"
#include "Persoana.h"
#include "Programare.h"
#include "ServiciuMedical.h"
#include "SpitalService.h"

#include <iostream>
#include <memory>
#include <exception>
#include <vector>

static void afiseazaAngajati(const std::vector<std::shared_ptr<Angajat>>& angajati) {
    std::cout << "\nAngajati si bonusuri:\n";
    for (const auto& angajat : angajati) {
        std::cout << " - " << angajat->getRol() << " " << angajat->getNume()
                  << ", bonus: " << angajat->calculeazaBonus() << " lei\n";
    }
}

static void afiseazaPersoane(const std::vector<std::shared_ptr<Persoana>>& persoane) {
    std::cout << "\nPersoane in sistem:\n";
    for (const auto& persoana : persoane) {
        std::cout << " - " << persoana->getTipPersoana() << ": "
                  << persoana->getNume() << '\n';
    }
}

int main() {
    try {
        SpitalService spital;

        Pacient p1("5010101223344", "Popescu Ana", 25, "Gripa sezoniera");
        Pacient p2("1850505123456", "Ionescu Mihai", 39, "Fractura brat");
        Pacient p3("2921010334455", "Marin Elena", 31, "Diabet tip 2");
        p2.setInternat(true);

        spital.adaugaPacient(p1);
        spital.adaugaPacient(p2);
        spital.adaugaPacient(p3);

        Medic m1(1, "Dr. Radu Pavel", 9200.0, "Cardiologie", 250.0);
        Medic m2(2, "Dr. Irina Stan", 8700.0, "Ortopedie", 220.0);
        Asistent a1(10, "As. Vlad Neagu", 4300.0, "Urgente", 6);

        spital.adaugaMedic(m1);
        spital.adaugaMedic(m2);
        spital.adaugaAsistent(a1);

        spital.adaugaProgramare(Programare(1, p1.getCnp(), m1.getId(), "2026-06-10", "09:30", "Consultatie"));
        spital.adaugaProgramare(Programare(2, p2.getCnp(), m2.getId(), "2026-06-11", "14:00", "Control fractura"));
        spital.adaugaInternare(Internare(1, p2.getCnp(), "Ortopedie", "2026-06-02", 4));

        Factura factura = FacturaFactory::creeazaFacturaStudent(1, p1.getCnp());
        Consultatie consultatie(m1.getSpecializare(), m1.getTarifConsultatie());
        AnalizaLaborator analize("Sange", 6);
        factura.adaugaServiciu(consultatie);
        factura.adaugaServiciu(analize);
        factura.emite();
        spital.adaugaFactura(factura);

        Factura facturaUrgenta = FacturaFactory::creeazaFacturaUrgenta(2, p2.getCnp());
        Interventie interventie("Reducere fractura", 1400.0, true);
        facturaUrgenta.adaugaServiciu(interventie);
        facturaUrgenta.emite();
        spital.adaugaFactura(facturaUrgenta);

        std::vector<std::shared_ptr<Angajat>> angajati;
        angajati.push_back(std::make_shared<Medic>(m1));
        angajati.push_back(std::make_shared<Medic>(m2));
        angajati.push_back(std::make_shared<Asistent>(a1));
        afiseazaAngajati(angajati);

        std::vector<std::shared_ptr<Persoana>> persoane;
        persoane.push_back(std::make_shared<Pacient>(p1));
        persoane.push_back(std::make_shared<Pacient>(p2));
        persoane.push_back(std::make_shared<Medic>(m1));
        persoane.push_back(std::make_shared<Asistent>(a1));
        afiseazaPersoane(persoane);

        std::cout << "\nPacienti cu diagnostic ce contine 'fractura':\n";
        for (const auto& pacient : spital.filtreazaPacientiDupaDiagnostic("fractura")) {
            std::cout << " - " << pacient.getNume() << " (" << pacient.getDiagnostic() << ")\n";
        }

        std::cout << "\nTotal facturi emise: " << spital.calculeazaTotalFacturi() << " lei\n";
        JsonStorage::salveazaSnapshot(spital, "data/spital.json");
        std::cout << "Snapshot JSON salvat in data/spital.json\n";
        std::cout << "Logurile critice sunt in logs/spital.log\n";
    } catch (const std::exception& ex) {
        std::cerr << "Eroare: " << ex.what() << '\n';
        return 1;
    }

    return 0;
}
