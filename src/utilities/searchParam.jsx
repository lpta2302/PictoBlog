export default function searchParam(
  searchTerm,
  searchFor,
  filter,
) {
  if (searchFor === "user") {
    console.log(filter);
    const searchParam = { filter };
    if (searchTerm[0] === "@") {
      searchParam.searchTerm =
        searchTerm.slice(1);
      searchParam.searchType = "username";
    } else {
      searchParam.searchTerm = searchTerm;
      searchParam.searchType = "name";
    }
    return searchParam;
  } else if (searchFor === "post") {
    return {
      searchTerm: searchTerm,
      searchType: "caption",
    };
  } else if (searchFor === "location") {
    return {
      searchTerm: searchTerm,
      searchType: "location",
    };
  }
}
