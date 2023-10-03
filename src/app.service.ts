import { AppButtonValues, appButtons } from '@/buttons/app.buttons'
import { configButtons } from '@/buttons/config.buttons'
import { DatabaseService } from '@/database/database.service'
import { RobotService } from '@/robot/robot.service'
import { Injectable } from '@nestjs/common'
import _ from 'lodash'
import { Context } from 'telegraf'

@Injectable()
export class AppService {
    constructor(private readonly databaseService: DatabaseService, private readonly robotService: RobotService) {}

    start(ctx: Context) {
        ctx.reply('Hi! Press a button to start', {
            reply_markup: {
                keyboard: appButtons().reply_markup.keyboard,
                resize_keyboard: true,
            },
        })
    }

    startRobot(ctx: Context) {
        const jsonData = this.databaseService.get()
        this.robotService.start(jsonData)
        ctx.reply('✅ Robot started', {
            reply_markup: {
                keyboard: appButtons().reply_markup.keyboard,
                resize_keyboard: true,
            },
        })
    }

    stopRobot(ctx: Context) {
        this.robotService.stop()
        ctx.reply('🛑 Robot stopped', {
            reply_markup: {
                keyboard: appButtons().reply_markup.keyboard,
                resize_keyboard: true,
            },
        })
    }

    moveScreenLeft(ctx: Context) {
        this.robotService.moveScreenLeft()
        ctx.reply('👈 Screen moved left', {
            reply_markup: {
                keyboard: appButtons().reply_markup.keyboard,
                resize_keyboard: true,
            },
        })
    }

    moveScreenRight(ctx: Context) {
        this.robotService.moveScreenRight()
        ctx.reply('👉 Screen moved right', {
            reply_markup: {
                keyboard: appButtons().reply_markup.keyboard,
                resize_keyboard: true,
            },
        })
    }

    configShow(ctx: Context) {
        const jsonData = this.databaseService.get()
        ctx.reply(AppButtonValues.CONFIG, {
            reply_markup: {
                inline_keyboard: configButtons(jsonData).reply_markup.inline_keyboard,
            },
        })
    }

    config(ctx: Context) {
        try {
            // @ts-expect-error
            const action = ctx.callbackQuery?.data ?? undefined
            if (!action) {
                throw new Error('No action')
            }
            const jsonData = {
                ...this.databaseService.get(),
            }
            const fields = action.split(' ')
            if (fields.length === 1) {
                throw new Error('No field')
            }
            const fieldPath = fields.slice(1).join('.')
            _.set(jsonData, fieldPath, !_.get(jsonData, fieldPath))
            this.databaseService.set(jsonData)
            this.robotService.restart(jsonData)
            ctx.editMessageReplyMarkup({
                inline_keyboard: configButtons(jsonData).reply_markup.inline_keyboard,
            })
        } catch (error) {
            console.error(error)
        }
    }
}
