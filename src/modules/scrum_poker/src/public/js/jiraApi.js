async function jiraApiGetData(url, headers = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch (url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'omit', // include, *same-origin, omit
        headers
    }).catch(error => {
        print('WEB ERROR:');
        print({error});
    });
    return await response.text (); // parses JSON response into native JavaScript objects
}

async function jiraApiPostData(url, data, headers = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch (url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'omit', // include, *same-origin, omit
        headers,
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).catch(error => {
        print('WEB ERROR:');
        printump.e({error});
    });
    return await response.text (); // parses JSON response into native JavaScript objects
}
