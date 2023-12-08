export type FilteredRequest = {
  /**
   * Filters results by a list of strings. Result entry matches the filter
   * if it's search fields contain **every** string in a given list 
   * (containment test is **case-insensitive**).  
   */
  filter?: string[];
};
