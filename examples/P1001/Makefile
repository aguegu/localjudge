CC      = g++
CFLAGS  =

OUTPUT_DIR = ./dist
TARGET     := $(addprefix $(OUTPUT_DIR)/, $(notdir $(CURDIR)))


$(TARGET): main.cpp
	make $(OUTPUT_DIR)
	$(CC) $(CFLAGS) $? -o $@

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

clean:
	rm -rf $(OUTPUT_DIR)

judge: $(TARGET)
	judge readme.yaml $(TARGET)

watch:
	ls *.cpp | entr -s 'make judge'

.PHONY: clean watch
