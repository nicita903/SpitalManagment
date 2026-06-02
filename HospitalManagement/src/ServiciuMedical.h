#ifndef SERVICIU_MEDICAL_H
#define SERVICIU_MEDICAL_H

#include <string>

class ServiciuMedical {
public:
    virtual ~ServiciuMedical() = default;
    virtual double calculeazaCost() const = 0;
    virtual std::string getDenumire() const = 0;
};

class Consultatie : public ServiciuMedical {
private:
    double tarif;

public:
    explicit Consultatie(double tarif) : tarif(tarif) {}
    double calculeazaCost() const override { return tarif; }
    std::string getDenumire() const override { return "Consultatie"; }
};

class Analize : public ServiciuMedical {
private:
    int numarAnalize;

public:
    explicit Analize(int numarAnalize) : numarAnalize(numarAnalize) {}
    double calculeazaCost() const override { return 60.0 + numarAnalize * 35.0; }
    std::string getDenumire() const override { return "Analize"; }
};

class InternareServiciu : public ServiciuMedical {
private:
    int zile;
    double costPeZi;

public:
    InternareServiciu(int zile, double costPeZi) : zile(zile), costPeZi(costPeZi) {}
    double calculeazaCost() const override { return zile * costPeZi; }
    std::string getDenumire() const override { return "Internare"; }
};

class Operatie : public ServiciuMedical {
private:
    double costBaza;
    bool urgenta;

public:
    Operatie(double costBaza, bool urgenta) : costBaza(costBaza), urgenta(urgenta) {}
    double calculeazaCost() const override { return urgenta ? costBaza * 1.30 : costBaza; }
    std::string getDenumire() const override { return "Operatie"; }
};

#endif
