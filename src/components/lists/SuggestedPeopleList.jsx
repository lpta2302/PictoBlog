import { usePassParam } from "../../hooks";
import { useSearchUser } from "../../lib/react-query/queries";
import Loader from "../shared/Loader";
import PersonCard from "../shared/PersonCard";
import SearchBar from "../shared/SearchBar";
import SuggestedPeople from "../shared/SuggestedPeople";

export default function SuggestedPeopleList() {
  const { param, setParam } = usePassParam();

  const {
    data: searchedUser,
    isPending: isSearching,
  } = useSearchUser(param);

  const handleSearch = ({ search: data }) => {
    const searchParam = {
      searchType:
        data[0] === "@" ? "username" : "name",
      searchTerm: data,
    };
    setParam(searchParam);
  };

  return (
    <div className="flex flex-col mx-auto w-[500px] gap-4 sm:px-4">
      <div className="p-4 rounded-md dark:bg-dark-item bg-white">
        <SearchBar
          placeholder="Find someone by Name or #Username"
          onSubmit={handleSearch}
        />
      </div>
      {isSearching && param ? (
        <div className="flex-center p-2">
          <Loader />
        </div>
      ) : searchedUser ? (
        <>
          <h3 className="text-lg font-system p-4 border-b border-primary">Search Result</h3>
          {searchedUser.map((user) => (
            <PersonCard
              user={user}
              key={user.$id}
            />
          ))}
        </>
      ) : (
        <SuggestedPeople />
      )}
    </div>
  );
}
