#include "ServiciuMedical.h"

Consultatie::Consultatie(const std::string& specializare, double tarifMedic)
    : specializare(specializare), tarifMedic(tarifMedic) {}

std::string Consultatie::getDenumire() const {
    return "Consultatie " + specializare;
}

double Consultatie::calculeazaCost() const {
    return tarifMedic;
}

std::shared_ptr<ServiciuMedical> Consultatie::clone() const {
    return std::make_shared<Consultatie>(*this);
}

AnalizaLaborator::AnalizaLaborator(const std::string& tipAnaliza, int numarParametri)
    : tipAnaliza(tipAnaliza), numarParametri(numarParametri) {}

std::string AnalizaLaborator::getDenumire() const {
    return "Analiza laborator - " + tipAnaliza;
}

double AnalizaLaborator::calculeazaCost() const {
    return 80.0 + numarParametri * 15.0;
}

std::shared_ptr<ServiciuMedical> AnalizaLaborator::clone() const {
    return std::make_shared<AnalizaLaborator>(*this);
}

Interventie::Interventie(const std::string& tipInterventie, double costBaza, bool urgenta)
    : tipInterventie(tipInterventie), costBaza(costBaza), urgenta(urgenta) {}

std::string Interventie::getDenumire() const {
    return urgenta ? "Interventie urgenta - " + tipInterventie
                   : "Interventie - " + tipInterventie;
}

double Interventie::calculeazaCost() const {
    return urgenta ? costBaza * 1.35 : costBaza;
}

std::shared_ptr<ServiciuMedical> Interventie::clone() const {
    return std::make_shared<Interventie>(*this);
}
