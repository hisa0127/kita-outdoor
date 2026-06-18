# KITA OUTDOOR - Shopify Dawn Customization Rules

## Context
- This is a Shopify Dawn theme customization project
- We are extending Dawn, not building from scratch
- Brand: KITA OUTDOOR (outdoor gear D2C)
- Brand colors: --color-primary: #1B4332, --color-bg: #F8F4EF, --color-gray: #9E9E9E

## Code Style
- New section files must be prefixed with "kita-" to distinguish from Dawn defaults
- Use Dawn's existing CSS variables (var(--color-accent-1), etc.) where possible
- For new CSS, add to assets/custom.css rather than modifying Dawn's base files directly
- Use BEM naming convention for new CSS classes
- Write vanilla JavaScript only (no jQuery, no frameworks)
- All new sections must have {% schema %} with presets defined
- Add {{ block.shopify_attributes }} to block elements

## Schema Rules
- Always include "presets" for new sections
- Use Japanese for label and name values
- Provide sensible default values for all settings
