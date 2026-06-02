#ifndef STATISTICI_SPITAL_H
#define STATISTICI_SPITAL_H

#include "Factura.h"
#include "Medic.h"
#include "Pacient.h"
#include "Programare.h"
#include <string>
#include <vector>

class StatisticiSpital {
private:
    const std::vector<Pacient>& pacienti;
    const std::vector<Medic>& medici;
    const std::vector<Programare>& programari;
    const std::vector<Factura>& facturi;

public:
    StatisticiSpital(const std::vector<Pacient>& pacienti,
                     const std::vector<Medic>& medici,
                     const std::vector<Programare>& programari,
                     const std::vector<Factura>& facturi);

    int calculeazaTotalPacienti() const;
    int calculeazaPacientiInternati() const;
    int calculeazaTotalMedici() const;
    int calculeazaProgramariActive() const;
    int calculeazaTotalFacturi() const;
    double calculeazaVenitTotal() const;
    std::string gasesteDiagnosticFrecvent() const;
};

#endif
