/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Input Handler is bound to a specific Sprite and is responsible for managing all Input events on that Sprite.
*
* @class Phaser.InputHandler
* @constructor
* @param {Phaser.Sprite} sprite - The Sprite object to which this Input Handler belongs.
*/
Phaser.InputHandler = function (sprite) {

    /**
    * @property {Phaser.Sprite} sprite - The Sprite object to which this Input Handler belongs.
    */
    this.sprite = sprite;

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = sprite.game;

    /**
    * @property {boolean} enabled - If enabled the Input Handler will process input requests and monitor pointer activity.
    * @default
    */
    this.enabled = false;

    /**
    * @property {boolean} checked - A disposable flag used by the Pointer class when performing priority checks.
    * @protected
    */
    this.checked = false;

    /**
    * The priorityID is used to determine which game objects should get priority when input events occur. For example if you have
    * several Sprites that overlap, by default the one at the top of the display list is given priority for input events. You can
    * stop this from happening by controlling the priorityID value. The higher the value, the more important they are considered to the Input events.
    * @property {number} priorityID
    * @default
    */
    this.priorityID = 0;

    /**
    * @property {boolean} useHandCursor - On a desktop browser you can set the 'hand' cursor to appear when moving over the Sprite.
    * @default
    */
    this.useHandCursor = false;

    /**
    * @property {boolean} _setHandCursor - Did this Sprite trigger the hand cursor?
    * @private
    */
    this._setHandCursor = false;

    /**
    * @property {boolean} isDragged - true if the Sprite is being currently dragged.
    * @default
    */
    this.isDragged = false;

    /**
    * @property {boolean} allowHorizontalDrag - Controls if the Sprite is allowed to be dragged horizontally.
    * @default
    */
    this.allowHorizontalDrag = true;

    /**
    * @property {boolean} allowVerticalDrag - Controls if the Sprite is allowed to be dragged vertically.
    * @default
    */
    this.allowVerticalDrag = true;

    /**
    * @property {boolean} bringToTop - If true when this Sprite is clicked or dragged it will automatically be bought to the top of the Group it is within.
    * @default
    */
    this.bringToTop = false;

    /**
    * @property {Phaser.Point} snapOffset - A Point object that contains by how far the Sprite snap is offset.
    * @default
    */
    this.snapOffset = null;

    /**
    * @property {boolean} snapOnDrag - When the Sprite is dragged this controls if the center of the Sprite will snap to the pointer on drag or not.
    * @default
    */
    this.snapOnDrag = false;

    /**
    * @property {boolean} snapOnRelease - When the Sprite is dragged this controls if the Sprite will be snapped on release.
    * @default
    */
    this.snapOnRelease = false;

    /**
    * @property {number} snapX - When a Sprite has snapping enabled this holds the width of the snap grid.
    * @default
    */
    this.snapX = 0;

    /**
    * @property {number} snapY - When a Sprite has snapping enabled this holds the height of the snap grid.
    * @default
    */
    this.snapY = 0;

    /**
    * @property {number} snapOffsetX - This defines the top-left X coordinate of the snap grid.
    * @default
    */
    this.snapOffsetX = 0;

    /**
    * @property {number} snapOffsetY - This defines the top-left Y coordinate of the snap grid..
    * @default
    */
    this.snapOffsetY = 0;

    /**
    * Set to true to use pixel perfect hit detection when checking if the pointer is over this Sprite.
    * The x/y coordinates of the pointer are tested against the image in combination with the InputHandler.pixelPerfectAlpha value.
    * This feature only works for display objects with image based textures such as Sprites. It won't work on BitmapText or Rope.
    * Warning: This is expensive, especially on mobile (where it's not even needed!) so only enable if required. Also see the less-expensive InputHandler.pixelPerfectClick.
    * @property {boolean} pixelPerfectOver - Use a pixel perfect check when testing for pointer over.
    * @default
    */
    this.pixelPerfectOver = false;

    /**
    * Set to true to use pixel perfect hit detection when checking if the pointer is over this Sprite when it's clicked or touched.
    * The x/y coordinates of the pointer are tested against the image in combination with the InputHandler.pixelPerfectAlpha value.
    * This feature only works for display objects with image based textures such as Sprites. It won't work on BitmapText or Rope.
    * Warning: This is expensive so only enable if you really need it.
    * @property {boolean} pixelPerfectClick - Use a pixel perfect check when testing for clicks or touches on the Sprite.
    * @default
    */
    this.pixelPerfectClick = false;

    /**
    * @property {number} pixelPerfectAlpha - The alpha tolerance threshold. If the alpha value of the pixel matches or is above this value, it's considered a hit.
    * @default
    */
    this.pixelPerfectAlpha = 255;

    /**
    * @property {boolean} draggable - Is this sprite allowed to be dragged by the mouse? true = yes, false = no
    * @default
    */
    this.draggable = false;

    /**
    * @property {Phaser.Rectangle} boundsRect - A region of the game world within which the sprite is restricted during drag.
    * @default
    */
    this.boundsRect = null;

    /**
    * @property {Phaser.Sprite} boundsSprite - A Sprite the bounds of which this sprite is restricted during drag.
    * @default
    */
    this.boundsSprite = null;

    /**
    * @property {boolean} scaleLayer - EXPERIMENTAL: Please do not use this property unless you know what it does. Likely to change in the future.
    */
    this.scaleLayer = false;

    /**
    * @property {Phaser.Point} dragOffset - The offset from the Sprites position that dragging takes place from.
    */
    this.dragOffset = new Phaser.Point();

    /**
    * @property {boolean} dragFromCenter - Is the Sprite dragged from its center, or the point at which the Pointer was pressed down upon it?
    */
    this.dragFromCenter = false;

    /**
    * @property {boolean} dragStopBlocksInputUp - If enabled, when the Sprite stops being dragged, it will only dispatch the `onDragStop` event, and not the `onInputUp` event. If set to `false` it will dispatch both events.
    */
    this.dragStopBlocksInputUp = false;

    /**
    * @property {Phaser.Point} dragStartPoint - The Point from which the most recent drag started from. Useful if you need to return an object to its starting position.
    */
    this.dragStartPoint = new Phaser.Point();

    /**
    * @property {integer} dragDistanceThreshold - The distance, in pixels, the pointer has to move while being held down, before the Sprite thinks it is being dragged.
    */
    this.dragDistanceThreshold = 0;

    /**
    * @property {integer} dragTimeThreshold - The amount of time, in ms, the pointer has to be held down over the Sprite before it thinks it is being dragged.
    */
    this.dragTimeThreshold = 0;

    /**
    * @property {Phaser.Point} downPoint - A Point object containing the coordinates of the Pointer when it was first pressed down onto this Sprite.
    */
    this.downPoint = new Phaser.Point();

    /**
    * @property {Phaser.Point} snapPoint - If the sprite is set to snap while dragging this holds the point of the most recent 'snap' event.
    */
    this.snapPoint = new Phaser.Point();

    /**
    * @property {Phaser.Point} _dragPoint - Internal cache var.
    * @private
    */
    this._dragPoint = new Phaser.Point();

    /**
    * @property {boolean} _dragPhase - Internal cache var.
    * @private
    */
    this._dragPhase = false;

    /**
    * @property {boolean} _pendingDrag - Internal cache var.
    * @private
    */
    this._pendingDrag = false;

    /**
    * @property {boolean} _dragTimePass - Internal cache var.
    * @private
    */
    this._dragTimePass = false;

    /**
    * @property {boolean} _dragDistancePass - Internal cache var.
    * @private
    */
    this._dragDistancePass = false;

    /**
    * @property {boolean} _wasEnabled - Internal cache var.
    * @private
    */
    this._wasEnabled = false;

    /**
    * @property {Phaser.Point} _tempPoint - Internal cache var.
    * @private
    */
    this._tempPoint = new Phaser.Point();

    /**
    * @property {array} _pointerData - Internal cache var.
    * @private
    */
    this._pointerData = [];

    this._pointerData.push({
        id: 0,
        x: 0,
        y: 0,
        camX: 0,
        camY: 0,
        isDown: false,
        isUp: false,
        isOver: false,
        isOut: false,
        timeOver: 0,
        timeOut: 0,
        timeDown: 0,
        timeUp: 0,
        downDuration: 0,
        isDragged: false
    });

};

