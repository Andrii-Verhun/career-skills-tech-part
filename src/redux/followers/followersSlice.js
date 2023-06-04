import { createSlice } from "@reduxjs/toolkit";

const state = {
    followers: [],
}

export const followersSlice = createSlice({
    name: 'followers',
    initialState: state,
    reducers: {
        addFollower(state, action) {
            state.followers.push(action.payload)
        },
        removeFollower(state, action) {
            const index = state.followers.findIndex((el) => el === action.payload);
            state.followers.splice(index, 1);
        },
    },
});

export const { addFollower, removeFollower } = followersSlice.actions;
export const followersReducer = followersSlice.reducer;