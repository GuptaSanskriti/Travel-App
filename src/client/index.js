import './styles/index.scss'
import './styles/header.scss'
import './styles/footer.scss'
import './styles/blogs.scss'

import 'regenerator-runtime/runtime';
import { getDatafromGeonames,
         getDatafromWeatherbit,
         getDatafromPixabay,
         performAction,
         postData,
         updateUI,
         changeUI} from './js/app';

export{
    performAction, 
    postData,
    updateUI,
    changeUI,
    getDatafromGeonames,
    getDatafromWeatherbit,
    getDatafromPixabay,
}

