var settingsEl = document.querySelector('.settings')
settingsEl.addEventListener('click', function () {
    ipc.send('open-settings-window')
})
