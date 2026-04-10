// data/competencyStatements.ts
export type Rating = 'good' | 'medium' | 'poor';

export const competencyStatements: Record<number, string[]> = {
  // Mathematik (IDs 1-6)
  1: ['Ich kann Zahlen in einfache Terme einsetzen.', 'Ich kann die Rechenreihenfolge (Punkt vor Strich) beachten.', 'Ich kann Ergebnisse korrekt berechnen.'],
  2: ['Ich kann aus einem Text eine mathematische Formel ableiten.', 'Ich kann Variable sinnvoll wählen.', 'Ich kann den Term so schreiben, dass er den Sachverhalt richtig abbildet.'],
  3: ['Ich kann gleichartige Glieder erkennen.', 'Ich kann Terme durch Zusammenfassen vereinfachen.', 'Ich kann Rechengesetze (Kommutativ‑, Assoziativgesetz) anwenden.'],
  4: ['Ich kann Terme mit Multiplikation und Division vereinfachen.', 'Ich kann Koeffizienten multiplizieren/dividieren.', 'Ich kann Variablen zusammenfassen (z.B. x * x = x²).'],
  5: ['Ich kann das Distributivgesetz anwenden.', 'Ich kann Produkte aus Summen bilden.', 'Ich kann mehrfache Klammern ausmultiplizieren.'],
  6: ['Ich kann Klammern mit Minuszeichen auflösen (Vorzeichenwechsel).', 'Ich kann verschachtelte Klammern schrittweise auflösen.', 'Ich kann den Term nach dem Auflösen vereinfachen.'],
  
  // Deutsch (IDs 7-12)
  7: ['Ich kann verbale und nonverbale Kommunikation unterscheiden.', 'Ich kann aktives Zuhören anwenden.', 'Ich kann Ich‑Botschaften formulieren.'],
  8: ['Ich kann ein Telefonat situationsgerecht führen.', 'Ich kann ein Kundengespräch simulieren.', 'Ich kann mich in einem Vorstellungsgespräch angemessen präsentieren.'],
  9: ['Ich kann eine Präsentation gliedern.', 'Ich kann Folien oder ein Plakat gestalten.', 'Ich kann frei vortragen und auf Fragen eingehen.'],
  10: ['Ich kann einen Unfallbericht sachlich schreiben.', 'Ich kann einen Praktikumsbericht strukturieren.', 'Ich kann eine Vorgangsbeschreibung erstellen.'],
  11: ['Ich kann einen formellen Geschäftsbrief aufbauen.', 'Ich kann höfliche Formulierungen verwenden.', 'Ich kann eine E‑Mail mit Betreff und Anhang verfassen.'],
  12: ['Ich kann Argumente sammeln und gewichten.', 'Ich kann eine lineare Erörterung schreiben.', 'Ich kann eine dialektische Erörterung anwenden.'],
  
  // Englisch (IDs 13-17)
  13: ['I can structure a CV.', 'I can write a formal cover letter.', 'I can use appropriate phrases for job applications.'],
  14: ['I can answer typical interview questions.', 'I can ask polite questions about the job.', 'I can present my strengths clearly.'],
  15: ['I can make a business call.', 'I can take a message correctly.', 'I can handle inquiries in English.'],
  16: ['I can write a formal email.', 'I can write an informal email.', 'I can use a proper subject line and attachments.'],
  17: ['I can prepare a short presentation.', 'I can describe facts and figures.', 'I can use visual aids effectively.'],
  
  // BWL (IDs 18-22)
  18: ['Ich kann die Bereiche Beschaffung, Produktion und Absatz erklären.', 'Ich kann die Zusammenarbeit der Bereiche darstellen.', 'Ich kann ein Beispielunternehmen zuordnen.'],
  19: ['Ich kann Angebote nach Preis und Lieferbedingungen vergleichen.', 'Ich kann Skonto berechnen.', 'Ich kann eine Bestellung auslösen.'],
  20: ['Ich kann Einzel‑ und Gemeinkosten unterscheiden.', 'Ich kann eine Kalkulation durchführen.', 'Ich kann den Verkaufspreis ermitteln.'],
  21: ['Ich kann die vier P (Product, Price, Place, Promotion) erklären.', 'Ich kann einen Marketing‑Mix für ein Produkt entwickeln.', 'Ich kann Werbemaßnahmen begründen.'],
  22: ['Ich kann einen Geschäftsprozess vom Auftrag bis zur Rechnung simulieren.', 'Ich kann Belege (Angebot, Auftrag, Lieferschein) zuordnen.', 'Ich kann das Ergebnis präsentieren.'],
};