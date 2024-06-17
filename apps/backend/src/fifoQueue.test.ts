import FIFOQueue from './fifoQueue';

describe('FIFOQueue', () => {
    describe('push', () => {
        it('add an action', async () => {
            const fifo = new FIFOQueue();
            await fifo.init();

            (fifo as any)._queue = [];

            await fifo.push({name: 'A'});

            expect(fifo.queue.length).toBe(1);
            expect(fifo.queue[0]).toBe(fifo.actionPool.find(a => a.name === 'A'));
            
            // can't mock because of vi import
            // expect(fifo.save).toHaveBeenCalled();
        });

        it('add an action that doesn\'t exist', async () => {
            const fifo = new FIFOQueue();
            await fifo.init();

            (fifo as any)._queue = [];

            await fifo.push({name: 'D'});

            expect(fifo.queue.length).toBe(0);
            // expect(fifo.save).not.toHaveBeenCalled();
        });
    });

    describe('pop', () => {
        it('pop an action', async () => {
            const fifo = new FIFOQueue();
            await fifo.init();

            (fifo as any)._queue = [];

            await fifo.push({name: 'A'});
            await fifo.pop();

            expect(fifo.queue.length).toBe(0);
        });
    });

    describe('execute', () => {
        it('execute an action', async () => {
            const fifo = new FIFOQueue();
            await fifo.init();

            (fifo as any)._queue = [];

            await fifo.push({name: 'A'});
            await fifo.execute();

            expect(fifo.queue.length).toBe(0);
            // Will failed if config is modified or fifo file exist
            // Should have been mocked :'(
            expect(fifo.creditPool.find(c => c.actionName === 'A')?.credit).toEqual(100 - fifo.actionPool.find(a => a.name === 'A')?.cost!)
        });
    });
})