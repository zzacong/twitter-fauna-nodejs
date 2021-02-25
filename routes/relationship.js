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

router.post('/', async (req, res) => {
  const { follower, followee } = req.body

  const data = {
    follower: Call(Fn('getUser'), follower),
    followee: Call(Fn('getUser'), followee),
  }

  const doc = await client
    .query(Create(Collection('relationships'), { data }))
    .catch(e => res.send(e))

  res.send(doc)
})

module.exports = router
