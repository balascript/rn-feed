import React, { useState, useCallback, useMemo } from 'react';
import {
  VirtualizedList,
  TouchableHighlight,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { UnsplashFeed } from './UnsplashFeed';

const TAGS = ['dogs', 'cats'];

export const ComplexUnsplashFeed = props => {
  const [selectedTag, setTag] = useState(TAGS[0]);

  const data = useMemo(() => [TAGS, selectedTag], [selectedTag]);

  const renderItem = useCallback(
    ({ item, index }) => {
      if (Array.isArray(item)) {
        return <Tabs selectedTag={selectedTag} setTag={setTag} />;
      }

      return <UnsplashFeed tag={selectedTag} />;
    },
    [selectedTag],
  );

  return (
    <View style={{ flex: 1, pointerEvents: 'box-none' }}>
      <VirtualizedList
        data={data}
        keyExtractor={(item, index) => `key-${index}`}
        renderItem={renderItem}
        getItem={(data, index) => data[index]}
        getItemCount={data => data.length}
        stickyHeaderIndices={[0]}
        overScrollMode="never"
      />
    </View>
  );
};

const Tabs = props => {
  const { selectedTag, setTag } = props;

  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'box-none',
        backgroundColor: 'white',
      }}>
      {TAGS.map(tag => {
        const isTagSelected = tag === selectedTag;
        return (
          <View
            style={{
              flex: 1,
            }}
            key={`${tag}`}>
            <TouchableHighlight
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onLongPress={() => setTag(tag)}>
              <Text
                style={{
                  fontWeight: isTagSelected ? 'bold' : 'normal',
                  alignSelf: 'center',
                }}>
                {tag}
              </Text>
            </TouchableHighlight>
          </View>
        );
      })}
    </View>
  );
};
