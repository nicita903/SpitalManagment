#ifndef CSV_EXPORTER_H
#define CSV_EXPORTER_H

#include "Factura.h"
#include "Pacient.h"
#include "Programare.h"
#include <string>
#include <vector>

class CsvExporter {
private:
    static std::string escapeCsv(const std::string& text);

public:
    static void exportPacienti(const std::vector<Pacient>& pacienti, const std::string& cale);
    static void exportProgramari(const std::vector<Programare>& programari, const std::string& cale);
    static void exportFacturi(const std::vector<Factura>& facturi, const std::string& cale);
    static void exportTot(const std::vector<Pacient>& pacienti,
                          const std::vector<Programare>& programari,
                          const std::vector<Factura>& facturi);
};

#endif
