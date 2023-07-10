# Library Management Contract

This contract provides functionality for managing a library's collection of books on the blockchain. It allows users to add books, mark books as finished or unfinished, and retrieve lists of finished and unfinished books.

## Contract Structure

The contract `LibraryManagement` is written in Solidity and follows the version `0.8.0`. It consists of the following key components:

### Struct

- `Book`: Represents the structure of a book, with the following properties:
  - `BookId`: The unique identifier of the book.
  - `BookName`: The name of the book.
  - `Year`: The year of publication of the book.
  - `Author`: The author of the book.
  - `finished`: A flag indicating whether the book is finished or unfinished.

### Events

- `BookAdded`: Event emitted when a new book is added to the library. It includes the book ID and the address of the book owner.
- `StateChange`: Event emitted when the state of a book (finished or unfinished) is changed. It includes the book ID and the new state.

### Mapping

- `BookOwner`: A mapping that stores the owner of each book based on its ID.

### Functions

- `AddBook`: Allows users to add a new book to the library. It takes the book name, year of publication, author, and finished status as parameters.
- `getFinishedBooks`: Returns an array of finished books.
- `getUnFinishedBooks`: Returns an array of unfinished books.
- `setState`: Updates the state (finished or unfinished) of a book based on its ID.

## Usage

To use this contract, follow the steps below:

1. Install dependencies by running `npm install`.

2. Compile the contract by running `npx hardhat compile`.

3. Deploy the contract to the Hardhat local node by running `npx hardhat run scripts/deploy.js --network localhost`.

4. Start the live server by running `npm run start`.

5. Interact with the library management interface through the live server and perform actions such as adding books, retrieving lists of finished and unfinished books, and updating the state of a book.

Make sure you have a local development environment set up with Hardhat and Metamask configured to connect to the local node. Refer to the Hardhat documentation for more information on configuring the local development environment.

## License

This contract is licensed under the MIT License. 