Phaser.InputHandler.prototype = {

    /**
    * Starts the Input Handler running. This is called automatically when you enable input on a Sprite, or can be called directly if you need to set a specific priority.
    *
    * @method Phaser.InputHandler#start
    * @param {number} [priority=0] - Higher priority sprites take click priority over low-priority sprites when they are stacked on-top of each other.
    * @param {boolean} [useHandCursor=false] - If true the Sprite will show the hand cursor on mouse-over (doesn't apply to mobile browsers)
    * @return {Phaser.Sprite} The Sprite object to which the Input Handler is bound.
    */
    start: function (priority, useHandCursor) {

        priority = priority || 0;
        if (useHandCursor === undefined) { useHandCursor = false; }

        //  Turning on
        if (this.enabled === false)
        {
            //  Register, etc
            this.game.input.interactiveItems.add(this);
            this.useHandCursor = useHandCursor;
            this.priorityID = priority;

            for (var i = 0; i < 10; i++)
            {
                this._pointerData[i] = {
                    id: i,
                    x: 0,
                    y: 0,
                    isDown: false,
                    isUp: false,
                    isOver: false,
                    isOut: false,
                    timeOver: 0,
                    timeOut: 0,
                    timeDown: 0,
                    timeUp: 0,
                    downDuration: 0,
                    isDragged: false
                };
            }

            this.snapOffset = new Phaser.Point();
            this.enabled = true;
            this._wasEnabled = true;

        }

        this.sprite.events.onAddedToGroup.add(this.addedToGroup, this);
        this.sprite.events.onRemovedFromGroup.add(this.removedFromGroup, this);

        return this.sprite;

    },

    /**
    * Handles when the parent Sprite is added to a new Group.
    *
    * @method Phaser.InputHandler#addedToGroup
    * @private
    */
    addedToGroup: function () {

        if (this._dragPhase)
        {
            return;
        }

        if (this._wasEnabled && !this.enabled)
        {
            this.start();
        }

    },

    /**
    * Handles when the parent Sprite is removed from a Group.
    *
    * @method Phaser.InputHandler#removedFromGroup
    * @private
    */
    removedFromGroup: function () {

        if (this._dragPhase)
        {
            return;
        }

        if (this.enabled)
        {
            this._wasEnabled = true;
            this.stop();
        }
        else
        {
            this._wasEnabled = false;
        }

    },

    /**
    * Resets the Input Handler and disables it.
    * @method Phaser.InputHandler#reset
    */
    reset: function () {

        this.enabled = false;

        for (var i = 0; i < 10; i++)
        {
            this._pointerData[i] = {
                id: i,
                x: 0,
                y: 0,
                isDown: false,
                isUp: false,
                isOver: false,
                isOut: false,
                timeOver: 0,
                timeOut: 0,
                timeDown: 0,
                timeUp: 0,
                downDuration: 0,
                isDragged: false
            };
        }
    },

    /**
    * Stops the Input Handler from running.
    * @method Phaser.InputHandler#stop
    */
    stop: function () {

        //  Turning off
        if (this.enabled === false)
        {
            return;
        }
        else
        {
            //  De-register, etc
            this.enabled = false;
            this.game.input.interactiveItems.remove(this);
        }

    },

    /**
    * Clean up memory.
    * @method Phaser.InputHandler#destroy
    */
    destroy: function () {

        if (this.sprite)
        {
            if (this._setHandCursor)
            {
                this.game.canvas.style.cursor = "default";
                this._setHandCursor = false;
            }

            this.enabled = false;

            this.game.input.interactiveItems.remove(this);

            this._pointerData.length = 0;
            this.boundsRect = null;
            this.boundsSprite = null;
            this.sprite = null;
        }

    },

    /**
    * Checks if the object this InputHandler is bound to is valid for consideration in the Pointer move event.
    * This is called by Phaser.Pointer and shouldn't typically be called directly.
    *
    * @method Phaser.InputHandler#validForInput
    * @protected
    * @param {number} highestID - The highest ID currently processed by the Pointer.
    * @param {number} highestRenderID - The highest Render Order ID currently processed by the Pointer.
    * @param {boolean} [includePixelPerfect=true] - If this object has `pixelPerfectClick` or `pixelPerfectOver` set should it be considered as valid?
    * @return {boolean} True if the object this InputHandler is bound to should be considered as valid for input detection.
    */
    validForInput: function (highestID, highestRenderID, includePixelPerfect) {

        if (includePixelPerfect === undefined) { includePixelPerfect = true; }

        if (!this.enabled ||
            this.sprite.scale.x === 0 ||
            this.sprite.scale.y === 0 ||
            this.priorityID < this.game.input.minPriorityID ||
            (this.sprite.parent && this.sprite.parent.ignoreChildInput))
        {
            return false;
        }

        //   If we're trying to specifically IGNORE pixel perfect objects, then set includePixelPerfect to false and skip it
        if (!includePixelPerfect && (this.pixelPerfectClick || this.pixelPerfectOver))
        {
            return false;
        }

        if (this.priorityID > highestID || (this.priorityID === highestID && this.sprite.renderOrderID > highestRenderID))
        {
            return true;
        }

        return false;

    },

    /**
    * Is this object using pixel perfect checking?
    *
    * @method Phaser.InputHandler#isPixelPerfect
    * @return {boolean} True if the this InputHandler has either `pixelPerfectClick` or `pixelPerfectOver` set to `true`.
    */
    isPixelPerfect: function () {

        return (this.pixelPerfectClick || this.pixelPerfectOver);

    },

    /**
    * The x coordinate of the Input pointer, relative to the top-left of the parent Sprite.
    * This value is only set when the pointer is over this Sprite.
    *
    * @method Phaser.InputHandler#pointerX
    * @param {integer} [pointerId=0]
    * @return {number} The x coordinate of the Input pointer.
    */
    pointerX: function (pointerId) {

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].x;

    },

    /**
    * The y coordinate of the Input pointer, relative to the top-left of the parent Sprite
    * This value is only set when the pointer is over this Sprite.
    *
    * @method Phaser.InputHandler#pointerY
    * @param {integer} [pointerId=0]
    * @return {number} The y coordinate of the Input pointer.
    */
    pointerY: function (pointerId) {

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].y;

    },

    /**
    * If the Pointer is down this returns true.
    * This *only* checks if the Pointer is down, not if it's down over any specific Sprite.
    *
    * @method Phaser.InputHandler#pointerDown
    * @param {integer} [pointerId=0]
    * @return {boolean} - True if the given pointer is down, otherwise false.
    */
    pointerDown: function (pointerId) {

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].isDown;

    },

    /**
    * If the Pointer is up this returns true.
    * This *only* checks if the Pointer is up, not if it's up over any specific Sprite.
    *
    * @method Phaser.InputHandler#pointerUp
    * @param {integer} [pointerId=0]
    * @return {boolean} - True if the given pointer is up, otherwise false.
    */
    pointerUp: function (pointerId) {

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].isUp;

    },

    /**
    * A timestamp representing when the Pointer first touched the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeDown
    * @param {integer} [pointerId=(check all)]
    * @return {number}
    */
    pointerTimeDown: function (pointerId) {

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeDown;

    },

    /**
    * A timestamp representing when the Pointer left the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeUp
    * @param {integer} [pointerId=0]
    * @return {number}
    */
    pointerTimeUp: function (pointerId) {

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeUp;

    },

    /**
    * Is the Pointer over this Sprite?
    *
    * @method Phaser.InputHandler#pointerOver
    * @param {integer} [pointerId=(check all)] The ID number of a Pointer to check. If you don't provide a number it will check all Pointers.
    * @return {boolean} - True if the given pointer (if a index was given, or any pointer if not) is over this object.
    */
    pointerOver: function (pointerId) {

        if (!this.enabled)
        {
            return false;
        }

        if (pointerId === undefined)
        {
            for (var i = 0; i < 10; i++)
            {
                if (this._pointerData[i].isOver)
                {
                    return true;
                }
            }

            return false;
        }
        else
        {
            return this._pointerData[pointerId].isOver;
        }

    },

    /**
    * Is the Pointer outside of this Sprite?
    *
    * @method Phaser.InputHandler#pointerOut
    * @param {integer} [pointerId=(check all)] The ID number of a Pointer to check. If you don't provide a number it will check all Pointers.
    * @return {boolean} True if the given pointer (if a index was given, or any pointer if not) is out of this object.
    */
    pointerOut: function (pointerId) {

        if (!this.enabled)
        {
            return false;
        }

        if (pointerId === undefined)
        {
            for (var i = 0; i < 10; i++)
            {
                if (this._pointerData[i].isOut)
                {
                    return true;
                }
            }
        }
        else
        {
            return this._pointerData[pointerId].isOut;
        }

    },

    /**
    * A timestamp representing when the Pointer first touched the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeOver
    * @param {integer} [pointerId=0]
    * @return {number}
    */
    pointerTimeOver: function (pointerId) {

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeOver;

    },

    /**
    * A timestamp representing when the Pointer left the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeOut
    * @param {integer} [pointerId=0]
    * @return {number}
    */
    pointerTimeOut: function (pointerId) {

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeOut;

    },

    /**
    * Is this sprite being dragged by the mouse or not?
    *
    * @method Phaser.InputHandler#pointerDragged
    * @param {integer} [pointerId=0]
    * @return {boolean} True if the pointer is dragging an object, otherwise false.
    */
    pointerDragged: function (pointerId) {

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].isDragged;

    },

    /**
    * Checks if the given pointer is both down and over the Sprite this InputHandler belongs to.
    * Use the `fastTest` flag is to quickly check just the bounding hit area even if `InputHandler.pixelPerfectOver` is `true`.
    *
    * @method Phaser.InputHandler#checkPointerDown
    * @param {Phaser.Pointer} pointer
    * @param {boolean} [fastTest=false] - Force a simple hit area check even if `pixelPerfectOver` is true for this object?
    * @return {boolean} True if the pointer is down, otherwise false.
    */
    checkPointerDown: function (pointer, fastTest) {

        if (!pointer.isDown ||
            !this.enabled ||
            !this.sprite ||
            !this.sprite.parent ||
            !this.sprite.visible ||
            !this.sprite.parent.visible ||
            this.sprite.worldScale.x === 0 ||
            this.sprite.worldScale.y === 0)
        {
            return false;
        }

        //  Need to pass it a temp point, in case we need it again for the pixel check
        if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint))
        {
            if (fastTest === undefined)
            {
                fastTest = false;
            }

            if (!fastTest && this.pixelPerfectClick)
            {
                return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
            }
            else
            {
                return true;
            }
        }

        return false;

    },

    /**
    * Checks if the given pointer is over the Sprite this InputHandler belongs to.
    * Use the `fastTest` flag is to quickly check just the bounding hit area even if `InputHandler.pixelPerfectOver` is `true`.
    *
    * @method Phaser.InputHandler#checkPointerOver
    * @param {Phaser.Pointer} pointer
    * @param {boolean} [fastTest=false] - Force a simple hit area check even if `pixelPerfectOver` is true for this object?
    * @return {boolean}
    */
    checkPointerOver: function (pointer, fastTest) {

        if (!this.enabled ||
            !this.sprite ||
            !this.sprite.parent ||
            !this.sprite.visible ||
            !this.sprite.parent.visible ||
            this.sprite.worldScale.x === 0 ||
            this.sprite.worldScale.y === 0)
        {
            return false;
        }

        //  Need to pass it a temp point, in case we need it again for the pixel check
        if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint))
        {
            if (fastTest === undefined)
            {
                fastTest = false;
            }

            if (!fastTest && this.pixelPerfectOver)
            {
                return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
            }
            else
            {
                return true;
            }
        }

        return false;

    },

    /**
    * Runs a pixel perfect check against the given x/y coordinates of the Sprite this InputHandler is bound to.
    * It compares the alpha value of the pixel and if >= InputHandler.pixelPerfectAlpha it returns true.
    *
    * @method Phaser.InputHandler#checkPixel
    * @param {number} x - The x coordinate to check.
    * @param {number} y - The y coordinate to check.
    * @param {Phaser.Pointer} [pointer] - The pointer to get the x/y coordinate from if not passed as the first two parameters.
    * @return {boolean} true if there is the alpha of the pixel is >= InputHandler.pixelPerfectAlpha
    */
    checkPixel: function (x, y, pointer) {

        //  Grab a pixel from our image into the hitCanvas and then test it
        if (this.sprite.texture.baseTexture.source)
        {
            if (x === null && y === null)
            {
                //  Use the pointer parameter
                this.game.input.getLocalPosition(this.sprite, pointer, this._tempPoint);

                var x = this._tempPoint.x;
                var y = this._tempPoint.y;
            }

            if (this.sprite.anchor.x !== 0)
            {
                x -= -this.sprite.texture.frame.width * this.sprite.anchor.x;
            }

            if (this.sprite.anchor.y !== 0)
            {
                y -= -this.sprite.texture.frame.height * this.sprite.anchor.y;
            }

            x += this.sprite.texture.frame.x;
            y += this.sprite.texture.frame.y;

            if (this.sprite.texture.trim)
            {
                x -= this.sprite.texture.trim.x;
                y -= this.sprite.texture.trim.y;

                //  If the coordinates are outside the trim area we return false immediately, to save doing a draw call
                if (x < this.sprite.texture.crop.x || x > this.sprite.texture.crop.right || y < this.sprite.texture.crop.y || y > this.sprite.texture.crop.bottom)
                {
                    this._dx = x;
                    this._dy = y;
                    return false;
                }
            }

            this._dx = x;
            this._dy = y;

            this.game.input.hitContext.clearRect(0, 0, 1, 1);
            this.game.input.hitContext.drawImage(this.sprite.texture.baseTexture.source, x, y, 1, 1, 0, 0, 1, 1);

            var rgb = this.game.input.hitContext.getImageData(0, 0, 1, 1);

            if (rgb.data[3] >= this.pixelPerfectAlpha)
            {
                return true;
            }
        }

        return false;

    },

    /**
    * Internal Update method. This is called automatically and handles the Pointer
    * and drag update loops.
    *
    * @method Phaser.InputHandler#update
    * @protected
    * @param {Phaser.Pointer} pointer
    * @return {boolean} True if the pointer is still active, otherwise false.
    */
    update: function (pointer) {

        if (this.sprite === null || this.sprite.parent === undefined)
        {
            //  Abort. We've been destroyed.
            return;
        }

        if (!this.enabled || !this.sprite.visible || !this.sprite.parent.visible)
        {
            this._pointerOutHandler(pointer);
            return false;
        }

        if (this._pendingDrag)
        {
            if (!this._dragDistancePass)
            {
                this._dragDistancePass = (Phaser.Math.distance(pointer.x, pointer.y, this.downPoint.x, this.downPoint.y) >= this.dragDistanceThreshold);
            }

            if (this._dragDistancePass && this._dragTimePass)
            {
                this.startDrag(pointer);
            }

            return true;
        }
        else if (this.draggable && this._draggedPointerID === pointer.id)
        {
            return this.updateDrag(pointer, false);
        }
        else if (this._pointerData[pointer.id].isOver)
        {
            if (this.checkPointerOver(pointer))
            {
                this._pointerData[pointer.id].x = pointer.x - this.sprite.x;
                this._pointerData[pointer.id].y = pointer.y - this.sprite.y;
                return true;
            }
            else
            {
                this._pointerOutHandler(pointer);
                return false;
            }
        }
    },

    /**
    * Internal method handling the pointer over event.
    *
    * @method Phaser.InputHandler#_pointerOverHandler
    * @private
    * @param {Phaser.Pointer} pointer - The pointer that triggered the event
    * @param {boolean} [silent=false] - If silent is `true` then this method will not dispatch any Signals from the parent Sprite.
    */
    _pointerOverHandler: function (pointer, silent) {

        if (this.sprite === null)
        {
            //  Abort. We've been destroyed.
            return;
        }

        var data = this._pointerData[pointer.id];

        if (data.isOver === false || pointer.dirty)
        {
            var sendEvent = (data.isOver === false);

            data.isOver = true;
            data.isOut = false;
            data.timeOver = this.game.time.time;
            data.x = pointer.x - this.sprite.x;
            data.y = pointer.y - this.sprite.y;

            if (this.useHandCursor && data.isDragged === false)
            {
                this.game.canvas.style.cursor = "pointer";
                this._setHandCursor = true;
            }

            if (!silent && sendEvent && this.sprite && this.sprite.events)
            {
                this.sprite.events.onInputOver$dispatch(this.sprite, pointer);
            }

            if (this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
            {
                this.sprite.parent.onChildInputOver.dispatch(this.sprite, pointer);
            }
        }

    },

    /**
    * Internal method handling the pointer out event.
    *
    * @method Phaser.InputHandler#_pointerOutHandler
    * @private
    * @param {Phaser.Pointer} pointer - The pointer that triggered the event.
    * @param {boolean} [silent=false] - If silent is `true` then this method will not dispatch any Signals from the parent Sprite.
    */
    _pointerOutHandler: function (pointer, silent) {

        if (this.sprite === null)
        {
            //  Abort. We've been destroyed.
            return;
        }

        var data = this._pointerData[pointer.id];

        data.isOver = false;
        data.isOut = true;
        data.timeOut = this.game.time.time;

        if (this.useHandCursor && data.isDragged === false)
        {
            this.game.canvas.style.cursor = "default";
            this._setHandCursor = false;
        }

        if (!silent && this.sprite && this.sprite.events)
        {
            this.sprite.events.onInputOut$dispatch(this.sprite, pointer);

            if (this.sprite && this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
            {
                this.sprite.parent.onChildInputOut.dispatch(this.sprite, pointer);
            }
        }

    },

    /**
    * Internal method handling the touched / clicked event.
    *
    * @method Phaser.InputHandler#_touchedHandler
    * @private
    * @param {Phaser.Pointer} pointer - The pointer that triggered the event.
    */
    _touchedHandler: function (pointer) {

        if (this.sprite === null)
        {
            //  Abort. We've been destroyed.
            return;
        }

        var data = this._pointerData[pointer.id];

        if (!data.isDown && data.isOver)
        {
            if (this.pixelPerfectClick && !this.checkPixel(null, null, pointer))
            {
                return;
            }

            data.isDown = true;
            data.isUp = false;
            data.timeDown = this.game.time.time;

            this.downPoint.set(pointer.x, pointer.y);

            //  It's possible the onInputDown event creates a new Sprite that is on-top of this one, so we ought to force a Pointer update
            pointer.dirty = true;

            if (this.sprite && this.sprite.events)
            {
                this.sprite.events.onInputDown$dispatch(this.sprite, pointer);

                //  The event above might have destroyed this sprite.
                if (this.sprite && this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
                {
                    this.sprite.parent.onChildInputDown.dispatch(this.sprite, pointer);
                }

                //  The events might have destroyed this sprite.
                if (this.sprite === null)
                {
                    return;
                }
            }

            //  Start drag
            if (this.draggable && this.isDragged === false)
            {
                if (this.dragTimeThreshold === 0 && this.dragDistanceThreshold === 0)
                {
                    this.startDrag(pointer);
                }
                else
                {
                    this._pendingDrag = true;

                    this._dragDistancePass = (this.dragDistanceThreshold === 0);

                    if (this.dragTimeThreshold > 0)
                    {
                        this._dragTimePass = false;
                        this.game.time.events.add(this.dragTimeThreshold, this.dragTimeElapsed, this, pointer);
                    }
                    else
                    {
                        this._dragTimePass = true;
                    }
                }
            }

            if (this.bringToTop)
            {
                this.sprite.bringToTop();
            }
        }

    },

    /**
    * Internal method handling the drag threshold timer.
    *
    * @method Phaser.InputHandler#dragTimeElapsed
    * @private
    * @param {Phaser.Pointer} pointer
    */
    dragTimeElapsed: function (pointer) {

        this._dragTimePass = true;

        if (this._pendingDrag && this.sprite)
        {
            if (this._dragDistancePass)
            {
                this.startDrag(pointer);
            }
        }

    },

    /**
    * Internal method handling the pointer released event.
    * @method Phaser.InputHandler#_releasedHandler
    * @private
    * @param {Phaser.Pointer} pointer
    */
    _releasedHandler: function (pointer) {

        if (this.sprite === null)
        {
            //  Abort. We've been destroyed.
            return;
        }

        var data = this._pointerData[pointer.id];

        //  If was previously touched by this Pointer, check if still is AND still over this item
        if (data.isDown && pointer.isUp)
        {
            data.isDown = false;
            data.isUp = true;
            data.timeUp = this.game.time.time;
            data.downDuration = data.timeUp - data.timeDown;

            //  Only release the InputUp signal if the pointer is still over this sprite
            var isOver = this.checkPointerOver(pointer);

            if (this.sprite && this.sprite.events)
            {
                if (!this.dragStopBlocksInputUp ||
                    this.dragStopBlocksInputUp && !(this.draggable && this.isDragged && this._draggedPointerID === pointer.id))
                {
                    this.sprite.events.onInputUp$dispatch(this.sprite, pointer, isOver);
                }

                if (this.sprite && this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
                {
                    this.sprite.parent.onChildInputUp.dispatch(this.sprite, pointer, isOver);
                }

                //  The onInputUp event may have changed the sprite so that checkPointerOver is no longer true, so update it.
                if (isOver)
                {
                    isOver = this.checkPointerOver(pointer);
                }
            }

            data.isOver = isOver;

            if (!isOver && this.useHandCursor)
            {
                this.game.canvas.style.cursor = "default";
                this._setHandCursor = false;
            }

            //  It's possible the onInputUp event created a new Sprite that is on-top of this one, so force a Pointer update
            pointer.dirty = true;

            this._pendingDrag = false;

            //  Stop drag
            if (this.draggable && this.isDragged && this._draggedPointerID === pointer.id)
            {
                this.stopDrag(pointer);
            }
        }

    },

    /**
    * Called as a Pointer actively drags this Game Object.
    *
    * @method Phaser.InputHandler#updateDrag
    * @private
    * @param {Phaser.Pointer} pointer - The Pointer causing the drag update.
    * @param {boolean} fromStart - True if this is the first update, immediately after the drag has started.
    * @return {boolean}
    */
    updateDrag: function (pointer, fromStart) {

        if (fromStart === undefined) { fromStart = false; }

        if (pointer.isUp)
        {
            this.stopDrag(pointer);
            return false;
        }

        var px = this.globalToLocalX(pointer.x) + this._dragPoint.x + this.dragOffset.x;
        var py = this.globalToLocalY(pointer.y) + this._dragPoint.y + this.dragOffset.y;

        if (this.sprite.fixedToCamera)
        {
            if (this.allowHorizontalDrag)
            {
                this.sprite.cameraOffset.x = px;
            }

            if (this.allowVerticalDrag)
            {
                this.sprite.cameraOffset.y = py;
            }

            if (this.boundsRect)
            {
                this.checkBoundsRect();
            }

            if (this.boundsSprite)
            {
                this.checkBoundsSprite();
            }

            if (this.snapOnDrag)
            {
                this.sprite.cameraOffset.x = Math.round((this.sprite.cameraOffset.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.cameraOffset.y = Math.round((this.sprite.cameraOffset.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
                this.snapPoint.set(this.sprite.cameraOffset.x, this.sprite.cameraOffset.y);
            }
        }
        else
        {
            var cx = this.game.camera.x - this._pointerData[pointer.id].camX;
            var cy = this.game.camera.y - this._pointerData[pointer.id].camY;

            if (this.allowHorizontalDrag)
            {
                this.sprite.x = px + cx;
            }

            if (this.allowVerticalDrag)
            {
                this.sprite.y = py + cy;
            }

            if (this.boundsRect)
            {
                this.checkBoundsRect();
            }

            if (this.boundsSprite)
            {
                this.checkBoundsSprite();
            }

            if (this.snapOnDrag)
            {
                this.sprite.x = Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.y = Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
                this.snapPoint.set(this.sprite.x, this.sprite.y);
            }
        }

        this.sprite.events.onDragUpdate.dispatch(this.sprite, pointer, px, py, this.snapPoint, fromStart);

        return true;

    },

    /**
    * Returns true if the pointer has entered the Sprite within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justOver
    * @param {integer} [pointerId=0]
    * @param {number} delay - The time below which the pointer is considered as just over.
    * @return {boolean}
    */
    justOver: function (pointerId, delay) {

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isOver && this.overDuration(pointerId) < delay);

    },

    /**
    * Returns true if the pointer has left the Sprite within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justOut
    * @param {integer} [pointerId=0]
    * @param {number} delay - The time below which the pointer is considered as just out.
    * @return {boolean}
    */
    justOut: function (pointerId, delay) {

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isOut && (this.game.time.time - this._pointerData[pointerId].timeOut < delay));

    },

    /**
    * Returns true if the pointer has touched or clicked on the Sprite within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justPressed
    * @param {integer} [pointerId=0]
    * @param {number} delay - The time below which the pointer is considered as just over.
    * @return {boolean}
    */
    justPressed: function (pointerId, delay) {

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isDown && this.downDuration(pointerId) < delay);

    },

    /**
    * Returns true if the pointer was touching this Sprite, but has been released within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justReleased
    * @param {integer} [pointerId=0]
    * @param {number} delay - The time below which the pointer is considered as just out.
    * @return {boolean}
    */
    justReleased: function (pointerId, delay) {

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isUp && (this.game.time.time - this._pointerData[pointerId].timeUp < delay));

    },

    /**
    * If the pointer is currently over this Sprite this returns how long it has been there for in milliseconds.
    *
    * @method Phaser.InputHandler#overDuration
    * @param {integer} [pointerId=0]
    * @return {number} The number of milliseconds the pointer has been over the Sprite, or -1 if not over.
    */
    overDuration: function (pointerId) {

        pointerId = pointerId || 0;

        if (this._pointerData[pointerId].isOver)
        {
            return this.game.time.time - this._pointerData[pointerId].timeOver;
        }

        return -1;

    },

    /**
    * If the pointer is currently over this Sprite this returns how long it has been there for in milliseconds.
    *
    * @method Phaser.InputHandler#downDuration
    * @param {integer} [pointerId=0]
    * @return {number} The number of milliseconds the pointer has been pressed down on the Sprite, or -1 if not over.
    */
    downDuration: function (pointerId) {

        pointerId = pointerId || 0;

        if (this._pointerData[pointerId].isDown)
        {
            return this.game.time.time - this._pointerData[pointerId].timeDown;
        }

        return -1;

    },

    /**
    * Allow this Sprite to be dragged by any valid pointer.
    *
    * When the drag begins the Sprite.events.onDragStart event will be dispatched.
    *
    * When the drag completes by way of the user letting go of the pointer that was dragging the sprite, the Sprite.events.onDragStop event is dispatched.
    *
    * You can control the thresholds over when a drag starts via the properties:
    *
    * `Pointer.dragDistanceThreshold` the distance, in pixels, that the pointer has to move
    * before the drag will start.
    *
    * `Pointer.dragTimeThreshold` the time, in ms, that the pointer must be held down on
    * the Sprite before the drag will start.
    *
    * You can set either (or both) of these properties after enabling a Sprite for drag.
    *
    * For the duration of the drag the Sprite.events.onDragUpdate event is dispatched. This event is only dispatched when the pointer actually
    * changes position and moves. The event sends 5 parameters: `sprite`, `pointer`, `dragX`, `dragY` and `snapPoint`.
    *
    * @method Phaser.InputHandler#enableDrag
    * @param {boolean} [lockCenter=false] - If false the Sprite will drag from where you click it minus the dragOffset. If true it will center itself to the tip of the mouse pointer.
    * @param {boolean} [bringToTop=false] - If true the Sprite will be bought to the top of the rendering list in its current Group.
    * @param {boolean} [pixelPerfect=false] - If true it will use a pixel perfect test to see if you clicked the Sprite. False uses the bounding box.
    * @param {boolean} [alphaThreshold=255] - If using pixel perfect collision this specifies the alpha level from 0 to 255 above which a collision is processed.
    * @param {Phaser.Rectangle} [boundsRect=null] - If you want to restrict the drag of this sprite to a specific Rectangle, pass the Phaser.Rectangle here, otherwise it's free to drag anywhere.
    * @param {Phaser.Sprite} [boundsSprite=null] - If you want to restrict the drag of this sprite to within the bounding box of another sprite, pass it here.
    */
    enableDrag: function (lockCenter, bringToTop, pixelPerfect, alphaThreshold, boundsRect, boundsSprite) {

        if (lockCenter === undefined) { lockCenter = false; }
        if (bringToTop === undefined) { bringToTop = false; }
        if (pixelPerfect === undefined) { pixelPerfect = false; }
        if (alphaThreshold === undefined) { alphaThreshold = 255; }
        if (boundsRect === undefined) { boundsRect = null; }
        if (boundsSprite === undefined) { boundsSprite = null; }

        this._dragPoint = new Phaser.Point();
        this.draggable = true;
        this.bringToTop = bringToTop;
        this.dragOffset = new Phaser.Point();
        this.dragFromCenter = lockCenter;

        this.pixelPerfectClick = pixelPerfect;
        this.pixelPerfectAlpha = alphaThreshold;

        if (boundsRect)
        {
            this.boundsRect = boundsRect;
        }

        if (boundsSprite)
        {
            this.boundsSprite = boundsSprite;
        }

    },

    /**
    * Stops this sprite from being able to be dragged.
    * If it is currently the target of an active drag it will be stopped immediately; also disables any set callbacks.
    *
    * @method Phaser.InputHandler#disableDrag
    */
    disableDrag: function () {

        if (this._pointerData)
        {
            for (var i = 0; i < 10; i++)
            {
                this._pointerData[i].isDragged = false;
            }
        }

        this.draggable = false;
        this.isDragged = false;
        this._draggedPointerID = -1;
        this._pendingDrag = false;

    },

    /**
    * Called by Pointer when drag starts on this Sprite. Should not usually be called directly.
    *
    * @method Phaser.InputHandler#startDrag
    * @param {Phaser.Pointer} pointer
    */
    startDrag: function (pointer) {

        var x = this.sprite.x;
        var y = this.sprite.y;

        this.isDragged = true;
        this._draggedPointerID = pointer.id;

        this._pointerData[pointer.id].camX = this.game.camera.x;
        this._pointerData[pointer.id].camY = this.game.camera.y;

        this._pointerData[pointer.id].isDragged = true;

        if (this.sprite.fixedToCamera)
        {
            if (this.dragFromCenter)
            {
                var bounds = this.sprite.getBounds();

                this.sprite.cameraOffset.x = this.globalToLocalX(pointer.x) + (this.sprite.cameraOffset.x - bounds.centerX);
                this.sprite.cameraOffset.y = this.globalToLocalY(pointer.y) + (this.sprite.cameraOffset.y - bounds.centerY);
            }

            this._dragPoint.setTo(this.sprite.cameraOffset.x - pointer.x, this.sprite.cameraOffset.y - pointer.y);
        }
        else
        {
            if (this.dragFromCenter)
            {
                var bounds = this.sprite.getBounds();

                this.sprite.x = this.globalToLocalX(pointer.x) + (this.sprite.x - bounds.centerX);
                this.sprite.y = this.globalToLocalY(pointer.y) + (this.sprite.y - bounds.centerY);
            }

            this._dragPoint.setTo(this.sprite.x - this.globalToLocalX(pointer.x), this.sprite.y - this.globalToLocalY(pointer.y));
        }

        this.updateDrag(pointer, true);

        if (this.bringToTop)
        {
            this._dragPhase = true;
            this.sprite.bringToTop();
        }

        this.dragStartPoint.set(x, y);

        this.sprite.events.onDragStart$dispatch(this.sprite, pointer, x, y);

        this._pendingDrag = false;

    },

    /**
    * Warning: EXPERIMENTAL
    *
    * @method Phaser.InputHandler#globalToLocalX
    * @param {number} x
    */
    globalToLocalX: function (x) {

        if (this.scaleLayer)
        {
            x -= this.game.scale.grid.boundsFluid.x;
            x *= this.game.scale.grid.scaleFluidInversed.x;
        }

        return x;

    },

    /**
    * Warning: EXPERIMENTAL
    *
    * @method Phaser.InputHandler#globalToLocalY
    * @param {number} y
    */
    globalToLocalY: function (y) {

        if (this.scaleLayer)
        {
            y -= this.game.scale.grid.boundsFluid.y;
            y *= this.game.scale.grid.scaleFluidInversed.y;
        }

        return y;

    },

    /**
    * Called by Pointer when drag is stopped on this Sprite. Should not usually be called directly.
    *
    * @method Phaser.InputHandler#stopDrag
    * @param {Phaser.Pointer} pointer
    */
    stopDrag: function (pointer) {

        this.isDragged = false;
        this._draggedPointerID = -1;
        this._pointerData[pointer.id].isDragged = false;
        this._dragPhase = false;
        this._pendingDrag = false;

        if (this.snapOnRelease)
        {
            if (this.sprite.fixedToCamera)
            {
                this.sprite.cameraOffset.x = Math.round((this.sprite.cameraOffset.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.cameraOffset.y = Math.round((this.sprite.cameraOffset.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
            }
            else
            {
                this.sprite.x = Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.y = Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
            }
        }

        this.sprite.events.onDragStop$dispatch(this.sprite, pointer);

        if (this.checkPointerOver(pointer) === false)
        {
            this._pointerOutHandler(pointer);
        }

    },

    /**
    * Restricts this sprite to drag movement only on the given axis. Note: If both are set to false the sprite will never move!
    *
    * @method Phaser.InputHandler#setDragLock
    * @param {boolean} [allowHorizontal=true] - To enable the sprite to be dragged horizontally set to true, otherwise false.
    * @param {boolean} [allowVertical=true] - To enable the sprite to be dragged vertically set to true, otherwise false.
    */
    setDragLock: function (allowHorizontal, allowVertical) {

        if (allowHorizontal === undefined) { allowHorizontal = true; }
        if (allowVertical === undefined) { allowVertical = true; }

        this.allowHorizontalDrag = allowHorizontal;
        this.allowVerticalDrag = allowVertical;

    },

    /**
    * Make this Sprite snap to the given grid either during drag or when it's released.
    * For example 16x16 as the snapX and snapY would make the sprite snap to every 16 pixels.
    *
    * @method Phaser.InputHandler#enableSnap
    * @param {number} snapX - The width of the grid cell to snap to.
    * @param {number} snapY - The height of the grid cell to snap to.
    * @param {boolean} [onDrag=true] - If true the sprite will snap to the grid while being dragged.
    * @param {boolean} [onRelease=false] - If true the sprite will snap to the grid when released.
    * @param {number} [snapOffsetX=0] - Used to offset the top-left starting point of the snap grid.
    * @param {number} [snapOffsetY=0] - Used to offset the top-left starting point of the snap grid.
    */
    enableSnap: function (snapX, snapY, onDrag, onRelease, snapOffsetX, snapOffsetY) {

        if (onDrag === undefined) { onDrag = true; }
        if (onRelease === undefined) { onRelease = false; }
        if (snapOffsetX === undefined) { snapOffsetX = 0; }
        if (snapOffsetY === undefined) { snapOffsetY = 0; }

        this.snapX = snapX;
        this.snapY = snapY;
        this.snapOffsetX = snapOffsetX;
        this.snapOffsetY = snapOffsetY;
        this.snapOnDrag = onDrag;
        this.snapOnRelease = onRelease;

    },

    /**
    * Stops the sprite from snapping to a grid during drag or release.
    *
    * @method Phaser.InputHandler#disableSnap
    */
    disableSnap: function () {

        this.snapOnDrag = false;
        this.snapOnRelease = false;

    },

    /**
    * Bounds Rect check for the sprite drag
    *
    * @method Phaser.InputHandler#checkBoundsRect
    */
    checkBoundsRect: function () {

        if (this.sprite.fixedToCamera)
        {
            if (this.sprite.cameraOffset.x < this.boundsRect.left)
            {
                this.sprite.cameraOffset.x = this.boundsRect.left;
            }
            else if ((this.sprite.cameraOffset.x + this.sprite.width) > this.boundsRect.right)
            {
                this.sprite.cameraOffset.x = this.boundsRect.right - this.sprite.width;
            }

            if (this.sprite.cameraOffset.y < this.boundsRect.top)
            {
                this.sprite.cameraOffset.y = this.boundsRect.top;
            }
            else if ((this.sprite.cameraOffset.y + this.sprite.height) > this.boundsRect.bottom)
            {
                this.sprite.cameraOffset.y = this.boundsRect.bottom - this.sprite.height;
            }
        }
        else
        {
            if (this.sprite.left < this.boundsRect.left)
            {
                this.sprite.x = this.boundsRect.x + this.sprite.offsetX;
            }
            else if (this.sprite.right > this.boundsRect.right)
            {
                this.sprite.x = this.boundsRect.right - (this.sprite.width - this.sprite.offsetX);
            }

            if (this.sprite.top < this.boundsRect.top)
            {
                this.sprite.y = this.boundsRect.top + this.sprite.offsetY;
            }
            else if (this.sprite.bottom > this.boundsRect.bottom)
            {
                this.sprite.y = this.boundsRect.bottom - (this.sprite.height - this.sprite.offsetY);
            }
        }

    },

    /**
    * Parent Sprite Bounds check for the sprite drag.
    *
    * @method Phaser.InputHandler#checkBoundsSprite
    */
    checkBoundsSprite: function () {

        if (this.sprite.fixedToCamera && this.boundsSprite.fixedToCamera)
        {
            if (this.sprite.cameraOffset.x < this.boundsSprite.cameraOffset.x)
            {
                this.sprite.cameraOffset.x = this.boundsSprite.cameraOffset.x;
            }
            else if ((this.sprite.cameraOffset.x + this.sprite.width) > (this.boundsSprite.cameraOffset.x + this.boundsSprite.width))
            {
                this.sprite.cameraOffset.x = (this.boundsSprite.cameraOffset.x + this.boundsSprite.width) - this.sprite.width;
            }

            if (this.sprite.cameraOffset.y < this.boundsSprite.cameraOffset.y)
            {
                this.sprite.cameraOffset.y = this.boundsSprite.cameraOffset.y;
            }
            else if ((this.sprite.cameraOffset.y + this.sprite.height) > (this.boundsSprite.cameraOffset.y + this.boundsSprite.height))
            {
                this.sprite.cameraOffset.y = (this.boundsSprite.cameraOffset.y + this.boundsSprite.height) - this.sprite.height;
            }
        }
        else
        {
            if (this.sprite.left < this.boundsSprite.left)
            {
                this.sprite.x = this.boundsSprite.left + this.sprite.offsetX;
            }
            else if (this.sprite.right > this.boundsSprite.right)
            {
                this.sprite.x = this.boundsSprite.right - (this.sprite.width - this.sprite.offsetX);
            }

            if (this.sprite.top < this.boundsSprite.top)
            {
                this.sprite.y = this.boundsSprite.top + this.sprite.offsetY;
            }
            else if (this.sprite.bottom > this.boundsSprite.bottom)
            {
                this.sprite.y = this.boundsSprite.bottom - (this.sprite.height - this.sprite.offsetY);
            }
        }

    }

};

Phaser.InputHandler.prototype.constructor = Phaser.InputHandler;
