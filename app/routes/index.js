import Route from '@ember/routing/route';
import {devices} from '../configurations/devices';
import {groups} from '../configurations/groups';
import {hash} from "rsvp";


export default Route.extend({
    model(){
        return hash(
            { devices:devices,
                groups:groups});
    }
});
