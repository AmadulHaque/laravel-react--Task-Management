import {createSlice} from "@reduxjs/toolkit";
export const taskSlice=createSlice({
    name:'task',
    initialState:{
        New:[],
        details:{},
     
    },
    reducers:{
        SetNewTask:(state,action)=>{
            state.New=action.payload
        },
        SetTaskDetails:(state,action)=>{
            state.details=action.payload
        },
       

    }
})
export  const {SetNewTask,SetTaskDetails}=taskSlice.actions;
export default  taskSlice.reducer;