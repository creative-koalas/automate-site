PRODUCT_NAME := PsyGo

SRC_DIR := legal
OUT_DIR := public/legal

MD_FILES := $(wildcard $(SRC_DIR)/*.md)
HTML_FILES := $(patsubst $(SRC_DIR)/%.md,$(OUT_DIR)/%.html,$(MD_FILES))

CSS_SRC := $(SRC_DIR)/style.css
CSS_OUT := $(OUT_DIR)/style.css

.PHONY: all
all: $(CSS_OUT) $(HTML_FILES)

$(OUT_DIR):
	mkdir -p $(OUT_DIR)

# Copy CSS next to the generated HTML so relative linking works.
$(CSS_OUT): $(CSS_SRC) | $(OUT_DIR)
	cp $< $@

# Convert each Markdown file into HTML in public/legal/
$(OUT_DIR)/%.html: $(SRC_DIR)/%.md $(CSS_OUT) | $(OUT_DIR)
	title=$$(PRODUCT_NAME="$(PRODUCT_NAME)" perl -ne 'if ($$. == 1) { s/^#\s+//; s/\{\{PRODUCT_NAME\}\}/$$ENV{PRODUCT_NAME}/g; chomp; print; exit }' $<); \
	PRODUCT_NAME="$(PRODUCT_NAME)" perl -pe 's/\{\{PRODUCT_NAME\}\}/$$ENV{PRODUCT_NAME}/g' $< | \
		pandoc \
			--from markdown \
			--standalone \
			--metadata title="$$title" \
			--css style.css \
			-o $@

.PHONY: clean
clean:
	rm -f $(OUT_DIR)/*.html $(CSS_OUT)
