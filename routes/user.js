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

router.get('/:name/tweets', async (req, res) => {
  const { name } = req.params
  const docs = await client
    .query(
      Paginate(Match(Index('tweets_by_user'), Call(Fn('getUserRef'), name)))
    )
    .catch(e => res.send(e))

  res.send(docs)
})

router.get('/:follower/feeds', async (req, res) => {
  const { follower } = req.params

  const docs = await client
    .query(
      Paginate(
        Join(
          Match(
            Index('followees_by_follower'),
            Call(Fn('getUserRef'), follower)
          ),
          Index('tweets_by_user')
        )
      )
    )
    .catch(e => res.send(e))

  res.send(docs)
})

module.exports = router
