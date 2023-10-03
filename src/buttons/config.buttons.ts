import { JsonDb } from '@/database/database.service'
import { Markup } from 'telegraf'

export enum ConfigButtonValues {
    ARROWS_UP = 'arrows.up',
    ARROWS_DOWN = 'arrows.down',
    ARROWS_LEFT = 'arrows.left',
    ARROWS_RIGHT = 'arrows.right',
    SCREENS_LEFT = 'screens.left',
    SCREENS_RIGHT = 'screens.right',
    MOUSE_MOVE = 'mouse.move',
    MOUSE_SCROLL_UP = 'mouse.scroll.up',
    MOUSE_SCROLL_DOWN = 'mouse.scroll.down',
}

export const configButtons = (data: JsonDb) => {
    return Markup.inlineKeyboard(
        [
            Markup.button.callback(`⬆️ ${data.arrows.up ? '✅' : '🛑'}`, `CONFIG ${ConfigButtonValues.ARROWS_UP}`),
            Markup.button.callback(`⬇️ ${data.arrows.down ? '✅' : '🛑'}`, `CONFIG ${ConfigButtonValues.ARROWS_DOWN}`),
            Markup.button.callback(`⬅️ ${data.arrows.left ? '✅' : '🛑'}`, `CONFIG ${ConfigButtonValues.ARROWS_LEFT}`),
            Markup.button.callback(`➡️ ${data.arrows.right ? '✅' : '🛑'}`, `CONFIG ${ConfigButtonValues.ARROWS_RIGHT}`),
            Markup.button.callback(`🖥⬅️ ${data.screens.left ? '✅' : '🛑'}`, `CONFIG ${ConfigButtonValues.SCREENS_LEFT}`),
            Markup.button.callback(`🖥➡️ ${data.screens.right ? '✅' : '🛑'}`, `CONFIG ${ConfigButtonValues.SCREENS_RIGHT}`),
            Markup.button.callback(`🖱🛞⬆️ ${data.mouse.scroll.up ? '✅' : '🛑'}`, `CONFIG ${ConfigButtonValues.MOUSE_SCROLL_UP}`),
            Markup.button.callback(
                `🖱🛞⬇️ ${data.mouse.scroll.down ? '✅' : '🛑'}`,
                `CONFIG ${ConfigButtonValues.MOUSE_SCROLL_DOWN}`,
            ),
            Markup.button.callback(`🖱🏃 ${data.mouse.move ? '✅' : '🛑'}`, `CONFIG ${ConfigButtonValues.MOUSE_MOVE}`),
        ],
        {
            columns: 2,
        },
    )
}
