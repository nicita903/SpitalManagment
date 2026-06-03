#include "SpitalService.h"

#include <algorithm>
#include <cctype>

static std::string normalizeaza(const std::string& text) {
    std::string rezultat = text;
    std::transform(rezultat.begin(), rezultat.end(), rezultat.begin(),
                   [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
    return rezultat;
}

void SpitalService::adaugaPacient(const Pacient& pacient) {
    pacienti.push_back(pacient);
}

void SpitalService::adaugaMedic(const Medic& medic) {
    medici.push_back(medic);
}

void SpitalService::adaugaAsistent(const Asistent& asistent) {
    asistenti.push_back(asistent);
}

void SpitalService::adaugaProgramare(const Programare& programare) {
    programari.push_back(programare);
}

void SpitalService::adaugaInternare(const Internare& internare) {
    internari.push_back(internare);
}

void SpitalService::adaugaFactura(const Factura& factura) {
    facturi.push_back(factura);
}

const std::vector<Pacient>& SpitalService::getPacienti() const {
    return pacienti;
}

const std::vector<Medic>& SpitalService::getMedici() const {
    return medici;
}

const std::vector<Asistent>& SpitalService::getAsistenti() const {
    return asistenti;
}

const std::vector<Programare>& SpitalService::getProgramari() const {
    return programari;
}

const std::vector<Internare>& SpitalService::getInternari() const {
    return internari;
}

const std::vector<Factura>& SpitalService::getFacturi() const {
    return facturi;
}

std::vector<Pacient> SpitalService::filtreazaPacientiDupaDiagnostic(const std::string& diagnostic) const {
    std::vector<Pacient> rezultat;
    std::string cautare = normalizeaza(diagnostic);

    for (const auto& pacient : pacienti) {
        if (normalizeaza(pacient.getDiagnostic()).find(cautare) != std::string::npos) {
            rezultat.push_back(pacient);
        }
    }

    return rezultat;
}

double SpitalService::calculeazaTotalFacturi() const {
    double total = 0.0;
    for (const auto& factura : facturi) {
        total += factura.calculeazaTotal();
    }
    return total;
}
