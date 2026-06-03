#ifndef FARMACIE_H
#define FARMACIE_H

#include "AchizitieMedicamente.h"
#include "Medicament.h"

#include <string>
#include <vector>

class Farmacie {
public:
    static void adaugaMedicament(std::vector<Medicament>& medicamente, const Medicament& medicament);
    static Medicament* cautaMedicament(std::vector<Medicament>& medicamente, int idMedicament);
    static AchizitieMedicamente vindeMedicament(std::vector<Medicament>& medicamente,
                                                int idAchizitie, int idPacient, int idMedicament,
                                                int cantitate, const std::string& dataAchizitie,
                                                int idReteta = 0);
    static double calculeazaValoareStoc(const std::vector<Medicament>& medicamente);
    static void exportMedicamenteJson(const std::vector<Medicament>& medicamente, const std::string& cale);
    static void exportAchizitiiJson(const std::vector<AchizitieMedicamente>& achizitii, const std::string& cale);
};

#endif
