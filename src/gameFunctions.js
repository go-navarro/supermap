var currentRegion;
var totCorrect = 0;
var isGame = true;
var shuffledSet;

var gameStatus = document.createElement("button");
gameStatus.id = "gameStatus";

function upperSelectRedirect() {
    var mapSelection = document.getElementById("upperSelect");
    mapSelection.addEventListener('change', () => {
        location.href = `${mapSelection.value}Map.html`;
    });
}

function createStatsBar(totCorrect, shuffledSet) {
    var gameStatus = document.createElement("button");
    gameStatus.id = "gameStatus";
    if (document.getElementById("upperSelect") !== null) {
        document.getElementById("upperSelect").remove();
    }
    gameStatus.innerText = `Score: ${totCorrect} / ${shuffledSet.length}`;
    document.getElementById("upperBar").appendChild(gameStatus);
}

function createMapSelector(mapOptions) {
    if (document.getElementById("gameStatus") !== null) {
        document.getElementById("gameStatus").remove();
    }

    document.getElementById("upperBar").innerText = "";

    var selector = document.createElement("select");
    selector.id = "upperSelect";
    for (j in mapOptions) {
        var option = document.createElement("option");
        option.text = mapOptions[j];
        selector.add(option);
    }
    document.getElementById("upperBar").appendChild(selector);
}

function lowerBarAction(mapOptions, selectedRegions, regionIds) {
    return () => {
        if (isGame) {
            document.getElementById("lowerBar").disabled = true;
            resetAllColors(regionIds)
            totCorrect = 0;

            shuffledSet = shuffle(selectedRegions);

            createStatsBar(totCorrect, shuffledSet);

            numQuestions = shuffledSet.length;
            currentRegion = shuffledSet.pop();
            lowerBar.innerText = `${getRegionName(currentRegion, regionInfo)} (${currentRegion})`;
            isGame = false;
        } else {
            lowerBar.innerText = "Play Game";
            if (document.getElementById("gameStatus") !== null) {
                document.getElementById("gameStatus").remove();
            }
            createMapSelector(mapOptions);
            upperSelectRedirect();
            isGame = true;
        }
    }
}

function regionClickAction(regionId) {
    return () => {
        if (regionId === currentRegion) {

            changeColor(regionId, highlightColor);
            totCorrect += 1;

            document.getElementById("gameStatus").innerText = `Score: ${totCorrect} / ${numQuestions}`;

            if (shuffledSet.length === 0) {
                lowerBar.innerText = "Game finished. Try again?";
                totCorrect = 0;
                document.getElementById("lowerBar").disabled = false;
            } else {
                currentRegion = shuffledSet.pop();
                lowerBar.innerText = `${getRegionName(currentRegion, regionInfo)} (${currentRegion})`;
            }
        }
        gameStatus.innerText = `Score: ${totCorrect} / ${numQuestions}`;
    };
}

function addRegionClickActions(regionArray) {
    for (i in regionArray) {
        let regionId = regionArray[i];

        let regionElement = document.getElementById(regionId);
        regionElement.addEventListener('click', regionClickAction(regionId, shuffledSet));
    }
}

function resetAllColors(regionIds) {
    for (i in regionIds) {
        let regionId = regionIds[i];
        changeColor(regionId, segmentColor);
    }
}

function changeColor(regionId, newColor) {
    let graphPaths = document.getElementById(regionId).getElementsByTagNameNS(nameSpace, "path");
    for (path in graphPaths) {
        let thisPath = graphPaths[path];
        if (thisPath.tagName === "path") {
            thisPath.style.fill = newColor;
        }
    }
    document.getElementById(regionId).style.fill = newColor;
}
