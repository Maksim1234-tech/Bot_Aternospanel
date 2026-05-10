const express = require('express');
const { Rcon } = require('rcon-client');
const app = express();
const path = require('path');

const config = {
    host: 'PixelBoom-hTxt.aternos.me',
    port: 25575, // ПОРТ ИЗ НАСТРОЕК RCON
    password: 'ТВОЙ_ПАРОЛЬ_RCON'
};

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/execute', async (req, res) => {
    const cmdType = req.query.command;
    let minecraftCommand = '';

    // ТЕ САМЫЕ КОМАНДЫ ДЛЯ ТРОЛЛИНГА
    if (cmdType === 'kill') minecraftCommand = 'kill Slobot00';
    if (cmdType === 'tp')   minecraftCommand = 'tp Slobot00 maksmelya2016';
    if (cmdType === 'jump') minecraftCommand = 'effect give Slobot00 levitation 1 5 true';
    if (cmdType === 'lava') minecraftCommand = 'setblock ~ ~ ~ lava';
    if (cmdType === 'spin') minecraftCommand = 'execute as Slobot00 at @s run tp @s ~ ~ ~ ~50 ~';
    if (cmdType === 'say')  minecraftCommand = 'say Я ПРОСТО ОБЫЧНЫЙ ИГРОК, ЧЕСТНО!';

    try {
        const rcon = await Rcon.connect(config);
        await rcon.send(minecraftCommand);
        await rcon.end();
        res.send('Done');
    } catch (e) {
        res.status(500).send('Error');
    }
});

app.listen(3000);
