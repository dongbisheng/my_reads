import React, { Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookSearchPage extends Component {
    static propTypes = {
        goBakcAction: PropTypes.func.isRequired,
        changeBookCategory: PropTypes.func.isRequired,
        existBooks: PropTypes.array.isRequired
    }
    state = {
        books: []
    }
    allowKeyWord = [
        'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
    ]
    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={this.props.goBakcAction}>Close</button>
                <div className="search-books-input-wrapper">
                    <input type="text" onChange={(e)=>this.queryKeyWork(e.target.value)} placeholder="Search by title or author"/>

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.books.map(book => (
                        <li><Book changeCategory={this.props.changeBookCategory} key={book.id} book={book}/></li>
                    ))}
                </ol>
            </div>
        </div>
    }
    queryKeyWork = (query) => {
        console.log(query)
        if(this.allowKeyWord.indexOf(query) > -1) {
            BooksAPI.search(query).then(books => {
                books.forEach(book => {
                    this.props.existBooks.forEach(exist_book => {
                        if(exist_book.id === book.id){
                            book.shelf = exist_book.shelf
                        } else {
                            book.shelf = 'none'
                        }
                    })
                })
                this.setState({
                    'books': books
                })
            }).catch(error => {
                console.log('search failed')
            })
        }
    }
}

export default BookSearchPage