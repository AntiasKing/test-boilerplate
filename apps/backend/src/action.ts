import { stringify } from "querystring";

const MIN_COST = 0.8;
const MAX_COST = 1;
const REFRESH_TIME = 10 * 60 *1000;

interface actionInterface {
    name: string
    maxCost: number
    startingCredit: number
}

export default class Action {
    private _name: string;
    private _maxCost: number;
    private _cost: number;
        
    constructor(action: actionInterface) {
        this.name = action.name;
        this.maxCost = action.maxCost;
        
        this.calculateCost();
        setInterval(_ => this.calculateCost(), REFRESH_TIME);
    }

    private calculateCost() {
        this.cost = Math.floor((MIN_COST + Math.random() * (MAX_COST - MIN_COST)) * this.maxCost);
    }
    
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    
    public get maxCost(): number {
        return this._maxCost;
    }
    public set maxCost(value: number) {
        this._maxCost = value;
    }

    public get cost(): number {
        return this._cost;
    }

    public set cost(value: number) {
        this._cost = value;
    }

    public json(): any {
        return {
            name: this.name,
        }
    }
}