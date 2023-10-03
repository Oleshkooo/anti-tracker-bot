import { Markup } from 'telegraf'

export enum AppButtonValues {
    START = '✅ Start robot',
    STOP = '🛑 Stop robot',
    SHANGE_SCREEN_LEFT = '⬅️ Screen',
    SHANGE_SCREEN_RIGHT = 'Screen ➡️',
    CONFIG = '⚙️ Config',
}

export const appButtons = () => {
    return Markup.keyboard(
        [
            Markup.button.callback(AppButtonValues.START, AppButtonValues.START),
            Markup.button.callback(AppButtonValues.STOP, AppButtonValues.STOP),
            Markup.button.callback(AppButtonValues.SHANGE_SCREEN_LEFT, AppButtonValues.SHANGE_SCREEN_LEFT),
            Markup.button.callback(AppButtonValues.SHANGE_SCREEN_RIGHT, AppButtonValues.SHANGE_SCREEN_RIGHT),
            Markup.button.callback(AppButtonValues.CONFIG, AppButtonValues.CONFIG),
        ],
        {
            columns: 2,
        },
    )
}
