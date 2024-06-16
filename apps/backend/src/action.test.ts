import Action from './action';

describe('Actions', () => {
    it('Constructor', () => {
        const action = new Action({name: 'test', maxCost: 10, startingCredit: 100});

        expect(action.name).toBe('test');
        expect(action.maxCost).toBe(10);
        expect(action.cost).not.toBeUndefined();
    });

    it('Json', () => {
        const action = new Action({name: 'test', maxCost: 10, startingCredit: 100});

        expect(action.json()).toEqual({name: 'test'});
    })
});