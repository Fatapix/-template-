import express, { Application, Request, Response } from 'express'
import path from 'path'

import LogManager = require('../managers/LogManager')
import SQLManager = require('../managers/SQLManager')

class Server
{

    private name: string
    private port: number

    private app: Application = express()
    
    private console: LogManager
    private sql: SQLManager

    constructor(name: string, port: number)
    {

        this.name = name
        this.port = port

        this.console = new LogManager(this.name)
        this.sql     = new SQLManager(this.name)

        /* [ROUTES] */
        this.app.get('/', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname + '/../dev/index.html'))
        })

        this.app.get('/__get@:table', (req: Request, res: Response) => {
            this.sql.getQuery(req.params.table, req, res)
        })

        this.app.post('/__add@:table', (req: Request, res: Response) => {
            this.sql.postQuery(req.params.table, req, res)
        })

        this.app.delete('/__del@:table?:id', (req: Request, res: Response) => {
            // this.sql.deleteQuery(req.params.table, req.params.id, req, res)          
        })

        this.app.put('/__change@:table?:id', (req: Request, res: Response) => {
            // this.sql.putQuery(req.params.table, req.params.id, req, res)
        })

        this.app.listen(this.port, () => {
            this.console.print('info', 'Server is running in http://localhost:'+ this.port +' !')  
        })
    }

}

new Server('api-mysql', 3000)