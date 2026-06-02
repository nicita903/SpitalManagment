CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -pedantic
APP = hospital_app

SOURCES = $(filter-out src/main.cpp,$(wildcard src/*.cpp))

.PHONY: all run test clean

all: $(APP)

$(APP): $(SOURCES) src/main.cpp
	$(CXX) $(CXXFLAGS) $(SOURCES) src/main.cpp -o $(APP)

test_programari: $(SOURCES) tests/test_programari.cpp
	$(CXX) $(CXXFLAGS) $(SOURCES) tests/test_programari.cpp -o test_programari

test_facturi: $(SOURCES) tests/test_facturi.cpp
	$(CXX) $(CXXFLAGS) $(SOURCES) tests/test_facturi.cpp -o test_facturi

test_auth: $(SOURCES) tests/test_auth.cpp
	$(CXX) $(CXXFLAGS) $(SOURCES) tests/test_auth.cpp -o test_auth

test_statistici_internari: $(SOURCES) tests/test_statistici_internari.cpp
	$(CXX) $(CXXFLAGS) $(SOURCES) tests/test_statistici_internari.cpp -o test_statistici_internari

test_extensii: $(SOURCES) tests/test_extensii.cpp
	$(CXX) $(CXXFLAGS) $(SOURCES) tests/test_extensii.cpp -o test_extensii

run: $(APP)
	./$(APP)

test: test_programari test_facturi test_auth test_statistici_internari test_extensii
	./test_programari
	./test_facturi
	./test_auth
	./test_statistici_internari
	./test_extensii

clean:
	rm -f $(APP) test_programari test_facturi test_auth test_statistici_internari test_extensii
