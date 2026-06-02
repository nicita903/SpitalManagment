#ifndef ISTORIC_MEDICAL_H
#define ISTORIC_MEDICAL_H

#include <string>
#include <vector>

class IstoricMedical {
private:
    int idIstoric;
    int idPacient;
    std::string diagnosticAnterior;
    std::string tratament;
    std::string dataConsultatie;
    std::string observatiiMedic;

public:
    IstoricMedical();
    IstoricMedical(int idIstoric, int idPacient, const std::string& diagnosticAnterior,
                   const std::string& tratament, const std::string& dataConsultatie,
                   const std::string& observatiiMedic);

    int getIdIstoric() const;
    int getIdPacient() const;
    std::string getDiagnosticAnterior() const;
    std::string getTratament() const;
    std::string getDataConsultatie() const;
    std::string getObservatiiMedic() const;

    void afisare() const;

    static void adaugaIstoric(std::vector<IstoricMedical>& istoric, const IstoricMedical& intrare);
    static void afiseazaIstoricPacient(const std::vector<IstoricMedical>& istoric, int idPacient);
    static void exportIstoricJson(const std::vector<IstoricMedical>& istoric, const std::string& cale);
};

#endif
