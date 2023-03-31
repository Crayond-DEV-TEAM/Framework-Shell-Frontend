import { create } from 'zustand';
import { UserInterface } from '../interface';
import { giveMeUserIntialState } from '../utils';

const initialState = giveMeUserIntialState();

export const useUser = create<UserInterface>((set, get) => ({
  user: initialState,
  setUser: (payload) => set({ [payload.key]: payload.value }),
}));
