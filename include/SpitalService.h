#ifndef SPITAL_SERVICE_H
#define SPITAL_SERVICE_H

#include "Asistent.h"
#include "Factura.h"
#include "Internare.h"
#include "Medic.h"
#include "Pacient.h"
#include "Programare.h"
#include <vector>

class SpitalService {
private:
    std::vector<Pacient> pacienti;
    std::vector<Medic> medici;
    std::vector<Asistent> asistenti;
    std::vector<Programare> programari;
    std::vector<Internare> internari;
    std::vector<Factura> facturi;

public:
    void adaugaPacient(const Pacient& pacient);
    void adaugaMedic(const Medic& medic);
    void adaugaAsistent(const Asistent& asistent);
    void adaugaProgramare(const Programare& programare);
    void adaugaInternare(const Internare& internare);
    void adaugaFactura(const Factura& factura);

    const std::vector<Pacient>& getPacienti() const;
    const std::vector<Medic>& getMedici() const;
    const std::vector<Asistent>& getAsistenti() const;
    const std::vector<Programare>& getProgramari() const;
    const std::vector<Internare>& getInternari() const;
    const std::vector<Factura>& getFacturi() const;

    std::vector<Pacient> filtreazaPacientiDupaDiagnostic(const std::string& diagnostic) const;
    double calculeazaTotalFacturi() const;
};

#endif
