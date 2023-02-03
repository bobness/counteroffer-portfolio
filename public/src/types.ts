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

export interface OpportunityMessage {
  id: number;
  text: string;
  sender: any;
  required: boolean;
  value: string;
}

export interface OpportunityTag {
  id: number;
  selected: boolean;
  name: string;
}

export interface Opportunity {
  id: number;
  messages: OpportunityMessage[];
  tags: OpportunityTag[];
}
