import colors from 'colors'

class LogManager
{

    public PREFIX: string

    constructor(name: string)
    {

        this.PREFIX = colors.magenta('[server@'+ name +']')

    }

    public getPrefix()
    {
        return this.PREFIX
    }

    public print(type: string, msg)
    {
        if(type == 'success') console.log(this.PREFIX, colors.green(msg))
        else if(type == 'info') console.log(this.PREFIX, '*'.bgMagenta, colors.cyan(msg))
        else if(type == 'warn') console.log(this.PREFIX, '!'.bgMagenta, colors.yellow(msg))
        else if(type == 'error') console.log(this.PREFIX, '!!!'.bgMagenta, colors.red(msg))
        else console.log(this.PREFIX, '!!!'.bgMagenta, colors.red('"'+ type +'" : state does not exist for this message !'))
    }

    public squarePrint(msg: Array <string>)
    {

        

    }
}

export = LogManager