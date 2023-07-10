import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BooksDetails from './components/BooksDetails';



export default function App() {

  const [CurrentAccount, setCurrentAccount] = useState('');
  const [ContractState, setContractState]=useState('');


  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }


      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0]);

      console.log('Found account', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }

  useEffect(()=>{

  },[])


  return (
    <div className='w-full h-full flex flex-col '>
      <div className="w-full h-[80px] bg-black text-white flex justify-between items-center p-4 border-b-2 border-white
    ">
        <div>
          LibraryManagement
        </div>

        <button className="bg-[#047aed] px-4 py-2 rounded hover:scale-105 cursor-pointer " onClick={connectWallet}>
          {CurrentAccount ? CurrentAccount : "Connect Wallet"}
        </button>


      </div>
      <div className='flex justify-between items-center py-4 px-20 bg-black text-white font-extrabold capitalize font-sans gap-5 border-b-2 border-blue-500'>
        < div className='bg-blue-500  w-full p-2 text-center hover:scale-105 cursor-pointer'>Form</div>
        < div className='bg-blue-500 w-full p-2 text-center hover:scale-105 cursor-pointer'>Viewdetails</div>

      </div>
      <div className='w-full h-screen  bg-black justify-center items-center border-b-2 border-blue-400'>
        <BookForm />
      </div>

      <div className='w-full h-screen  bg-black justify-center items-center'>
        <BooksDetails/>
      </div>
    </div>
  )
}