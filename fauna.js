const faunadb = require('faunadb')

const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_SECRET })

module.exports = client
