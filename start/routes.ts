/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const IClockTransactionsController = () => import('#controllers/iclock_transactions_controller')
// import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

router.get('/', async ({ view }) => {
  const specUrl = '/swagger.json'
  return view.render('swagger', { specUrl })
})

router.get('/iclock-transactions', [IClockTransactionsController, 'index'])
