var EXPLOSION_DEBRIS_BLUE = 0;
var EXPLOSION_GATLING_BLUE = 1;
var EXPLOSION_FIRE_BLUE = 2;
var EXPLOSION_RING_BLUE = 3;
var EXPLOSION_DEBRIS = 4;
var EXPLOSION_FIRE = 5;
var EXPLOSION_RING = 6;
var EXPLOSION_RING_RED = 7;
var EXPLOSION_RING_ORANGE = 8;

function ExplosionData () {
	this.m_frameNumber = 0;
	this.m_frameNumberW = 0;
	this.m_frameDuration = 0;
	this.m_frameSize = 0;
	this.m_imagePath = "";
}
var g_explosionData = new Array();

g_explosionData[EXPLOSION_DEBRIS_BLUE] = new ExplosionData();
g_explosionData[EXPLOSION_DEBRIS_BLUE].m_frameNumber = 35;
g_explosionData[EXPLOSION_DEBRIS_BLUE].m_frameNumberW = 5;
g_explosionData[EXPLOSION_DEBRIS_BLUE].m_frameDuration = 0.025;
g_explosionData[EXPLOSION_DEBRIS_BLUE].m_frameSize = 150;
g_explosionData[EXPLOSION_DEBRIS_BLUE].m_imagePath = "res/GSAction/Explosion/DebrisBlue.png";

g_explosionData[EXPLOSION_GATLING_BLUE] = new ExplosionData();
g_explosionData[EXPLOSION_GATLING_BLUE].m_frameNumber = 29;
g_explosionData[EXPLOSION_GATLING_BLUE].m_frameNumberW = 8;
g_explosionData[EXPLOSION_GATLING_BLUE].m_frameDuration = 0.016;
g_explosionData[EXPLOSION_GATLING_BLUE].m_frameSize = 50;
g_explosionData[EXPLOSION_GATLING_BLUE].m_imagePath = "res/GSAction/Explosion/GatlingBlue.png";

g_explosionData[EXPLOSION_FIRE_BLUE] = new ExplosionData();
g_explosionData[EXPLOSION_FIRE_BLUE].m_frameNumber = 48;
g_explosionData[EXPLOSION_FIRE_BLUE].m_frameNumberW = 8;
g_explosionData[EXPLOSION_FIRE_BLUE].m_frameDuration = 0.016;
g_explosionData[EXPLOSION_FIRE_BLUE].m_frameSize = 100;
g_explosionData[EXPLOSION_FIRE_BLUE].m_imagePath = "res/GSAction/Explosion/FireBlue.png";

g_explosionData[EXPLOSION_RING_BLUE] = new ExplosionData();
g_explosionData[EXPLOSION_RING_BLUE].m_frameNumber = 42;
g_explosionData[EXPLOSION_RING_BLUE].m_frameNumberW = 8;
g_explosionData[EXPLOSION_RING_BLUE].m_frameDuration = 0.016;
g_explosionData[EXPLOSION_RING_BLUE].m_frameSize = 100;
g_explosionData[EXPLOSION_RING_BLUE].m_imagePath = "res/GSAction/Explosion/RingBlue.png";

g_explosionData[EXPLOSION_DEBRIS] = new ExplosionData();
g_explosionData[EXPLOSION_DEBRIS].m_frameNumber = 35;
g_explosionData[EXPLOSION_DEBRIS].m_frameNumberW = 5;
g_explosionData[EXPLOSION_DEBRIS].m_frameDuration = 0.025;
g_explosionData[EXPLOSION_DEBRIS].m_frameSize = 150;
g_explosionData[EXPLOSION_DEBRIS].m_imagePath = "res/GSAction/Explosion/DebrisDefault.png";

g_explosionData[EXPLOSION_FIRE] = new ExplosionData();
g_explosionData[EXPLOSION_FIRE].m_frameNumber = 48;
g_explosionData[EXPLOSION_FIRE].m_frameNumberW = 8;
g_explosionData[EXPLOSION_FIRE].m_frameDuration = 0.016;
g_explosionData[EXPLOSION_FIRE].m_frameSize = 100;
g_explosionData[EXPLOSION_FIRE].m_imagePath = "res/GSAction/Explosion/FireDefault.png";

