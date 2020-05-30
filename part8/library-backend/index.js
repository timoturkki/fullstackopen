require('dotenv').config()

const { ApolloServer, gql } = require('apollo-server')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int,
    bookCount: Int!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }  
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({});

      if (!args.author && !args.genre) {
        return books;
      }

      let filtered = books;

      if (args.author) {
        filtered = filtered.filter(book => book.author === args.author);
      }

      if (args.genre) {
        filtered = filtered.filter(book => book.genres.includes(args.genre));
      }

      return filtered;
    },
    allAuthors: async () => {
      return await Author.find({});
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({});

      return books.filter(book => book.author === root.name).length
    }
  },
  Book: {
    author: async (root) => {
      return await Author.findById(root.author)
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      
      if (author) {
        const book = new Book({ ...args, author })
        await book.save();

        return book;
      } else {
        const newAuthor = new Author({ name: args.author, born: null})
        const book = new Book({ ...args, author: newAuthor })
        await book.save();
        await newAuthor.save()

        return book;
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }
  
      author.born = args.born
      await author.save()
      
      return author
    }  
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})