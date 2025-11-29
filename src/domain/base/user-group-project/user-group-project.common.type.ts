export type UserGroupProjectSortKey = 'id';

export type UserGroupProjectQueryOptions = {
  filter?: {
    projectId?: string;
    userGroupId?: string;
  };
};
