#ifndef HTML_EXPORTER_H
#define HTML_EXPORTER_H

#include "Factura.h"
#include "Internare.h"
#include "Medic.h"
#include "Pacient.h"
#include "Programare.h"
#include <vector>

class HtmlExporter {
public:
    static void genereazaPagini(const std::vector<Pacient>& pacienti,
                                const std::vector<Medic>& medici,
                                const std::vector<Programare>& programari,
                                const std::vector<Internare>& internari,
                                const std::vector<Factura>& facturi);
};

#endif
