import { IWordProcessor } from "./IWordProcessor.js";

export class WordProcessor implements IWordProcessor {
    filterWords(words: string[]): string[] {
        return words.filter(word => !['ich', 'du', 'er', 'sie', 'es', 'und'].includes(word));
    }

    countWords(words: string[]): Record<string, number> {
        return words.reduce((counts: Record<string, number>, word) => {
            counts[word] = (counts[word] || 0) + 1;
            return counts;
        }, {});
    }
}