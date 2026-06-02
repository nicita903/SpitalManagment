#ifndef PROGRAMARE_H
#define PROGRAMARE_H

#include <string>

class Programare {
private:
    int idProgramare;
    int idPacient;
    int idMedic;
    std::string data;
    std::string ora;
    std::string tipConsultatie;
    std::string status;

public:
    Programare();
    Programare(int idProgramare, int idPacient, int idMedic, const std::string& data,
               const std::string& ora, const std::string& tipConsultatie,
               const std::string& status = "activa");

    int getIdProgramare() const;
    int getIdPacient() const;
    int getIdMedic() const;
    std::string getData() const;
    std::string getOra() const;
    std::string getTipConsultatie() const;
    std::string getStatus() const;

    void setStatus(const std::string& statusNou);

    bool valideazaProgramare() const;
    bool areConflictOra(const Programare& alta) const;
    void afisare() const;
};

#endif
