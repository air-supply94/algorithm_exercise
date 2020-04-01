import { compareFunctionType } from '../@types';
import { InterfaceComparator } from './@types';

export class Comparator implements InterfaceComparator {
  constructor(comparatorFunction: Comparator | compareFunctionType = Comparator.defaultCompareFunction) {
    if (comparatorFunction instanceof Comparator) {
      return comparatorFunction;
    }
    this.compare = comparatorFunction;
  }

  public static defaultCompareFunction(a, b) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }

  private compare: compareFunctionType;

  public equal(a, b) {
    return this.compare(a, b) === 0;
  }

  public lessThan(a, b) {
    return this.compare(a, b) < 0;
  }

  public greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }

  public lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  public greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  public reverse() {
    const compareOriginal = this.compare;
    // tslint:disable-next-line:only-arrow-functions
    this.compare = function (a, b) {
      return compareOriginal(b, a);
    };
    return this;
  }
}

export * from './@types';
