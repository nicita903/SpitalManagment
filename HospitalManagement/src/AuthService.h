#ifndef AUTH_SERVICE_H
#define AUTH_SERVICE_H

#include "Utilizator.h"
#include <string>
#include <vector>

class AuthService {
private:
    std::vector<Utilizator> utilizatori;

public:
    AuthService();

    std::string login(const std::string& username, const std::string& password) const;
    bool hasPermission(const std::string& role, const std::string& action) const;
};

#endif
