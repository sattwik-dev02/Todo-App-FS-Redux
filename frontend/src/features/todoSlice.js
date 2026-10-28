import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    todos: [],
    loading: false,
    error: null,
}

// fetching todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, ThunkApi) => {
    try {
        const res = await axios.get('http://localhost:8001/todo/getAll');
        return res.data.data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error.message);
    }
});

// add todos
export const addTodo = createAsyncThunk('todos/addTodo', async (data, ThunkApi) => {
    try {
        const res = await axios.post('http://localhost:8001/todo/create', data);
        return res.data.data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error.message);
    }
});

// delete todos
export const delTodo = createAsyncThunk('todos/delTodo', async (id, ThunkApi) => {
    try {
        await axios.delete(`http://localhost:8001/todo/delete/${id}`);
        return id;
    } catch (error) {
        return ThunkApi.rejectWithValue(error.message);
    }
});


// update todos
export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, data }, ThunkApi) => {
    try {
        const res = await axios.put(`http://localhost:8001/todo/update/${id}`, data);
        return res.data.data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error.message);
    }
});

// toggle todos
export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id, ThunkApi) => {
    try {
        const res = await axios.patch(`http://localhost:8001/todo/check/${id}`);
        return { id, check: res.data.data.check };
    } catch (error) {
        return ThunkApi.rejectWithValue(error.message);
    }
});

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchTodos 
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //addTodo
            .addCase(addTodo.fulfilled, (state, action) => {
                if (action.payload) state.todos.push(action.payload);
            })

            //delTodo
            .addCase(delTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((item) => item._id !== action.payload);
            })

            //editTodo
            .addCase(editTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(
                    (item) => item._id === action.payload._id
                )
                if (index !== -1) state.todos[index] = action.payload;
            })
            //toggleTodo
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const { id, check } = action.payload;
                const todo = state.todos.find((item) => item._id === id);
                if (todo) todo.check = check;
            })
    },
})

export default todoSlice.reducer;