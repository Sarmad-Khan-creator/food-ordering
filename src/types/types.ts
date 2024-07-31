export type CreateUserProps = {
  clerkId?: string;
  email?: string;
  fName?: string;
  lName?: string;
  username?: string;
  image?: string;
};

export type SignUpProps = {
  password: string;
} & CreateUserProps;

export type UpdateUserProps = {
  fName?: string;
  lName?: string;
  image?: string;
};
