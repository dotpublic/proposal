# Dot-Public Proposal Website

A static site for the Dot-Public proposal, built with [Eleventy](https://www.11ty.dev/) and the Elements design system as a base.

## Tech Stack

- **Static Site Generator**: Eleventy 3.0
- **Templating**: Handlebars
- **CSS**: SCSS (compiled via Rollup)
- **JavaScript**: Bundled with Rollup
- **Design System**: [@springernature/elements](https://www.npmjs.com/package/@springernature/elements)

## Project Structure

```
├── src/
│   ├── _data/           # Data files (navigation, etc.)
│   ├── assets/
│   │   ├── img/         # Images
│   │   ├── js/          # JavaScript source
│   │   └── scss/        # SCSS stylesheets
│   └── templates/
│       ├── pages/       # Page templates (.hbs)
│       ├── partials/    # Reusable components
│       └── layout.hbs   # Base layout
├── docs/                # Build output (GitHub Pages)
└── .eleventy.js         # Eleventy configuration
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

```bash
npm install
```

### Development

Run the development server with live reload:

```bash
npm run dev
```

The site will be available at `http://localhost:8080`

### Build

Normally you would generate the production build:

```bash
npm run build
```

And output would be generated in the `docs/` directory.
But We don't need this as the GitHub Actions workflow handles building and deploying the site.

## Deployment

The site is deployed to GitHub Pages using GitHub Actions. On push to `main`, the workflow:

1. Installs dependencies
2. Builds the site
3. Deploys to GitHub Pages

The site is available at: https://dotpublic.github.io/proposal/

## Multi-language Support

The site supports multiple languages using Eleventy's i18n plugin:

### Languages
- **English** (default): `/proposal/`
- **Spanish**: `/proposal/es/`
- **Irish (Gaeilge)**: `/proposal/ga/`

### Architecture
- **Language-specific content**: Organized in `src/en/`, `src/es/`, `src/ga/` directories
- **Language-specific data**: Navigation and translations in `src/_data/en.json`, `es.json`, `ga.json`
- **Language switcher**: Client-side component in `src/templates/partials/language-switcher.hbs`
- **Layout**: Dynamically loads language data based on `page.lang` variable

### Adding a New Language
1. Create directory: `src/[lang-code]/pages/`
2. Create data file: `src/_data/[lang-code].json` with translations
3. Add option to language switcher in `language-switcher.hbs`
4. Update layout conditionals in `layout.hbs` to include new language

### Technical Details
- **i18n Plugin**: Configured in `.eleventy.js` with `defaultLanguage: "en"` and `errorMode: "allow-fallback"`
- **Handlebars Helper**: Custom `eq` helper registered for template conditionals
- **URL Structure**: Language prefix automatically prepended (except for default English)

## Configuration

- **Path Prefix**: Set in `.eleventy.js` (`pathPrefix: '/proposal/'`)
- **Navigation**: Configured per language in `src/_data/[lang].json`
- **Build Scripts**: Defined in `package.json`
