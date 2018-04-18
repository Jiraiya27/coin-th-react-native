export const getNameFromSymbol = (symbol) => {
  switch (symbol) {
    case 'BTC':
      return 'Bitcoin'
    case 'ETH':
      return 'Ethereum'
    case 'DAS':
      return 'Dash'
    case 'XRP':
      return 'Ripple'
    case 'BCH':
      return 'BitcoinCash'
    case 'OMG':
      return 'Omise GO'
    case 'REP':
      return 'Augur'
    case 'DOG':
      return 'Dogecoin'
    case 'EVX':
      return 'Everex Token'
    case 'LTC':
      return 'Litecoin'
    case 'FTC':
      return 'Feathercoin'
    case 'GNO':
      return 'Gnosis'
    case 'HYP':
      return 'HyperStake'
    case 'NMC':
      return 'Namecoin'
    case 'PND':
      return 'Pandacoin'
    case 'POW':
      return 'Power Ledger'
    case 'PPC':
      return 'Peercoin'
    case 'QRK':
      return 'Quark'
    case 'XCN':
      return 'Cryptonite'
    case 'XPM':
      return 'Primecoin'
    case 'XPY':
      return 'Paycoin'
    case 'XZC':
      return 'Zcoin'
    case 'ZEC':
      return 'Zcash'
    default:
      return 'Default_Name'
  }
}

export const getCurrencyUnit = (symbol) => {
  switch (symbol) {
    case 'THB':
      return '฿'
    default:
      return symbol
  }
}

export function formatNumber(number, decimals, dec_point, thousands_sep) {
  let n = !isFinite(+number) ? 0 : +number, 
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      toFixedFix = function (n, prec) {
          // Fix for IE parseFloat(0.55).toFixed(0) = 0;
          var k = Math.pow(10, prec);
          return Math.round(n * k) / k;
      },
      s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
  if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}