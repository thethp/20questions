TwentyQuestions();

function TwentyQuestions() {
  this.animals;
  $.getJSON('animals.json', function(json) {
    this.animals = json;
    $.each(this.animals.animals, function(i,el) {
      console.log(el["class"]=="mammal");
    })
  });
};
