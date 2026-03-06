const names = [
    {
        id: 1,
        name: 'Diego',
        age: 30
    },
    {
        id: 2,
        name: 'Juan',
        age: 25
    }
];

const getNamesById = (id, callbacks) => {
    const user = names.find((user) => user.id === id);
    if (!user) {
        return callbacks(`USUARIO NO ENCONTRADO: ${id}`);
    }
    return callbacks(null, user);
}

module.exports = {
    getNamesById,
}