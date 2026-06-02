#ifndef UTILIZATOR_H
#define UTILIZATOR_H

#include <string>

class Utilizator {
private:
    std::string username;
    std::string parola;
    std::string rol;

public:
    Utilizator();
    Utilizator(const std::string& username, const std::string& parola, const std::string& rol);

    std::string getUsername() const;
    std::string getParola() const;
    std::string getRol() const;
};

#endif
