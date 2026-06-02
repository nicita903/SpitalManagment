#include "Pacient.h"

#include "Exceptions.h"

static bool prioritateValidaPacient(const std::string& prioritate) {
    return prioritate == "scazuta" || prioritate == "medie" ||
           prioritate == "urgenta" || prioritate == "critica";
}

Pacient::Pacient() : internat(false), prioritate("medie") {}

Pacient::Pacient(int id, const std::string& nume, const std::string& prenume, int varsta,
                 const std::string& telefon, const std::string& diagnostic,
                 const std::string& grupaSange, const std::string& adresa,
                 bool internat, const std::string& alergii,
                 const std::string& prioritate)
    : Persoana(id, nume, prenume, varsta, telefon),
      diagnostic(diagnostic), grupaSange(grupaSange), adresa(adresa),
      internat(internat), alergii(alergii), prioritate(prioritate) {
    if (varsta < 0 || varsta > 120) {
        throw DateInvalideException("Varsta pacientului trebuie sa fie intre 0 si 120.");
    }
    if (telefon.empty()) {
        throw DateInvalideException("Telefonul pacientului nu poate fi gol.");
    }
    if (!prioritateValidaPacient(prioritate)) {
        throw DateInvalideException("Prioritate pacient invalida.");
    }
}

std::string Pacient::getDiagnostic() const { return diagnostic; }
std::string Pacient::getGrupaSange() const { return grupaSange; }
std::string Pacient::getAdresa() const { return adresa; }
bool Pacient::esteInternat() const { return internat; }
std::string Pacient::getAlergii() const { return alergii; }
std::string Pacient::getPrioritate() const { return prioritate; }

void Pacient::setDiagnostic(const std::string& diagnosticNou) { diagnostic = diagnosticNou; }
void Pacient::setGrupaSange(const std::string& grupaSangeNoua) { grupaSange = grupaSangeNoua; }
void Pacient::setAdresa(const std::string& adresaNoua) { adresa = adresaNoua; }
void Pacient::setInternat(bool internatNou) { internat = internatNou; }
void Pacient::setAlergii(const std::string& alergiiNoi) { alergii = alergiiNoi; }
void Pacient::seteazaPrioritate(const std::string& prioritateNoua) {
    if (!prioritateValidaPacient(prioritateNoua)) {
        throw DateInvalideException("Prioritate pacient invalida.");
    }
    prioritate = prioritateNoua;
}

void Pacient::afisare() const {
    Persoana::afisare();
    std::cout << ", Diagnostic: " << diagnostic
              << ", Grupa sange: " << grupaSange
              << ", Internat: " << (internat ? "da" : "nu")
              << ", Prioritate: " << prioritate
              << ", Alergii: " << alergii << "\n";
}
