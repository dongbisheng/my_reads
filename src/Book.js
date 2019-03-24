import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeCategory: PropTypes.func.isRequired
    }
    bookStatuses = [
        {
            id: 1,
            statusValue: 'move',
            des: 'Move to ...',
            disabled: true
        },
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
        },
        {
            id: 5,
            statusValue: 'none',
            des: 'None'
        }
    ]
    handSelect = (e) => {
        e.preventDefault()
        if(this.props.changeCategory){
            this.props.changeCategory(this.props.book, e.target.value)
        }
    }
    render(){
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handSelect} value={this.props.book.shelf}>
                            {this.bookStatuses.map((status) => (
                                <option  disabled={status.disabled?'none':''} key={status.id} value={status.statusValue}>{status.des}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors.join(',')}</div>
            </div>
        )
    }
}
export default Book