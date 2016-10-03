"use strict";

module.exports = function (req, query, options) {
    if (req.query.id)
        query._id = req.query.id;

    if (req.query.email)
        query.email = req.query.email;

    query.deleted = {$ne: true};
    if (req.query.deleted)
        if (req.query.deleted == "true")
            query.deleted = {};

    if (req.query.order === 'asc')
        options.sort = {created_at: -1};
    else
        options.sort = {created_at: 1};

    if (req.query.offset)
        options.offset = Number(req.query.offset);

    if (req.query.page)
        options.page = Number(req.query.page);

    if (req.query.limit) {
        if (req.query.limit > 100)
            return {"err": "O limite máximo é de 100 itens. Use a paginação!"};

        options.limit = Number(req.query.limit);
    }

    return {query: query, options: options};
};

