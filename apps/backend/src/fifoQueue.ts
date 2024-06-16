import { readFile, writeFile } from "fs/promises";
import Action from "./action";

const REFRESH_TIME = 15 * 1000;

interface Credit {
    actionName: string
    credit: number
}

export default class FIFOQueue {
    private _queue: Action[] = [];
    private _actionPool: Action[] = [];
    private _creditPool: Credit[] = [];

    constructor(){

        this.loadConfig().then(async actionConfig => {
            const fifo = await this.loadFIFO();
            
            this._actionPool = actionConfig.map(a => new Action(a));
            
            if (fifo) {
                this._creditPool = fifo._creditPool;
                this._queue = fifo._queue.map(q => this.actionPool.find(a => q._name === a.name));
                } else {
                this._creditPool = actionConfig.map(a => {return {actionName: a.name, credit: a.startingCredit }});
            }

            setInterval(_ => this.execute() , REFRESH_TIME);
        });
    }

    private loadConfig():Promise<any> {
        return readFile('apps/backend/config/actions.json', 'utf-8')
        .then(data => JSON.parse(data))
        .catch (e => {
            console.error('Missing config/actions.json file');
            throw e;
        }) 
    }

    private loadFIFO(): Promise<any> {
        return readFile('apps/backend/fifo.json', 'utf-8')
            .then(data => {
                console.log('FIFO found');
                return JSON.parse(data);
            })
            .catch(e => {
                console.log('No FIFO found, starting a new one');
                return null;
            }); 

    }

    push(actionName: {name: string}) {
        const action = this.actionPool.find(a => a.name === actionName.name);
        if (action) {
            this.queue.push(action);
            this.save();
        } 
    }

    pop(): Action | undefined{
        let action: Action | undefined = this.queue[0];

        if (action) {
            const credit = this.creditPool.find(c => c.actionName === action?.name);
            
            if (credit && action.cost <= credit?.credit) {
                action = this.queue.shift();
                this.save();
                return action;
            }
        }
        return undefined;
    }

    execute() {
        const action = this.pop();

        if (action) {
            const credit = this._creditPool.find(c => c.actionName === action.name);

            if (credit) credit.credit -= action.cost;
        }
    }

    save() {
        writeFile('apps/backend/fifo.json', JSON.stringify(this)).then(_ => console.log('FIFO saved'));
    }

    public get actionPool(): Action[] {
        return this._actionPool;
    }

    public get creditPool(): Credit[] {
        return this._creditPool;
    }

    public get queue(): Action[] {
        return this._queue;
    }
}