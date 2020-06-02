require('dotenv').config();

const jwt = require('jsonwebtoken');
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server');

const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const pubsub = new PubSub();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  
  type Subscription {
    bookAdded: Book!
  }   
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author', { name: 1, born: 1 });

      if (!args.author && !args.genre) {
        return books;
      }

      let filtered = books;

      if (args.author) {
        filtered = filtered.filter(book => book.author.name === args.author);
      }

      if (args.genre) {
        filtered = filtered.filter(book => book.genres.includes(args.genre));
      }

      return filtered;
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({});
      return books.filter(book => book.author.toString() === root._id.toString()).length;
    },
  },
  Book: {
    author: async (root) => {
      return await Author.findById(root.author);
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.author });
      let book;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        if (author) {
          book = new Book({ ...args, author });
        } else {
          const newAuthor = new Author({ name: args.author, born: null });
          book = new Book({ ...args, author: newAuthor });
          await newAuthor.save();
        }

        await book.save();
      } catch(e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.name });

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch(e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }

      return author;
    },
    createUser: (root, args) => {
      const { username, favoriteGenre } = args;
      const user = new User({ username, favoriteGenre });

      return user.save()
        .catch(e => {
          throw new UserInputError(e.message, { invalidArgs: args });
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});