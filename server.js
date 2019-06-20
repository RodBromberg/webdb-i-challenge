const express = require('express');

const server = express();

const db = require('./data/accounts-model.js')

server.get('/api/accounts', async(req, res) => {
    try {
        const accounts = await db.find();
        res.status(200).json(accounts)
    } catch (err) {
        res.status(500).json({
            message: 'Error'
        })
    }
})

server.get("/api/accounts/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const account = await db.findById(id);
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: "Invalid ID" });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving account information"
        });
    }
});

server.post('/api/accounts', async(req, res) => {
    const newAccount = req.body
    if (!newAccount.name) {
        res.status(404).json({ message: 'Error  no name' })
    } else if (!account.budget) {
        res.status(404).json({ message: 'Error bydget' })
    } else {
        try {
            const adds = await db.add(req.body)
            res.status(201).json(adds)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Errrrrororororor',
                err
            })
        }
    }
});

server.delete('/api/accounts/:id', async(req, res) => {
    try {
        const count = await db.remove(req.params.id)
        if (count > 0) {
            res.status(200).json({ message: "successfull deleted", count })
        }
        res.status(404).json({ message: 'Errrrror' })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error removvvigng ACCOUNT'
        })
    }
})

module.exports = server;