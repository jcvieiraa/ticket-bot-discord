module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`Eu estou conectado à ${client.user.username}`)

        var compteurStatus = 1
        setInterval(async () => {
            status =  [`server.enguicapvp.net:7777`]
            compteurStatus = (compteurStatus + 1) % (status.length);
            client.user.setPresence({
                activities: [{
                    name: `${status[compteurStatus]}`,
                    type: "PLAYING"
                  }],
                  status: "online"})
        }, 10000);

        var compteurStatus = 2
        setInterval(async () => {
            status =  [`by .emitezê xD`]
            compteurStatus = (compteurStatus - 1) % (status.length);
            client.user.setPresence({
                activities: [{
                    name: `${status[compteurStatus]}`,
                    type: "LISTENING"
                  }],
                  status: "online"})
        }, 50000);
    }
}