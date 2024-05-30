/* eslint-disable @adonisjs/prefer-lazy-controller-import */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

router.get('/', async ({ view }) => {
  const specUrl = '/swagger.json'
  return view.render('swagger', { specUrl })
})

router.get('/iclock-transactions', '#controllers/iclock_transactions_controller.index')
router.get('/departments', '#controllers/personnel_departments_controller.index')

// router.get('health', async ({ response }) => {
//   const report = await HealthCheck.getReport()

//   return report.healthy ? response.ok(report) : response.badRequest(report)
// })
