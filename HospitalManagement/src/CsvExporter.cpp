#include "CsvExporter.h"

#include "Logger.h"
#include <filesystem>
#include <fstream>

std::string CsvExporter::escapeCsv(const std::string& text) {
    std::string rezultat = "\"";
    for (char c : text) {
        if (c == '"') {
            rezultat += "\"\"";
        } else {
            rezultat += c;
        }
    }
    rezultat += "\"";
    return rezultat;
}

void CsvExporter::exportPacienti(const std::vector<Pacient>& pacienti, const std::string& cale) {
    std::ofstream out(cale);
    out << "id,nume,prenume,varsta,telefon,diagnostic,internat,prioritate\n";
    for (const auto& pacient : pacienti) {
        out << pacient.getId() << ","
            << escapeCsv(pacient.getNume()) << ","
            << escapeCsv(pacient.getPrenume()) << ","
            << pacient.getVarsta() << ","
            << escapeCsv(pacient.getTelefon()) << ","
            << escapeCsv(pacient.getDiagnostic()) << ","
            << (pacient.esteInternat() ? "da" : "nu") << ","
            << escapeCsv(pacient.getPrioritate()) << "\n";
    }
}

void CsvExporter::exportProgramari(const std::vector<Programare>& programari, const std::string& cale) {
    std::ofstream out(cale);
    out << "idProgramare,idPacient,idMedic,data,ora,tipConsultatie,status\n";
    for (const auto& programare : programari) {
        out << programare.getIdProgramare() << ","
            << programare.getIdPacient() << ","
            << programare.getIdMedic() << ","
            << escapeCsv(programare.getData()) << ","
            << escapeCsv(programare.getOra()) << ","
            << escapeCsv(programare.getTipConsultatie()) << ","
            << escapeCsv(programare.getStatus()) << "\n";
    }
}

void CsvExporter::exportFacturi(const std::vector<Factura>& facturi, const std::string& cale) {
    std::ofstream out(cale);
    out << "idFactura,idPacient,dataEmitere,costConsultatie,costInternare,costTratament,reducere,total\n";
    for (const auto& factura : facturi) {
        out << factura.getIdFactura() << ","
            << factura.getIdPacient() << ","
            << escapeCsv(factura.getDataEmitere()) << ","
            << factura.getCostConsultatie() << ","
            << factura.getCostInternare() << ","
            << factura.getCostTratament() << ","
            << factura.getReducere() << ","
            << factura.getTotal() << "\n";
    }
}

void CsvExporter::exportTot(const std::vector<Pacient>& pacienti,
                            const std::vector<Programare>& programari,
                            const std::vector<Factura>& facturi) {
    std::filesystem::create_directories("data/export");
    exportPacienti(pacienti, "data/export/pacienti.csv");
    exportProgramari(programari, "data/export/programari.csv");
    exportFacturi(facturi, "data/export/facturi.csv");
    Logger::log("export CSV pentru pacienti, programari si facturi");
}
