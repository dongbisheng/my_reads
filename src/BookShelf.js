import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired,
        changeBookCategory: PropTypes.func.isRequired
    }
    render() {
        return <div className="bookshelf" key={this.props.shelf}>
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map((book) => (
                        <li><Book changeCategory={this.props.changeBookCategory} key={book.id} book={book}/></li>
                    ))}
                </ol>
            </div>
        </div>
    }
}

export default BookShelf
