import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    checkouts: [],
    quantity: null,
};

const fetchCheckouts = createAsyncThunk('cart/fetchCheckouts', async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    return response.data;
});

    


 const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCheckouts: (state, action) => {
            state.checkouts = action.payload;
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCheckouts.fulfilled, (state, action) => {
            state.checkouts = action.payload;
        });
        },


 
});
export const { setCheckouts, setQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;