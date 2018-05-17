export let queryGraphQL = async (queryString) =>
    await(await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: queryString
        }),
    })).json();


export let queryGraphQLToken = async (queryString, token) => {
    console.log(token)
    return await (await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token} `},
        body: JSON.stringify({
            query: queryString
        }),
    })).json();

}