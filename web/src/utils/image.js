// Free Pexels photos (https://www.pexels.com/license/) loaded by id at the width we need.
export function pexels(id, width = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}
