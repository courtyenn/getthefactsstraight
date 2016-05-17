import ReactDom from 'react-dom';
import App from './app';
import CuteData from './cuteData';

CuteData.init();
ReactDOM.render(<App />, document.getElementById('app'));
