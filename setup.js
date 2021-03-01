const faunadb = require('faunadb')
const q = faunadb.query
require('dotenv').config({ path: '.env.local' })
const client = new faunadb.Client({ secret: process.env.FAUNA_ADMIN_SECRET })

async function main() {
  // Create Collections
  // await client.query(q.CreateCollection({ name: 'users' }))
  // await client.query(q.CreateCollection({ name: 'tweets' }))
  // await client.query(q.CreateCollection({ name: 'relationships' }))

  // Create Indexes
  await client.query(
    q.CreateIndex({
      name: 'all_users',
      unique: false,
      serialized: true,
      source: q.Collection('users'),
    })
  )
  await client.query(
    q.CreateIndex({
      name: 'users_by_name',
      unique: false,
      serialized: true,
      source: q.Collection('users'),
      terms: [
        {
          field: ['data', 'name'],
        },
      ],
    })
  )
  await client.query(
    q.CreateIndex({
      name: 'user_by_username',
      unique: true,
      serialized: true,
      source: q.Collection('users'),
      terms: [
        {
          field: ['data', 'username'],
        },
      ],
    })
  )
  await client.query(
    q.CreateIndex({
      name: 'user_by_email',
      unique: true,
      serialized: true,
      source: q.Collection('users'),
      terms: [
        {
          field: ['data', 'email'],
        },
      ],
    })
  )
  await client.query(
    q.CreateIndex({
      name: 'tweets_by_user',
      unique: false,
      serialized: true,
      source: q.Collection('tweets'),
      terms: [
        {
          field: ['data', 'user'],
        },
      ],
      values: [
        {
          field: ['data', 'text'],
        },
      ],
    })
  )
  await client.query(
    q.CreateIndex({
      name: 'followers_by_followee',
      unique: false,
      serialized: true,
      source: q.Collection('relationships'),
      terms: [
        {
          field: ['data', 'followee'],
        },
      ],
      values: [
        {
          field: ['data', 'follower'],
        },
      ],
    })
  )
  await client.query(
    q.CreateIndex({
      name: 'followees_by_follower',
      unique: false,
      serialized: true,
      source: q.Collection('relationships'),
      terms: [
        {
          field: ['data', 'follower'],
        },
      ],
      values: [
        {
          field: ['data', 'followee'],
        },
      ],
    })
  )
}

main()
  .then(() => console.log('[SETUP COMPLETED]'))
  .catch(console.error)
