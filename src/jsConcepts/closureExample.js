function outer(x){
    // let x = 20 ;
    function inner(y){
      console.log(x+y);
    }
return inner;
}
const taken = outer(2000);
taken(10);
