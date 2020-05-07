import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import config from './config'
import router from './src/router'
import { connect } from './src/db'

const app = express()
connect()
app.set('port', process.env.PORT || config.port)

app.use('/', express.static('./public/'))

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())
app.use(
  cors({
    origin: config.originUrl, //允许访问
    optionsSuccessStatus: 200,
  })
)

app.use('/', router.todo)

app.listen(app.get('port'), () => {
  console.log(` app listening on port ${app.get('port')}!`)
})
