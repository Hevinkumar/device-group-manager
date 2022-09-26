import Route from '@ember/routing/route';
import {data} from '../configurations/datas';

export default Route.extend({
    model(){
        return data;
    }
});
