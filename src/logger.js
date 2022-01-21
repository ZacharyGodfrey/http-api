module.exports = (config) => {
    const { useConsole } = config;

    return {
        info: (value) => {
            if (useConsole) {
                console.info(`[Logger] INFO: ${value}`);
            }
        },
        error: (value) => {
            if (useConsole) {
                console.error(`[Logger] ERROR: ${value}`);
            }
        }
    }
};