unomiTracker.initialize({
    'Apache Unomi': {
        scope: 'my-app',
        url: 'http://unomi:8181',
    }
});

unomiTracker.ready(function() {
   console.log("Unomi context loaded - profile id : "+window.cxs.profileId + ", sessionId="+window.cxs.sessionId);
});