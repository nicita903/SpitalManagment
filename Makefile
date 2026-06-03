CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -pedantic -Iinclude
COMMON_SRCS = $(filter-out src/main.cpp,$(wildcard src/*.cpp))

.PHONY: all run test clean

all: build/spital_app

build:
	mkdir -p build

build/spital_app: build $(COMMON_SRCS) src/main.cpp
	$(CXX) $(CXXFLAGS) $(COMMON_SRCS) src/main.cpp -o build/spital_app

build/test_programari: build $(COMMON_SRCS) tests/test_programari.cpp
	$(CXX) $(CXXFLAGS) $(COMMON_SRCS) tests/test_programari.cpp -o build/test_programari

build/test_facturi: build $(COMMON_SRCS) tests/test_facturi.cpp
	$(CXX) $(CXXFLAGS) $(COMMON_SRCS) tests/test_facturi.cpp -o build/test_facturi

run: build/spital_app
	./build/spital_app

test: build/test_programari build/test_facturi
	./build/test_programari
	./build/test_facturi

clean:
	rm -rf build logs data/spital.json
