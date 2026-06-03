#ifndef PROGRAMARE_H
#define PROGRAMARE_H

#include <string>

enum class StatusProgramare {
    Planificata,
    Anulata,
    Finalizata
};

class Programare {
private:
    int id;
    std::string cnpPacient;
    int idMedic;
    std::string data;
    std::string ora;
    std::string motiv;
    StatusProgramare status;

    static bool esteDataValida(const std::string& data);
    static bool esteOraValida(const std::string& ora);

public:
    Programare(int id, const std::string& cnpPacient, int idMedic,
               const std::string& data, const std::string& ora,
               const std::string& motiv);

    int getId() const;
    std::string getCnpPacient() const;
    int getIdMedic() const;
    std::string getData() const;
    std::string getOra() const;
    std::string getMotiv() const;
    StatusProgramare getStatus() const;
    std::string getStatusText() const;

    void anuleaza();
    void finalizeaza();
};

#endif
