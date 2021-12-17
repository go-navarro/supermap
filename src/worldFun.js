const highlightDuration = 300;
const highlightColor = "#dddddd";
const segmentColor = "#36454f";
const nameSpace = "http://www.w3.org/2000/svg";

function getRegionName(regionCode, regionInfo) {
    var regionName = regionInfo[regionCode];
    if (regionName === undefined) {
        return "";
    }
    return regionName;
}

function addCursorViewer(regionIds, regionInfo) {
    for (let j = 0; j < regionIds.length; j++) {
        var regionElement = document.getElementById(regionIds[j]);
        var regionName = getRegionName(regionIds[j], regionInfo);
        regionElement.addEventListener("mouseover", changeSegmentColorAction(regionIds[j], regionName, highlightColor));
        regionElement.addEventListener("mouseleave", changeSegmentColorAction(regionIds[j], "Select region", segmentColor));
    }
}

function changeSegmentColorAction(regionId, regionName, newColor) {
    var lowerBarStatus = `${regionName} (${regionId})`;
    if (regionName === "Select region") {
        lowerBarStatus = "Select region";
    }

    return () => {
        let button = document.getElementById("lowerBar");
        button.innerHTML = lowerBarStatus;

        let graphPaths = document.getElementById(regionId).getElementsByTagNameNS(nameSpace, "path");
        for (path in graphPaths) {
            let thisPath = graphPaths[path];
            if (thisPath.tagName === "path") {
                thisPath.style.fill = newColor;
            }
        }
        document.getElementById(regionId).style.fill = newColor;
    };
}
