export type ProjectSortKey = 'id' | 'projectName' | 'createdAt';

export type ProjectQueryOptions = {
  filter?: {
    projectName?: string;
    projectStatus?: 'ACTIVE' | 'INACTIVE';
  };
};
