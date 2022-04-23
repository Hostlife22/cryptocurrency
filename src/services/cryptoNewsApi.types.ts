export interface QueryContext {
  _type: string;
  originalQuery: string;
  adultIntent: boolean;
}

export interface Sort {
  _type: string;
  name: string;
  id: string;
  isSelected: boolean;
  url: string;
}

export interface Thumbnail {
  _type: string;
  contentUrl: string;
  width: number;
  height: number;
}

export interface Image {
  _type: string;
  thumbnail: Thumbnail;
}

export interface About {
  _type: string;
  readLink: string;
  name: string;
}

export interface Mention {
  _type: string;
  name: string;
}

export interface Thumbnail2 {
  _type: string;
  contentUrl: string;
}

export interface Image2 {
  _type: string;
  thumbnail: Thumbnail2;
}

export interface Provider {
  _type: string;
  name: string;
  image: Image2;
}

export interface Thumbnail3 {
  _type: string;
  width: number;
  height: number;
}

export interface Video {
  _type: string;
  name: string;
  motionThumbnailUrl: string;
  thumbnail: Thumbnail3;
}

export interface Value {
  _type: string;
  name: string;
  url: string;
  image: Image;
  description: string;
  about: About[];
  mentions: Mention[];
  provider: Provider[];
  datePublished: Date;
  category: string;
  video: Video;
}

export interface ICryptoNewsDate {
  _type: string;
  readLink: string;
  queryContext: QueryContext;
  totalEstimatedMatches: number;
  sort: Sort[];
  value: Value[];
}

export interface NewsCryptoQuery {
  newsCategory: string;
  count: number;
}
