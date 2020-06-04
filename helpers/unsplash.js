import Unsplash, { toJson } from 'unsplash-js';
import { SECRET, ACCESS_KEY } from './unspashconfig';

const unsplashInstance = new Unsplash({
  secret: SECRET,
  accessKey: ACCESS_KEY,
});

export async function fetchPhotos(keyword, page, limit = 10) {
  const photoResult = await unsplashInstance.search
    .photos(keyword, page, limit)
    .then(toJson);

  if (!Array.isArray(photoResult.results)) {
    return [];
  }

  // map the response to a simpler format for Flatlist
  const photos = photoResult.results.map(({ urls, id }) => ({
    key: id,
    id,
    uri: urls.small,
  }));

  return photos;
}

export const fetchPhotosForKeyword = async (keyword, page, limit = 10) => {
  const photoResult = await unsplashInstance.search
    .photos(keyword, page, limit)
    .then(toJson);

  if (!Array.isArray(photoResult.results)) {
    return [];
  }

  const response = photoResult.results.map(({ urls, id }) => ({
    key: id,
    id,
    uri: urls.small,
  }));

  return response;
};
