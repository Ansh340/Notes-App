import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
  ?  JSON.parse(localStorage.getItem("pastes"))
  :  []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    add: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast("Your Notes Created Successfully")
    },
    update: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=>item._id);

      if(index>=0){
        state.pastes[index] = paste;

        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("Your Notes Updated");
      }
    },
    resetAll: (state,) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
      
    },
    remove: (state, action) => {
  const pasteId = action.payload;

  console.log("Deleting ID:", pasteId);
  const index = state.pastes.findIndex((item) => item._id === pasteId);

  if (index >= 0) {
    state.pastes.splice(index, 1);
    localStorage.setItem("pastes", JSON.stringify(state.pastes));
  }
}

  },
})

// Action creators are generated for each case reducer function
export const { add, update, resetAll, remove } = pasteSlice.actions

export default pasteSlice.reducer