import { JsonDb } from '@/database/database.service'
import { setRandomInterval } from '@/utils/setRandomInterval'
import { sleep } from '@/utils/sleep'
import { Injectable } from '@nestjs/common'
import { mouse } from '@nut-tree/nut-js'
import { sendCombination } from 'node-key-sender'
import robot from 'robotjs'

const screenSize = robot.getScreenSize()

const moveMouseSmooth = (x: number, y: number, speed = Math.random() * 2 + 1) => {
    robot.setMouseDelay(speed)
    robot.moveMouseSmooth(x, y)
}

@Injectable()
export class RobotService {
    private interval: NodeJS.Timer
    private clear: ReturnType<typeof setRandomInterval> | undefined

    private moveMouse() {
        const x = Math.random() * screenSize.width
        const y = Math.random() * screenSize.height
        moveMouseSmooth(x, y)
    }

    private async scrollMouse(directions: Array<'up' | 'down' | 'left' | 'right'>) {
        const qty = Math.floor(Math.random() * 50) + 1
        const selectedDirection = directions[Math.floor(Math.random() * directions.length)]
        if (selectedDirection === 'up') {
            await mouse.scrollUp(qty)
        }
        if (selectedDirection === 'down') {
            await mouse.scrollDown(qty)
        }
    }

    private pressArrows(directions: Array<'up' | 'down' | 'left' | 'right'>) {
        const qty = Math.floor(Math.random() * 5) + 1
        const selectedDirection = directions[Math.floor(Math.random() * directions.length)]
        for (let i = 0; i < qty; i++) {
            robot.keyTap(selectedDirection)
            sleep(100)
        }
    }

    private randomEvent(data: JsonDb) {
        const events = []
        // arrows
        if (data.arrows.up || data.arrows.down || data.arrows.left || data.arrows.right) {
            const directions = []
            if (data.arrows.up) {
                directions.push('up')
            }
            if (data.arrows.down) {
                directions.push('down')
            }
            if (data.arrows.left) {
                directions.push('left')
            }
            if (data.arrows.right) {
                directions.push('right')
            }
            if (directions.length > 0) {
                events.push(() => this.pressArrows(directions))
            }
        }
        // screens
        if (data.screens.left) {
            events.push(this.moveScreenLeft)
        }
        if (data.screens.right) {
            events.push(this.moveScreenRight)
        }
        // mouse scroll
        if (data.mouse.scroll.up || data.mouse.scroll.down) {
            const directions = []
            if (data.mouse.scroll.up) {
                directions.push('up')
            }
            if (data.mouse.scroll.down) {
                directions.push('down')
            }
            if (directions.length > 0) {
                events.push(() => this.scrollMouse(directions))
            }
        }
        if (data.mouse.move) {
            events.push(this.moveMouse)
        }

        if (events.length === 0) {
            return
        }
        const selectedEvent = events[Math.floor(Math.random() * events.length)]
        selectedEvent()
    }

    //

    public async moveScreenLeft() {
        sendCombination(['control', 'left'])
    }

    public async moveScreenRight() {
        sendCombination(['control', 'right'])
    }

    public start(data: JsonDb, intervalFrom = 1000, intervalTo = 2500) {
        this.stop()
        this.clear = setRandomInterval(
            async () => {
                this.randomEvent(data)
            },
            intervalFrom,
            intervalTo,
        )
    }

    public stop() {
        this.clear?.()
    }

    public restart(data: JsonDb, interval = 1000) {
        this.stop()
        this.start(data, interval)
    }
}
