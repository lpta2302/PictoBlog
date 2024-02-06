import {
  useGetCurrentUser,
} from "../../lib/react-query/queries";

import SearchBar from "../shared/SearchBar";
import { Loader } from "../index";
import PersonCard from "../shared/PersonCard";
import { reduceFollowing } from "../../utilities";
import { useState } from "react";

export default function GridFollowingList() {
  const [searchResult, setSearchResult] = useState()

  const {
    data: currentUser,
    isLoading: isGettingCurrentUser,
  } = useGetCurrentUser();

  const handleSearch = ({ search: data }) => {
   function search() {
    searchTerm,
    searchType
   }

   if(data[0] === '@'){
    search.searchTerm = data.slice(1)
    search.searchType = 'username'
   }
   else{
    search.searchTerm = data.toLowerCase()
    search.searchType = 'name'
   }
    
    setSearchResult(reduceFollowing(currentUser).filter(user=>
        user[search.searchType]
        .toLowerCase()
        .includes(search.searchTerm)
      ))
  };

  console.log(searchResult);

  return (
    <div className="right-navbar w-[368px]">
      <div className="px-4">
        <SearchBar
          placeholder="By name or #username"
          onSubmit={handleSearch}
        />
      </div>
      <div className="flex-start p-4 border-b text-lg font-system border-primary">
        <h1>Following</h1>
        <span className="flex-center font-system h-8 w-10 rounded-md">
          {isGettingCurrentUser ? (
            <div className="w-1/2">
              <Loader />
            </div>
          ) : (
            currentUser.following.length
          )}
        </span>
      </div>
      {isGettingCurrentUser ? (
        <div className="flex-center pt-4">
          <Loader />
        </div>
      ) : (
        <div className="overflow-y-scroll h-[472px]">
          {searchResult
            ? <>
            <h3 className="text-large font-system p-4">Search Result:</h3>
              {searchResult.map((user) => (
                <PersonCard
                  user={user}
                  key={user.$id}
                />
              ))}
            </>
            : currentUser.following
                .reduce(
                  (acc, cur) => [
                    ...acc,
                    { ...cur.following },
                  ],
                  []
                )
                .map((user) => (
                  <PersonCard
                    user={user}
                    key={user.$id}
                  />
                ))}
        </div>
      )}
    </div>
  );
}
