export interface Evenement {
  id: number;
  title: string;
  date: string;
  domaine: string;
}

export interface EvenementEtablissement {
  id: number;
  nom: string;
  description: string;
  creneau: Date;
  nom_etablissement: string;
  id_etablissement: number;
  note_etablissement: number;
  tags : string[];
  duree: number;
}