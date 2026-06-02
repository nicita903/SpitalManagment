#ifndef RETETA_H
#define RETETA_H

#include <string>
#include <vector>

class Reteta {
private:
    int idReteta;
    int idPacient;
    int idMedic;
    std::string medicamente;
    std::string dozaj;
    std::string durataTratament;
    std::string dataEmitere;

public:
    Reteta();
    Reteta(int idReteta, int idPacient, int idMedic, const std::string& medicamente,
           const std::string& dozaj, const std::string& durataTratament,
           const std::string& dataEmitere);

    int getIdReteta() const;
    int getIdPacient() const;
    int getIdMedic() const;
    std::string getMedicamente() const;
    std::string getDozaj() const;
    std::string getDurataTratament() const;
    std::string getDataEmitere() const;

    void afisare() const;

    static void emiteReteta(std::vector<Reteta>& retete, const Reteta& reteta);
    static void afiseazaRetete(const std::vector<Reteta>& retete);
    static void cautaRetetaDupaPacient(const std::vector<Reteta>& retete, int idPacient);
    static void exportReteteJson(const std::vector<Reteta>& retete, const std::string& cale);
};

#endif
