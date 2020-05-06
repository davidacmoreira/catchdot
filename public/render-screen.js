export default function renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if (currentPlayer) {
        context.fillStyle = '#F0DB4F'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    updateScoreTable(scoreTable, game.state.players, currentPlayerId);

    requestAnimationFrame(() => {
        renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId)
    })
}

function updateScoreTable(scoreTable, players, currentPlayerId) {
    let scoreTableInnerHTML = `
        <tr>
            <td>player</td>
            <td>score</td>
        </tr>
    `

    for (const playerId in players) {
        scoreTableInnerHTML += `
            <tr>
                <td>${playerId}</td>
                <td>${players[playerId].score}</td>
            </tr>
        `
    }



    scoreTable.innerHTML = scoreTableInnerHTML
}