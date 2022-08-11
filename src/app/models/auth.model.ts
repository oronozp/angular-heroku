export interface Auth {
  user: string; // Contiene la frase
  pwd: string;
  token: string; // Identificador la frase aleatoria
  msq: string; // URL que contiene el ID y permite recuperar la frase
}
