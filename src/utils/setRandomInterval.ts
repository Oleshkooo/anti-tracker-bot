type SetRandomInterval = (intervalFunction: () => void, minDelay: number, maxDelay: number) => () => void

export const setRandomInterval: SetRandomInterval = (intervalFunction, minDelay, maxDelay) => {
    let timeout: string | number | NodeJS.Timeout

    const runInterval = () => {
        const timeoutFunction = () => {
            intervalFunction()
            runInterval()
        }

        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

        timeout = setTimeout(timeoutFunction, delay)
    }

    runInterval()

    return () => {
        clearTimeout(timeout)
    }
}
