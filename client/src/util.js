export const getMatchingLibraries =  (term, library) =>
    library.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()));
