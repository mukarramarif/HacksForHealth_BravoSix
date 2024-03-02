// Storing values
localStorage.setItem('key', 'value');

// Retrieving values
const value = localStorage.getItem('key');
console.log(value); // Output: value

class  Data {
    constructor(flu,diab,colon,bp,skin,pros,den,vis){
      this.flu = flu;
      this.diab = diab;
      this.colon = colon;
      this.bp = bp;
      this.skin = skin;
      this.pros = pros;
      this.den = den;
      this.vis = vis;
    }
  }