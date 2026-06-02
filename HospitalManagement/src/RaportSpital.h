#ifndef RAPORT_SPITAL_H
#define RAPORT_SPITAL_H

#include "Factura.h"
#include "Medic.h"
#include "Pacient.h"
#include "Programare.h"
#include <string>
#include <vector>

class RaportSpital {
public:
    static int numaraPacientiCriticiUrgenti(const std::vector<Pacient>& pacienti);
    static void genereazaRaportText(const std::vector<Pacient>& pacienti,
                                    const std::vector<Medic>& medici,
                                    const std::vector<Programare>& programari,
                                    const std::vector<Factura>& facturi,
                                    const std::string& cale);
    static void genereazaRaportJson(const std::vector<Pacient>& pacienti,
                                    const std::vector<Medic>& medici,
                                    const std::vector<Programare>& programari,
                                    const std::vector<Factura>& facturi,
                                    const std::string& cale);
    static void genereazaRaportComplet(const std::vector<Pacient>& pacienti,
                                       const std::vector<Medic>& medici,
                                       const std::vector<Programare>& programari,
                                       const std::vector<Factura>& facturi);
};

#endif
