#include "Factura.h"

#include "Exceptions.h"
#include "Logger.h"

Factura::Factura(int id, const std::string& cnpPacient, double reducere)
    : id(id), cnpPacient(cnpPacient), reducere(reducere), emisa(false) {
    if (cnpPacient.empty()) {
        throw FacturaInvalidaException("Factura trebuie asociata unui pacient.");
    }
    if (reducere < 0.0 || reducere > 0.75) {
        throw FacturaInvalidaException("Reducerea trebuie sa fie intre 0% si 75%.");
    }
}

int Factura::getId() const {
    return id;
}

std::string Factura::getCnpPacient() const {
    return cnpPacient;
}

double Factura::getReducere() const {
    return reducere;
}

bool Factura::esteEmisa() const {
    return emisa;
}

const std::vector<std::shared_ptr<ServiciuMedical>>& Factura::getServicii() const {
    return servicii;
}

void Factura::adaugaServiciu(const ServiciuMedical& serviciu) {
    if (emisa) {
        throw FacturaInvalidaException("Nu se pot adauga servicii pe o factura emisa.");
    }
    servicii.push_back(serviciu.clone());
}

double Factura::calculeazaTotal() const {
    double total = 0.0;
    for (const auto& serviciu : servicii) {
        total += serviciu->calculeazaCost();
    }
    return total * (1.0 - reducere);
}

void Factura::emite() {
    if (servicii.empty()) {
        throw FacturaInvalidaException("Factura nu poate fi emisa fara servicii.");
    }
    emisa = true;
    Logger::instanta().log("Factura emisa: #" + std::to_string(id) +
                           ", pacient CNP " + cnpPacient +
                           ", total " + std::to_string(calculeazaTotal()));
}
