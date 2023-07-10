//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
//0x5FbDB2315678afecb367f032d93F642f64180aa3
contract LibraryManagement {
    
    struct Book {
        uint BookId;
        string BookName;
        uint Year;
        string Author;
        bool finished;
    }

    Book[] private BookList;

    event BookAdded(uint id, address bookowner);
    event StateChange(uint id, bool _finished);

    mapping(uint => address) public BookOwner;

    function AddBook(string memory _BookName, uint _Year, string memory _Author, bool _finished) public {
        uint Id = BookList.length;
        BookList.push(Book(Id, _BookName, _Year, _Author, _finished));
        BookOwner[Id] = msg.sender;
        emit BookAdded(Id, msg.sender);
    }

    function _getbooks(bool _finished) private view returns (Book[] memory) {
        Book[] memory temporary = new Book[](BookList.length);
        uint counter = 0;
        for (uint i = 0; i < BookList.length; i++) {
            if (BookOwner[i] == msg.sender && BookList[i].finished == _finished) {
                temporary[counter] = BookList[i];
                counter++;
            }
        }

        Book[] memory result = new Book[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }

        return result;
    }

    function getFinishedBooks() public view returns (Book[] memory) {
        return _getbooks(true);
    }

    function getUnFinishedBooks() public view returns (Book[] memory) {
        return _getbooks(false);
    }

    function setState(uint bookid, bool _finished) public {
        BookList[bookid].finished = _finished;
        emit StateChange(bookid, _finished);
    }
}
