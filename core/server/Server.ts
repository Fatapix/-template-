import express, { Application, Request, Response } from 'express'
import path from 'path'

import LogManager = require('../managers/LogManager')
import SQLManager = require('../managers/SQLManager')

class Server
{

    private name: string
    private _port: number

    private app: Application = express()
    
    private console: LogManager
    private sql: SQLManager

    constructor(name: string, port: number)
    {

        this.name  = name
        this._port = port

        /* [INSTANCES] */
        this.console = new LogManager(this.name)
        this.sql     = new SQLManager(this.name, this.app)

        this.app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
        
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
        
            // Pass to next layer of middleware
            next();
        });

        /* [ROUTES] */
        this.app.get('/', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname + '/../../public/users.html'))
        })

        this.app.get('/__get@:table', (req: Request, res: Response) => {
            this.sql.getQuery(req.params.table, req, res)
        })

        this.app.get('/__get@:table/:id', (req: Request, res: Response) => {
            this.sql.getQueryWithID(req.params.table, parseInt(req.params.id), req, res)
        })

        this.app.post('/__add@:table', (req: Request, res: Response) => {
            this.sql.postQuery(req.params.table, req, res)
        })

        this.app.delete('/__delete@:table/:id', (req: Request, res: Response) => {
            this.sql.deleteQuery(req.params.table, parseInt(req.params.id), req, res)    
        })

        this.app.put('/__change@:table/:id', (req: Request, res: Response) => {
            // this.sql.putQuery(req.params.table, req.params.id, req, res)
        })

        this.app.listen(this._port, () => {
            this.console.print('info', 'Server is running in http://localhost:'+ this._port +' !')
        })
    }

}

new Server('api-mysql', 3000)