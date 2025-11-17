import * as fs from 'fs';
import { Command, CommandRunner } from 'nest-commander';
import * as path from 'path';
import { Project } from 'ts-morph';

@Command({
  name: 'gen:mermaid',
  description: 'Generate a mermaid from class',
})
export class GenCliMermaid extends CommandRunner {
  async run(_passedParams: string[]): Promise<void> {
    try {
      await this.exec();
    } catch (e) {
      console.log('==================================');
      console.log(e);
      console.log('==================================');
    }
  }

  async exec() {
    const DOMAIN_PATH = path.resolve('@infra/domain'); // adjust if needed
    const OUTPUT_FILE = 'domain-diagram.md';

    const project = new Project({
      tsConfigFilePath: path.resolve('tsconfig.json'),
    });

    // Add all domain files
    project.addSourceFilesAtPaths(`${DOMAIN_PATH}/**/*.ts`);

    const domainFiles = project
      .getSourceFiles()
      .filter(
        (f) =>
          f.getFilePath().endsWith('.domain.ts') &&
          f.getFilePath().startsWith(DOMAIN_PATH) &&
          !f.getFilePath().startsWith(`${DOMAIN_PATH}/base`),
      );

    // Helper: clean type name
    function cleanType(typeText) {
      const cleaned = typeText
        // Remove import paths
        .replace(/import\([^)]+\)\./g, '')
        // Remove generic args like <...>
        .replace(/<[^>]+>/g, '')
        // Replace inline object definitions with "object"
        .replace(/\{[^}]*\}/g, 'object')
        // Replace TS utility types with "object"
        .replace(/\b(Omit|Partial|Readonly|Pick|Record)\b/g, 'object')
        // Remove null/undefined
        .replace(/\s*\|\s*(null|undefined)/g, '')
        // Quote union words with spaces or special chars
        .replace(/\b([A-Z_]+)\s*\|\s*([A-Z_]+)/g, '"$1|$2"')
        // Collapse multiple spaces
        .replace(/\s+/g, ' ')
        .trim();

      return cleaned || 'any';
    }

    let diagram = `\`\`\`mermaid\n`;
    diagram += 'classDiagram\n';
    for (const sourceFile of domainFiles) {
      for (const cls of sourceFile.getClasses()) {
        const className = cls.getName();
        if (!className) continue;

        diagram += `class ${className} {\n`;

        // Properties
        for (const prop of cls.getProperties()) {
          const name = prop.getName();
          const typeText = cleanType(prop.getType().getText());
          diagram += `  +${typeText} ${name}\n`;
        }

        // Methods
        for (const method of cls.getMethods()) {
          const name = method.getName();
          const params = method
            .getParameters()
            .map((p) => `${p.getName()}: ${cleanType(p.getType().getText())}`)
            .join(', ');
          const returnType = cleanType(method.getReturnType().getText());
          diagram += `  +${name}(${params}): ${returnType}\n`;
        }

        diagram += '}\n';
      }
    }

    diagram += `\n\`\`\``;
    fs.writeFileSync(OUTPUT_FILE, diagram);
    console.log(`✅ Mermaid diagram saved to ${OUTPUT_FILE}`);
  }
}
