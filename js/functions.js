function mainLog(log) {
    if (configs.state == "dev") {
        console.log(log);
    }
}

function googleAnalytics(props) {
    ga('send', props);
    if (configs.state == "dev") {
        mainLog("google analytics", props);
    }
}
