function processDomainCount(stats) {
  if (stats.length === 0) return;
  
  // TODO: repeat what I already did

  return stats;
}

console.table(processDomainCount([
  'UselessDate,www.google.com,140',
  'UselessDate,www.google.com,140',
  'UselessDate,happy.com,140',
  'UselessDate,fun.times.yahoo.com,140'
]));