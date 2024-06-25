import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION', 'pg') as string,
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST') as string,
        port: Number(env.get('DB_PORT', 5432)),
        user: env.get('DB_USER', 'postgres') as string,
        password: env.get('DB_PASSWORD', ''),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        tableName: 'adonis_schema',
      },
      healthCheck: true,
      debug: false,
    },
  },
})

export default dbConfig
