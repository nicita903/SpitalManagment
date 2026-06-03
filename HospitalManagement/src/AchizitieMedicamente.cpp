#include "AchizitieMedicamente.h"

#include "Exceptions.h"

AchizitieMedicamente::AchizitieMedicamente()
    : idAchizitie(0), idPacient(0), idMedicament(0), cantitate(0), pretTotal(0.0), idReteta(0) {}

AchizitieMedicamente::AchizitieMedicamente(int idAchizitie, int idPacient, int idMedicament,
                                           int cantitate, double pretTotal,
                                           const std::string& dataAchizitie, int idReteta)
    : idAchizitie(idAchizitie), idPacient(idPacient), idMedicament(idMedicament),
      cantitate(cantitate), pretTotal(pretTotal), dataAchizitie(dataAchizitie), idReteta(idReteta) {
    if (idAchizitie <= 0 || idPacient <= 0 || idMedicament <= 0 ||
        cantitate <= 0 || pretTotal < 0.0 || dataAchizitie.empty()) {
        throw DateInvalideException("Date invalide pentru achizitia de medicamente.");
    }
}

int AchizitieMedicamente::getIdAchizitie() const { return idAchizitie; }
int AchizitieMedicamente::getIdPacient() const { return idPacient; }
int AchizitieMedicamente::getIdMedicament() const { return idMedicament; }
int AchizitieMedicamente::getCantitate() const { return cantitate; }
double AchizitieMedicamente::getPretTotal() const { return pretTotal; }
std::string AchizitieMedicamente::getDataAchizitie() const { return dataAchizitie; }
int AchizitieMedicamente::getIdReteta() const { return idReteta; }
