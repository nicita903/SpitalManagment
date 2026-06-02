#ifndef PRIORITATE_UTILS_H
#define PRIORITATE_UTILS_H

#include "Pacient.h"
#include <vector>

int valoarePrioritate(const std::string& prioritate);
void sorteazaPacientiDupaPrioritate(std::vector<Pacient>& pacienti);
std::vector<Pacient> filtreazaPacientiUrgenti(const std::vector<Pacient>& pacienti);
void afiseazaPacientiUrgenti(const std::vector<Pacient>& pacienti);

#endif
