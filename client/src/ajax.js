export let queryGraphQL = async (queryString) =>
    await(await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: queryString
        }),
    })).json();


export let queryGraphQL2 = async (queryString) =>
    await (await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            mutation: queryString
        }),
    })).json();

