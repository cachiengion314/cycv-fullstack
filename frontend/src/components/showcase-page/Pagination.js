import React from 'react'
import Vars from '../other-stuffs/Vars'

const SinglePagination = ({ isActive, onClick, children }) => {
    return (
        <li onClick={onClick} className={`page-item ${isActive && "active"}`}><a className="page-link" href="#">{children}</a></li>
    )
}

const Pagination = ({ activePage, handlePagiClick, totalItem, className }) => {
    const max = React.useMemo(() => Math.ceil(totalItem / Vars.ITEMS_PER_PAGE), [totalItem])
    let items = []
    for (let i = 1; i <= max; ++i) {
        items.push(
            (
                (activePage === i &&
                    <SinglePagination onClick={handlePagiClick.bind(null, i)} key={i} isActive={true}>
                        {i}
                    </SinglePagination>
                )
                ||
                <SinglePagination onClick={handlePagiClick.bind(null, i)} key={i} isActive={false}>
                    {i}
                </SinglePagination>
            )
        )
    }
    return (
        <nav aria-label="Page navigation" className={className}>
            <ul className="pagination">
                {
                    items
                }
            </ul>
        </nav>
    )
}

export default Pagination