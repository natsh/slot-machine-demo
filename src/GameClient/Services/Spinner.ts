class Spinner {
    private min: number;
    private max: number;

    constructor(min: number = 5, max: number = 7) {
        if (min > max) {
            throw new Error("Minimum value cannot be greater than maximum value");
        }

        this.min = min;
        this.max = max;
    }

    spin(): number[] {
        // Generates three random numbers between this.min and this.max
        const spinResult = Array.from({ length: 3 }, () => Math.floor(Math.random() * (this.max - this.min + 1)) + this.min);
        return spinResult;
    }
}

export default new Spinner();