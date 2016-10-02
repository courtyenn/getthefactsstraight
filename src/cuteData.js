module.exports = {
  init: function(){
    localStorage.clear();
    localStorage.setItem('game', JSON.stringify({
      title: 'Common Logic Quiz',
      columns: [
        {
          title: "Cute",
          id: "1",
          list: []
        },
        {
          title: "Edible",
          id: "2",
          list: []
        },
        {
          title: "Horrid",
          id: "3",
          list: []
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
