#include "JsonStorage.h"

#include <filesystem>
#include <fstream>
#include <iomanip>
#include <sstream>

static std::string jsonEscape(const std::string& text) {
    std::ostringstream out;
    for (char c : text) {
        switch (c) {
        case '"':
            out << "\\\"";
            break;
        case '\\':
            out << "\\\\";
            break;
        case '\n':
            out << "\\n";
            break;
        default:
            out << c;
        }
    }
    return out.str();
}

static void scrieCamp(std::ofstream& out, const std::string& cheie,
                      const std::string& valoare, bool virgula = true) {
    out << "\"" << cheie << "\": \"" << jsonEscape(valoare) << "\"";
    if (virgula) {
        out << ", ";
    }
}

void JsonStorage::salveazaSnapshot(const SpitalService& spital, const std::string& caleFisier) {
    std::filesystem::path cale(caleFisier);
    if (cale.has_parent_path()) {
        std::filesystem::create_directories(cale.parent_path());
    }

    std::ofstream out(caleFisier);
    out << std::fixed << std::setprecision(2);
    out << "{\n";

    out << "  \"pacienti\": [\n";
    for (size_t i = 0; i < spital.getPacienti().size(); ++i) {
        const auto& pacient = spital.getPacienti()[i];
        out << "    {";
        scrieCamp(out, "cnp", pacient.getCnp());
        scrieCamp(out, "nume", pacient.getNume());
        out << "\"varsta\": " << pacient.getVarsta() << ", ";
        scrieCamp(out, "diagnostic", pacient.getDiagnostic());
        out << "\"internat\": " << (pacient.esteInternat() ? "true" : "false") << "}";
        out << (i + 1 < spital.getPacienti().size() ? "," : "") << "\n";
    }
    out << "  ],\n";

    out << "  \"medici\": [\n";
    for (size_t i = 0; i < spital.getMedici().size(); ++i) {
        const auto& medic = spital.getMedici()[i];
        out << "    {\"id\": " << medic.getId() << ", ";
        scrieCamp(out, "nume", medic.getNume());
        scrieCamp(out, "specializare", medic.getSpecializare());
        out << "\"tarifConsultatie\": " << medic.getTarifConsultatie() << "}";
        out << (i + 1 < spital.getMedici().size() ? "," : "") << "\n";
    }
    out << "  ],\n";

    out << "  \"programari\": [\n";
    for (size_t i = 0; i < spital.getProgramari().size(); ++i) {
        const auto& programare = spital.getProgramari()[i];
        out << "    {\"id\": " << programare.getId() << ", ";
        scrieCamp(out, "cnpPacient", programare.getCnpPacient());
        out << "\"idMedic\": " << programare.getIdMedic() << ", ";
        scrieCamp(out, "data", programare.getData());
        scrieCamp(out, "ora", programare.getOra());
        scrieCamp(out, "motiv", programare.getMotiv());
        scrieCamp(out, "status", programare.getStatusText(), false);
        out << "}";
        out << (i + 1 < spital.getProgramari().size() ? "," : "") << "\n";
    }
    out << "  ],\n";

    out << "  \"internari\": [\n";
    for (size_t i = 0; i < spital.getInternari().size(); ++i) {
        const auto& internare = spital.getInternari()[i];
        out << "    {\"id\": " << internare.getId() << ", ";
        scrieCamp(out, "cnpPacient", internare.getCnpPacient());
        scrieCamp(out, "sectie", internare.getSectie());
        scrieCamp(out, "dataInternare", internare.getDataInternare());
        out << "\"numarZile\": " << internare.getNumarZile() << ", ";
        out << "\"cost\": " << internare.calculeazaCostInternare() << "}";
        out << (i + 1 < spital.getInternari().size() ? "," : "") << "\n";
    }
    out << "  ],\n";

    out << "  \"facturi\": [\n";
    for (size_t i = 0; i < spital.getFacturi().size(); ++i) {
        const auto& factura = spital.getFacturi()[i];
        out << "    {\"id\": " << factura.getId() << ", ";
        scrieCamp(out, "cnpPacient", factura.getCnpPacient());
        out << "\"reducere\": " << factura.getReducere() << ", ";
        out << "\"total\": " << factura.calculeazaTotal() << ", ";
        out << "\"emisa\": " << (factura.esteEmisa() ? "true" : "false") << "}";
        out << (i + 1 < spital.getFacturi().size() ? "," : "") << "\n";
    }
    out << "  ]\n";
    out << "}\n";
}
