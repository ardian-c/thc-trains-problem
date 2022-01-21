interface IQueue<T> {
    add(item: T): void;
    remove(): T|undefined;
    isEmpty(): boolean;
    size(): number;
}

export class Queue<T> implements IQueue<T> {
    private queue: T[] = [];

    constructor(private capacity: number = Infinity) {}

    add(item: T): void {
        if(this.size() === this.capacity) {
            throw Error("Queue max capacity reached.");
        }
        this.queue.push(item);
    }

    remove(): T | undefined {
        return this.queue.shift();
    }

    isEmpty():boolean {
        return this.queue.length === 0;
    }

    size(): number {
        return this.queue.length;
    }
}