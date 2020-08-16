import React, { useEffect, useCallback, useState, memo } from 'react';
import { fetchPhotosForKeyword, fetchPhotos } from '../helpers/unsplash';
import { FlatList, Image, Text, View } from 'react-native';

function useUnsplashPhotos(keyword) {
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState(keyword);
  // default this to true to kick the initial effect hook to
  // fetch the first page
  const [shouldFetch, setShouldFetch] = useState(true);
  const [photos, setPhotos] = useState([]);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    setPhotos([]);
    setPage(1);
    setShouldFetch(true);
  }, [tag]);

  useEffect(
    () => {
      // prevent fetching for other state changes
      if (!shouldFetch) {
        return;
      }

      const fetch = async () => {
        const newPhotos = await fetchPhotos(tag, page, 20);
        setShouldFetch(false);
        setPhotos(oldPhotos => [...oldPhotos, ...newPhotos]);
        setPage(page + 1);
      };

      fetch();
    },
    // prevent fetching for other state changes
    [page, shouldFetch, tag],
  );

  return [photos, setTag, fetchMore];
}

const viewabilityConfig = {
  itemVisiblePercentThreshold: 100,
  minimumViewTime: 100,
};

export const UnsplashFeed = memo(props => {
  const { tag } = props;

  const [photos, setTag, fetchMore] = useUnsplashPhotos(tag);

  useEffect(() => {
    setTag(tag);
  }, [tag]);

  const onViewableItemsChanged = useCallback(param => {
    console.log(param);
  }, []);

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
        extraData={tag}
        onEndReached={fetchMore}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        onEndReachedThreshold={0.9}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
});
