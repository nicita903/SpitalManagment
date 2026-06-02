#include "PrioritateUtils.h"

#include <algorithm>
#include <iostream>

int valoarePrioritate(const std::string& prioritate) {
    if (prioritate == "critica") {
        return 4;
    }
    if (prioritate == "urgenta") {
        return 3;
    }
    if (prioritate == "medie") {
        return 2;
    }
    return 1;
}

void sorteazaPacientiDupaPrioritate(std::vector<Pacient>& pacienti) {
    std::sort(pacienti.begin(), pacienti.end(), [](const Pacient& a, const Pacient& b) {
        return valoarePrioritate(a.getPrioritate()) > valoarePrioritate(b.getPrioritate());
    });
}

std::vector<Pacient> filtreazaPacientiUrgenti(const std::vector<Pacient>& pacienti) {
    std::vector<Pacient> rezultat;
    for (const auto& pacient : pacienti) {
        if (pacient.getPrioritate() == "urgenta" || pacient.getPrioritate() == "critica") {
            rezultat.push_back(pacient);
        }
    }
    return rezultat;
}

void afiseazaPacientiUrgenti(const std::vector<Pacient>& pacienti) {
    for (const auto& pacient : filtreazaPacientiUrgenti(pacienti)) {
        pacient.afisare();
    }
}
