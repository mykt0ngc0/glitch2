const makeTVDisplacement = require('../displace/tv');
const displacementMapper = require('../displace/mapper');
const defaults = require('../lib/defaults');
const p = require('../param');

function tvDisplacement(glitchContext, options) {
  options = defaults(options, tvDisplacement.paramDefaults);
  let data = glitchContext.getImageData();
  let dismap;
  const dismapCacheKey = `tvdis_${data.width}_${data.height}`;
  if (!(dismap = glitchContext.persist[dismapCacheKey])) {
    dismap = glitchContext.persist[dismapCacheKey] = makeTVDisplacement(data.width, data.height);
  }
  data = displacementMapper(data, dismap, options.strengthX, options.strengthY);
  glitchContext.setImageData(data);
}

tvDisplacement.paramDefaults = {
  strengthX: 0,
  strengthY: 0,
};

tvDisplacement.params = [
  p.int('strengthX', {description: 'displacement strength (x)', min: -250, max: +250}),
  p.int('strengthY', {description: 'displacement strength (y)', min: -250, max: +250}),
];

module.exports = tvDisplacement;
