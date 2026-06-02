#include "AuthService.h"

#include "Logger.h"

AuthService::AuthService()
    : utilizatori({
          Utilizator("admin", "admin123", "admin"),
          Utilizator("medic", "medic123", "medic"),
          Utilizator("receptie", "receptie123", "receptie")
      }) {}

std::string AuthService::login(const std::string& username, const std::string& password) const {
    for (const auto& utilizator : utilizatori) {
        if (utilizator.getUsername() == username && utilizator.getParola() == password) {
            Logger::log("login reusit pentru utilizatorul " + username + " cu rol " + utilizator.getRol());
            return utilizator.getRol();
        }
    }

    Logger::log("login esuat pentru utilizatorul " + username);
    return "";
}

bool AuthService::hasPermission(const std::string& role, const std::string& action) const {
    if (role == "admin") {
        return true;
    }

    if (role == "medic") {
        return action == "afiseaza_pacienti" ||
               action == "afiseaza_programari" ||
               action == "afiseaza_internari" ||
               action == "afiseaza_statistici" ||
               action == "cauta_pacienti" ||
               action == "actualizeaza_diagnostic" ||
               action == "adauga_istoric" ||
               action == "emite_reteta";
    }

    if (role == "receptie") {
        return action == "adauga_pacient" ||
               action == "creeaza_programare" ||
               action == "afiseaza_pacienti" ||
               action == "afiseaza_programari" ||
               action == "cauta_pacienti";
    }

    return false;
}
