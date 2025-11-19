export const STORED_FILE_OWNER_TABLE = {
  PROJECT_DOCUMENT: 'project_documents',
} as const;
export type STORED_FILE_OWNER_TABLE =
  (typeof STORED_FILE_OWNER_TABLE)[keyof typeof STORED_FILE_OWNER_TABLE];
