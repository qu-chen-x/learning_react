import React from 'react'

const Posts = ({posts,loading}) => {
    if(loading){
        return <h2>Loading...</h2>
    }
    return (
        <ul className = "list-group mb-4">
            {posts.map(post => (
                <li key = {post.id} className = "list-group-item">
                    <span>{post.id} - {post.title}</span>
                </li>
            ))}
        </ul>
    )
}

export default Posts
