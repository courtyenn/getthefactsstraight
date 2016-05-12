var CuteData = function(){
  init: function(){
    localStorage.clear();
    localStorage.setItem('game', JSON.stringify({
      columns: [
        {
          tite: "Cute",
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
}
