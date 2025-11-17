import { Module } from '@nestjs/common';

import { GenDomainCli } from './gen/gen.cli.domain';
import { GenCliMermaid } from './gen/gen.cli.mermaid';
import { InitialsCliSeed } from './initials/initials.cli.seed';

@Module({
  providers: [GenDomainCli, GenCliMermaid, InitialsCliSeed],
})
export class CliModule {}
