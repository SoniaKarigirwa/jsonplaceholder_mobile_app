import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { icons } from "../constants";

const PostCard = ({ id, title, creator, avatar, body }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Link href={`/post/${id}`} asChild>
      <TouchableOpacity>
        <View className="flex flex-col items-center px-4 mb-14">
          <View className="flex flex-row gap-3 items-start">
            <View className="flex justify-center items-center flex-row flex-1">
              <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                <Image
                  source={{ uri: avatar }}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </View>

              <View className="flex justify-center flex-1 ml-3 gap-y-1">
                <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
                  {title}
                </Text>
                <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                  {creator}
                </Text>
              </View>
            </View>

            <View className="pt-2">
              <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
            </View>
          </View>

          <View className="w-full mt-3">
            <Text className="text-base text-white font-pregular" numberOfLines={showMore ? undefined : 3}>
              {body}
            </Text>
            <TouchableOpacity onPress={() => setShowMore(!showMore)} className="mt-2">
              <Text className="text-sm text-secondary font-psemibold">
                {showMore ? "Show Less" : "Show More"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default PostCard;
