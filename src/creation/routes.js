import App from './App';
import HomePage from './components/HomePage';
import CreateQuiz from './components/CreateQuiz';

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: HomePage
      },
      { path: '/quiz',
        component: CreateQuiz
      }
    ]
  }
];

export default routes;