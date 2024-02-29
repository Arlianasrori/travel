class responseError extends Error {
    constructor(status,message) {
        this.status = status
        super(message)
    }
}

export {responseError}