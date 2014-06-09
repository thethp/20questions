TwentyQuestions();

function TwentyQuestions() {
  this.animals = $.getJSON('animals.json');
  console.log(this.animals);
};
