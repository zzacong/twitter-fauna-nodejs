const router = require('express').Router()
const faunadb = require('faunadb')
const client = require('../fauna/fauna')

const {
  Ref,
  Paginate,
  Get,
  Match,
  Select,
  Index,
  Create,
  Collection,
  Join,
  Call,
  Function: Fn,
} = faunadb.query

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const doc = await client
    .query(Get(Ref(Collection('tweets'), id)))
    .catch(e => res.send(e))

  res.send(doc)
})

router.post('/', async (req, res) => {
  const { name, text } = req.body

  const data = {
    user: Call(Fn('getUserRef'), name),
    text,
  }

  const doc = await client
    .query(Create(Collection('tweets'), { data }))
    .catch(e => res.send(e))

  res.send(doc)
})

module.exports = router
