export class WordProcessor {
    filterWords(words) {
        return words.filter(word => !['ich', 'du', 'er', 'sie', 'es', 'und'].includes(word));
    }
    countWords(words) {
        return words.reduce((counts, word) => {
            counts[word] = (counts[word] || 0) + 1;
            return counts;
        }, {});
    }
}
//# sourceMappingURL=WordProcessor.js.map