g_explosionData[EXPLOSION_RING] = new ExplosionData();
g_explosionData[EXPLOSION_RING].m_frameNumber = 42;
g_explosionData[EXPLOSION_RING].m_frameNumberW = 8;
g_explosionData[EXPLOSION_RING].m_frameDuration = 0.016;
g_explosionData[EXPLOSION_RING].m_frameSize = 100;
g_explosionData[EXPLOSION_RING].m_imagePath = "res/GSAction/Explosion/RingDefault.png";

g_explosionData[EXPLOSION_RING_RED] = new ExplosionData();
g_explosionData[EXPLOSION_RING_RED].m_frameNumber = 42;
g_explosionData[EXPLOSION_RING_RED].m_frameNumberW = 8;
g_explosionData[EXPLOSION_RING_RED].m_frameDuration = 0.016;
g_explosionData[EXPLOSION_RING_RED].m_frameSize = 100;
g_explosionData[EXPLOSION_RING_RED].m_imagePath = "res/GSAction/Explosion/RingRed.png";

g_explosionData[EXPLOSION_RING_ORANGE] = new ExplosionData();
g_explosionData[EXPLOSION_RING_ORANGE].m_frameNumber = 42;
g_explosionData[EXPLOSION_RING_ORANGE].m_frameNumberW = 8;
g_explosionData[EXPLOSION_RING_ORANGE].m_frameDuration = 0.016;
g_explosionData[EXPLOSION_RING_ORANGE].m_frameSize = 100;
g_explosionData[EXPLOSION_RING_ORANGE].m_imagePath = "res/GSAction/Explosion/RingOrange.png";

function Explosion(battle, layer) {
	this.m_active = false;
	this.m_x = 0;
	this.m_y = 0;
	this.m_scale = 1;
	
	this.m_sprite = g_spritePool.GetSpriteFromPool("res/GSAction/Explosion/DebrisDefault.png");
	this.m_sprite.setAnchorPoint(cc.p(0.5, 0.5));
	this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
	this.m_sprite.setLocalZOrder (LAYER_EXPLOSION);
	layer.addChild(this.m_sprite);
	
	var frame = 0;
	var frameNumber = 0;
	var frameNumberW = 0;
	var frameDuration = 0;
	var frameSize = 0;
	var counter = 0;
	var spriteX = 0;
	var spriteY = 0;
	
	this.Spawn = function(type, scale, x, y) {
		this.m_active = true;
		this.m_x = x;
		this.m_y = y;
		
		spriteX = (this.m_x + 0.5) * BLOCK_SIZE - battle.m_mapRealWidth * 0.5;
		spriteY = (this.m_y + 0.5) * BLOCK_SIZE - battle.m_mapRealHeight * 0.5;
		
		frame = 0;
		counter = 0;
		frameNumber = g_explosionData[type].m_frameNumber;
		frameNumberW = g_explosionData[type].m_frameNumberW;
		frameDuration = g_explosionData[type].m_frameDuration;
		frameSize = g_explosionData[type].m_frameSize;
		
		this.m_scale = scale;
		this.m_sprite.setTexture( g_explosionData[type].m_imagePath);
		this.m_sprite.setTextureRect (cc.rect(0, 0, frameSize, frameSize));
		this.m_sprite.setBlendFunc (new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE));
		this.m_sprite.setPosition (cc.p(spriteX, spriteY));
		this.m_sprite.setRotation (Math.random() * 360);
		this.m_sprite.setScale (this.m_scale);
	}
	
	this.Update = function (deltaTime) {
		if (this.m_active == true) {
			counter += deltaTime;
			if (counter >= frameDuration) {
				counter -= frameDuration;
				frame ++;
				if (frame == frameNumber) {
					this.m_active = false;
					this.m_sprite.setVisible (false);
				}
			}
		}
	}
	
	this.UpdateVisual = function () {
		if (this.m_active == true) {
			var y = (frame / frameNumberW) >> 0;
			var x = (frame % frameNumberW);
			this.m_sprite.setTextureRect (cc.rect(x * frameSize, y * frameSize, frameSize, frameSize));
			this.m_sprite.setVisible (true);
		}
	}
	
	this.Destroy = function () {
		layer.removeChild(this.m_sprite);
		g_spritePool.PutSpriteIntoPool(this.m_sprite);
	}
}