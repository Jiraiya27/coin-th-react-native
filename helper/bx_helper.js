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

export const formatNumber = (number) => {
  return Number(number).toLocaleString('thai')
}