export default function createKeyboardListener(document) {
    const state = {
        observers: []
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        const pressedKey = event.key

        const command = {
            type: 'move-player',
            playerId: state.playerId,
            pressedKey
        }

        notifyAll(command)
    }

    return {
        subscribe,
        registerPlayerId
    }
}