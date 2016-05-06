
function GetGuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


function ConvertMillisecondsToSecondString(inTime) {
    inTime = Math.max(inTime, 0);
    var seconds = Math.floor(inTime / 1000).toString();
    var afterSeconds = Math.floor((inTime % 1000) / 10).toString();
    afterSeconds.length < 2 ? afterSeconds = "0" + afterSeconds : afterSeconds = afterSeconds;
    
    return seconds + "." + afterSeconds;
}

function copyJSONThing(thing) {
    var thing2 = JSON.parse(JSON.stringify(thing));
    if (thing2.id) {
        thing2.id = GetGuid();
    }
    return thing2;
}

function toNumberStringWithConstrainedDecimals(number, maxDecimals) {
    var leftHandPrecision = 0;
    var numberToOperateOn = number;
    while (numberToOperateOn >= 1) {
        leftHandPrecision++;
        numberToOperateOn = numberToOperateOn / 10;
    }
    
    if (number % 1 !== 0) {
        return number.toPrecision(maxDecimals + leftHandPrecision).toString();
    } else {
        return number.toPrecision(leftHandPrecision).toString();
    }
}