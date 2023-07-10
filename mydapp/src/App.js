import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import BookForm from './components/BookForm';

export default function App() {
  const ContractAdd = "0x37dD26d18abeC2d311e82177f9fa58E9DC14b579";
  const ContractAbi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "bookowner",
          "type": "address"
        }
      ],
      "name": "BookAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "_finished",
          "type": "bool"
        }
      ],
      "name": "StateChange",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_BookName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_Year",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_Author",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_finished",
          "type": "bool"
        }
      ],
      "name": "AddBook",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "BookOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getFinishedBooks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "BookId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "BookName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "Year",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "Author",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "finished",
              "type": "bool"
            }
          ],
          "internalType": "struct LibraryManagement.Book[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUnFinishedBooks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "BookId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "BookName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "Year",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "Author",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "finished",
              "type": "bool"
            }
          ],
          "internalType": "struct LibraryManagement.Book[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bookid",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_finished",
          "type": "bool"
        }
      ],
      "name": "setState",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  // const [books, setBooks] = useState([]);
  const [temp, settemp] = useState([]);
  const [unfinishedBooks, setUnfinishedBooks] = useState([]);
  const [finishedBooks, setfinishedBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);




  const [CurrentAccount, setCurrentAccount] = useState('');
  const [ContractState, setContractState] = useState({
    provider: null,
    signer: null,
    ContractInstance: null
  });
  const [BookState, setBookState] = useState({
    Bookname: '',
    Author: '',
    Year: '',
    Finished: ''
  });

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Metamask not detected');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);

      console.log('Found account', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log('Error connecting to Metamask', error);
    }
  };

  const LoadBlockchainData = async () => {
    if (!window.ethereum) {
      return;
    } else {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ContractAdd, ContractAbi, signer);
        setContractState({ provider, signer, ContractInstance: contract });
      } catch (error) {
        console.log('Error loading blockchain data', error);
      }
    }
  };

  const getUnFinishedBooks = async () => {
    try {
      const books = await ContractState.ContractInstance.getUnFinishedBooks();
      const booksArray = books.toArray();
      console.log(booksArray);
      setUnfinishedBooks(booksArray);
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRefresh(false);
  }, [refresh]);



  const getFinishedBooks = async () => {
    try {
      const books = await ContractState.ContractInstance.getFinishedBooks();
      const booksArray = books.toArray();
      console.log(booksArray);
      setfinishedBooks(booksArray);
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUnFinishedBooks();
    getFinishedBooks();
  }, [ContractState]);


  const clickBookFinished = async (id) => {
    console.log(id);

    try {


      let libraryTx = await ContractState.ContractInstance.setState(id, true);
     
      getFinishedBooks();
      getUnFinishedBooks();
      setRefresh(true);
      console.log(libraryTx);
      
    } catch (error) {
      console.log('Error Submitting new Book', error)

    }
  }



  useEffect(() => {
    LoadBlockchainData();
  }, []);

  useEffect(() => {
    if (ContractState) {
      console.log('ContractInstance:', ContractState);
    }
  }, [ContractState]);

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-[80px] bg-black text-white flex justify-between items-center p-4 border-b-2 border-white'>
        <div>LibraryManagement</div>

        <button className='bg-[#047aed] px-4 py-2 rounded hover:scale-105 cursor-pointer' onClick={connectWallet}>
          {CurrentAccount ? CurrentAccount : 'Connect Wallet'}
        </button>
      </div>
      <div className='flex justify-between items-center py-4 px-20 bg-black text-white font-extrabold capitalize font-sans gap-5 border-b-2 border-blue-500'>
        <div className='bg-blue-500 w-full p-2 text-center hover:scale-105 cursor-pointer'>Form</div>
        <div className='bg-blue-500 w-full p-2 text-center hover:scale-105 cursor-pointer'>Viewdetails</div>
      </div>
      <div className='w-full h-screen bg-black justify-center items-center border-b-2 border-blue-400'>
        <BookForm BookState={BookState} setBookState={setBookState} ContractState={ContractState} />
      </div>

      <div className='w-full h-screen bg-black justify-center items-center text-white '>
        <div className=' w-full h-full flex flex-col '>
          <div className='font-extrabold my-2 text-lg text-center mb-4 '>
            Books List
          </div>
          <button
            className='text-xl  w-2/3 mx-auto font-bold py-3 px-12 bg-[#047aed] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
            onClick={getUnFinishedBooks}
          >
            Get unfinishedBooks
          </button>

         
    

          <div>
            <h2 className='text-white text-center bg-orange-600 p-4 capitalize w-2/3  '>Unfinished Books </h2>
            <div>
              {unfinishedBooks.map((book, index) => (
                <div key={index} className='flex justify-start  items-start gap-3 w-full my-4 px-8     '>
                  <div className='text-white bg-gray-300 p-4 w-full gap-2 text-center flex-1 '>{book.BookId.toString()}</div>
                  <div className='text-white bg-gray-300 p-4 w-full gap-2 text-center flex-1 '>{book.BookName}</div>
                  <div className='text-white bg-gray-300 p-4 w-full gap-2 text-center flex-1 '>{book.Author}</div>
                  <div className='text-white bg-gray-300 p-4 w-full gap-2 text-center flex-1 '>{book.Year.toString()}</div>
                  <div>{book.Finished ? <span className='text-white bg-gray-300 p-4 w-full gap-2 text-center '>Yes</span> : <button  className='text-white bg-blue-600 rounded px-4 py-2 w-full hover:scale-105' onClick={() => clickBookFinished(parseInt(book.BookId.toString()))}>
                    Mark as Finished
                  </button>}</div>

                </div>
              ))}
            </div>
          </div>

       


        </div>



      </div>

      
      <div className='w-full h-screen bg-black justify-center items-center text-white '>
        <div className=' w-full h-full flex flex-col '>
          <div className='font-extrabold my-2 text-lg text-center mb-4 '>
            Books List
          </div>
        

          <button
            className='text-xl  w-2/3 mx-auto font-bold py-3 px-12 bg-[#047aed] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
            onClick={getFinishedBooks}
          >
            Get FinishedBooks
          </button>

          <div>
            <h2 className='text-white text-center bg-orange-600 p-4 capitalize w-2/3'>Finished Books </h2>
            <div>
              {finishedBooks.map((book, index) => (
                <div key={index} className=' h-full flex justify-start  items-start gap-3 w-full my-4 px-8     '>
                  <div className='text-white bg-gray-300 p-4 w-full gap-2 text-center flex-1 '>{book.BookId.toString()}</div>
                  <div className='text-white bg-gray-300 p-4 w-full gap-2 text-center flex-1/4 '>{book.BookName}</div>
                  <div className='text-white bg-gray-300 p-4 w-full gap-2 text-center flex-1/4 '>{book.Author}</div>
                  <div className='text-white bg-gray-300 p-4 w-full gap-2 text-center flex-1/4 '>{book.Year.toString()}</div>
                  

                </div>
              ))}
            </div>
          </div>


        </div>



      </div>





    </div>
  );
}
