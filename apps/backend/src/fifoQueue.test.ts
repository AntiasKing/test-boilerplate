import FIFOQueue from './fifoQueue';

describe('FIFOQueue', () => {
    describe('push', () => {
        it('add an action', () => {
            const fifo = new FIFOQueue();

            (fifo as any)._queue = [];

            fifo.push({name: 'A'});

            expect(fifo.queue.length).toBe(1);
            expect(fifo.queue[0]).toBe(fifo.actionPool.find(a => a.name === 'A'));
        });
    });
})