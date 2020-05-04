import mysql from 'mysql2'
import { Request, Response, Application } from 'express'

import LogManager = require('./LogManager')

class SQLManager
{

    private console: LogManager

    private SQLConnection()
    {
        let connection = mysql.createConnection({
            host: '51.91.121.155',
            user: 'apiuser',
            password: 'azerty@dev',
            database: 'api_db'
        })
        return connection
    }

    constructor(name: string, app: Application)
    {

        this.console = new LogManager(name)

    }

    public getQuery(table: string, req: Request, res: Response)
    {
        this.console.print('info', 'GET request into table: '+ table)
        
        let queryString = 'SELECT * FROM '+ table
        this.SQLConnection().query(queryString, (err, rows, fields) => {
            if(err)
            {
                this.console.print('error', 'Failed to query for table:'+ table)
                this.console.print('info', err)
                res.sendStatus(500)
                res.end()
                return
            }

            res.send(rows)
        })
    }

    public getQueryWithID(table: string, id: number, req: Request, res: Response)
    {
        this.console.print('info', 'GET request into table: '+ table +' with, id: '+ id)

        let queryString = 'SELECT * FROM '+ table +' WHERE id='+ id
        this.SQLConnection().query(queryString, (err, rows, fields) => {
            if(err)
            {
                this.console.print('error', 'Failed to query for table:'+ table)
                this.console.print('info', err)
                res.sendStatus(500)
                res.end()
                return
            }

            this.console.print('info', rows)

            res.send(rows)
        })
    }

    public postQuery(table: string, req: Request, res: Response)
    {
        this.console.print('info', 'POST request into table: '+ table)
    }

    public deleteQuery(table: string, id: number, req: Request, res: Response)
    {
        this.console.print('info', 'DELETE request into table: '+ table +', with id: '+ id)
    
        let queryString = 'DELETE FROM '+ table +' WHERE id='+ id
        this.SQLConnection().query(queryString, (err, rows, fields) => {
            if(err)
            {
                this.console.print('error', 'Failed to query for table:'+ table)
                this.console.print('info', err)
                res.sendStatus(500)
                res.end()
                return
            }
        })
    }

    public putQuery(table: string, id: number, req: Request, res: Response)
    {
        this.console.print('info', 'PUT request into table: '+ table +', with id: '+ id)
    }
}

export = SQLManager