cmake_minimum_required(VERSION 3.10)
project(GestiuneSpital CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(include)

file(GLOB COMMON_SOURCES src/*.cpp)
list(REMOVE_ITEM COMMON_SOURCES ${CMAKE_CURRENT_SOURCE_DIR}/src/main.cpp)

add_executable(spital_app ${COMMON_SOURCES} src/main.cpp)

add_executable(test_programari ${COMMON_SOURCES} tests/test_programari.cpp)
add_executable(test_facturi ${COMMON_SOURCES} tests/test_facturi.cpp)

enable_testing()
add_test(NAME Programari COMMAND test_programari)
add_test(NAME Facturi COMMAND test_facturi)
