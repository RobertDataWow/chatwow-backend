export type UserVerificationSortKey = 'id' | 'createdAt';

export type UserVerificationQueryOptions = {
  filter?: {
    otp?: string;
    userId?: string;
  };
};
