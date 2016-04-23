
var boardWidth = 360;
var boardHeight = 360;
var boardLeft = 0;
var boardTop = 280;

var squareWidth = 360 / 6;
var squareHeight = 360 / 6;

var boardMouseX = 0;
var boardMouseY = 0;

var stateLength = 16;
var nextId = 0;
var score = 0;
var bestMove = 0;

var dropTime = 0;
var gameTime = 0;
var gameStart = 0;

var gameStyle = "";

var colors = ["blue", "green", "red", "purple", "yellow", "pink"];

var turnScore = {
    "blue": 0,
    "green": 0,
    "red": 0,
    "purple": 0,
    "pink": 0,
    multiplier: 1
}

function GameBoard(encounterData) {
    this.encounterData = encounterData;
    this.highlitX = -1;
    this.highlitY = -1;
    this.pieces = [];
    this.grabbedPiece = null;
    this.hoveredPiece = null;
    this.stateCountdown = 0;
    this.state = "playing";
    this.id = "the game board";
    this.backDrop = null;
    this.image = document.getElementById(this.encounterData.board.boardImage);
    this.enemies = [];
    this.characters = [];
    this.targettedEnemy = null;
    this.infusion = {
        "blue": 0,
        "green": 0,
        "red": 0,
        "purple": 0,
        "pink": 0,
        "yellow": 0
    }

    score = 0;
    
    bestMove = 0;
    dropTime = 0;
    gameTime = 0;
    gameStart = Date.now();
    gameStyle = "encounter";
    gameOver = null;

    this.zindex = gameBoardZIndex;
    this.draw = function() {
        graphics.drawImage(this.image, boardLeft, boardTop);
    };

    this.doActions = function() {
        this.highLightSquare();

        if (mouseCameDown) {
            this.targetEnemy();
            this.grabPiece();
        }

        if (mouseCameUp) {
            this.dropPiece();
        }

        this.handleTimer();

        this.handleEndState();

        if (this.stateCountdown > 1) {
            this.stateCountdown--;
        } else if (this.stateCountdown === 1) {
            this.stateCountdown--;
            switch(this.state) {
                case "solving":
                    this.clearPieces();
                    this.state = "clearing";
                    this.stateCountdown = stateLength;
                    break;
                case "clearing":
                    this.repopulateBoard();
                    this.solveBoard();
                    break;
                case "Game Over":
                    this.endGame();
                    break;
            }
        }
    }

    this.handleTimer = function() {
        if (dropTime > 0) {
            dropTime -= loopStart - loopEnd;
            if (dropTime <= 0) {
                this.dropPiece();
            }
        }
    }
    
    this.handleEndState = function() {
        if (this.state !== "Game Over") {
            var badGuyGameOver = true;
            var goodGuyGameOver = true;
            for (var i = 0; i < this.enemies.length; i++) {
                if(this.enemies[i].health > 0) {
                    badGuyGameOver = false;
                }
            }
            for (var i = 0; i < this.characters.length; i++) {
                if (this.characters[i].health > 0) {
                    goodGuyGameOver = false;
                }
            }
            if (goodGuyGameOver) {
                this.result = "FAILURE";
                this.state = "Game Over";
                this.stateCountdown = stateLength;
                this.endGame();
            } else if (badGuyGameOver) {
                this.result = "SUCCESS!";
                this.state = "Game Over";
                this.stateCountDown = stateLength;
                this.endGame();
            }
            
        }
    }

    this.clearPieces = function() {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].matched) {
                graphics.removeObject(this.pieces[i]);
                this.pieces[i] = null;
            }
        }
    }
    
    this.repopulateBoard = function(dontAnimate) {
        for (var i = 0; i < 6; i++) {
            this.repopulateColumn(i, dontAnimate);
        }
    }
    
    this.repopulateColumn = function(index, dontAnimate) {
        var neededPieces = 0;
        for (var i = 5; i > -1; i--) {
            var piece = i * 6 + index;
            if (!this.pieces[piece]) {
                neededPieces++;
            }
        }
        for (var i = 5; i > -1; i--) {
            var piece = i * 6 + index;
            var nextPiece = (i - 1) * 6 + index;
            if (!this.pieces[piece]) {
                var toDrop = 1;
                while (nextPiece > 0 && !this.pieces[nextPiece]) {
                    toDrop++;
                    nextPiece-=6;
                }
                if (nextPiece >= 0 && this.pieces[nextPiece]) {
                    this.pieces[piece] = this.pieces[nextPiece];
                    this.pieces[nextPiece] = null;
                    this.pieces[piece].top += toDrop;
                }
            }
        }
        for (var i = neededPieces - 1; i >= 0; i--) {
            var newPiece = new GamePiece();
            newPiece.top = i;
            newPiece.left = index;
            newPiece.color = colors[Math.floor(Math.random() * colors.length)];
            newPiece.id = nextId.toString();
            if (!dontAnimate) { newPiece.oldPixelTop = 640 - ( (6 + neededPieces - i) * squareHeight); }
            nextId++;
            this.pieces[i * 6 + index] = newPiece;
        }
    }
    
    this.highLightSquare = function() {
        boardMouseX = mouseX;
        boardMouseY = Math.max(mouseY, boardTop);
        if ((boardMouseX % squareWidth) > 10 && ((boardMouseY - boardTop) % squareHeight > 10)) {
            var newX = Math.floor(boardMouseX / squareWidth);
            var newY = Math.floor((boardMouseY - boardTop) / squareHeight);
            if (newX !== this.highlitX || newY !== this.highlitY) {
                if (this.grabbedPiece && this.grabbedPiece.grabbed) {
                    var tempTop = this.grabbedPiece.top;
                    var tempLeft = this.grabbedPiece.left;
                    var tempPiece = this.getPiece(newY, newX);
                    this.grabbedPiece.top = tempPiece.top;
                    this.grabbedPiece.left = tempPiece.left;
                    
                    if (Math.abs(newX - this.highlitX) > 1 || Math.abs(newY - this.highlitY) > 1) {
                        var trickShot = new TrickShotLabel();
                        trickShot.top = tempPiece.getPixelTop();
                        trickShot.left = tempPiece.getPixelLeft();
                        audio.playSound("trickshot_sound");
                        turnScore.multiplier += 0.1;
                    }

                    tempPiece.top = tempTop;
                    tempPiece.left = tempLeft;
                    audio.playSound("piecemove");
                }
            }
            this.highlitX = newX;
            this.highlitY = newY;
            
            if (this.hoveredPiece) { this.hoveredPiece.hovered = false; }
            this.hoveredPiece = this.getPiece(this.highlitY, this.highlitX);
            if (this.hoveredPiece) { this.hoveredPiece.hovered = true; }
        }
    };

    this.getPiece = function(top, left) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] && this.pieces[i].top === top && this.pieces[i].left === left) {
                return this.pieces[i];
            }
        }
    }
    
    this.targetEnemy = function() {
        for (var i = 0; i < this.enemies.length; i++) {
            if (mouseX > this.enemies[i].topLeft && mouseX < this.enemies[i].topLeft + 32) {
                if (mouseY > this.enemies[i].topTop && mouseY < this.enemies[i].topTop + 32) {
                    this.targettedEnemy = this.enemies[i];
                    this.targettedEnemy.targetted = true;
                }
            }
        }
    }

    this.grabPiece = function() {
        if (mouseX > 330 && mouseY < 30) {
            audio.playSound("buttonclick");
            this.endGame();
        } else if (this.state === "playing") {
            if (mouseY >= boardTop) {
                this.grabbedPiece = this.getPiece(this.highlitY, this.highlitX);
                this.grabbedPiece.grabbed = true;
                this.grabbedPiece.zindex = grabbedPieceZIndex;
                this.unsetMatches();
                
                if (gameStyle !== "Zen") {
                    dropTime = 5000;
                }
            }
        }
    };

    this.dropPiece = function() {
        if (this.grabbedPiece && this.grabbedPiece.grabbed) {
            this.ungrabPiece();
            this.solveBoard();
        }
    };
    
    this.ungrabPiece = function() {
        if (this.grabbedPiece && this.grabbedPiece.grabbed) {
            this.grabbedPiece.grabbed = false;
            this.grabbedPiece.zindex = pieceZIndex;
            dropTime = 0;
        }
    }
    
    this.endGame = function() {
        this.state = "Game Over";
        this.ungrabPiece();

        audio.stopSound("battle_music");
        var now = Date.now();
        if ( (now - gameStart) > topZen && gameStyle === "Zen") {
            topZen = now - gameStart;
            if (window.localStorage) { window.localStorage.setItem('TopZen', topZen); }
        }
        if (score > topScore && gameStyle === "Score Blitz") {
            topScore = score;
            if (window.localStorage) { window.localStorage.setItem('TopScore', topScore); }
        }
        if (bestMove > topMove && gameStyle === "Move Champion") {
            topMove = bestMove;
            if (window.localStorage) { window.localStorage.setItem('TopMove', topMove); }
        }
        gameOver = new GameOver();
    };
    
    this.unsetMatches = function() {
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].matched = false;
        }
    }

    this.solveBoard = function() {
        var matched = this.matchPieces();

        if (matched) {
            audio.playSound("scoretally");
            this.state = "solving";
            this.stateCountdown = stateLength;
        } else {
            for (var i = 0; i < colors.length; i++) {
                this.infusion[colors[i]] += turnScore[colors[i]];
            }

            this.resetTurnScore();
            this.state = "playing";
        }
    }

    this.matchPieces = function() {
        var matched = false;
        this.pieces.sort( function(left, right) {
            return ((left.top * 6 + left.left) - (right.top * 6 + right.left) );
        });

        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                var index = i * 6 + j;
                var downMatches = this.findMatchesDown(index);
                var rightMatches = this.findMatchesRight(index);
                if (downMatches) {
                    for (var k = 0; k < downMatches.length; k++) {
                        matched = true;
                        this.pieces[downMatches[k]].matched = true;
                        turnScore[this.pieces[downMatches[0]].color] += 100;
                    }
                    turnScore.multiplier += 0.1 * downMatches.length;
                }
                if (rightMatches) {
                    for (var m = 0; m < rightMatches.length; m++) {
                        matched = true;
                        this.pieces[rightMatches[m]].matched = true;
                        turnScore[this.pieces[rightMatches[0]].color] += 100;
                    }
                    turnScore.multiplier += 0.1 * rightMatches.length;
                }
            }
        }
        return matched;
    }

    this.findMatchesDown = function(index) {
        var ret = [index];
        var colorToSearch = this.pieces[index].color;
        index += 6;
        while (index < this.pieces.length && this.pieces[index].color === colorToSearch) {
            ret.push(index);
            index += 6;
        }
        if (ret.length >= 3) {
            return ret;
        } else {
            return null;
        }
    }
    
    this.findMatchesRight = function(index) {
        var ret = [index];
        var colorToSearch = this.pieces[index].color;
        index += 1;
        while ((index % 6) !== 0 && this.pieces[index].color === colorToSearch) {
            ret.push(index);
            index += 1;
        }
        if (ret.length >= 3) {
            return ret;
        } else {
            return null;
        }
    }
    
    this.startBoard = function() {
        for (var i = 0; i < 36; i++) {
            var newPiece = new GamePiece();
            newPiece.top = Math.floor(i / 6);
            newPiece.left = (i % 6);
            newPiece.color = colors[Math.floor(Math.random() * colors.length)];
            newPiece.id = nextId.toString();
            nextId++;
            this.pieces.push(newPiece);
        }

        while(this.matchPieces()) {
            this.clearPieces();
            this.repopulateBoard(true);
        }

        this.resetTurnScore();
    }
    
    this.resetTurnScore = function() {
        for (var i = 0; i < colors.length; i++) {
            turnScore[colors[i]] = 0;
        }
        turnScore.multiplier = 1;
    }
    
    this.resetTurnScore();

    this.startBoard();
    this.state = "playing";

    this.backDrop = new BackDrop(this.encounterData.board.backDropImage);
    this.backDrop.height = boardTop;
    this.backDrop.width = boardWidth;
    
    for (var i = this.encounterData.enemies.length - 1; i >= 0; i--) {
        var enemyProps = this.encounterData.enemies[i];
        enemyProps.fieldStart = 300;
        enemyProps.index = i;
        enemyProps.type = "enemy";
        var enemy = new Character(enemyProps);
        this.enemies.push(enemy);
    }
    
    for (var i = 0; i < dataStore.characters.length; i++) {
        var characterProps = dataStore.characters[i];
        characterProps.fieldStart = 100;
        characterProps.type = "character";
        var character = new Character(characterProps);
        this.characters.push(character);
    }
    
    audio.playMusic("battle_music");

    this.dropTimer = new DropTimer();

}