module.exports = {
  init: function(){
    localStorage.clear();
    localStorage.setItem('game', JSON.stringify({
      columns: [
        {
          title: "Cute",
          id: "1"
        },
        {
          title: "Edible",
          id: "2"
        },
        {
          title: "Horrid",
          id: "3"
        }
      ],
      choices: [
        {
          title: "Tacos",
          correctId: "2"
        },
        {
          title: "Kitties",
          correctId: "1"
        },
        {
          title: "Smelly socks",
          correctId: "3"
        },
        {
          title: "Ferrets",
          correctId: "1"
        }
      ]
    }));
  }
};
