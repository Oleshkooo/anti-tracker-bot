import { Injectable } from '@nestjs/common'
import fs from 'fs'

export interface JsonDb {
    arrows: {
        up: boolean
        down: boolean
        left: boolean
        right: boolean
    }
    screens: {
        left: boolean
        right: boolean
    }
    mouse: {
        move: boolean
        scroll: {
            up: boolean
            down: boolean
        }
    }
}

const defaultJsonDb: JsonDb = {
    arrows: {
        up: false,
        down: false,
        left: false,
        right: false,
    },
    screens: {
        left: false,
        right: false,
    },
    mouse: {
        move: false,
        scroll: {
            up: false,
            down: false,
        },
    },
}

@Injectable()
export class DatabaseService {
    private readonly fileName = 'database.json'
    private jsonDb: JsonDb

    constructor() {
        const jsonDbExists = fs.existsSync(this.fileName)
        if (jsonDbExists) {
            this.jsonDb = JSON.parse(fs.readFileSync(this.fileName, 'utf8'))
        } else {
            this.jsonDb = defaultJsonDb
            this.save()
        }
    }

    private save() {
        fs.writeFileSync(this.fileName, JSON.stringify(this.jsonDb))
    }

    public get(): JsonDb {
        return this.jsonDb
    }

    public set(data: JsonDb) {
        this.jsonDb = {
            ...this.jsonDb,
            ...data,
        }
        this.save()
    }
}
