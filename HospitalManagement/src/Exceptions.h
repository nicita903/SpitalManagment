#ifndef EXCEPTIONS_H
#define EXCEPTIONS_H

#include <exception>
#include <string>

class ProgramareInvalidaException : public std::exception {
private:
    std::string mesaj;

public:
    explicit ProgramareInvalidaException(const std::string& mesaj) : mesaj(mesaj) {}
    const char* what() const noexcept override { return mesaj.c_str(); }
};

class PacientInexistentException : public std::exception {
private:
    std::string mesaj;

public:
    explicit PacientInexistentException(const std::string& mesaj) : mesaj(mesaj) {}
    const char* what() const noexcept override { return mesaj.c_str(); }
};

class FacturaInvalidaException : public std::exception {
private:
    std::string mesaj;

public:
    explicit FacturaInvalidaException(const std::string& mesaj) : mesaj(mesaj) {}
    const char* what() const noexcept override { return mesaj.c_str(); }
};

class SectiePlinaException : public std::exception {
private:
    std::string mesaj;

public:
    explicit SectiePlinaException(const std::string& mesaj) : mesaj(mesaj) {}
    const char* what() const noexcept override { return mesaj.c_str(); }
};

class DateInvalideException : public std::exception {
private:
    std::string mesaj;

public:
    explicit DateInvalideException(const std::string& mesaj) : mesaj(mesaj) {}
    const char* what() const noexcept override { return mesaj.c_str(); }
};

class MedicInexistentException : public std::exception {
private:
    std::string mesaj;

public:
    explicit MedicInexistentException(const std::string& mesaj) : mesaj(mesaj) {}
    const char* what() const noexcept override { return mesaj.c_str(); }
};

#endif
