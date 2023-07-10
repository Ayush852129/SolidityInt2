import React from 'react'

const BookForm = () => {
    return (
        <div className=' w-full h-full flex justify-center items-center text-black'>
            <form class="w-1/3 border-2 border-blue-500 bg-blue-200 rounded-lg shadow-lg p-8 space-y-4">
                <div class="flex items-center">
                    <label for="bookName" class="w-28 text-right pr-4">Book Name:</label>
                    <input id="bookName" class="flex-1 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Book Name" />
                </div>
                <div class="flex items-center">
                    <label for="author" class="w-28 text-right pr-4">Author:</label>
                    <input id="author" class="flex-1 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Author Name" />
                </div>
                <div class="flex items-center">
                    <label for="year" class="w-28 text-right pr-4">Year:</label>
                    <input id="year" class="flex-1 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Year of Publish" />
                </div>
                <div class="flex items-center">
                    <label for="answer" class="w-28 text-right pr-4 text-red-600 font-semibold">Completed reading book ? </label>
                    <select id="answer" class="flex-1 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                 <button type='submit' className=' bg-orange-600 text-white px-4 py-3 flex itmes-center justify-center mx-auto w-2/4 hover:scale-105 rounded '>AddBook</button>
            </form>



        </div>

    )
}

export default BookForm