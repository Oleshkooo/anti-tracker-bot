import { AppService } from '@/app.service'
import { AppUpdate } from '@/app.update'
import { DatabaseService } from '@/database/database.service'
import { RobotService } from '@/robot/robot.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TelegrafModule.forRoot({
            middlewares: [],
            token: process.env.TELEGRAM_BOT_TOKEN,
        }),
    ],
    providers: [AppService, AppUpdate, DatabaseService, RobotService],
})
export class AppModule {}
