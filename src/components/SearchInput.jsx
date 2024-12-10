import { FaMagnifyingGlass } from "react-icons/fa6"

const SearchInput = ({ searchValue, setSeacrhValue }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaMagnifyingGlass />
            </div>
            <input type="search" id="search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSeacrhValue(e.target.value)}
                autoFocus
            />
        </div>
    )
}

export default SearchInput;