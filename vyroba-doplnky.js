// Production-plan supplements for Trello cards that lack the product / deadline section.
// Trello is never changed — vyroba.html appends this text to the card description when parsing.
// Key = Trello card id. Value = same markdown format zakazka.html writes:
//   **Termín:** DD.MM.YYYY
//   ## 🛒 Produkty
//   (blank line)
//   **Gift name**
//   - 30 ks
//     📦 PRODUCT 100g eko kelímek (kód 161), ...
// Trello's own data wins: a section already on the card is used before the supplement.
window.VYROBA_DOPLNKY = {
};
