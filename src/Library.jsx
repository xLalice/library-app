import React from "react"
import BookCard from "./BookCard"
import "./Library.css"

export default function Library(){
    const popularBooks = [
        {
          title: "Sapiens: A Brief History of Humankind",
          author: "Yuval Noah Harrari",
          pages: 443,
          isRead: true,
        },
        {
          title: "The Hunger Games",
          author: "Suzanne Collins",
          pages: 374,
          isRead: false,
        },
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          pages: 281,
          isRead: true,
        },
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          pages: 180,
          isRead: true,
        },
        {
          title: "Harry Potter and the Sorcerer's Stone",
          author: "J.K. Rowling",
          pages: 320,
          isRead: true,
        },
        {
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          pages: 214,
          isRead: false,
        },
        {
          title: "1984",
          author: "George Orwell",
          pages: 328,
          isRead: true,
        },
        {
          title: "The Lord of the Rings",
          author: "J.R.R. Tolkien",
          pages: 1178,
          isRead: false,
        },
        {
          title: "Pride and Prejudice",
          author: "Jane Austen",
          pages: 279,
          isRead: true,
        },
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          pages: 310,
          isRead: true,
        },
      ];
    const [myLibrary, setMyLibrary] = React.useState(popularBooks);

    const [formData, setFormData] = React.useState({
        title: "",
        author: "",
        pages: "",
        isRead: false,
    });

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    function Book(title, author, pages, isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }

    function addBookToLibrary(title, author, pages, isRead) {
        myLibrary.push(new Book(title, author, pages, isRead))
    }

    function toggleModal(){
        const modal = document.querySelector("[data-modal]")
        modal.showModal()
    }

    function removeModal(){
        const modal = document.querySelector("[data-modal]")
        modal.close()
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        setMyLibrary([
          ...myLibrary,
          {
            title: formData.title,
            author: formData.author,
            pages: formData.pages,
            isRead: formData.isRead,
          },
        ]);
        
        removeModal()
        
        setFormData({
          title: "",
          author: "",
          pages: "",
          isRead: false,
        });
      }

    function removeBook(index){
        setMyLibrary(prevState => {
            const updatedLibrary = [...myLibrary]
            updatedLibrary.splice(index, 1)

            return updatedLibrary;
        })
    }

    const cards = myLibrary.map((book, index) => {
        return <BookCard 
                    key={index}
                    title={book.title}
                    author={book.author}
                    pages={book.pages}
                    isRead={book.isRead}
                    removeBook={removeBook}
                />
    })

    return (
        <div class="library-container">
            <nav >
                <h1>Libralink</h1>
                <button>Log in</button>
            </nav>
            <main>
                <button data-open-modal onClick={toggleModal}> + Add book</button>
                
                <dialog data-modal> 
                    <form action="#" method="dialog" className="book-form" onSubmit={handleSubmit}>
                        <h2>Add a Book</h2>
                        <input
                            type="text"
                            id="title"
                            name="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <input
                            type="text"
                            name="author"
                            id="author"
                            placeholder="Author"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        />
                        <input
                            type="number"
                            id="pages"
                            name="pages"
                            placeholder="Pages"
                            value={formData.pages}
                            onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                        />
                        <div>
                            <input
                            type="checkbox"
                            name="isRead"
                            id="isRead"
                            checked={formData.isRead}
                            onChange={(e) => setFormData({ ...formData, isRead: e.target.checked })}
                            />
                            <label htmlFor="isRead">Have you read it?</label>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </dialog>
                    
                <div className="books-container">
                    {cards}
                </div>
            </main>
        </div>
        
        
    )
}