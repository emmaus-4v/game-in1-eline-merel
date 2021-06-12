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

const UITLEG = 0; // modus voordat je gaat spelen
const SPELEN = 1; // modus tijdens het spelen
const GAMEOVER = 2; // modus na het spelem
const keyA = 65; // nummer van A op toetsenbord 
const keyD = 68; // nummer van D op toetsenbord 
const ENTER = 13; // nummer van Enter op toetsenbord 
const SPATIE = 32; // nummer van Spatie op toetsenbord 

var spelStatus = UITLEG; // ik wil dat het spel begint met uitleg modus dus staat deze van te voren op uitleg

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

// deze functie tekent de basis van het beeld, dus het achtergrond in de game
var tekenVeld = function() {
    strokeWeight(1);
    fill('lightblue');
    rect(0, 0, 1280, 540); // lucht
    fill('lime');
    rect(0, 540, 1280, 720); // gras

    fill('black');
    textSize(50);
    text("Score: " + score, 20 , 10, 500, 500); // aantal punten text

    text("Levens: " + levens, 1030, 10, 500, 500); // aantal  levens tekst
 
};

/**
 * deze funcite tekent de bom
 * @param {number} bomX x-coördinaat
 * @param {number} bomY y-coördinaat
 */
var tekenBom = function(bomX, bomY) {
    strokeWeight(1);
    fill("black");
    ellipse(bomX, bomY, 50, 50);
};


/**
 * deze functie tekent het eten dat naar beneden valt
 * @param {number} etenX x-coördinaat
 * @param {number} etenY y-coördinaat
 */
var tekenEten = function(etenX, etenY) {
    strokeWeight(1);
    fill("pink");
    ellipse(etenX, etenY, 50, 50);
};


/**
 * deze functie de speler die je kan bewegen met A en D
 * @param {number} spelerX x-coördinaat 
 * @param {number} spelerY y-coördinaat
 */
var tekenSpeler = function(spelerX, spelerY) {
  strokeWeight(1);
  fill("white");
  rect(spelerX, spelerY, 50, 50);
};



var beweegBom = function() {
     bomY += snelheidEten; // zorgt ervoor dat de snelheid omhoog gaat (zie checkSpelerEtenGepakt)
    
    if (bomY > 1200) {            // zorgt dat als de bom y-coördinaat langs de 1200 gaat hij weer bij y=0 gaat zodat hij opnieuw terug komt
        bomX = random(0, 1220);   // zorgt dat de x-coördinaat steeds random is, dit maakt het spel leuker en niet te voorspellen
        bomY = 0;
    }
};


/**
 * Updatet globale variabelen met positie van eten
 */
var beweegEten = function() {
    
    etenY += snelheidEten;
    
    if (etenY > 780) {            // zorgt dat als het eten y-coördinaat langs de 780 gaat hij weer bij y=0 gaat zodat hij meteen terug komt als je hem hebt gepakt
        etenX = random(0, 1220);  // zorgt dat de x-coördinaat steeds random is, dit maakt het spel leuker en niet te voorspellen
        etenY = 0;
    }
};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {

  if (keyIsDown(keyA)) {
      spelerX -= 8;       // 8 is hoe snel de speler gaat
  }
  if (keyIsDown(keyD)) {
      spelerX += 8;       // 8 is hoe snel de speler gaat
  }

  if (spelerX < 0) {
    spelerX = 0;         //zorgt ervoor dat de speler links niet van het scherm af loopt dus de x-coördinaat blijft altijd 0 of hoger
  }
  if (spelerX > 1230) {
    spelerX = 1230;     //zorgt ervoor dat de speler rechts niet van het scherm af loopt dus de x-coördinaat blijft altijd 1230 of lager, ik doe 1230 omdat de speler 50 pixels breed is en de canvas 1280
  }
};




/**
 * Zoekt uit of de speler het eten heeft gemist
 * @returns {boolean} true als speler heeft gemist
 */
var checkSpelerEtenGemist = function() {
    if(abs((spelerX + 25) - etenX) > 25 && abs(spelerY - etenY) < 3) {  // als de x-coördinaat van speler en eten meer 25 verschillen en de y minder 3 verschilt dan heb je hem gemist dus een leven eraf
        levens -= 1;

        if (levens === 0) {
            spelStatus = GAMEOVER; // als je geen levens hebt wordt de spelstatus gameover dus het eindscherm
        }
        
    }
  return false;
};

/**
 * Zoekt uit of de speler het eten heeft gepakt
 * @returns {boolean} true als speler eten heeft gepakt
 */
var checkSpelerEtenGepakt = function() {
    if(abs((spelerX + 25) - etenX) < 25 && abs(spelerY - etenY) < 3) {   // als de x-coördinaat van speler en eten minder 25 verschillen en de y minder 3 verschilt dan raak je het eten en dus heb je een punt erbij
        score += 1; // punt erbij
        snelheidEten *= 1.005; // zorgt dat als je een punt pakt de snelheid steeds iets hoger wordt en dan wordt het dus steeds lastiger
    }
  return false;
};

/**
 * Zoekt uit of de speler de bom gepakt
 * @returns {boolean} true als speler bom heeft gepakt
 */
var checkSpelerBomGepakt = function() {
     if(abs((spelerX + 25) - bomX) < 25 && abs(spelerY - bomY) < 3) { // als de x-coördinaat van speler en eten minder 25 verschillen en de y minder 3 verschilt dan heb je de bom geraakt dus meteen af
       spelStatus = GAMEOVER; // zorgt dat je het eindscherm krijgt
    }
  return false;
};

// functie die het veld tekent en dan de start-tekst op het scherm zet in het begin van de game
var beginGame = function() {
    tekenVeld();
    textSize(70);
    text("Klik op enter om te starten", 200, 300, 1280, 680);
};

// functie die het veld tekent en dan de afgaan-tekst op het scherm zet als je eenmaal af bent gegaan
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

  spelStatus === UITLEG; // zo staat de spelstatus zeker weten op uitleg
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    if (spelStatus === UITLEG) {
    beginGame(); // voert begin game uit zodat de tekst met starten op het beeld staat

        if (keyIsDown(ENTER)) {
        spelStatus = SPELEN; // je moet op enter klikken dus als dat gebeurt dan ga je beginnen met spelen
        }

    }

    if (spelStatus === SPELEN) { // voert alle functies hier uit tijdens het spelen
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
        eindGame(); // als je gameover bent voert hij de eindgame uit met de tekst met je punten enz.

        if (keyIsDown(SPATIE)) {
        spelStatus = SPELEN; // zorgt dat als je op spatie drukt je opnieuw speelt
        // deze bepaalde variabele worden gereset als je opnieuw gaat spelen zodat je niet doorgaat met je oude punten en dat de bom en het eten weer bovenaan beginnen met de goede snel
        score = 0;
        levens = 3;
        etenY= 0;
        bomY= 0;
        snelheidEten = 5;
        }

    }}