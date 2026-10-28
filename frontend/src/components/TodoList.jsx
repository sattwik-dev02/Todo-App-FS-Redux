import React from 'react'
import Card from './Card'

const TodoList = ({ todo, }) => {
  return (
    <div>
      {
        todo.map((item, idx) => <Card key={item._id} title={item.title} check={item.check} index={idx} id={item._id} />)
      }
    </div>
  )
}

export default TodoList