import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  getPostById,
  getCommentsByPostId,
  deletePostById,
} from "../../lib/jsonplaceholder";
import { SafeAreaView } from "react-native-safe-area-context";

const CommentCard = ({ name, email, body }) => (
  <View className="border-b border-gray-200 pb-4 mb-4">
    <Text className="text-lg font-psemibold text-white">{name}</Text>
    <Text className="text-sm text-gray-100">{email}</Text>
    <Text className="text-base text-white mt-2">{body}</Text>
  </View>
);

const Post = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (!id) {
          throw new Error("Post ID is undefined");
        }
        const fetchedPost = await getPostById(id);
        const fetchedComments = await getCommentsByPostId(id);
        setPost(fetchedPost);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const onDeletePost = async () => {
    try {
      if (await deletePostById(id)) {
        Alert.alert("Post Deleted");
        navigation.goBack(); // Go back after deletion
      } else {
        Alert.alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      // Alert.alert("Error", "Failed to delete the post. Please try again.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="px-4 py-6">
        <View className="mt-10 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-sm text-secondary font-psemibold">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePost}>
            <Text className="text-base text-red-500 font-psemibold">
              Delete
            </Text>
          </TouchableOpacity>
        </View>

        {post && (
          <View className="mt-6">
            <Text className="text-2xl font-psemibold text-white">
              {post.title}
            </Text>
            <Text className="text-base text-white mt-4">{post.body}</Text>
          </View>
        )}

        <Text className="text-lg font-psemibold text-white mb-4 mt-4">
          Comments
        </Text>

        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CommentCard name={item.name} email={item.email} body={item.body} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Post;
