import React from 'react';

const BookForm = ({ BookState, setBookState,ContractState }) => {



  const submitBook=async()=>{
    try{

      let tx= await ContractState.ContractInstance.AddBook(BookState.Bookname,parseInt(BookState.Year),BookState.Author,BookState.Finished);
      console.log(tx);
    }catch(error){
      console.log(error);
    }

  }

  const InputChange = (event) => {
    const value = event.target.value;
    console.log(value);
    const Id = event.target.id;
    console.log(Id);
    setBookState((prevValue) => {
      if (Id === "bookName") {
        return {
          ...prevValue,
          Bookname: value
        }
      } else if (Id === "author") {
        return {
          ...prevValue,
          Author: value
        }
      } else if (Id === "year") {
        return {
          ...prevValue,
          Year: value
        }
      } else if (Id === "answer") {
        let newval;
        if(value==="Yes"){
          newval=true;
        }else{
          newval=false;
        }
        return {
          ...prevValue,
          Finished:newval
        }
      }
      return prevValue;
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className='w-full h-full flex justify-center items-center text-black'>
      <form onSubmit={onSubmit} className="w-1/3 border-2 border-blue-500 bg-blue-200 rounded-lg shadow-lg p-8 space-y-4">
        <div className="flex items-center">
          <label htmlFor="bookName" className="w-28 text-right pr-4">Book Name:</label>
          <input id="bookName" className="flex-1 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Book Name" onChange={InputChange} value={BookState.Bookname} />
        </div>
        <div className="flex items-center">
          <label htmlFor="author" className="w-28 text-right pr-4">Author:</label>
          <input id="author" className="flex-1 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Author Name" onChange={InputChange} value={BookState.Author} />
        </div>
        <div className="flex items-center">
          <label htmlFor="year" className="w-28 text-right pr-4">Year:</label>
          <input id="year" className="flex-1 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Year of Publish" onChange={InputChange} value={BookState.Year} />
        </div>
        <div className="flex items-center">
          <label htmlFor="answer" className="w-28 text-right pr-4 text-red-600 font-semibold">Completed reading book? </label>
          <select id="answer" className="flex-1 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={InputChange} value={BookState.Finished}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button type='submit' onClick={submitBook} className='bg-orange-600 text-white px-4 py-3 flex items-center justify-center mx-auto w-2/4 hover:scale-105 rounded'>Add Book</button>
      </form>
    </div>
  );
}

export default BookForm;
