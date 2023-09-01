import {Pipe, PipeTransform} from '@angular/core';
import {Coin} from '../models/models';

@Pipe({
  name: 'findCoinById'
})
export class FindCoinByIdPipe implements PipeTransform {
  transform(coins: Coin[] | null, id: number): Coin {
    return <Coin>coins?.find(coin => coin.id === id);
  }
}
