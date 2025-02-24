export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
};

export type BaseType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
