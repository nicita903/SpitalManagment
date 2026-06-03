#include "Exceptions.h"
#include "Programare.h"

#include <cassert>
#include <iostream>

static void testProgramareValida() {
    Programare programare(1, "5010101223344", 2, "2026-06-12", "10:15", "Control");
    assert(programare.getId() == 1);
    assert(programare.getStatus() == StatusProgramare::Planificata);

    programare.finalizeaza();
    assert(programare.getStatus() == StatusProgramare::Finalizata);
}

static void testProgramareCuOraInvalida() {
    bool exceptieAruncata = false;
    try {
        Programare programare(2, "5010101223344", 2, "2026-06-12", "22:15", "Control");
        (void)programare;
    } catch (const ProgramareInvalidaException&) {
        exceptieAruncata = true;
    }
    assert(exceptieAruncata);
}

static void testAnulareDupaFinalizare() {
    Programare programare(3, "5010101223344", 2, "2026-06-12", "12:00", "Control");
    programare.finalizeaza();

    bool exceptieAruncata = false;
    try {
        programare.anuleaza();
    } catch (const ProgramareInvalidaException&) {
        exceptieAruncata = true;
    }
    assert(exceptieAruncata);
}

int main() {
    testProgramareValida();
    testProgramareCuOraInvalida();
    testAnulareDupaFinalizare();

    std::cout << "Testele pentru programari au trecut.\n";
    return 0;
}
