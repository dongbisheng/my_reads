import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import  { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import BookSearchPage from './BookSearchPage'

class BooksApp extends React.Component {
  state = {
    books: {
      'currentlyReading': [],
      'wantToRead': [],
      'read': []
    }
  }
  allBooks = []
  bookStatuses = [
    {
      id: 2,
      statusValue: 'currentlyReading',
      des: 'Currently Reading'
    },
    {
      id: 3,
      statusValue: 'wantToRead',
      des: 'Want to Read'
    },
    {
      id: 4,
      statusValue: 'read',
      des: 'Read'
    }
  ]
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={({history}) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.bookStatuses.map(status => (
                      <BookShelf changeBookCategory={this.changeBookCategory} key={status.id} shelf={status.statusValue} books={this.state.books[status.statusValue]}/>
                  ))}
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => {history.push('search')}}>Add a book</button>
              </div>
            </div>
        )}/>
        <Route path='/search' render={({history})=>(
            <BookSearchPage changeBookCategory={this.changeBookCategory}
                            goBakcAction={()=>{
                              history.push('/')
                              this.gotBooks()
                            }}
                            existBooks={this.allBooks}
            />
        )}/>
      </div>)
  }
  gotBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.allBooks = books
      this.setState({
        'books': {
          'currentlyReading': this.allBooks.filter(book => (book.shelf === 'currentlyReading')),
          'wantToRead': this.allBooks.filter(book => (book.shelf === 'wantToRead')),
          'read':this.allBooks.filter(book => (book.shelf === 'read'))
        }
      })
    }).catch(error => {
      throw Error('get books failed!')
    })
  }
  componentDidMount() {
    this.gotBooks()
  }
  changeBookCategory = (book, category) => {
    let thatAllBooks = this.allBooks
    let that = this
    BooksAPI.update(book, category).then(function (books) {
      let currentlyReadingBooks = thatAllBooks
          .filter(book => (books.currentlyReading.indexOf(book.id) > -1))
      currentlyReadingBooks.forEach(book => book.shelf = 'currentlyReading')
      let wantToReadBooks = thatAllBooks
          .filter(book => (books.wantToRead.indexOf(book.id) > -1))
      wantToReadBooks.forEach(book => book.shelf = 'wantToRead')
      let readBooks = thatAllBooks
          .filter(book => (books.read.indexOf(book.id) > -1))
      readBooks.forEach(book => book.shelf = 'read')
      that.setState({
        'books': {
          'currentlyReading': currentlyReadingBooks,
          'wantToRead': wantToReadBooks,
          'read':readBooks
        }
      })
    })
  }
}

export default BooksApp
