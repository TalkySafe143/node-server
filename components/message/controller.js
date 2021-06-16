const store = require('./store');

const addMessage = (user, msg) => {
    return new Promise((resolve, reject) => {

        if (!user || !msg) {
            !user ? console.log('[messageController] No hay un usuario!!') : console.log('[messageController] No hay un mensaje!!');
            reject('Falta informacion en el mensaje');
        }

        const fullMessage = {
            user,
            message: msg,
            date: new Date()
        }
        
        store.addMessageDB(fullMessage)

        resolve(fullMessage)
    })
}

const getMessages = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await store.getMessagesDB();
            !res[0] ? reject('No hay mensajes disponibles!') : resolve(res);
        } catch(err) {
            reject(err);
        }
    })
}

const updateMessage = (id, text) => {
    return new Promise((resolve, reject) => {
        if (!id || !text) reject('Falta informacion')
        store.updateMessageDB(id, text)
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

const findMessage = queries => {
    return new Promise(async (resolve, reject) => {
        if (!queries) reject('Falta de informacion');
        try {
            const res = await store.findMessageDB(queries);
            !res[0] ? reject('No hay resultados con la busqueda') : resolve(res);
        } catch(err) {
            reject(err);
        }
        
    })
}

const deleteMessage = id => {
    return new Promise((resolve, reject) => {
        if (!id) reject('Parametro invalido');

        store.deleteMessageDB(id)
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

module.exports = { addMessage, getMessages, updateMessage, findMessage, deleteMessage }