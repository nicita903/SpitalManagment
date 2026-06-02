#include "../src/AuthService.h"

#include <cassert>
#include <iostream>

int main() {
    AuthService auth;

    assert(auth.login("admin", "admin123") == "admin");
    assert(auth.login("medic", "medic123") == "medic");
    assert(auth.login("admin", "gresit").empty());

    assert(auth.hasPermission("admin", "administrare"));
    assert(auth.hasPermission("medic", "afiseaza_pacienti"));
    assert(auth.hasPermission("medic", "actualizeaza_diagnostic"));
    assert(!auth.hasPermission("medic", "sterge_pacient"));
    assert(auth.hasPermission("receptie", "creeaza_programare"));
    assert(!auth.hasPermission("receptie", "emitere_factura"));

    std::cout << "Testele pentru autentificare au trecut.\n";
    return 0;
}
