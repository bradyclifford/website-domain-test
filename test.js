function processDomainCount(stats) {
  if (stats.length === 0) return;

  const splitUpStats = stats.map(stat => stat.split(',').slice(1));

  const aggregateFullDomains = splitUpStats.reduce((accumulator, stat) => {
    if (stat.length !== 2) return;
    const [website, count] = stat;

    const parseCount = parseInt(count);
    if (isNaN(parseCount)) return accumulator;

    const existingCount = accumulator[website] || 0;

    accumulator[website] = existingCount + parseCount;

    return accumulator;
  }, {});

  let splitSubjects = {};
  for(const [website, count] of Object.entries(aggregateFullDomains)) {
    const subjects = website.split('.');

    splitSubjects = {
      ...splitSubjects,
      ...(subjects.reduce((accumulator, subject, index) => {

        const composedSubjectName = subjects.slice(index - subjects.length).join('.');
        const existingCount = splitSubjects[composedSubjectName] || 0;

        accumulator[composedSubjectName] = existingCount + count;
        return accumulator;
      }, {}))
    };
  }

  return Object.entries(splitSubjects);
}

console.table(processDomainCount([
  'UselessDate,www.google.com,140',
  'UselessDate,www.google.com,130',
  'UselessDate,happy.com,140',
  'UselessDate,fun.times.yahoo.com,140',
  'UselessDate,mail.google.com,130'
]));
