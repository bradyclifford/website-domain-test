function processDomainCount(stats) {
  if (stats.length === 0) return;


  const splitUpStats = stats.map(stat => stat.split(',').slice(1));

  const totals = splitUpStats.reduce((accumulator, stat) => {
    if (stat.length !== 2) return;
    const [website, count] = stat;

    const parseCount = parseInt(count);
    if (isNaN(parseCount)) return accumulator;

    const existingCount = accumulator[website] || 0;

    accumulator[website] = existingCount + parseCount;
    return accumulator;
  }, {});

  let parsedStates = [];
  for(const [website, count] of Object.entries(totals)) {
    const subjects = website.split('.');

    // Do we really need to add a single subject?
    if (subjects.length < 2) {
      parsedStates.push([website, count]);
      continue;
    }

    parsedStates.concat(
      subjects.reduce((accumulator, subject, index) => {
        accumulator.push([
          subjects.slice(index - subjects.length),
          count,
        ])

        return accumulator;
      }, [])
    );
  }

  return parsedStates;
}

console.table(processDomainCount([
  'UselessDate,www.google.com,140',
  'UselessDate,www.google.com,140',
  'UselessDate,happy.com,140',
  'UselessDate,fun.times.yahoo.com,140'
]));
