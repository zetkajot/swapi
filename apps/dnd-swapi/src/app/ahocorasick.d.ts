declare module 'ahocorasick' {
  type AhoCorasickSearchResult = [idx: number, keywords: string[]][]
  export default class AhoCorasick {
    constructor(keywords: string[])
    public search(text: string): AhoCorasickSearchResult;
  }

}