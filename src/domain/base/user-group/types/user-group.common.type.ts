export type UserGroupSortKey = 'id' | 'groupName';

export type UserGroupQueryOptions = {
  filter?: {
    groupName?: string;
  };
};
