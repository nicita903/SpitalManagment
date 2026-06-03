#ifndef SERVICIU_MEDICAL_H
#define SERVICIU_MEDICAL_H

#include <memory>
#include <string>

class ServiciuMedical {
public:
    virtual ~ServiciuMedical() = default;

    virtual std::string getDenumire() const = 0;
    virtual double calculeazaCost() const = 0;
    virtual std::shared_ptr<ServiciuMedical> clone() const = 0;
};

class Consultatie : public ServiciuMedical {
private:
    std::string specializare;
    double tarifMedic;

public:
    Consultatie(const std::string& specializare, double tarifMedic);

    std::string getDenumire() const override;
    double calculeazaCost() const override;
    std::shared_ptr<ServiciuMedical> clone() const override;
};

class AnalizaLaborator : public ServiciuMedical {
private:
    std::string tipAnaliza;
    int numarParametri;

public:
    AnalizaLaborator(const std::string& tipAnaliza, int numarParametri);

    std::string getDenumire() const override;
    double calculeazaCost() const override;
    std::shared_ptr<ServiciuMedical> clone() const override;
};

class Interventie : public ServiciuMedical {
private:
    std::string tipInterventie;
    double costBaza;
    bool urgenta;

public:
    Interventie(const std::string& tipInterventie, double costBaza, bool urgenta);

    std::string getDenumire() const override;
    double calculeazaCost() const override;
    std::shared_ptr<ServiciuMedical> clone() const override;
};

#endif
