export function getStoredFileKey(opts: {
  id: string;
  ownerTable: string;
  isPublic: boolean;
}): string {
  const folder = opts.isPublic ? 'stored_files_public' : 'stored_files';
  return `${folder}/${opts.ownerTable}/${opts.id}`;
}
