function getExecutingPlatform(fst, snd, ...rest) {
  // get platform
  // on amazon, second param is 'context' and hsa these fields
  if (
    snd &&
    typeof snd.invokedFunctionArn === 'string'
    && typeof snd.functionName === 'string'
    && typeof snd.awsRequestId === 'string'
  ) {
    return 'amazon'
  }

  if (
    fst &&
    typeof fst.method === 'string'
    && fst.get  // some methods that Express' Request objs alwys have
    && fst.accepts
    && fst.acceptsCharsets
    && fst.param
  ) {
    return 'google'
  }

  throw new Error("Couldn't recognize platform running this code, seems neither to be GC Functions nor Amazon Lambda");
}


function transformInputGoogle(first, second, third, fourth) {
  const req = first
  const event = {
    ...req.query,
    ...req.body
  }

  return [ event ]
}

function transformInputAmazon(first, second, third, fourth) {
  return [ first]
}

module.exports = {
  transformInputAmazon,
  transformInputGoogle,
  getExecutingPlatform
}