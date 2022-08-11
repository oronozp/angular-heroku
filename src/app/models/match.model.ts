import { Team } from "./team.model";

export interface Match {
  date: string; // Contiene la frase
  local: Team;
  visit: Team;
}
