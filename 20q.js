var questions = [
    { 
	q: "Is it a mammal?",
	att: "class",
	ans: "mammal",
	num: 0
    },
    {
        q: "Is it a bird?",
        att: "class",
        ans: "bird",
        num: 0
    },
    {
        q: "Is it an arthropod?",
        att: "class",
        ans: "arthropod",
        num: 0
    },
    {
        q: "Is it a reptile?",
        att: "class",
        ans: "reptile",
        num: 0
    },
    {
        q: "Is it a fishy?",
        att: "class",
        ans: "fish",
        num: 0
    },
    {
        q: "Is it an amphibian?",
        att: "class",
        ans: "amphibian",
        num: 0
    },
    {
	q: "Does it have 4 legs?",
	att: "legs",
	ans: 4,
	num: 0
    },
    {
        q: "Does it have 2 legs??",
        att: "legs",
        ans: 2,
        num: 0
    },
    {
        q: "Does it have 6 legs?",
        att: "legs",
        ans: 6,
        num: 0
    },
    {
	q: "Is it ever so furry?",
	att: "fur",
	ans: true,
	num: 0
    },
    {
        q: "Is it likely to be a housepet?",
        att: "house",
        ans: true,
        num: 0
    },
    {
        q: "Can it fly, sans pixie dust?",
        att: "fly",
        ans: true,
        num: 0
    },
    {
        q: "Is it found outside of water, in a non dead/dying format?",
        att: "land",
        ans: true,
        num: 0
    },
    {
        q: "Is it a vegetarian? Herbivore if you want to be all mister science.",
        att: "herbivore",
        ans: true,
        num: 0
    },
    {
        q: "Does it have multiple stomachs?",
        att: "ruminant",
        ans: true,
        num: 0
    },
    {
        q: "Does it have claws?",
        att: "claws",
        ans: true,
        num: 0
    },
    {
        q: "Is it genuinely terrifying?",
        att: "fear",
        ans: true,
        num: 0
    },
    {
        q: "Is it nocturnal?",
        att: "nocturnal",
        ans: true,
        num: 0
    },
    {
        q: "Is it one of the main beasts in a horror movie?",
        att: "horror",
        ans: true,
        num: 0
    },
    {
        q: "Is it a featured character in an animated disney or pixar movie?",
        att: "disney",
        ans: true,
        num: 0
    },
    {
        q: "Has it ever tried to destroy or been used to aid James Bond?",
        att: "bond",
        ans: true,
        num: 0
    },
    {
        q: "Is it a college or professional sports mascot of some fashion?",
        att: "mascot",
        ans: true,
        num: 0
    },
    {
        q: "Does it have a tail?",
        att: "tail",
        ans: true,
        num: 0
    },
    {
        q: "Does it have stripes?",
        att: "stripes",
        ans: true,
        num: 0
    },
    {
	q: "Does it have antlers?",
	att: "antlers",
	ans: true,
	num: 0
    },
    {
	q: "Does it have horns?",
	att: "horns",
	ans: true,
	num: 0
    },
];

var tq = new TwentyQuestions();
//Event Listeners                                                                                                                                         
$('.yes').on('click', function() {
  tq.eliminateChoices(true);
});
$('.no').on('click', function() {
  tq.eliminateChoices(false);
});

function TwentyQuestions() {
  this.animals;
  this.currQuestion = 0;
  this.classesLeft = 6;
  var game = this;
  $.getJSON('animals.json', function(json) {
    game.animals = json.animals;
    game.findNextQuestion();
  });
};

TwentyQuestions.prototype.findNextQuestion = function() {
  var animals = this.animals,
      qcount = [],
      num = 0;
  $.each(questions, function(i,el) {
    $.each(animals, function(j,elem) {
      if(elem[el.att]===el.ans) {
	num++;
      }
    });
    qcount[i] = num;
    num = 0;
  });
  var middle = Math.max.apply(null,qcount)/2;
  var currBest = 0;
  for(var k=0;k<qcount.length;k++) {
    if((qcount[k] <= middle) && (qcount[currBest]-qcount[k] < 0) && (qcount[k] != animals.length) && qcount[k] != 0) {
      currBest = k;
    }
  }
  this.currQuestion = currBest;
  $('.question').html(questions[currBest].q);
}

TwentyQuestions.prototype.askSpecies = function() {
    $('.question').html("You think you're SOOOOO clever, eh? EH? BUT IT'S A[N] " + this.animals[0].species + "! ISN'T IT!?");
}

TwentyQuestions.prototype.eliminateChoices = function(_isQuestionTrue) {
  var animals = this.animals,
      currQ = questions[this.currQuestion];
  for (var i = 0; i <= animals.length; i++) {
    var currAn = animals[i];
    if(currAn != undefined) {
      if(currAn[currQ.att]!==currQ.ans && _isQuestionTrue) {
        animals.splice(i,1);
	i--;
      } else if (currAn[currQ.att]===currQ.ans && !_isQuestionTrue) {
        animals.splice(i,1);
        i--;
      }
    }
  }
  if(currQ.att === "class") {
    if (_isQuestionTrue === true) {
      questions.splice(0,this.classesLeft);
    } else {
      this.classesLeft--;
      questions.splice(this.currQuestion,1);
    }
  } else {
    questions.splice(this.currQuestion,1);
  }
  if(animals.length===1) {
    this.askSpecies();
  } else {
    this.findNextQuestion();
  }
}
