var scaleFactor = 1;

function Graphics() {
    this.graphicsObjects = [];

    this.draw = function() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.graphicsObjects.sort(function(left, right) {
            return left.zindex - right.zindex;
        });

        for (var i = 0; i < this.graphicsObjects.length; i++) {
            this.graphicsObjects[i].draw();
        }
    };
    
    this.addObject = function(object) {
        this.graphicsObjects.push(object);
    };
    
    this.removeObject = function(object) {
        for (var i = 0; i < this.graphicsObjects.length; i++) {
            if (this.graphicsObjects[i].id === object.id) {
                this.graphicsObjects.splice(i, 1);
                return;
            }
        }
    }

    this.drawImage = function(image, x, y, width, height) {
        if (!width) { width = image.width; }
        if (!height) { height = image.height; }
        ctx.drawImage(image, x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }
    
    this.drawImageRotated = function(image, rotation, x, y, width, height) {
        if (!width) { width = image.width; }
        if (!height) { height = image.height; }
        
        ctx.translate(x * scaleFactor, y * scaleFactor);
        ctx.rotate(rotation);
        this.drawImage(image, x, y, width, height);
        ctx.rotate(-1 * rotation);
        ctx.translate(-1 * x * scaleFactor, -1 * y * scaleFactor);
    }
    
    this.drawClippedImage = function(image, sx, sy, sw, sh, x, y, width, height) {
        if (!width) { width = sw; }
        if (!height) { height = sw; }
        
        ctx.drawImage(image, sx, sy, sw, sh, x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }
    
    this.drawClippedImageRotated = function(image, rotation, sx, sy, sw, sh, x, y, width, height) {
        if (!width) { width = sw; }
        if (!height) { height = sw; }
        
        ctx.translate(x * scaleFactor, y * scaleFactor);
        ctx.rotate(rotation);
        this.drawClippedImage(image, sx, sy, sw, sh, 0, 0, width, height);
        ctx.rotate(-1 * rotation);
        ctx.translate(-1 * x * scaleFactor, -1 * y * scaleFactor);
    }
    
    this.drawSprite = function(spriteProps, frame, x, y) {
        var image = document.getElementById(spriteProps.sheetName);
        this.drawClippedImage(
            image, 
            (spriteProps.leftIndex * spriteProps.frames) * spriteProps.spriteSize + frame * spriteProps.spriteSize, 
            spriteProps.topIndex * spriteProps.spriteSize, 
            spriteProps.spriteSize,
            spriteProps.spriteSize,
            x, 
            y);
    }
    
    this.drawSpriteRotated = function(spriteProps, frame, rotation, x, y) {
        var image = document.getElementById(spriteProps.sheetName);
        this.drawClippedImageRotated(
            image, 
            rotation,
            (spriteProps.leftIndex * spriteProps.frames) * spriteProps.spriteSize + frame * spriteProps.spriteSize, 
            spriteProps.topIndex * spriteProps.spriteSize, 
            spriteProps.spriteSize,
            spriteProps.spriteSize,
            x, 
            y);
    }
    
    this.drawImageRotated = function(image, rotation, x, y, width, height) {
        if (!width) { width = image.width; }
        if (!height) { height = image.height; }
        ctx.translate(x * scaleFactor, y * scaleFactor);
        ctx.rotate(rotation);
        this.drawImage(image, 0, 0, width, height);
        ctx.rotate(-1 * rotation);
        ctx.translate(-1 * x * scaleFactor, -1 * y * scaleFactor);
    }
    
    this.drawCircle = function(color, x, y, radius) {
        this.setFillStyle(color);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.fill();
    }

    this.setFont = function(fontSize, font) {
        ctx.font = (fontSize * scaleFactor).toString() + "px " + font;
    }

    this.setFillStyle = function(fillStyle) {
        ctx.fillStyle = fillStyle;
    }

    this.setLineWidth = function(lineWidth) {
        ctx.lineWidth = lineWidth * scaleFactor;
    }

    this.setStrokeStyle = function(strokeStyle) {
        ctx.strokeStyle = strokeStyle;
    }

    this.setGlobalAlpha = function(globalAlpha) {
        ctx.globalAlpha = globalAlpha;
    }

    this.fillText = function(text, x, y, maxWidth) {
        if (maxWidth) {
            ctx.fillText(text, x * scaleFactor, y * scaleFactor, maxWidth * scaleFactor);
        } else {
            ctx.fillText(text, x * scaleFactor, y * scaleFactor);
        }
    }

    this.strokeRect = function(x, y, width, height) {
        ctx.strokeRect(x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }

    this.fillRect = function(x, y, width, height) {
        ctx.fillRect(x * scaleFactor, y * scaleFactor, width * scaleFactor, height * scaleFactor);
    }

    this.calculateScaleFactor = function() {
        var windowHeight = window.innerHeight - 50;
        var myScaleFactor = windowHeight / canvas.height;
        if (myScaleFactor > 1.5) {
            scaleFactor = myScaleFactor;
            canvas.height = canvas.height * scaleFactor;
            canvas.width = canvas.width * scaleFactor;
        }
    }

    if (scaleFactor === 1) { this.calculateScaleFactor(); }
}