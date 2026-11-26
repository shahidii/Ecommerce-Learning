// Photos are free Pexels images (https://www.pexels.com/license/): free to use, no attribution required.
// Every Pexels photo can be loaded from its id at any size:
//   https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=<width>
const pexels = (id, width = 1200) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

module.exports = pexels;
