module.exports = {
  init: function(){
    localStorage.clear();
    localStorage.setItem('game', JSON.stringify({
      columns: [
        {
          title: "Cute",
          id: "cuteness"
        },
        {
          title: "Edible",
          id: "yummy"
        },
        {
          title: "Admirable",
          id: "taco"
        }
      ],
      choices: [
        {
          title: "Tacos",
          correctId: "yummy"
        },
        {
          title: "Kitties",
          correctId: "cuteness"
        },
        {
          title: "APotato",
          correctId: "taco"
        },
        {
          title: "Ferrets",
          correctId: "cuteness"
        }
      ]
    }));
  }
};
