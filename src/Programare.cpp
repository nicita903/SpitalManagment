#include "Programare.h"

#include "Exceptions.h"
#include <cctype>

static bool doarCifre(const std::string& text) {
    for (char c : text) {
        if (!std::isdigit(static_cast<unsigned char>(c))) {
            return false;
        }
    }
    return !text.empty();
}

bool Programare::esteDataValida(const std::string& data) {
    if (data.size() != 10 || data[4] != '-' || data[7] != '-') {
        return false;
    }

    std::string an = data.substr(0, 4);
    std::string luna = data.substr(5, 2);
    std::string zi = data.substr(8, 2);
    if (!doarCifre(an) || !doarCifre(luna) || !doarCifre(zi)) {
        return false;
    }

    int anNr = std::stoi(an);
    int lunaNr = std::stoi(luna);
    int ziNr = std::stoi(zi);
    if (lunaNr < 1 || lunaNr > 12) {
        return false;
    }

    int zileInLuna[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    bool anBisect = (anNr % 4 == 0 && anNr % 100 != 0) || (anNr % 400 == 0);
    if (anBisect) {
        zileInLuna[1] = 29;
    }

    return ziNr >= 1 && ziNr <= zileInLuna[lunaNr - 1];
}

bool Programare::esteOraValida(const std::string& ora) {
    if (ora.size() != 5 || ora[2] != ':') {
        return false;
    }

    std::string ore = ora.substr(0, 2);
    std::string minute = ora.substr(3, 2);
    if (!doarCifre(ore) || !doarCifre(minute)) {
        return false;
    }

    int oreNr = std::stoi(ore);
    int minuteNr = std::stoi(minute);
    return oreNr >= 8 && oreNr <= 20 && minuteNr >= 0 && minuteNr <= 59;
}

Programare::Programare(int id, const std::string& cnpPacient, int idMedic,
                       const std::string& data, const std::string& ora,
                       const std::string& motiv)
    : id(id), cnpPacient(cnpPacient), idMedic(idMedic),
      data(data), ora(ora), motiv(motiv), status(StatusProgramare::Planificata) {
    if (cnpPacient.empty()) {
        throw ProgramareInvalidaException("CNP-ul pacientului este obligatoriu.");
    }
    if (idMedic <= 0) {
        throw ProgramareInvalidaException("ID-ul medicului trebuie sa fie pozitiv.");
    }
    if (!esteDataValida(data)) {
        throw ProgramareInvalidaException("Data programarii trebuie sa fie in format YYYY-MM-DD.");
    }
    if (!esteOraValida(ora)) {
        throw ProgramareInvalidaException("Ora programarii trebuie sa fie intre 08:00 si 20:59.");
    }
}

int Programare::getId() const {
    return id;
}

std::string Programare::getCnpPacient() const {
    return cnpPacient;
}

int Programare::getIdMedic() const {
    return idMedic;
}

std::string Programare::getData() const {
    return data;
}

std::string Programare::getOra() const {
    return ora;
}

std::string Programare::getMotiv() const {
    return motiv;
}

StatusProgramare Programare::getStatus() const {
    return status;
}

std::string Programare::getStatusText() const {
    switch (status) {
    case StatusProgramare::Planificata:
        return "Planificata";
    case StatusProgramare::Anulata:
        return "Anulata";
    case StatusProgramare::Finalizata:
        return "Finalizata";
    }
    return "Necunoscut";
}

void Programare::anuleaza() {
    if (status == StatusProgramare::Finalizata) {
        throw ProgramareInvalidaException("O programare finalizata nu poate fi anulata.");
    }
    status = StatusProgramare::Anulata;
}

void Programare::finalizeaza() {
    if (status == StatusProgramare::Anulata) {
        throw ProgramareInvalidaException("O programare anulata nu poate fi finalizata.");
    }
    status = StatusProgramare::Finalizata;
}
