#include "Utilizator.h"

Utilizator::Utilizator() = default;

Utilizator::Utilizator(const std::string& username, const std::string& parola, const std::string& rol)
    : username(username), parola(parola), rol(rol) {}

std::string Utilizator::getUsername() const { return username; }
std::string Utilizator::getParola() const { return parola; }
std::string Utilizator::getRol() const { return rol; }
