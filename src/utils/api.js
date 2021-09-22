export const postData = async (options) => {
    return fetch(options.url, {
        headers: options.headers,
        body: options.body
    })
}