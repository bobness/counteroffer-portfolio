export interface Fact {
  // id: number;
  key: string;
  value: string;
}

export interface Tag {
  value: string;
}

export interface Experience {
  // id: number;
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  summary: string;
  tags: Tag[];
}

export interface Portfolio {
  name: string;
  facts: Fact[];
  experiences: Experience[];
}
