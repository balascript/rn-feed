import React, { useEffect, useCallback, useState } from 'react';
import { fetchPhotosForKeyword, fetchPhotos } from '../helpers/unsplash';
import { FlatList, Image, Text, View } from 'react-native';

function useUnsplashPhotos(keyword) {
  const [page, setPage] = useState(1);
  // default this to true to kick the initial effect hook to
  // fetch the first page
  const [shouldFetch, setShouldFetch] = useState(true);
  const [photos, setPhotos] = useState([]);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(
    () => {
      // prevent fetching for other state changes
      if (!shouldFetch) {
        return;
      }

      const fetch = async () => {
        const newPhotos = await fetchPhotos(keyword, page, 20);
        setShouldFetch(false);
        setPhotos(oldPhotos => [...oldPhotos, ...newPhotos]);
        setPage(page + 1);
      };

      fetch();
    },
    // prevent fetching for other state changes
    [page, shouldFetch],
  );

  return [photos, fetchMore];
}

export const UnsplashFeed = props => {
  const { tag } = props;

  console.log(tag);
  const [photos, fetchMore] = useUnsplashPhotos(tag);

  const renderItem = ({ item, index }) => {
    const { uri } = item;
    return (
      <Image
        source={{
          uri,
        }}
        style={{ height: 400 }}
        resizeMode="cover"
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={photos}
        extraData={photos}
        onEndReached={fetchMore}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        onEndReachedThreshold={0.9}
      />
    </View>
  );
};
