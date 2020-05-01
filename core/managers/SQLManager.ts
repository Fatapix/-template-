import mysql from 'mysql2'
import { Request, Response, Application } from 'express'

import LogManager = require('./LogManager')

class SQLManager
{

    private console: LogManager
    
    constructor(name: string)
    {

        this.console = new LogManager(name)

    }

    public getQuery(table: string, req: Request, res: Response)
    {
        this.console.print('info', 'GET request into table: '+ table)
    }

    public postQuery(table: string, req: Request, res: Response)
    {
        this.console.print('info', 'POST request into table: '+ table)
    }

    public deleteQuery(table: string, id: number, req: Request, res: Response)
    {
        this.console.print('info', 'DELETE request into table: '+ table +' with id: '+ id)
    }

    public putQuery(table: string, id: number, req: Request, res: Response)
    {
        this.console.print('info', 'PUT request into table: '+ table +' with id: '+ id)
    }
}

export = SQLManager