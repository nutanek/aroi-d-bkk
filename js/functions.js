function mainLog(log) {
    if (configs.state == "dev") {
        console.log(log);
    }
}

function googleAnalytics(props) {
    if (configs.state == "prod") {
        ga('send', props);
        mainLog("google analytics", props);
    }
}
