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

- Node.js 22 (you can see the .nvmrc file and use the right version by saying `nvm use`. NVM will automatically pick the given version)
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

The site supports multiple languages using Eleventy's i18n plugin (at the moment is disabled, but the feature is there for future use, fully functioning):

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

## Content Editing Guide

### For Content Creators

If you need to edit content on the site, you can do everything directly in GitHub's web interface:

#### 1. Navigate to the Content File

Go to the GitHub repository and find the content file you want to edit:

- **English content**: `src/en/content/[page-name].md`
- **Spanish content**: `src/es/content/[page-name].md`
- **Irish content**: `src/ga/content/[page-name].md`

Example: To edit the homepage, navigate to `src/en/content/index.md`

#### 2. Start Editing

1. Click the **pencil icon** (✏️) in the top-right corner of the file view
2. GitHub will automatically create a new branch for your changes
3. Edit the content directly in the browser using Markdown syntax

#### 3. Markdown Syntax

Basic formatting:
```markdown
# Main Heading

## Section Heading

This is a paragraph with **bold text** and *italic text*.

- Bullet point
- Another point

[Link text](https://example.com)
```

Adding CSS classes for styling (optional):
```markdown
# Heading with custom styling {.app-custom-class}

Paragraph text {.u-layout-focus}
```

#### 4. Preview Your Changes

Click the **"Preview"** tab at the top of the editor to see how your Markdown will look (note: custom CSS classes won't show in the preview).

#### 5. Commit Your Changes

1. Scroll down to the "Commit changes" section
2. Add a commit message describing your changes (e.g., "Update homepage content")
3. Select **"Create a new branch"** and give it a descriptive name (e.g., `content/update-homepage`)
4. Click **"Propose changes"**

#### 6. Create Pull Request

GitHub will automatically take you to the Pull Request creation page:

1. Review your changes
2. Add a description of what you changed and why
3. Click **"Create pull request"**

#### 7. Review and Deploy

- A reviewer will check your changes and may leave comments or suggestions
- You can make additional edits by clicking "Add more commits" in the PR
- Once approved and merged to `main`, GitHub Actions automatically builds and deploys the site live.
- Your changes will be live at https://dotpublic.github.io/proposal/ within a few minutes

### Tips for Content Creators

- **Make small, focused changes**: It's better to have multiple small PRs than one large one
- **Check spelling**: Review your content before creating the PR
- **Be descriptive**: Explain what you changed and why in your PR description
- **Ask for help**: If you're unsure about Markdown syntax or need help, ask in the PR comments

### Available Pages

Current pages you can edit:

- `index.md` - Homepage
- `introducing-dotpublic.md` - Introducing Dot-Public
- `about-dot-public.md` - About Dot-Public
- `the-proposal.md` - The Proposal
- `situating-dotpublic.md` - Situating Dot-Public
- `cleaner-digital-tools.md` - Cleaner Digital Tools
- `delivering-stage-one.md` - Delivering Stage One
- `eligibility-and-permissions.md` - Eligibility and Permissions
- `from-theory-to-delivery.md` - From Theory to Delivery
- `identity-privacy-provenance.md` - Identity, Privacy & Provenance
- `model-of-governance.md` - Model of Governance
- `the-path-forward.md` - The Path Forward
- `trustworthy-by-choice.md` - Trustworthy by Choice

### Adding a New Page

To create a new page, you'll need developer assistance as it requires creating template files and updating navigation. Contact a developer with:

- The desired page name and URL
- The content you want on the page
- Where it should appear in the navigation

They will set up the page structure, and then you can edit the content using the workflow above.

---

## Developer Documentation

## Configuration

- **Path Prefix**: Set in `.eleventy.js` (`pathPrefix: '/proposal/'`)
- **Navigation**: Configured per language in `src/_data/[lang].json`
- **Build Scripts**: Defined in `package.json`
