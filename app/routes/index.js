import Route from '@ember/routing/route';
import {data} from '../configurations/groups';


export default Route.extend({
    model(){
        return data;
    }
});
