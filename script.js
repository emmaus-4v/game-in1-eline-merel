/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
const keyA = 65;
const keyD = 68;
const ENTER = 13;
const SPATIE = 32;

var spelStatus = UITLEG;

var spelerX = 200; // x-positie van speler
var spelerY = 680; // y-positie van speler

var etenX = 100;    // x-positie van eten
var etenY = 0;    // y-positie van eten

var bomX = 400;   // x-positie van bom
var bomY = 0;   // y-positie van bom

var score = 0; // aantal behaalde punten
var snelheidEten = 5; // snelheid van het eten, hoe snel het valt

var levens = 3; // aantal levens dat je hebt





/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

var tekenVeld = function() {
    strokeWeight(1);
    fill('lightblue');
    rect(0, 0, 1280, 540);
    fill('lime');
    rect(0, 540, 1280, 720);

    fill('black');
    textSize(50);
    text("Score: " + score, 20 , 10, 500, 500);

    text("Levens: " + levens, 1030, 10, 500, 500);
 
};

/**
 * Tekent de bom
 * @param {number} bomX x-coördinaat
 * @param {number} bomY y-coördinaat
 */
var tekenBom = function(bomX, bomY) {
    strokeWeight(1);
    fill("black");
    ellipse(bomX, bomY, 50, 50);
};


/**
 * Tekent het eten
 * @param {number} etenX x-coördinaat
 * @param {number} etenY y-coördinaat
 */
var tekenEten = function(etenX, etenY) {
    strokeWeight(1);
    fill("pink");
    ellipse(etenX, etenY, 50, 50);
};


/**
 * Tekent de speler
 * @param {number} spelerX x-coördinaat 
 * @param {number} spelerY y-coördinaat
 */
var tekenSpeler = function(spelerX, spelerY) {
  strokeWeight(1);
  fill("white");
  rect(spelerX, spelerY, 50, 50);
};


/**
 * Updatet globale variabelen met positie van bom
 */
var beweegBom = function() {
     bomY += snelheidEten;
    
    if (bomY > 1200) {
        bomX = random(0, 1220);
        bomY = 0;
    }
};


/**
 * Updatet globale variabelen met positie van eten
 */
var beweegEten = function() {
    
    etenY += snelheidEten;
    
    if (etenY > 780) {
        etenX = random(0, 1220);
        etenY = 0;
    }
};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {

  if (keyIsDown(keyA)) {
      spelerX -= 8;
  }
  if (keyIsDown(keyD)) {
      spelerX += 8;
  }

  if (spelerX < 0) {
    spelerX = 0;
  }
  if (spelerX > 1230) {
    spelerX = 1230;
  }
};




/**
 * Zoekt uit of de speler heeft gemist
 * @returns {boolean} true als speler heeft gemist
 */
var checkSpelerEtenGemist = function() {
    if(abs((spelerX + 25) - etenX) > 25 && abs(spelerY - etenY) < 3) { 
        levens -= 1;

        if (levens === 0) {
            spelStatus = GAMEOVER;
        }
        
    }
  return false;
};

/**
 * Zoekt uit of de speler eten gepakt
 * @returns {boolean} true als speler eten heeft gepakt
 */
var checkSpelerEtenGepakt = function() {
    if(abs((spelerX + 25) - etenX) < 25 && abs(spelerY - etenY) < 3) { 
        score += 1;
        snelheidEten *= 1.005;
    }
  return false;
};

/**
 * Zoekt uit of de speler bom gepakt
 * @returns {boolean} true als speler bom heeft gepakt
 */
var checkSpelerBomGepakt = function() {
     if(abs((spelerX + 25) - bomX) < 25 && abs(spelerY - bomY) < 3) { 
       spelStatus = GAMEOVER;
    }
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};

var beginGame = function() {
    tekenVeld();
    textSize(70);
    text("Klik op enter om te starten", 200, 300, 1280, 680);
};

var eindGame = function() {
    tekenVeld();
    textSize(60);
    text("Score: " + score, 500, 200, 1280, 680);
    textSize(60);
    text("helaas je bent af", 410, 265, 1280, 680);
    textSize(60);
    text("klik op spatie op opnieuw te spelen", 200, 330, 1280, 680);
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');

  spelStatus === UITLEG;
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    if (spelStatus === UITLEG) {
    beginGame();

        if (keyIsDown(ENTER)) {
        spelStatus = SPELEN;
        }

    }

    if (spelStatus === SPELEN) {
    tekenVeld();
    tekenEten(etenX, etenY);
    tekenSpeler(spelerX, spelerY);
    tekenBom(bomX, bomY);
    beweegEten();
    beweegBom();
    beweegSpeler();
    checkSpelerEtenGepakt();
    checkSpelerEtenGemist();
    checkSpelerBomGepakt();
    }

    if (spelStatus === GAMEOVER) {
        eindGame();

        if (keyIsDown(SPATIE)) {
        spelStatus = SPELEN;
        score = 0;
        levens = 3;
        etenY= 0;
        bomY= 0;
        snelheidEten = 5;
        }

    }}
/*
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegBom();
      beweegEten();
      beweegSpeler();
      
      if (checkSpelerGemist()) {
        // leven eraf
      }

      if (checkSpelerEtenGepakt()) {
        // meteen af
        
      }
      if (checkSpelerBomGepakt()) {
        // meteen af
        
      }

      tekenVeld();
      tekenBom(bomX, bomY);
      tekenEten(etenX, etenY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
*/