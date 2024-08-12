export type CreateUserProps = {
  clerkId?: string;
  email?: string;
  name: string;
  username?: string;
  image?: string;
};

export type SignUpProps = {
  clerkId?: string;
  email?: string;
  password: string;
  fName: string;
  lName: string;
  username?: string;
  image?: string;
};

export type UpdateUserProps = {
  name: string;
  image?: string;
  username?: string;
  address?: {
    addressLine1: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  phoneNumber?: string;
};
