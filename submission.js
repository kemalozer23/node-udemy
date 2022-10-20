const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Home</title></head>')
        res.write('<body><h1>Hello from my Node.js Server!</h1>')
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/users') {
        res.write('<html>')
        res.write('<head><title>Users</title></head>')
        res.write('<body><ul><li>User1</li></ul></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/create-user' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            console.log(message);
        })
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()    
    }
})

server.listen(3000)