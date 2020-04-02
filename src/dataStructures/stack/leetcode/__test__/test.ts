import { balanceSymbol } from '../balanceSymbol';
import { postfix } from '../postfix';

describe('leetcode stack', () => {
  it('balanceSymbol', () => {
    expect(balanceSymbol('(aaa)[]['))
    .toBeFalsy();
    expect(balanceSymbol('[aaa)[]]'))
    .toBeFalsy();
    expect(balanceSymbol('}]aaa()[]'))
    .toBeFalsy();
    expect(balanceSymbol('([({})[{}]])aaa()[]'))
    .toBeTruthy();
  });

  it('postfix', () => {
    expect(postfix([
      6,
      5,
      2,
      3,
      '+',
      '/',
      '-',
      8,
      '+',
      3,
      'a',
      '*',
    ]))
    .toBe(9);
  });
});
