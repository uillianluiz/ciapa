

export default class Util {

    /**
    * Returns an integer between the given range
    * @param min minimum value (inclusive)
    * @param max maximum value (exclusive)
    */
    public static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
    }
}
