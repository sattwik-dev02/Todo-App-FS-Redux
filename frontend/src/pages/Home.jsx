import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos } from '../features/todoSlice';

const Home = () => {
    const [input, setInput] = useState("");
    const { todos } = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    function handelTodo() {
        dispatch(addTodo({title:input}));
        setInput("");
    }

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch]);
    return (
        <>
            <div className='py-3 bg-[#F6F740] w-188 mx-auto mt-5 rounded-xl border-2 border-amber-800'>
                <Header />
                <div className='text-center my-8'>
                    <input className='p-2 text-lg bg-gray-100 w-70 rounded-md border-2 border-gray-500' type="text" value={input} placeholder='Enter task...'
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={(e) => { if (e.key === "Enter") handelTodo() }} />
                    <button className='p-2 ms-2 text-lg text-white font-bold bg-green-500 rounded-md border-2 border-green-700 cursor-pointer hover:bg-green-600 transition' onClick={handelTodo}>Add</button>
                </div>
                <TodoList todo={todos} />
            </div>
            <Footer />
        </>
    )
}

export default Home