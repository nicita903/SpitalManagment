#include "Logger.h"

#include <ctime>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <sstream>

void Logger::log(const std::string& mesaj) {
    std::filesystem::create_directories("data");
    std::ofstream out("data/log.txt", std::ios::app);
    if (!out) {
        return;
    }

    std::time_t acum = std::time(nullptr);
    out << "[" << std::put_time(std::localtime(&acum), "%Y-%m-%d %H:%M:%S")
        << "] OPERATIUNE: " << mesaj << "\n";
}
