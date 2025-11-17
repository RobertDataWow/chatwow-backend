import 'tsconfig-paths/register';

export default async () => {
  if (globalThis.pgContainer) {
    await globalThis.pgContainer.stop();
  }
};
