import { AppService } from '@/app.service'
import { AppButtonValues } from '@/buttons/app.buttons'
import { Action, Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'

@Update()
export class AppUpdate {
    constructor(private readonly appService: AppService, @InjectBot() private readonly bot: Telegraf<Context>) {}

    @Start()
    start(@Ctx() ctx: Context) {
        return this.appService.start(ctx)
    }

    @Hears(AppButtonValues.START)
    startRobot(@Ctx() ctx: Context) {
        return this.appService.startRobot(ctx)
    }

    @Hears(AppButtonValues.STOP)
    stopRobot(@Ctx() ctx: Context) {
        return this.appService.stopRobot(ctx)
    }

    @Hears(AppButtonValues.SHANGE_SCREEN_LEFT)
    moveScreenLeft(@Ctx() ctx: Context) {
        return this.appService.moveScreenLeft(ctx)
    }

    @Hears(AppButtonValues.SHANGE_SCREEN_RIGHT)
    moveScreenRight(@Ctx() ctx: Context) {
        return this.appService.moveScreenRight(ctx)
    }

    @Hears(AppButtonValues.CONFIG)
    configShow(@Ctx() ctx: Context) {
        return this.appService.configShow(ctx)
    }

    @Action(/CONFIG/)
    config(@Ctx() ctx: Context) {
        return this.appService.config(ctx)
    }
}
