import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserDataProps {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface UserProps {
  user?: null | UserDataProps;
  setUser: (user: UserDataProps | null) => void;
}

export const useUser = create<UserProps>()(
  persist(
    (set) => ({
      setUser: (user) => {
        set({
          user,
        });
      },
    }),
    {
      name: 'user',
    },
  ),
);
