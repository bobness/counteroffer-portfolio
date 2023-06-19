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

export interface Theme {
  id: number;
  user_id: number;
  name: string;
  tags: string[];
}

export interface Portfolio {
  name: string;
  facts: Fact[];
  experiences: Experience[];
  themes: Theme[];
}

export interface Question {
  id: number;
  user_id: number;
  question: string;
  type: "text" | "textarea" | "skills";
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

export interface Suggestion {
  text: string;
  reason: string;
  selected?: boolean;
}
