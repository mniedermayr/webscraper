export interface IWordProcessor {
    filterWords(words: string[]): string[];
    countWords(words: string[]): Record<string, number>;
}