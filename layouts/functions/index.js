// Get readable hashrate
export function getReadableHashRateString(hashrate) {
  let i = 0;
  const byteUnits = [' H', ' KH', ' MH', ' GH', ' TH', ' PH'];
  while (hashrate > 1000) {
    hashrate = hashrate / 1000;
    i++;
  }
  if (typeof hashrate != 'number') hashrate = 0;
  return hashrate.toFixed(2) + byteUnits[i];
}

// Convert float to string
function floatToString(float) {
  return float.toFixed(6).replace(/[0\.]+$/, '');
}

//coin decimal
export function getCoinDecimalPlace(stats) {
  if (typeof coinDecimalPlaces != 'undefined') return coinDecimalPlaces;
  else if (stats.config.coinDecimalPlaces) return stats.config.coinDecimalPlaces;
  else stats.config.coinUnits.toString().length - 1;
}

//coin
export function getReadableCoin(stats, coins, digits, withoutSymbol) {
  let coinDecimalPlaces = getCoinDecimalPlace(stats);
  let amount = parseFloat(
    (parseInt(coins || 0) / stats.config.coinUnits).toFixed(digits || coinDecimalPlaces)
  );
  return amount.toString() + (withoutSymbol ? '' : ' ' + stats.config.symbol);
}

///time readable

if (typeof langs == 'undefined') {
  var langs = { en: 'English' };
}

if (typeof defaultLang == 'undefined') {
  var defaultLang = 'en';
}

var langCode = defaultLang;
var langData = null;

function getTranslation(key) {
  if (!langData || !langData[key]) return null;
  return langData[key];
}
// Get readable time
export function getReadableTime(seconds) {
  const units = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4, 'week'],
    [12, 'month'],
    [1, 'year'],
  ];

  function formatAmounts(amount, unit) {
    const rounded = Math.round(amount);
    unit = unit + (rounded > 1 ? 's' : '');
    if (getTranslation(unit)) unit = getTranslation(unit);
    return '' + rounded + ' ' + unit;
  }

  let amount = seconds;
  for (let i = 0; i < units.length; i++) {
    if (amount < units[i][0]) {
      return formatAmounts(amount, units[i][1]);
    }
    amount = amount / units[i][0];
  }
  return formatAmounts(amount, units[units.length - 1][1]);
}

//format number
// Format number
export function formatNumber(number, delimiter) {
  if (number != '') {
    number = number.split(delimiter).join('');

    var formatted = '';
    var sign = '';

    if (number < 0) {
      number = -number;
      sign = '-';
    }

    while (number >= 1000) {
      var mod = number % 1000;

      if (formatted != '') formatted = delimiter + formatted;
      if (mod == 0) formatted = '000' + formatted;
      else if (mod < 10) formatted = '00' + mod + formatted;
      else if (mod < 100) formatted = '0' + mod + formatted;
      else formatted = mod + formatted;

      number = parseInt(number / 1000);
    }

    if (formatted != '') formatted = sign + number + delimiter + formatted;
    else formatted = sign + number;
    return formatted;
  }
  return '';
}

//fee
export function getFee(stats) {
  let totalFee = stats.config.fee;
  let soloFee = stats.config.soloFee;
  if (Object.keys(stats.config.donation).length) {
    let totalDonation = 0;
    for (const i in stats.config.donation) {
      totalDonation += stats.config.donation[i];
    }
    totalFee += totalDonation;
    soloFee += totalDonation;
  }
  return (
    (totalFee > 0 && totalFee !== 100 ? floatToString(totalFee) : totalFee === 100 ? '100' : '0') +
    '%/' +
    soloFee +
    '%'
  );
}

// Return blockchain explorer URL
export function getBlockchainUrl(id, stats, blockExplorers) {
  if (stats && blockExplorers) {
    return blockExplorers[stats.config.coin].blockchainExplorer
      .replace('{symbol}', stats.config.symbol.toLowerCase())
      .replace('{id}', id);
  }
}

//chart blocks
export function Chart(rawData, fixValueToCoins, stats) {
  let graphData = {
    labels: [],
    datasets: {
      data: [],
    },
  };
  if (rawData) {
    for (let i = 0, xy; (xy = rawData[i]); i++) {
      graphData.labels.push(new Date(xy[0] * 1000).toLocaleString());
      graphData.datasets.data.push(
        fixValueToCoins ? getReadableCoin(stats, xy[1], null, true) : xy[1]
      );
    }
  }

  return graphData;
}

// Format luck / current effort
export function formatLuck(lastStats, difficulty, shares, solo = false) {
  // Only an approximation to reverse the calculations done in pool.js, because the shares with their respective times are not recorded in redis
  // Approximation assumes equal pool hashrate for the whole round
  let accurateShares;
  // Could potentially be replaced by storing the sum of all job.difficulty in the redis db.
  if (lastStats.config.slushMiningEnabled) {
    // Uses integral calculus to calculate the average of a dynamic function
    accurateShares =
      (1 / lastStats.config.blockTime) * // 1/blockTime to get the average
      (shares *
        lastStats.config.weight * // Basically calculates the 'area below the graph' between 0 and blockTime
        (1 -
          Math.pow(
            Math.E,
            -lastStats.config.blockTime / lastStats.config.weight // blockTime is equal to the highest possible result of (dateNowSeconds - scoreTime)
          )));
  } else {
    accurateShares = shares;
  }

  var percent = Math.round((accurateShares / difficulty) * 100);
  if (!percent) {
    return `?` + (solo === true ? `solo` : ``);
  } else if (percent <= 100) {
    return `${percent}%` + (solo === true ? `solo` : ``);
  } else if (percent >= 101 && percent <= 150) {
    return `${percent}%` + (solo === true ? `solo` : ``);
  } else {
    return `${percent}%` + (solo === true ? `solo` : ``);
  }
}
