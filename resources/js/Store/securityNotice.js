import { createSlice } from "@reduxjs/toolkit";

const securityNotice = createSlice({
    name: 'securityNotice',
    initialState: {
        showModal: false,
    },
    reducers: {
        toggleShowModal(state) {
            state.showModal = !state.showModal
        },
        setIgnoreNotice(state){
            state.showModal = false
            axios.get(route('profile.ignore'))
        }
    }
})

export const {
    toggleShowModal,
    setIgnoreNotice
} = securityNotice.actions;

export default securityNotice.reducer;