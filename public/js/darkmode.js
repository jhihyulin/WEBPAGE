function addDarkmodeWidget() {
    new Darkmode(options).showWidget();
}
window.addEventListener('load', addDarkmodeWidget);
const options = {
    bottom: '64px', // default: '32px'
    right: '32px', // default: '32px'
    left: 'unset', // default: 'unset'
    time: '0.3s', // default: '0.3s'
    mixColor: '#ffffff', // default: '#fff'
    backgroundColor: '#ffffff', // default: '#fff'
    buttonColorDark: '#000000', // default: '#100f2c'
    buttonColorLight: '#ffffff', // default: '#fff'
    saveInCookies: true, // default: true,
    label: '🌓', // default: '🌓'
    autoMatchOsTheme: true // default: true
}