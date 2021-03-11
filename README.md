### Домашнее задание к занятию «2.2 Middleware»
***
##### Book object format:
* id: string
* title: string
* description: string
* authors: string
* favorite: string
* fileCover: string
* fileName: string
* fileBook: string

***

##### Routes:
* POST: /api/user/login - authorisation
* GET: /api/books - get all books
* GET: /api/books/:id - get book with id
* GET: /api/books/:id/download - get book file by id
* POST: /api/books - create book
* PUT: /api/books/:id - edit book information
* DELETE: /api/books/:id - delete book with id

***

#### npm run start - start server
#### npm run dev - start server with nodemon
