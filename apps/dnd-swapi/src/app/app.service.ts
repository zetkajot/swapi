import { Injectable } from '@nestjs/common';
import { CachedSWClientService } from '@self/cached-sw-client';
import { FilmResponse } from '@self/sw-client';
import { isAlphanumericOrSingleQt } from './utils';
import AhoCorasick from 'ahocorasick';

@Injectable()
export class AppService {
  constructor(private readonly swClient: CachedSWClientService) {}

  public async getWordsCounts(
    caseSensitive: boolean
  ): Promise<[string, number][]> {
    // using POJO since it's on average faster than Map and
    // we don't need any Map-specific features
    const dict: Record<string, number> = {};
    const allFilms = await this.getAllFilms();

    for (const film of allFilms) {
      let wordBuffer = '';
      for (const char of film.opening_crawl) {
        if (!isAlphanumericOrSingleQt(char)) {
          // flush wordBuffer if not empty
          if (wordBuffer.length > 0) {
            dict[wordBuffer] !== undefined
              ? (dict[wordBuffer] += 1)
              : (dict[wordBuffer] = 1);
            wordBuffer = '';
          }
        } else {
          wordBuffer += caseSensitive ? char : char.toLowerCase();
        }
      }
      // flush wordBuffer at the end if not empty
      if (wordBuffer.length > 0) {
        dict[wordBuffer] !== undefined
          ? (dict[wordBuffer] += 1)
          : (dict[wordBuffer] = 1);
        wordBuffer = '';
      }
    }
    return Object.entries(dict);
  }

  private async getAllFilms(): Promise<FilmResponse[]> {
    const films: FilmResponse[] = [];
    let hasNext = true;
    for (let page = 1; hasNext; page++) {
      const { results, next } = await this.swClient.getFilms({ page });
      films.push(...results);
      hasNext = next !== null;
    }
    return films;
  }

  public async getMostFrequentCharacter(): Promise<string[]> {
    const names = await this.getAllPeopleNames();
    const allFilmsCrawls = (await this.getAllFilms()).map(
      (f) => f.opening_crawl
    );
    const ac = new AhoCorasick(names);
    const dict: Record<string, number> = {};
    for (const crawl of allFilmsCrawls) {
      const results = ac.search(crawl);
      results.forEach(([idx, matchedNames]) => {
        if (matchedNames.length > 1) {
          console.error(
            `Multiple matched names at idx ${idx}: ${matchedNames}`
          );
        }
        dict[matchedNames[0]] !== undefined
          ? (dict[matchedNames[0]] += 1)
          : (dict[matchedNames[0]] = 1);
      });
    }

    const sorted = Object.entries(dict).sort(([,lCount], [,rCount]) => rCount - lCount);
    const result = [];
    for (const [name, count] of sorted) {
      if (count < sorted[0][1]) {
        break;
      }
      result.push(name);
    }

    return result;
    
  }

  private async getAllPeopleNames(): Promise<string[]> {
    const names: string[] = [];
    let hasNext = true;
    for (let page = 1; hasNext; page++) {
      const { results, next } = await this.swClient.getPeoples({ page });
      names.push(...results.map((r) => r.name));
      hasNext = next !== null;
    }
    return names;
  }
}
