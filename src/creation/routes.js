import App from './App';
import HomePage from './components/HomePage';
import CreateQuiz from './components/CreateQuiz';
import ListGames from '../base/ListGames';

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: HomePage
      },
      { path: '/quiz',
        exact: true,
        component: CreateQuiz
      },
      { path: '/quizzes',
        exact: true,
        component: ListGames
      }
    ]
  }
];

export default routes;