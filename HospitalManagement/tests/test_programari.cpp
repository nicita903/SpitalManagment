#include "../src/Exceptions.h"
#include "../src/Medic.h"
#include "../src/Pacient.h"
#include "../src/Programare.h"

#include <cassert>
#include <iostream>
#include <vector>

static bool existaPacient(const std::vector<Pacient>& pacienti, int idPacient) {
    for (const auto& pacient : pacienti) {
        if (pacient.getId() == idPacient) {
            return true;
        }
    }
    return false;
}

static bool existaMedic(const std::vector<Medic>& medici, int idMedic) {
    for (const auto& medic : medici) {
        if (medic.getId() == idMedic) {
            return true;
        }
    }
    return false;
}

int main() {
    Programare p1(1, 1, 1, "2026-06-10", "10:00", "Consultatie");
    Programare p2(2, 2, 1, "2026-06-10", "10:00", "Control");
    Programare p3(3, 2, 1, "2026-06-10", "11:00", "Control");

    assert(p1.valideazaProgramare());
    assert(p1.getStatus() == "activa");
    assert(p1.areConflictOra(p2));
    assert(!p1.areConflictOra(p3));

    Programare anulata(5, 2, 1, "2026-06-10", "10:00", "Control");
    anulata.setStatus("anulata");
    assert(!p1.areConflictOra(anulata));

    Programare finalizata(6, 2, 1, "2026-06-10", "12:00", "Control");
    finalizata.setStatus("finalizata");
    assert(finalizata.getStatus() == "finalizata");

    bool exceptie = false;
    try {
        Programare invalida(4, 1, 1, "2026-06-10", "23:00", "Consultatie");
        (void)invalida;
    } catch (const ProgramareInvalidaException&) {
        exceptie = true;
    }
    assert(exceptie);

    std::vector<Pacient> pacienti;
    pacienti.emplace_back(1, "Popescu", "Ana", 25, "0711111111", "Gripa", "A+", "Chisinau", false, "fara");
    std::vector<Medic> medici;
    medici.emplace_back(1, "Radu", "Pavel", 45, "0733333333", 9000, "Cardiologie", "Cardiolog", "CP123", 12);

    assert(existaPacient(pacienti, 1));
    assert(!existaPacient(pacienti, 99));
    assert(existaMedic(medici, 1));
    assert(!existaMedic(medici, 99));

    std::cout << "Testele pentru programari au trecut.\n";
    return 0;
}
