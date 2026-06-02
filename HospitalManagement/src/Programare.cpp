#include "Programare.h"

#include "Exceptions.h"
#include <cctype>
#include <iostream>

static bool esteNumar(const std::string& text) {
    if (text.empty()) {
        return false;
    }
    for (char c : text) {
        if (!std::isdigit(static_cast<unsigned char>(c))) {
            return false;
        }
    }
    return true;
}

Programare::Programare() : idProgramare(0), idPacient(0), idMedic(0) {}

Programare::Programare(int idProgramare, int idPacient, int idMedic, const std::string& data,
                       const std::string& ora, const std::string& tipConsultatie,
                       const std::string& status)
    : idProgramare(idProgramare), idPacient(idPacient), idMedic(idMedic), data(data),
      ora(ora), tipConsultatie(tipConsultatie), status(status) {
    if (!valideazaProgramare()) {
        throw ProgramareInvalidaException("Programare invalida.");
    }
}

int Programare::getIdProgramare() const { return idProgramare; }
int Programare::getIdPacient() const { return idPacient; }
int Programare::getIdMedic() const { return idMedic; }
std::string Programare::getData() const { return data; }
std::string Programare::getOra() const { return ora; }
std::string Programare::getTipConsultatie() const { return tipConsultatie; }
std::string Programare::getStatus() const { return status; }

void Programare::setStatus(const std::string& statusNou) { status = statusNou; }

bool Programare::valideazaProgramare() const {
    if (idProgramare <= 0 || idPacient <= 0 || idMedic <= 0) {
        return false;
    }
    if (data.empty() || ora.empty()) {
        return false;
    }
    if (data.size() != 10 || data[4] != '-' || data[7] != '-') {
        return false;
    }
    if (ora.size() != 5 || ora[2] != ':') {
        return false;
    }

    std::string oraText = ora.substr(0, 2);
    std::string minutText = ora.substr(3, 2);
    if (!esteNumar(oraText) || !esteNumar(minutText)) {
        return false;
    }

    int oraNr = std::stoi(oraText);
    int minutNr = std::stoi(minutText);
    return oraNr >= 8 && oraNr <= 20 && minutNr >= 0 && minutNr <= 59;
}

bool Programare::areConflictOra(const Programare& alta) const {
    return idMedic == alta.idMedic && data == alta.data && ora == alta.ora
           && status != "anulata" && alta.status != "anulata";
}

void Programare::afisare() const {
    std::cout << "Programare #" << idProgramare << " | Pacient: " << idPacient
              << " | Medic: " << idMedic << " | " << data << " " << ora
              << " | Tip: " << tipConsultatie << " | Status: " << status << "\n";
}
