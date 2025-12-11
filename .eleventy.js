import handlebarsPlugin from '@11ty/eleventy-plugin-handlebars';

export default function(eleventyConfig) {
  // Add Handlebars plugin
  eleventyConfig.addPlugin(handlebarsPlugin);

  // Before build: copy Elements templates
  eleventyConfig.on('eleventy.before', async () => {
    const { execSync } = await import('child_process');
    console.log('📦 Copying Elements component templates...');
    execSync('node ./takeElementsTemplates.js', { stdio: 'inherit' });
  });

  // Ignore layout file from being processed as a template
  eleventyConfig.ignores.add('src/templates/layout.hbs');

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy('src/assets/img');

  // Transform to rewrite absolute paths to relative for GitHub Pages
  eleventyConfig.addTransform('rewriteAssetPaths', function(content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      return content
        .replace(/(<link\b[^>]*\bhref=)(['"])\/css\//gi, '$1$2./css/')
        .replace(/(<script\b[^>]*\bsrc=)(['"])\/js\//gi, '$1$2./js/')
        .replace(/(<img\b[^>]*\bsrc=)(['"])\/img\//gi, '$1$2./img/')
        .replace(/(<use\b[^>]*\b(?:xlink:)?href=)(['"])\/img\//gi, '$1$2./img/');
    }
    return content;
  });



  // After build: harvest icons from Elements package
  eleventyConfig.on('eleventy.after', async () => {
    const { readdir, copyFile, mkdir } = await import('fs/promises');
    const { join } = await import('path');
    const { fileURLToPath } = await import('url');
    
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const elementsDir = join(__dirname, 'node_modules', '@springernature', 'elements', 'components');
    const iconsOutDir = join(__dirname, 'docs', 'img', 'icons');

    console.log('🎨 Harvesting SVG icons from Elements components...');
    
    try {
      await mkdir(iconsOutDir, { recursive: true });
      
      const components = await readdir(elementsDir, { withFileTypes: true });
      
      for (const comp of components) {
        if (!comp.isDirectory()) continue;
        
        const iconsPath = join(elementsDir, comp.name, 'icons');
        try {
          const icons = await readdir(iconsPath);
          for (const icon of icons) {
            if (icon.endsWith('.svg')) {
              await copyFile(
                join(iconsPath, icon),
                join(iconsOutDir, icon)
              );
            }
          }
        } catch (err) {
          // No icons folder, skip silently
        }
      }
      console.log('✅ Icons harvested successfully');
    } catch (err) {
      console.warn('⚠️ Icon harvesting warning:', err.message);
    }
  });

  return {
    dir: {
      input: 'src/templates',
      output: 'docs',
      includes: 'partials',
      layouts: '.',
      data: '../_data'
    },
    templateFormats: ['hbs', 'html', 'md'],
    htmlTemplateEngine: 'hbs',
    markdownTemplateEngine: 'hbs'
  };
}
