#ifndef JSON_STORAGE_H
#define JSON_STORAGE_H

#include "SpitalService.h"
#include <string>

class JsonStorage {
public:
    static void salveazaSnapshot(const SpitalService& spital, const std::string& caleFisier);
};

#endif
