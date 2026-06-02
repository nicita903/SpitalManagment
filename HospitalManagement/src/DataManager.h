#ifndef DATA_MANAGER_H
#define DATA_MANAGER_H

#include "Factura.h"
#include "Internare.h"
#include "Medic.h"
#include "Pacient.h"
#include "Programare.h"
#include "StatisticiSpital.h"
#include <string>
#include <vector>

class DataManager {
private:
    static std::string escapeJson(const std::string& text);

public:
    static void salveazaPacienti(const std::vector<Pacient>& pacienti, const std::string& cale);
    static void salveazaMedici(const std::vector<Medic>& medici, const std::string& cale);
    static void salveazaProgramari(const std::vector<Programare>& programari, const std::string& cale);
    static void salveazaInternari(const std::vector<Internare>& internari, const std::string& cale);
    static void salveazaFacturi(const std::vector<Factura>& facturi, const std::string& cale);
    static void salveazaStatistici(const StatisticiSpital& statistici, const std::string& cale);
    static void salveazaTot(const std::vector<Pacient>& pacienti,
                            const std::vector<Medic>& medici,
                            const std::vector<Programare>& programari,
                            const std::vector<Internare>& internari,
                            const std::vector<Factura>& facturi);
};

#endif
