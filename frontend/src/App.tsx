import './App.css';
import { Box} from '@chakra-ui/react';
import { MainLayout } from './Layouts/MainLayout.tsx';
import { createSlice } from '@reduxjs/toolkit';
import { User } from './types';
import { LandingPage } from './LandingPage.tsx';
interface CounterState {
  user: User | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  user: null,
};
export const counterSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    auth: (state, action) => {
      state.user = action.payload;
    },
  },
});
function App() {


  return (
    <MainLayout>
      <Box>

        <LandingPage/>
      </Box>
    </MainLayout>
  );
}

export default App;
