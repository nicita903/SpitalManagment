#ifndef INTRARE_SPITAL_H
#define INTRARE_SPITAL_H

#include <string>
#include <vector>

class IntrareSpital {
private:
    int idIntrare;
    int idPacient;
    std::string dataIntrare;
    std::string oraIntrare;
    std::string modIntrare;
    std::string motivPrezentare;
    std::string nivelUrgenta;
    std::string insotitor;
    std::string observatiiInitiale;
    std::string status;

public:
    IntrareSpital();
    IntrareSpital(int idIntrare, int idPacient, const std::string& dataIntrare,
                  const std::string& oraIntrare, const std::string& modIntrare,
                  const std::string& motivPrezentare, const std::string& nivelUrgenta,
                  const std::string& insotitor, const std::string& observatiiInitiale,
                  const std::string& status = "inregistrat");

    int getIdIntrare() const;
    int getIdPacient() const;
    std::string getDataIntrare() const;
    std::string getOraIntrare() const;
    std::string getModIntrare() const;
    std::string getMotivPrezentare() const;
    std::string getNivelUrgenta() const;
    std::string getInsotitor() const;
    std::string getObservatiiInitiale() const;
    std::string getStatus() const;

    void actualizeazaStatusIntrare(const std::string& statusNou);
    void afisare() const;

    static void inregistreazaIntrare(std::vector<IntrareSpital>& intrari, const IntrareSpital& intrare);
    static void afiseazaIntrari(const std::vector<IntrareSpital>& intrari);
    static void cautaIntrareDupaPacient(const std::vector<IntrareSpital>& intrari, int idPacient);
    static void exportIntrariJson(const std::vector<IntrareSpital>& intrari, const std::string& cale);
};

#endif
