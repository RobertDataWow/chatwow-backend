export type ProjectDocumentSortKey = 'id';

export type ProjectDocumentQueryOptions = {
  filter?: {
    documentStatus?: 'ACTIVE' | 'INACTIVE';
  };
};
