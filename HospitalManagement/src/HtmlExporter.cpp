#include "HtmlExporter.h"

#include "DataManager.h"
#include <fstream>

void HtmlExporter::genereazaPagini(const std::vector<Pacient>& pacienti,
                                   const std::vector<Medic>& medici,
                                   const std::vector<Programare>& programari,
                                   const std::vector<Internare>& internari,
                                   const std::vector<Factura>& facturi) {
    DataManager::salveazaTot(pacienti, medici, programari, internari, facturi);

    std::ofstream out("web/generated.html");
    out << "<!DOCTYPE html><html lang=\"ro\"><head><meta charset=\"UTF-8\">"
        << "<title>Raport Spital</title><link rel=\"stylesheet\" href=\"style.css\"></head><body>"
        << "<main class=\"page\"><h1>Raport generat din C++</h1>"
        << "<p>Pacienti: " << pacienti.size() << "</p>"
        << "<p>Medici: " << medici.size() << "</p>"
        << "<p>Programari: " << programari.size() << "</p>"
        << "<p>Internari: " << internari.size() << "</p>"
        << "<p>Facturi: " << facturi.size() << "</p>"
        << "<a href=\"dashboard.html\">Deschide dashboard</a>"
        << "</main></body></html>";
}
