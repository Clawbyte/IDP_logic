import express, { Request, Response } from 'express'
import axios from 'axios'

const app = express()
const port = 3002
const ioUrl = process.env.IO_URL || "http://localhost:3000"
const authUrl = process.env.AUTH_URL || "http://localhost:3001"

app.use(express.json());

app.listen(port, async () => {
    console.log(`Microservice running at http://localhost:${port}`)
})

// Get books route
app.get('/book/unread', async (req: Request, res: Response) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization && authorization.split(' ')[1];

        const bookInfo = await axios.get(ioUrl + "/book/unread", {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response
        }).catch((err) => {
            console.error(err.response)
            return err.response
        })

        if (bookInfo.status !== 200) {
            res.status(bookInfo.status).json({ message: bookInfo.data?.message });
            return;
        }
        
        res.json(bookInfo.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// Add book route
app.post('/book/add', async (req: Request, res: Response) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization && authorization.split(' ')[1];

        const bookInfo = await axios.post(ioUrl + "/book/add", req.body, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response
        }).catch((err) => {
            console.error(err.response)
            return err.response
        })

        if (bookInfo.status !== 200) {
            res.status(bookInfo.status).json({ message: bookInfo.data.message });
            return;
        }

        res.json(bookInfo.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// Get book recommendation route
app.get('/book/recommendation', async (req: Request, res: Response) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization && authorization.split(' ')[1];

        const bookInfo = await axios.get(ioUrl + "/book/unread", {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response
        }).catch((err) => {
            console.error(err.response)
            return err.response
        })

        if (bookInfo.status !== 200) {
            res.status(bookInfo.status).json({ message: bookInfo.data.message });
            return;
        }

        if (bookInfo.data.length === 0) {
            res.status(404).json({ message: "No unread books found" });
            return;
        }

        // return random unread book
        res.json(bookInfo.data[Math.floor(Math.random() * bookInfo.data.length)]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// Mark book as read route
app.post('/book/read', async (req: Request, res: Response) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization && authorization.split(' ')[1];

        const bookInfo = await axios.post(ioUrl + "/book/read", req.body, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            console.error(err.response)
            return err.response
        })

        if (bookInfo.status !== 200) {
            res.status(bookInfo.status).json({ message: bookInfo.data.message });
            return;
        }

        res.json(bookInfo.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.delete('/book/:id', async (req: Request, res: Response) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization && authorization.split(' ')[1];

        const bookInfo = await axios.delete(ioUrl + "/book/" + req.params.id, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response
        }).catch((err) => {
            console.error(err.response)
            return err.response
        })

        if (bookInfo.status !== 200) {
            res.status(bookInfo.status).json({ message: bookInfo.data.message });
            return;
        }

        res.json(bookInfo.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})