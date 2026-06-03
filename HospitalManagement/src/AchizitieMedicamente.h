#ifndef ACHIZITIE_MEDICAMENTE_H
#define ACHIZITIE_MEDICAMENTE_H

#include <string>

class AchizitieMedicamente {
private:
    int idAchizitie;
    int idPacient;
    int idMedicament;
    int cantitate;
    double pretTotal;
    std::string dataAchizitie;
    int idReteta;

public:
    AchizitieMedicamente();
    AchizitieMedicamente(int idAchizitie, int idPacient, int idMedicament, int cantitate,
                         double pretTotal, const std::string& dataAchizitie, int idReteta = 0);

    int getIdAchizitie() const;
    int getIdPacient() const;
    int getIdMedicament() const;
    int getCantitate() const;
    double getPretTotal() const;
    std::string getDataAchizitie() const;
    int getIdReteta() const;
};

#endif
