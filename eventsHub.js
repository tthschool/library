const eventsHub = {
    events : {},
    sub(event , fn){
        this.events[event] = this.events[event] || []
        this.events[event].push(fn)
    },
    pub(event , data){
        if (this.events[event]) {
            this.events[event].forEach(fn => fn(data));
        }
    }
}

export {eventsHub}