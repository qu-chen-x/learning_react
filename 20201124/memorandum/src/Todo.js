import * as React from 'react'

const easyId = () => Math.random().toString(32).slice(2)

export default function Todo() {

    const [todoTitle, setTodoTitle] = React.useState('');
    const [todos, setTodos] = React.useState([]);
    const [filter, setFilter] = React.useState('');
    //获得输入值
    
    const handleTodoTitleChange = event => {
        setTodoTitle(event.target.value)
    }
    //保存输入值并将输入框置空
    const handleAddTodo = () => {
        setTodos(oldTodos => [...oldTodos, {id: easyId(), todoTitle, done: false}])
        setTodoTitle('')
    }
    //设置不同分类
    const updateFilter = filter => {
        setFilter(filter)
    }
    //根据待办事项是否被点击更改其类型
    const toggleTodo = todoId => {
        const newTodos = todos.map(oldTodo => {
            return {
                ...oldTodo,
                done: oldTodo.id === todoId ? !oldTodo.done : oldTodo.done
            }
        })
        setTodos(newTodos)
    }
    
    //对待办事项进行分类
    let displayedTodos;
    if (filter === '') {
        displayedTodos = todos
    } else if (filter === 'done') {
        displayedTodos = todos.filter(todo => todo.done === true)
    } else {
        displayedTodos = todos.filter(todo => todo.done === false)
    }

    return <div>
        <input value={todoTitle} onChange={handleTodoTitleChange}/>
        <button onClick={handleAddTodo}>add todo</button>
        <ul>
        {/* 标记已完成的待办事项 */}
            {
                displayedTodos.map(todo => <li key={todo.id} style={{color: todo.done ? 'blue': ''}} onClick={() => toggleTodo(todo.id)}>{todo.todoTitle}</li>)
            }
        </ul>
        {/* 绑定分类函数，显示全部待办事项 */}
        <button type="button" style={{color: filter === '' ? 'red' : ''}} 
        onClick={() => updateFilter('')}>all</button>
         {/* 绑定分类函数，显示已完成待办事项 */}
        <button type="button" style={{color: filter === 'done' ? 'red' : ''}}
        onClick={() => updateFilter('done')}>done</button>
         {/* 绑定分类函数，显示未完成待办事项 */}
        <button type="button" style={{color: filter === 'undone' ? 'red' : ''}}
        onClick={() => updateFilter('undone')}>undone</button>
    </div>
}