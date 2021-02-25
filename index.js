const express = require('express')
require('dotenv').config({ path: '.env.local' })

const app = express()

app.use(express.json())

const main = async () => {
  app.use('/tweets', require('./routes/tweet'))
  app.use('/users', require('./routes/user'))
  app.use('/relationship', require('./routes/relationship'))

  const PORT = process.env.PORT || 5000

  app.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`)
  )
}

main().catch(console.log)
