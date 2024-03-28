class Ajax {
    static record(data, path)
    {
        fetch(path, {
            method: 'POST',
            headers: {
                 'Content-Type': 'text/html',
                 "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                 "Access-Control-Allow-Methods":"POST, GET",
                 "Access-Control-Max-Age":1000,
                 "Access-Control-Allow-Headers":"origin, x-csrftoken, content-type, accept"
            },
            body: "data:'"+JSON.stringify(data)+"'",
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }
} 