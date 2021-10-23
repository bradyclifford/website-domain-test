function processDomainCount(stats) {
  if (stats.length === 0) return;


  const splitUpStats = stats.map(stat => stat.split(','));

  const totals = splitUpStats.reduce((accumulator, stat) => {
    if (stat.length !== 2) return;
    const [website, count] = stat;
    const existingCount = accumulator[website] || 0;

    accumulator[website] = existingCount + count;
  }, {});

  console.log(totals)

  return stats;
}

console.table(processDomainCount([
  'UselessDate,www.google.com,140',
  'UselessDate,www.google.com,140',
  'UselessDate,happy.com,140',
  'UselessDate,fun.times.yahoo.com,140'
]));
