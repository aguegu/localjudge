CC      = g++
CFLAGS  =

SRC  = main.cpp
OUTPUT_DIR = ./dist
TARGET     := $(addprefix $(OUTPUT_DIR)/, $(notdir $(CURDIR)))

$(TARGET): $(SRC) | $(OUTPUT_DIR)
	$(CC) $(CFLAGS) $? -o $@

run: $(TARGET)
	$(TARGET)

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

clean:
	rm -rf $(OUTPUT_DIR)

judge: $(TARGET)
	judge readme.yaml $(TARGET)

watch:
	ls *.cpp | entr -s 'make judge'

.PHONY: clean watch
