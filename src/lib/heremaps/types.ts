export interface HereMapsTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface HereMapsPlace {
  id?: string;
  ontologyId?: string;
  title?: string;
  language?: string;
  resultType?: string;
  localityType?: string;
  administrativeAreaType?: string;
  addressBlockType?: string;
  houseNumberType?: string;
  address?: HereMapsAddress;
  position?: HereMapsCoordinates;
  access?: [HereMapsCoordinates];
  distance: number;
  categories: [HereMapsCagetory];
  contacts: [HereMapsContact];
  openingHours: [HereMapsOpeningHours];
  chains?: [HereMapsChain];
  foodTypes?: [HereMapsFoodType];
  references?: [HereMapsReference];
  payment?: HereMapsPayments;
  mayView?: HereMapsMapsView;
}

export interface HereMapsAddress {
  label?: string;
  countryCode?: string;
  countryName?: string;
  stateCode?: string;
  state?: string;
  county?: string;
  city?: string;
  district?: string;
  street?: string;
  postalCode?: string;
  houseNumber?: string;
}

export interface HereMapsCoordinates {
  lat: number;
  lng: number;
}

export interface HereMapsCagetory {
  id: string;
  name: string;
  primary?: boolean;
}

export interface HereMapsChain {
  id: string;
  name: string;
}

export interface HereMapsContact {
  email?: [HereMapsContact];
  phone?: [HereMapsContact];
  tollFree?: [HereMapsContact];
  www?: [HereMapsContact];
  fax?: [HereMapsContact];
}

export interface HereMapsContact {
  value: string;
  categories?: [any];
}

export interface HereMapsOpeningHours {
  text?: [string];
  categories?: [any];
  isOpen: boolean;
  structured?: [HereMapsOpeningHoursStructure];
}

export interface HereMapsOpeningHoursStructure {
  start: string;
  duration: string;
  recurrence: string;
}

export interface HereMapsPayments {
  methods: [HereMapsPaymentMethod];
}

export interface HereMapsPaymentMethod {
  id: string;
  accepted?: boolean;
  currencies?: [string];
}

export interface HereMapsMapsView {
  west: string;
  east: string;
  north: string;
  south: string;
}

export interface HereMapsFoodType {
  id: string;
  name: string;
  primary?: boolean;
}

export interface HereMapsReference {
  supplier: {
    id: string;
  };
  id: string;
}

// 39.35886716118358, -84.36526661390532
