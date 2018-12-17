// const mongoose = require('mongoose');

const Message = require('./models/message')
const Item = require('./models/item')


const exists = user => !!Object.keys(queue).find(item => item === user);

const add = (message, recipient) => new Promise((resolve, reject) => {
    const newItem = new Item({ message, recipient })

    newItem.save((err, res) => {
        if (err) reject(new Error(err));
        resolve(res);
    });    
});

const get = recipient => new Promise((resolve, reject) => {
    Item.find({ recipient }, (err, res) => {
        if (err) reject(new Error(err));

        const ids = res.map(item => item.message);

        Message.find({ _id: { $in: ids } } , (err, messages) => {
            if (err) reject(new Error(err));
            
            Item.remove({ message: { $in: ids } }, (err, res) => {
                if (err) reject(new Error(err));
                resolve(messages)
            })
        });
    });
});

module.exports = {
    add,
    get
}