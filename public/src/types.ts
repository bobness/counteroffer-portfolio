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

export interface Question {
  id: number;
  user_id: number;
  question: string;
  type: string;
  required: boolean;
}

export interface Message {
  id: number;
  question_id: number;
  sender: any;
  value: string;
}

export interface OpportunityTag {
  id: number;
  selected: boolean;
  name: string;
}

export interface Opportunity {
  id: number;
  messages: Message[];
  tags: OpportunityTag[];
}
