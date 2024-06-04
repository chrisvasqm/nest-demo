import {Injectable} from '@nestjs/common';
import Cat from 'src/models/Cat';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {id: 1, name: 'Meow'},
    {id: 2, name: 'Meow 2'},
    {id: 3, name: 'Meow 3'},
  ];

  getAll() {
    return this.cats;
  }

  find(id: number) {
    return this.cats.find((c) => c.id === id);
  }
}

export default CatsService;
