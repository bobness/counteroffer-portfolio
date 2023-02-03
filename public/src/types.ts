export interface Fact {
  id: number;
  key: string;
  value: string;
}

export interface Tag {
  id: number;
  value: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  startdate: Date;
  enddate?: Date;
  summary: string;
  tags: Tag[];
}

export interface Portfolio {
  name: string;
  facts: Fact[];
  experiences: Experience[];
}
