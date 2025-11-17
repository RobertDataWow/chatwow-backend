import * as process from 'child_process';
import * as fs from 'fs';
import { Command, CommandRunner } from 'nest-commander';
import * as path from 'path';

const DOMAIN_PATH = path.resolve(__dirname, '../../../core/domain');
const PROVIDER_PATH = path.join(DOMAIN_PATH, 'domain.provider.ts');

function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .toLowerCase();
}
function toPascalCase(str: string) {
  return str.replace(/(^\w|[-_\s]\w)/g, (m) =>
    m.replace(/[-_\s]/, '').toUpperCase(),
  );
}

@Command({
  name: 'gen:domain',
  description: 'Generate a new domain module with boilerplate files',
})
export class GenDomainCli extends CommandRunner {
  async run(passedParams: string[]): Promise<void> {
    const [name] = passedParams;
    if (!name) {
      console.error('Please provide a name for the domain module.');
      return;
    }
    const kebab = toKebabCase(name);
    const pascal = toPascalCase(name);
    const folder = path.join(DOMAIN_PATH, kebab);
    if (fs.existsSync(folder)) {
      console.error(`Domain folder '${folder}' already exists.`);
      return;
    }
    fs.mkdirSync(folder);
    // Generate files
    fs.writeFileSync(
      path.join(folder, `${kebab}.module.ts`),
      `import { Module } from '@nestjs/common';\n\nimport { ${pascal}Repo } from './${kebab}.repo';\nimport { ${pascal}Service } from './${kebab}.service';\n\n@Module({\n  providers: [${pascal}Service, ${pascal}Repo],\n  exports: [${pascal}Service],\n})\nexport class ${pascal}Module {}\n`,
    );
    fs.writeFileSync(
      path.join(folder, `${kebab}.service.ts`),
      `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class ${pascal}Service {\n  // TODO: Implement service methods\n}\n`,
    );
    fs.writeFileSync(
      path.join(folder, `${kebab}.repo.ts`),
      `import { Injectable } from '@nestjs/common';\nimport { BaseRepo } from '@infra/shared/common/common.repo';\n\n@Injectable()\nexport class ${pascal}Repo extends BaseRepo {\n  // TODO: Implement repository methods\n}\n`,
    );
    fs.writeFileSync(
      path.join(folder, `${kebab}.type.ts`),
      `// Types for ${pascal}\n`,
    );
    fs.writeFileSync(
      path.join(folder, `${kebab}.util.ts`),
      `// Utility functions for ${pascal}\n`,
    );
    fs.writeFileSync(
      path.join(folder, `${kebab}.response.ts`),
      `// Response DTOs for ${pascal}\n`,
    );
    // Update domain.provider.ts
    let providerContent = fs.readFileSync(PROVIDER_PATH, 'utf8');
    const importLine = `import { ${pascal}Module } from './${kebab}/${kebab}.module';`;
    if (!providerContent.includes(importLine)) {
      providerContent = importLine + '\n' + providerContent;
    }
    // Insert into DOMAIN_PROVIDER array without leading whitespace or extra blank lines
    providerContent = providerContent.replace(
      /(DOMAIN_PROVIDER\s*=\s*\[[^\]]*)/,
      (match, p1) => {
        // Remove any trailing whitespace or blank lines before closing ]
        let cleaned = p1.replace(/\n+$/, '\n');
        cleaned += `\n${pascal}Module,`;
        // After insertion, remove all consecutive blank lines in the array
        cleaned = cleaned.replace(/\n{2,}/g, '\n');
        return cleaned;
      },
    );
    fs.writeFileSync(PROVIDER_PATH, providerContent);
    try {
      process.execSync(
        'npx eslint --quiet --fix @infra/domain/domain.provider.ts',
        {
          stdio: 'inherit',
        },
      );
    } catch {
      console.warn(
        'Could not run lint automatically. Please lint @infra/domain/domain.provider.ts manually.',
      );
    }
    console.log(`Domain module '${kebab}' generated and registered.`);
  }
}
