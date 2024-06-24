import { useState, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useJsonPlaceholder from "../../lib/useJsonPlaceHolder";
import { getAllPosts, getLatestPosts } from "../../lib/jsonplaceholder";
import { EmptyState, SearchInput, Trending, PostCard } from "../../components";

const Home = () => {
  const { data: posts, refetch } = useJsonPlaceholder(getAllPosts);
  const { data: latestPosts } = useJsonPlaceholder(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const onViewableItemsChanged = useCallback(() => {
    // Your viewable items changed logic
  }, []);

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 50,
    }),
    []
  );

  const renderItem = useCallback(
    ({ item }) => (
      <PostCard
        id={item.id}
        title={item.title}
        body={item.body}
        creator={item.creator?.username ?? "Olga"}
        avatar={item.creator?.avatar}
      />
    ),
    []
  );

  const listHeaderComponent = useMemo(
    () => (
      <View className="flex my-6 px-4 space-y-6">
        <View className="flex justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">Sonia K</Text>
          </View>

          <View className="mt-1.5">
            <Image
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>

        <SearchInput />

        <View className="w-full flex-1 pt-5 pb-8">
          <Text className="text-lg font-pregular text-gray-100 mb-3">
            Latest Posts
          </Text>

          <Trending posts={latestPosts ?? []} />
        </View>
      </View>
    ),
    [latestPosts]
  );

  const listEmptyComponent = useMemo(
    () => <EmptyState title="No Posts Found" subtitle="No posts created yet" />,
    []
  );

  const refreshControl = useMemo(
    () => <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
    [refreshing, onRefresh]
  );

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListEmptyComponent={listEmptyComponent}
        refreshControl={refreshControl}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
};

export default Home;
