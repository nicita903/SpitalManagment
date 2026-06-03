#include "Logger.h"

#include <chrono>
#include <ctime>
#include <filesystem>
#include <iomanip>

Logger::Logger() {
    std::filesystem::create_directories("logs");
    fisier.open("logs/spital.log", std::ios::app);
}

Logger::~Logger() {
    if (fisier.is_open()) {
        fisier.close();
    }
}

Logger& Logger::instanta() {
    static Logger logger;
    return logger;
}

void Logger::log(const std::string& mesaj) {
    if (!fisier.is_open()) {
        return;
    }

    auto acum = std::chrono::system_clock::now();
    std::time_t timp = std::chrono::system_clock::to_time_t(acum);
    fisier << std::put_time(std::localtime(&timp), "%Y-%m-%d %H:%M:%S")
           << " | " << mesaj << '\n';
}
