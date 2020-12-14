import React from 'react'

const Pagination = ({postsPerPage,totalPosts,paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil((totalPosts / postsPerPage)); i++){
        pageNumbers.push(i);
        console.log(i);
    }
    // console.log(pageNumbers);
    return (
        <nav>
            <ul className = "pagination">
                {
                    pageNumbers.map(pageNumber => (
                        <li key = {pageNumber} className = "page-item">
                            <a href = "!#" className = "page-link" onClick = {() => paginate(pageNumber)}>{pageNumber}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination;
