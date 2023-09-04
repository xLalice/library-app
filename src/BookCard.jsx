import React from "react"
import "./BookCard.css"

export default function BookCard({key, title, author, pages, isRead, removeBook}){
    const [haveRead, setHaveRead] = React.useState(isRead)

    function handleReadButton(){
        setHaveRead(prevState => !prevState)
    }

    return (
        <div class="card" key={key}>
            <h2 className="title">{`"${title}"`}</h2>
            <h2 className="author">{author}</h2>
            <h2 className="pages">{`${pages} pages`}</h2>
            {haveRead ? 
                (<button style={{backgroundColor: "red"}} onClick={handleReadButton}>Not Read</button>) :
                (<button style={{backgroundColor: "green"}} onClick={handleReadButton}>Read</button>)
            }

            <button className="removeButton" onClick={() => removeBook(key)}>Remove</button>
        </div>
    )
}