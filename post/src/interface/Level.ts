import { UserLevel } from '../enum/UserLevel';

export interface Level {
    level:UserLevel,
    changeLevel :(newLevel:UserLevel) => void,
}
