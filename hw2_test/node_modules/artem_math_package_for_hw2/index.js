function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function exponentiate(a, b) {
  return Math.pow(a,b);
}

module.exports = {add, subtract, exponentiate}

//console.log(exponentiate(2,10));