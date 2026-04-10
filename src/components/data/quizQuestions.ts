// data/quizQuestions.ts
export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const quizQuestions: Record<number, QuizQuestion[]> = {
  // Mathematik (IDs 1-6)
  1: [
    { id: 1, text: 'Berechne: 5 + 3 × 2', options: ['16', '11', '10', '13'], correct: 1, explanation: 'Punkt vor Strich: 3 × 2 = 6, dann 5 + 6 = 11' },
    { id: 2, text: 'Setze x = 3 in den Term 4x - 2 ein.', options: ['10', '14', '12', '9'], correct: 0, explanation: '4 × 3 = 12, 12 - 2 = 10' },
    { id: 3, text: 'Was ist der Wert von 2a + 3a, wenn a = 4?', options: ['20', '14', '24', '18'], correct: 0, explanation: '2a + 3a = 5a, 5 × 4 = 20' },
  ],
  2: [
    { id: 1, text: 'Ein Term für "das Dreifache einer Zahl, vermindert um 7" lautet:', options: ['3x - 7', '3(x - 7)', '7 - 3x', '3x + 7'], correct: 0, explanation: 'Dreifache = 3x, vermindert um 7 = -7' },
    { id: 2, text: 'Übersetze: "Der Umfang eines Quadrats mit Seitenlänge a"', options: ['a²', '4a', 'a + 4', '2a'], correct: 1, explanation: 'Umfang = 4 × Seitenlänge = 4a' },
  ],
  3: [
    { id: 1, text: 'Vereinfache: 7x + 3y - 2x + y', options: ['5x + 4y', '9x + 2y', '5x + 2y', '9x + 4y'], correct: 0, explanation: '7x - 2x = 5x, 3y + y = 4y → 5x + 4y' },
  ],
  4: [
    { id: 1, text: 'Vereinfache: 4x · 3x', options: ['12x', '12x²', '7x', '7x²'], correct: 1, explanation: '4·3 = 12, x·x = x² → 12x²' },
    { id: 2, text: 'Berechne: (6x) / (2x) für x ≠ 0', options: ['3x', '3', '4x', '4'], correct: 1, explanation: '6/2 = 3, x/x = 1 → 3' },
  ],
  5: [
    { id: 1, text: 'Multipliziere aus: 3(x + 4)', options: ['3x + 4', '3x + 12', 'x + 12', '3x + 7'], correct: 1, explanation: '3·x + 3·4 = 3x + 12' },
    { id: 2, text: 'Löse die Klammer auf: (x + 2)(x + 3)', options: ['x² + 5x + 6', 'x² + 6x + 5', 'x² + 5', 'x² + 6'], correct: 0, explanation: 'x·x + x·3 + 2·x + 2·3 = x² + 5x + 6' },
  ],
  6: [
    { id: 1, text: 'Löse die Klammer auf: 5 - (x + 2)', options: ['3 - x', '7 - x', '3 + x', '7 + x'], correct: 0, explanation: 'Minusklammer: Vorzeichenwechsel → 5 - x - 2 = 3 - x' },
    { id: 2, text: 'Vereinfache: 2x - (3x - 4)', options: ['-x + 4', '5x + 4', '-x - 4', '5x - 4'], correct: 0, explanation: '2x - 3x + 4 = -x + 4' },
  ],
};