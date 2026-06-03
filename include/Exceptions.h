#ifndef EXCEPTIONS_H
#define EXCEPTIONS_H

#include <stdexcept>
#include <string>

class ProgramareInvalidaException : public std::runtime_error {
public:
    explicit ProgramareInvalidaException(const std::string& mesaj)
        : std::runtime_error(mesaj) {}
};

class FacturaInvalidaException : public std::runtime_error {
public:
    explicit FacturaInvalidaException(const std::string& mesaj)
        : std::runtime_error(mesaj) {}
};

class EntitateNegasitaException : public std::runtime_error {
public:
    explicit EntitateNegasitaException(const std::string& mesaj)
        : std::runtime_error(mesaj) {}
};

#endif
