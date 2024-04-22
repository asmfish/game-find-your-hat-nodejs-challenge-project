const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]){
    this.field = field;
    this.xLoc = 0;
    this.yLoc = 0;
  }

  print(){
    for(var i = 0; i < this.field.length; i++) {
      var field = this.field[i];
      console.log(field.join(" "));
    }
  }

  static generateField(fieldHeight, fieldWidth, holePercentage = 0.1){
    //create two dimensional array filled with inital fieldCharacter
    const field = new Array(fieldHeight).fill(0).map(f => new Array(fieldWidth).fill(fieldCharacter));

    //set hole locations based on percentage
    for(let y = 0 ; y < fieldHeight; y++){
      for(let x = 1; x < fieldWidth; x++){
        const prob = Math.random();
        //field[y][x] = prob > holePercentage ? fieldCharacter : hole;
        if(holePercentage > prob){
            field[y][x] = hole;
        }
      }
    }

    //set hat location
    let hatX = Math.floor(Math.random() * fieldWidth);
    let hatY = Math.floor(Math.random() * fieldHeight);
    while(hatX === 0 && hatY === 0){
       hatX = Math.floor(Math.random() * fieldWidth);
       hatY = Math.floor(Math.random() * fieldHeight);
    }
    field[hatY][hatX] = hat;

    //set the starting poin of the game
    field[0][0] = pathCharacter;

   //return the creted initial field
   return field;
  }

  isHat (){
    return this.field[this.yLoc][this.xLoc] === hat;
  }

  isHole (){
     return this.field[this.yLoc][this.xLoc] === hole;
  }

  isInsideField () {
    return (
      this.yLoc >= 0 && 
      this.yLoc < this.field.length &&
      this.xLoc >= 0 && 
      this.xLoc < this.field[0].length
    );
  }

  runGame (){
    let play = true;
    let userMove = '';
    while(play){
      //get user move input
      userMove = prompt('Next move? ').toUpperCase();

      //calculate the field location based on user input
      switch(userMove){
        case 'U':
          this.yLoc -= 1;
          break;
        case 'D':
          this.yLoc += 1;
          break;
        case 'L':
          this.xLoc -= 1;
          break;
        case 'R':
          this.xLoc += 1;
          break;
        default:
          console.log('Enter valid input: U, D, L, R');
          continue;
          break;
      }

      //decide game result
      if(!this.isInsideField()){
        console.log('LOSE, you go out of field bounds!');
        play = false;
        break;
      }
      if(this.isHat()){
        console.log('WON, you found your hat!');
        play = false;
        break;
      }
      if(this.isHole()){
        console.log('LOSE you fell into a hole!');
        play = false;
        break;
      }

      //if game is not still over, mark user next move with *
      this.field[this.yLoc][this.xLoc] = pathCharacter;

      //display user progress
      this.print();
    }
  }
}

const myField = new Field(Field.generateField(5, 5, 0.4));
console.log(myField.print());

myField.runGame();


