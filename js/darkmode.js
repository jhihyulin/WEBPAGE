function addDarkmodeWidget() {
    new Darkmode().showWidget();
}
window.addEventListener('load', addDarkmodeWidget);
const options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.3s', // default: '0.3s'
    mixColor: '#ffffff', // default: '#fff'
    backgroundColor: '#ffffff', // default: '#fff'
    buttonColorDark: '#000000', // default: '#100f2c'
    buttonColorLight: '#ffffff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
}

try {
    const darkmode = new Darkmode(options);
    darkmode.showWidget();
} catch (error) {
    console.log(error);
}